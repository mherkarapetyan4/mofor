/*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class ActionIcon extends PureComponent {
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
                <path d="M10,4.6c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C8,3.6,8.9,4.6,10,4.6z" />
                <path d="M10,12.1c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C8,11.2,8.9,12.1,10,12.1z" />
                <path d="M10,19.5c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S8.9,19.5,10,19.5z" />
            </svg>
        );
    }
}

ActionIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default ActionIcon;
