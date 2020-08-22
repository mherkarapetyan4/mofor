/*

* */

import React, { PureComponent } from "react";
import Icon from "../Icon";
import PropTypes from "prop-types";

@Icon
class GenderIcon extends PureComponent {
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
                    d="M4.8,12.8c-1.9,0-3.5-1.5-3.5-3.4C1.3,7.5,2.9,6,4.8,6c0.6,0,1.2,0.1,1.7,0.4l0.5-1C6.3,5,5.6,4.9,4.8,4.9
                    c-2.5,0-4.6,2-4.6,4.5c0,2.3,1.8,4.2,4.1,4.5v2.2H1.9v1.1h2.3v2.2h1.1v-2.2h2.4v-1.1H5.3v-2.2c1.2-0.1,2.3-0.7,3-1.6l-0.8-0.7
                    C6.8,12.4,5.8,12.8,4.8,12.8z"
                />
                <path
                    d="M13.9,0.6v1.1h4L15,4.5c-0.8-0.6-1.8-1-2.8-1c-2.5,0-4.6,2-4.6,4.5s2.1,4.5,4.6,4.5s4.6-2,4.6-4.5c0-1.1-0.4-2-1-2.8
                    l2.9-2.9v3.9h1.1V0.6H13.9z M12.2,11.4c-1.9,0-3.5-1.5-3.5-3.4c0-1.9,1.6-3.4,3.5-3.4c1.9,0,3.5,1.5,3.5,3.4
                    C15.7,9.9,14.1,11.4,12.2,11.4z"
                />
            </svg>
        );
    }
}

GenderIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default GenderIcon;
