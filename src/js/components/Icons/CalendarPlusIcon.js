/*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class CalendarPlusIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width={14}
                height={14}
                x="0px"
                y="0px"
                viewBox="0 0 14 14"
                fill={color}
                fillOpacity={opacity}
            >
                <polygon points="14,6 8,6 8,0 6,0 6,6 0,6 0,8 6,8 6,14 8,14 8,8 14,8 " />
            </svg>
        );
    }
}

CalendarPlusIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default CalendarPlusIcon;
