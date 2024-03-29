/*

* */

import React, { PureComponent } from "react";
import Icon from "../Icon";
import PropTypes from "prop-types";

@Icon
class DSIcon extends PureComponent {
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
                <path d="M0.2,0.6h19.7v1.1H0.2V0.6z M0.2,18.4h19.7v1.1H0.2V18.4z" />
                <path
                    d="M0.7,15v-10h3.5C5,5.1,5.6,5.1,6,5.2c0.6,0.1,1.1,0.4,1.5,0.7c0.5,0.4,0.9,1,1.2,1.7S9,9.1,9,10c0,0.8-0.1,1.4-0.3,2
                    c-0.2,0.6-0.4,1.1-0.7,1.4c-0.3,0.4-0.6,0.7-0.9,0.9c-0.3,0.2-0.8,0.4-1.2,0.5C5.4,15,4.9,15,4.3,15H0.7z M2,13.9h2.2
                    c0.7,0,1.2-0.1,1.6-0.2c0.4-0.1,0.7-0.3,0.9-0.5c0.3-0.3,0.5-0.8,0.8-1.3c0.2-0.5,0.3-1.2,0.3-1.9c0-1-0.2-1.8-0.5-2.4
                    C6.9,7,6.4,6.6,5.9,6.4C5.6,6.2,5,6.2,4.2,6.2H2V13.9z"
                />
                <path
                    d="M10.2,12.9l1.3-0.2c0.1,0.5,0.3,0.9,0.6,1.1c0.3,0.3,0.8,0.4,1.3,0.4c0.5,0,1-0.1,1.3-0.3c0.3-0.2,0.4-0.5,0.4-0.8
                    c0-0.3-0.1-0.5-0.4-0.6c-0.2-0.1-0.6-0.3-1.3-0.4c-0.9-0.2-1.5-0.4-1.9-0.6c-0.3-0.2-0.6-0.4-0.8-0.7c-0.2-0.3-0.3-0.6-0.3-1
                    c0-0.3,0.1-0.6,0.2-0.9c0.2-0.3,0.3-0.5,0.6-0.7c0.2-0.2,0.4-0.3,0.8-0.4c0.3-0.1,0.7-0.2,1.1-0.2c0.6,0,1.1,0.1,1.5,0.3
                    c0.4,0.2,0.8,0.4,1,0.6c0.2,0.3,0.3,0.6,0.4,1.1l-1.3,0.2c-0.1-0.4-0.2-0.6-0.5-0.9c-0.3-0.2-0.7-0.3-1.1-0.3c-0.5,0-1,0.1-1.2,0.3
                    c-0.2,0.2-0.4,0.4-0.4,0.6c0,0.2,0.1,0.3,0.2,0.4c0.1,0.1,0.3,0.2,0.5,0.3c0.1,0.1,0.5,0.2,1.1,0.3c0.9,0.2,1.5,0.4,1.9,0.6
                    c0.3,0.2,0.6,0.4,0.8,0.6c0.2,0.3,0.3,0.6,0.3,1.1s-0.1,0.8-0.4,1.2c-0.2,0.4-0.6,0.6-1,0.9c-0.4,0.2-1,0.3-1.5,0.3
                    c-1,0-1.7-0.2-2.2-0.6C10.7,14.2,10.4,13.6,10.2,12.9z"
                />
                <path d="M18.2,15v-1.4h1.4V15H18.2z" />
            </svg>
        );
    }
}

DSIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default DSIcon;
