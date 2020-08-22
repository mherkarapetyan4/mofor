import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class BreastfeedIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                version="1.1"
                x="0px"
                y="0px"
                width="23.2px"
                height="45.4px"
                viewBox="0 0 23.2 45.4"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M20.6,15.5c0.8-0.8,1.3-1.9,1.3-3v-0.2c0-2.4-1.9-4.3-4.3-4.3h-0.4V5.5c0-3-2.5-5.5-5.5-5.5S6.1,2.5,6.1,5.5V8H5.7
                c-2.4,0-4.3,1.9-4.3,4.3v0.2c0,1.2,0.5,2.3,1.3,3C1,16.8,0,18.9,0,21.1V41c0,2.4,2,4.4,4.4,4.4h14.4c2.4,0,4.4-2,4.4-4.4V21.1
                C23.2,18.9,22.2,16.8,20.6,15.5z M9.1,5.5c0-1.4,1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5V8h-5V5.5z M5.7,13.8c-0.7,0-1.3-0.6-1.3-1.3v-0.2
                C4.4,11.5,5,11,5.7,11h0.4h11h0.4c0.7,0,1.3,0.6,1.3,1.3v0.2c0,0.7-0.6,1.3-1.3,1.3h-1.6H7.3H5.7z M20.2,41c0,0.8-0.6,1.4-1.4,1.4
                H4.4C3.6,42.4,3,41.8,3,41v-1.4h5c0.8,0,1.5-0.7,1.5-1.5S8.8,36.6,8,36.6H3v-4.2h5c0.8,0,1.5-0.7,1.5-1.5S8.8,29.4,8,29.4H3v-4.2h5
                c0.8,0,1.5-0.7,1.5-1.5S8.8,22.2,8,22.2H3v-1.1c0-2.4,1.9-4.3,4.3-4.3h8.5c2.4,0,4.3,1.9,4.3,4.3V41z"
                />
            </svg>
        );
    }
}

BreastfeedIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default BreastfeedIcon;
