import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class NotificationIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="34.2px"
                height="42.1px"
                viewBox="0 0 34.2 42.1"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M32.7,33.5c-2.2,0-2.5-7.7-2.7-12.3c0-5.5-3.5-10.3-8.4-12.1c0.7-1,1.2-2.2,1.2-3.5c0-3.1-2.5-5.7-5.7-5.7
                c-3.1,0-5.7,2.5-5.7,5.7c0,1.3,0.5,2.5,1.2,3.5c-4.9,1.8-8.4,6.5-8.4,12C4,25.8,3.7,33.5,1.5,33.5C0.7,33.5,0,34.2,0,35
                s0.7,1.5,1.5,1.5l8.8,0c0.7,3.2,3.5,5.5,6.9,5.5c3.4,0,6.2-2.4,6.9-5.5l8.6,0c0.8,0,1.5-0.7,1.5-1.5S33.5,33.5,32.7,33.5z M17.1,3
                c1.5,0,2.7,1.2,2.7,2.7c0,1.5-1.2,2.6-2.6,2.7c0,0,0,0,0,0c0,0,0,0,0,0c-1.5,0-2.6-1.2-2.6-2.7C14.4,4.2,15.6,3,17.1,3z M17.1,11.3
                c0,0,0.1,0,0.1,0c5.4,0.1,9.8,4.5,9.8,10c0.1,1.4,0.1,2.8,0.2,4.1H7c0.1-1.4,0.2-2.8,0.2-4.2C7.2,15.8,11.6,11.3,17.1,11.3z
                 M17.2,39.1c-1.7,0-3.2-1.1-3.8-2.5l7.5,0C20.3,38,18.9,39.1,17.2,39.1z M17.2,33.5C17.1,33.5,17.1,33.5,17.2,33.5l-5.5,0
                c0,0,0,0,0,0c0,0,0,0,0,0l-6.1,0c0.6-1.4,1-3.1,1.2-5.1h20.8c0.2,2,0.6,3.7,1.2,5.1H17.2z"
                />
            </svg>
        );
    }
}

NotificationIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default NotificationIcon;
