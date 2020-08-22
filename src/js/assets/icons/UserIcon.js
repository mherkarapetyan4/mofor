import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class UserIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="39.2px"
                height="41.4px"
                viewBox="0 0 39.2 41.4"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M30.3,10.9c0,6-4.9,10.9-10.9,10.9S8.5,17,8.5,10.9S13.4,0,19.4,0S30.3,4.9,30.3,10.9z M27.3,10.9c0-4.4-3.6-7.9-7.9-7.9
                s-7.9,3.6-7.9,7.9s3.6,7.9,7.9,7.9S27.3,15.3,27.3,10.9z"
                />
                <path
                    d="M39.2,41.4H0v-7.1c0-5.4,4.4-9.8,9.8-9.8h19.7c5.4,0,9.8,4.4,9.8,9.8V41.4z M36.2,38.4v-4.1c0-3.7-3-6.8-6.8-6.8H9.8
                c-3.7,0-6.8,3-6.8,6.8v4.1H36.2z"
                />
            </svg>
        );
    }
}

UserIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default UserIcon;
