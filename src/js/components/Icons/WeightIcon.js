/*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class WeightIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="35.1px"
                height="33px"
                viewBox="0 0 35.1 33"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M34.4,1.1c-0.3-1.3-2.1-1.4-2.6-0.2C28,9.5,22,7.8,15,11.7c-1.4,0.8-2.8,1.7-4.2,3c-3.8,3.8-4.1,9.7-1,13.9
                c-4.3,2.3-7.6,1.1-7.8,1.1c-0.8-0.3-1.6,0.1-1.9,0.9c-0.3,0.8,0.1,1.6,0.8,1.9c0.1,0,1.4,0.5,3.5,0.5c2,0,4.6-0.5,7.6-2.2
                c4.3,3.1,10.4,2.6,14.2-1.3C27.1,28.7,30.7,25,33,19c0.3-0.9-4.6-2.9-4.3-3.9c0.2-0.8,5.7-0.4,5.8-1.3C35.3,10.2,35.4,5.9,34.4,1.1z
                 M31.9,11.5c-0.2,0-0.4,0-0.6,0.1c-2.5,0.2-4.8,0.4-5.5,2.8c-0.2,0.6-0.4,2.1,1.1,3.6c0.6,0.6,1.6,1.2,2.4,1.8c0,0,0.1,0,0.1,0.1
                c-1.1,2.3-2.8,5.1-5.4,7.7c-2.6,2.6-6.6,3.1-9.6,1.4c4.9-4.1,7.7-6.9,9.1-10.4c0.3-0.8,0-1.6-0.8-2c-0.8-0.3-1.6,0-2,0.8
                c-1.1,2.7-3.2,5.1-8.6,9.6c-2.2-3-2-7.3,0.7-10c1.1-1,2.3-1.9,3.6-2.6c2-1.1,3.9-1.7,5.8-2.3c3.4-1.1,7-2.2,9.8-5.8
                C32.2,8,32.1,9.8,31.9,11.5z"
                />
            </svg>
        );
    }
}

WeightIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};
export default WeightIcon;
