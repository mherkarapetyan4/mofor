/*

* */

import React, { PureComponent } from "react";
import Icon from "../Icon";
import PropTypes from "prop-types";

@Icon
class TabletIcon extends PureComponent {
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
                    d="M15.1,9.7c-0.3-2-0.6-4.2-0.8-5.7l-0.1-0.9h-1.1l-0.1,0.4c-0.1,0.9-0.3,2.4-0.6,4.3c-0.1,0.7-0.2,1.3-0.3,1.9l-0.1,0.7h3.1
                    L15.1,9.7z M13.4,9.2c0.1-0.4,0.1-0.8,0.2-1.2c0.1-0.3,0.1-0.5,0.1-0.8c0.1,0.7,0.2,1.3,0.3,2H13.4z"
                />
                <path
                    d="M19.8,16.6L16.6,0.2h-5.7l-1,4.9C8.5,4.6,7,4.6,5.5,5.1c-3.9,1.2-6.2,5.4-5,9.4c1,3.2,3.9,5.4,7.1,5.4
                    c0.6,0,1.4-0.1,2.1-0.3c2.5-0.7,4.4-2.8,5-5.2l0.4,2.3H19.8z M11.7,1.3h4l2.8,14.2h-2.5l-0.6-3.3h-3.7l-0.5,3.3H9l1.8-9.6
                    c0-0.1,0-0.1,0-0.2L11.7,1.3z M5.8,6.1C6.4,5.9,7,5.8,7.6,5.8c0.7,0,1.4,0.1,2.1,0.3l-1,5.3l-7.2,2.2C0.8,10.3,2.7,7,5.8,6.1z
                     M9.5,18.5c-3.2,1-6.6-0.8-7.7-3.9l6.7-2l-0.6,3.3c0,0.1,0,0.1,0,0.2l-0.1,0.5h4.6l0.1-0.9l0.5-2.4h1.1
                    C13.5,15.7,11.8,17.8,9.5,18.5z"
                />
            </svg>
        );
    }
}

TabletIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default TabletIcon;
