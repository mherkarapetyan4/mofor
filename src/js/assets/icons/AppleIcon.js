import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class AppleIcon extends PureComponent {
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
                <path
                    d="M20.5,15.2c-0.4,1.5-1.1,2.8-1.8,3.7c-1.6,2-2.5,2.4-3.6,2.4c-1.1,0-1.9-0.8-2.8-0.8h0c-0.8,0-1.7,0.8-2.8,0.8
	c-1.1,0-2-0.4-3.6-2.4s-2.9-5.9-2.1-9c0.8-3.2,3.8-4.7,5.9-4.2c1.6,0.4,1.6,0.8,2.5,0.8h0.2c0.9,0,1-0.4,2.5-0.8
	c1.8-0.5,4.1,0.5,5.3,2.5c-1.4,0.5-2.4,1.8-2.4,3.4C17.7,13.4,18.9,14.8,20.5,15.2z"
                />
                <path
                    d="M12.1,6c-0.4,0.1-0.7-0.2-0.7-0.6c-0.1-0.8,0.1-2.3,1.2-3.4c1.1-1,2.2-1.3,3-1.4c0.4-0.1,0.7,0.2,0.8,0.6
	c0,0.8-0.1,2.1-1,3.1C14.2,5.5,12.9,5.8,12.1,6z"
                />
            </svg>
        );
    }
}

AppleIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default AppleIcon;
