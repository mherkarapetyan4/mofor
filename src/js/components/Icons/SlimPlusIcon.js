/*
*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class SlimPlusIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                fill={color}
                fillOpacity={opacity}
            >
                <polygon points="50,24 26,24 26,0 24,0 24,24 0,24 0,26 24,26 24,50 26,50 26,26 50,26 " />
            </svg>
        );
    }
}

SlimPlusIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};
export default SlimPlusIcon;
