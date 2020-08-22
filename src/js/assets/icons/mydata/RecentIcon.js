import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class RecentIcon extends PureComponent {
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
                <path d="M21 5V19H23V5H21ZM17 19H19V5H17V19ZM14 5H2C1.45 5 1 5.45 1 6V18C1 18.55 1.45 19 2 19H14C14.55 19 15 18.55 15 18V6C15 5.45 14.55 5 14 5ZM8 7.75C9.24 7.75 10.25 8.76 10.25 10C10.25 11.24 9.24 12.25 8 12.25C6.76 12.25 5.75 11.24 5.75 10C5.75 8.76 6.76 7.75 8 7.75ZM12.5 17H3.5V16.25C3.5 14.75 6.5 14 8 14C9.5 14 12.5 14.75 12.5 16.25V17Z" />
            </svg>
        );
    }
}

RecentIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default RecentIcon;
