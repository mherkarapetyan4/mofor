/*

* */

import React, { PureComponent } from "react";
import Icon from "../Icon";
import PropTypes from "prop-types";

@Icon
class WineIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M11.6,16.7v-3.4c2.8-0.7,4.8-3.5,4.8-6.8c0-0.9-0.2-1.7-0.5-3.3c-0.2-0.6-0.3-1.4-0.5-2.4c-0.1-0.2-0.3-0.4-0.5-0.4H5
                    c-0.3,0-0.5,0.2-0.5,0.5c-0.2,1-0.4,1.7-0.5,2.4C3.8,4.7,3.7,5.6,3.7,6.5c0,3.3,2,6.1,4.8,6.8v3.4C6,16.9,5.1,18.8,5,18.9
                    c-0.1,0.2,0,0.4,0.1,0.5c0.1,0.2,0.3,0.3,0.4,0.3h9.1c0.2,0,0.3-0.2,0.4-0.3c0.1-0.2,0.2-0.4,0.1-0.5C15,18.8,14.1,16.9,11.6,16.7z
                     M5.1,3.3c0.1-0.6,0.3-1.2,0.4-2h9.1c0.2,0.8,0.3,1.4,0.4,2c0.3,1.4,0.4,2.3,0.4,3.1c0,0.5-0.1,1-0.2,1.4H4.9C4.8,7.4,4.7,7,4.7,6.5
                    C4.7,5.7,4.8,4.8,5.1,3.3z M5.2,8.9h9.7c-0.7,1.8-2.1,3.1-3.9,3.5h-2C7.2,12,5.8,10.6,5.2,8.9z M6.5,18.7C7,18.2,7.8,17.7,9,17.8
                    c0.3,0,0.5-0.2,0.5-0.5v-3.9h1v3.8c0,0.3,0.2,0.5,0.5,0.5c1.3,0,2.1,0.5,2.5,0.9H6.5z"
                />
            </svg>
        );
    }
}

WineIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default WineIcon;
