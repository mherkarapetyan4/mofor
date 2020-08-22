import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class FullArrowIcon extends PureComponent {
    render() {
        const { color, opacity, rotate } = this.props;

        return (
            <svg
                style={{ transform: `rotate(${rotate}deg)` }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M3 13L17.17 13L13.59 16.59L15 18L21 12L15 6L13.59 7.41L17.17 11L3 11L3 13Z" />
            </svg>
        );
    }
}

FullArrowIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
    rotate: PropTypes.number,
};

FullArrowIcon.defaultProps = {
    rotate: 0,
};

export default FullArrowIcon;
