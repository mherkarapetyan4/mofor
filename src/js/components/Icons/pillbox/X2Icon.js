/*

* */

import React, { PureComponent } from "react";
import Icon from "../Icon";
import PropTypes from "prop-types";

@Icon
class X2Icon extends PureComponent {
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
                    d="M7.3,14.8c-0.2,0-0.3-0.1-0.4-0.2L0.4,8.1c-0.2-0.2-0.2-0.6,0-0.8C0.6,7,1,7,1.2,7.2l6.5,6.5C8,14,8,14.4,7.7,14.6
                    C7.6,14.7,7.4,14.8,7.3,14.8z"
                />
                <path
                    d="M0.8,14.8c-0.2,0-0.3-0.1-0.4-0.2c-0.2-0.2-0.2-0.6,0-0.8l6.5-6.5C7.1,7,7.5,7,7.7,7.2C8,7.5,8,7.8,7.7,8.1l-6.5,6.5
        C1.1,14.7,1,14.8,0.8,14.8z"
                />
                <path
                    d="M9.6,18.5l5.9-6.8c1.1-1.3,1.8-2.1,2.1-2.6c0.7-1,1-2,1-2.9c0-1.1-0.4-2-1.1-2.7c-0.7-0.7-1.7-1.1-2.8-1.1
        c-1.4,0-2.4,0.6-3.2,1.7c-0.3,0.4-0.5,0.9-0.5,1.4C11,6,10.7,6.2,10.4,6.2c-0.4,0-0.7-0.4-0.6-0.7c0.2-0.9,0.5-1.7,1.1-2.3
        c1-1.1,2.3-1.7,3.9-1.7c1.4,0,2.6,0.5,3.6,1.4c1,1,1.4,2.1,1.4,3.5c0,1.1-0.5,2.3-1.3,3.6c-0.5,0.7-1.2,1.6-2.4,2.9L12,17.5h7.4
        c0.2,0,0.5,0.2,0.5,0.5v0.1c0,0.2-0.2,0.5-0.5,0.5H9.6z"
                />
            </svg>
        );
    }
}

X2Icon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default X2Icon;
