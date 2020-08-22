import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class GlucoseIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="34.4px"
                height="42.5px"
                viewBox="0 0 34.4 42.5"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M30.1,27.5c0,8.3-6.8,15-15.1,15C6.7,42.5,0,35.8,0,27.5C0,15.7,12.9,4,15.1,0c1.5,3,8.4,9.8,12.3,17.5l-2.2,2.3
                c-2.3-4.8-6-9.5-8.8-13c-0.5-0.6-0.9-1.2-1.3-1.7c-0.3,0.4-0.6,0.8-1,1.2C9.6,11.7,3,19.8,3,27.5c0,6.6,5.4,12,12.1,12
                c5.4,0,10-3.6,11.5-8.5v0L30.1,27.5z"
                />
                <path
                    d="M19.8,32.9L19.8,32.9c-0.4,0-0.8-0.2-1.1-0.4l-5.5-5.5c-0.6-0.6-0.6-1.5,0-2.1s1.5-0.6,2.1,0l4.5,4.5l12-12
                c0.6-0.6,1.5-0.6,2.1,0s0.6,1.5,0,2.1l-13,13C20.6,32.8,20.2,32.9,19.8,32.9z"
                />
            </svg>
        );
    }
}

GlucoseIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};
export default GlucoseIcon;
