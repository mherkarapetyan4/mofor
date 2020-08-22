import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";
import styled from "styled-components";

const SVGWrapper = styled.div`
    transform: rotate(${(props) => props.rotate + "deg"});
    display: inline-flex;
    transform-origin: 50% 50%;

    @media screen and (max-width: ${(props) => props.theme.mediaTablet}) {
        transform: rotate(${(props) => props.rotate + "deg"});
    }
`;

@Icon
class BigAngleArrowIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <SVGWrapper rotate={this.props.rotate}>
                <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 26 50"
                    fill={color}
                    opacity={opacity}
                >
                    <polygon points="25.9,1.5 24.5,0.1 0,25.1 0,25.1 0,25.1 24.5,50.1 25.9,48.7 2.7,25.1 " />
                </svg>
            </SVGWrapper>
        );
    }
}

BigAngleArrowIcon.propTypes = {
    color: PropTypes.string,
    rotate: PropTypes.number,
    disabled: PropTypes.bool,
    opacity: PropTypes.string,
};

BigAngleArrowIcon.defaultProps = {
    disabled: false,
};

export default BigAngleArrowIcon;
