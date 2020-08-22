import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class GoogleIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M13,12l-7.3,9C5,20.7,4.3,20,4.3,19V4.9c0-1,0.6-1.7,1.4-1.9L13,12z" />
                <polygon points="16.1,8.2 14.3,10.4 9.4,4.3 " />
                <path d="M19.7,13.8l-1.8,1L15.6,12l2.2-2.8l1.9,1.1C21.1,11.1,21.1,13,19.7,13.8z" />
                <polygon points="16.1,15.8 9.4,19.6 14.3,13.5 " />
            </svg>
        );
    }
}

GoogleIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default GoogleIcon;
