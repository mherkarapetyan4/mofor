/*

* */

import React, { PureComponent } from "react";
import Icon from "../Icon";
import PropTypes from "prop-types";

@Icon
class PillsIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="37.2px"
                height="38px"
                viewBox="0 0 37.2 38"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M27.5,16.8c0.2-0.9,0.3-1.9,0.3-2.9C27.8,6.2,21.6,0,13.9,0C6.2,0,0,6.2,0,13.9c0,7.7,6.2,13.9,13.9,13.9
                c0.7,0,1.4-0.1,2-0.2C16.1,33.4,20.8,38,26.5,38c5.9,0,10.6-4.8,10.6-10.6C37.2,21.8,32.9,17.3,27.5,16.8z M13.9,3
                c2.5,0,4.7,0.8,6.6,2.2L5.2,20.5C3.8,18.6,3,16.4,3,13.9C3,7.9,7.9,3,13.9,3z M13.9,24.8c-2.5,0-4.7-0.8-6.6-2.2L22.6,7.3
                c1.4,1.8,2.2,4.1,2.2,6.6c0,1.1-0.2,2.1-0.4,3.1c-0.5,1.7-1.4,3.3-2.7,4.5c0,0,0,0,0,0c-0.2,0.2-0.4,0.4-0.6,0.6
                c-1.3,1.2-3,2-4.7,2.4C15.5,24.7,14.7,24.8,13.9,24.8z M26.5,19.8L26.5,19.8c2.5,0,4.7,1.2,6.1,3l-13.4,6.6c-0.2-0.6-0.3-1.3-0.3-2
                c0-0.2,0-0.3,0-0.5C22.3,25.5,25,23,26.5,19.8z M26.5,35c-2.4,0-4.6-1.1-6-2.9l13.3-6.6c0.2,0.6,0.3,1.2,0.3,1.9
                C34.2,31.6,30.7,35,26.5,35z"
                />
            </svg>
        );
    }
}

PillsIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default PillsIcon;
