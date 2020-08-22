import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class CalendarIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8Z" />
                <path d="M17 13H12V18H17V13Z" />
            </svg>
        );
    }
}

CalendarIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default CalendarIcon;
