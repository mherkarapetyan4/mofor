import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class DateIcon extends PureComponent {
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
                <path d="M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V8H20V21Z" />
            </svg>
        );
    }
}

DateIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default DateIcon;
