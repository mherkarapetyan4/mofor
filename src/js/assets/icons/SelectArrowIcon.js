import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class SelectArrowIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5 5L0 0H10L5 5Z" fill="black" />
            </svg>
        );
    }
}

SelectArrowIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default SelectArrowIcon;
