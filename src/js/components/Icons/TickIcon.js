/*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class TickIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M7.65217 15L0 7.62195L1.33913 6.34146L7.65217 12.378L20.6609 0L22 1.28049L7.65217 15Z" />
            </svg>
        );
    }
}

TickIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default TickIcon;
