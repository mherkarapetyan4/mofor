/*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class PrintIcon extends PureComponent {
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
                    d="M22,6.2h-2V0.6c0-0.3-0.2-0.6-0.6-0.6H4.5C4.2,0,4,0.2,4,0.6v5.6H2c-1.1,0-2,0.8-2,2v8.4c0,1.1,0.8,2,2,2h2v4.9
                C4,23.8,4.2,24,4.5,24h14.9c0.3,0,0.6-0.3,0.6-0.6v-4.9h2c1.1,0,2-0.9,2-2V8.1C23.9,7.1,23.1,6.2,22,6.2z M5.1,1.1h13.7v5H5.1V1.1z
                 M18.8,22.9H5.1v-9.5h13.7V22.9z M22.8,16.5c0,0.5-0.4,0.8-0.8,0.8h-2v-4.6c0-0.3-0.2-0.6-0.6-0.6H4.5c-0.3,0-0.6,0.2-0.6,0.6v4.6H2
                c-0.5,0-0.8-0.4-0.8-0.8V8.1c0-0.5,0.4-0.8,0.8-0.8h2.5c0,0,0,0,0,0h14.9c0,0,0,0,0,0H22c0.5,0,0.8,0.4,0.8,0.8V16.5z"
                />
                <path d="M20.3,8.9c-0.4,0-0.8,0.4-0.8,0.8s0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8S20.7,8.9,20.3,8.9z" />
                <path
                    d="M7.5,16.4h8.9c0.3,0,0.6-0.2,0.6-0.6c0-0.3-0.2-0.6-0.6-0.6H7.5c-0.3,0-0.6,0.2-0.6,0.6
                C6.9,16.2,7.2,16.4,7.5,16.4z"
                />
                <path d="M7.5,19.4h8.9c0.3,0,0.6-0.2,0.6-0.6s-0.2-0.6-0.6-0.6H7.5c-0.3,0-0.6,0.2-0.6,0.6S7.2,19.4,7.5,19.4z" />
            </svg>
        );
    }
}

PrintIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default PrintIcon;
