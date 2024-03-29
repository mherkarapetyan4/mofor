/*

* */

import React, { PureComponent } from "react";
import Icon from "../Icon";
import PropTypes from "prop-types";

@Icon
class FoodIcon extends PureComponent {
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
                    d="M15,19.9c-0.5,0-0.9-0.2-1.2-0.5c-0.4-0.4-0.6-0.9-0.6-1.4l0.3-8.5c-0.3-0.1-0.5-0.2-0.8-0.5c-0.8-0.6-1.1-1.9-1.1-3.5
                        c0-2.4,1.7-4.7,3.2-5.4c0.5-0.2,1-0.2,1.4,0.1c0.4,0.3,0.7,0.7,0.7,1.2v16.4c0,1-0.8,1.8-1.7,1.9C15.2,19.9,15.1,19.9,15,19.9z
                         M14.1,8.6c0.2,0,0.3,0.1,0.4,0.2c0.1,0.1,0.2,0.3,0.2,0.4l-0.4,8.9c0,0.2,0.1,0.4,0.3,0.5c0.2,0.2,0.4,0.2,0.6,0.2
                        c0.4-0.1,0.7-0.4,0.7-0.9V1.6c0-0.2-0.2-0.3-0.2-0.4c-0.1-0.1-0.2-0.1-0.4,0c-1.1,0.5-2.6,2.4-2.6,4.5c0,1.6,0.4,2.4,0.8,2.7
                        C13.7,8.6,14,8.6,14.1,8.6z"
                />
                <path
                    d="M6.8,19.9c-1,0-1.9-0.9-1.9-1.9l0.2-8.9C3.9,8.6,3,7.4,3,6c0.1-3.7,1.3-5.9,3.6-5.9s3.5,2.2,3.5,5.9
                        c0,1.3-0.7,2.5-1.9,3.1L8.6,18C8.6,19.1,7.8,19.9,6.8,19.9z M6.6,1.1C4.5,1.1,4.2,4.2,4.2,6c0,1.1,0.6,2,1.7,2.3
                        c0.2,0.1,0.4,0.3,0.4,0.5L6,18.1c0,0.4,0.4,0.7,0.8,0.7c0.4,0,0.8-0.4,0.8-0.8L7.3,8.8c0-0.2,0.1-0.4,0.3-0.5C8.5,7.9,9.2,7,9.2,6
                        C9.2,4.6,8.9,1.1,6.6,1.1z"
                />
            </svg>
        );
    }
}

FoodIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default FoodIcon;
