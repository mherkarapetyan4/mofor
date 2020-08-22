/*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class AboutIcon extends PureComponent {
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
                <polygon points="12,9 11,6 10,9 7,9 9.5,10.8 8.5,13.7 11,11.9 13.5,13.7 12.5,10.8 15,9 " />
                <path
                    d="M20,2H2C0.9,2,0,2.9,0,4v12c0,1.1,0.9,2,2,2h7v3H7.2v1H15v-1h-2v-3h2v-1H2c-0.5,0-1-0.5-1-1V4c0-0.5,0.5-1,1-1
    h18c0.5,0,1,0.5,1,1v5h1V4C22,2.9,21.1,2,20,2z"
                />
                <path
                    d="M23,22h-5c-0.6,0-1-0.4-1-1v-9c0-0.6,0.4-1,1-1h5c0.6,0,1,0.4,1,1v9C24,21.6,23.6,22,23,22z M23,20v-8h-5v8H23z
                "
                />
            </svg>
        );
    }
}

AboutIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default AboutIcon;
