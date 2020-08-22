import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledStar = styled.div`
    cursor: pointer;
    line-height: 0;
`;

export default class Star extends PureComponent {
    static propTypes = {
        value: PropTypes.number.isRequired,
        editable: PropTypes.bool.isRequired,
        onMouseOver: PropTypes.func.isRequired,
        icon: PropTypes.element.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onMouseOver = () => {
        const { editable, onMouseOver, value } = this.props;

        if (editable && onMouseOver) {
            onMouseOver(value);
        }
    };

    onMouseOut = () => {
        const { editable, onMouseOver } = this.props;

        if (editable && onMouseOver) {
            onMouseOver(0);
        }
    };

    onClick = () => {
        const { editable, onClick, value } = this.props;

        if (editable && onClick) {
            onClick(value);
        }
    };

    render() {
        const { icon } = this.props;
        return (
            <StyledStar
                onMouseEnter={this.onMouseOver}
                onMouseLeave={this.onMouseOut}
                onClick={this.onClick}
            >
                {icon}
            </StyledStar>
        );
    }
}
