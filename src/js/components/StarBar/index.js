import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Star from "./Star";
import styled from "styled-components";
import times from "lodash/times";
import EmptyStarIcon from "icons/EmptyStarIcon";
import StarIcon from "icons/StarIcon";
import { hasError } from "modules/hasError";

@hasError
class StarBar extends PureComponent {
    state = {
        hoveredStarIndex: 0,
    };

    static propTypes = {
        max: PropTypes.number,
        value: PropTypes.number,
        onChange: PropTypes.func,
        editable: PropTypes.bool,
        emptyIcon: PropTypes.element,
        activeIcon: PropTypes.element,
        hoverIcon: PropTypes.element,
    };

    static defaultProps = {
        max: 5,
        value: 0,
        onChange: () => {},
        editable: false,
        emptyIcon: <EmptyStarIcon />,
        activeIcon: <StarIcon />,
        hoverIcon: <StarIcon />,
    };

    getIcon = (index) => {
        const { hoverIcon, value } = this.props;
        const hover = hoverIcon && this.isStarHovered(index);
        if (!value && hover) {
            return this.props.activeIcon;
        }

        const active = this.isStarActive(index);
        if (active) {
            return this.props.activeIcon;
        }

        return this.props.emptyIcon;
    };

    isStarHovered(index) {
        const { hoveredStarIndex } = this.state;
        return hoveredStarIndex > index;
    }

    isStarActive(index) {
        const { value } = this.props;
        return value > index;
    }

    onStarMouseOver = (index) => {
        const { hoverIcon } = this.props;
        if (hoverIcon) {
            const { hoveredStarIndex } = this.state;
            if (index !== hoveredStarIndex) {
                this.setState({
                    hoveredStarIndex: index,
                });
            }
        }
    };

    onStarClick = (value) => {
        const { onChange } = this.props;

        if (this.props.value !== value) {
            onChange(value);
        }
    };

    renderContent() {
        const { max, editable } = this.props;

        return times(max, (index) => (
            <Star
                key={index}
                value={index + 1}
                editable={editable}
                icon={this.getIcon(index)}
                onMouseOver={this.onStarMouseOver}
                onClick={this.onStarClick}
            />
        ));
    }

    render() {
        return <StyledStarBar>{this.renderContent()}</StyledStarBar>;
    }
}

const StyledStarBar = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    line-height: 0;

    svg {
        margin: 0 3px;
        width: 24px;
        height: 24px;
    }
`;

export default StarBar;
