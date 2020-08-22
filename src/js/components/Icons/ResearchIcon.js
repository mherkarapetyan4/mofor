import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class ResearchIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="42.4px"
                height="40.3px"
                viewBox="0 0 42.4 40.3"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M40.9,0H1.5C0.7,0,0,0.7,0,1.5v28.1c0,0.8,0.7,1.5,1.5,1.5h18.2v6.2H8.3c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h25.8
                    c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5H22.7v-6.2h18.2c0.8,0,1.5-0.7,1.5-1.5V1.5C42.4,0.7,41.7,0,40.9,0z M39.4,28.1H3V3h36.4
                    V28.1z"
                />
                <path
                    d="M9.2,25.9c2.5,0,4.5-2,4.5-4.5c0-0.9-0.3-1.7-0.7-2.4l3.2-3.6c0.5,0.2,1,0.3,1.6,0.3c0.6,0,1.3-0.1,1.8-0.4l3,3.5
                    c-0.5,0.7-0.8,1.6-0.8,2.5c0,2.5,2,4.5,4.5,4.5s4.5-2,4.5-4.5c0-1.2-0.5-2.2-1.2-3l2.9-5.4c0.2,0,0.5,0.1,0.7,0.1
                    c2.5,0,4.5-2,4.5-4.5s-2-4.5-4.5-4.5s-4.5,2-4.5,4.5c0,1.2,0.4,2.2,1.2,3l-3,5.4c-0.2,0-0.4-0.1-0.7-0.1c-0.5,0-0.9,0.1-1.3,0.2
                    l-3.2-3.8c0.3-0.6,0.5-1.3,0.5-2c0-2.5-2-4.5-4.5-4.5s-4.5,2-4.5,4.5c0,0.8,0.2,1.6,0.6,2.3l-3.2,3.6c-0.5-0.2-0.9-0.3-1.4-0.3
                    c-2.5,0-4.5,2-4.5,4.5C4.7,23.9,6.7,25.9,9.2,25.9z M33.2,7.1c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5
                    S32.4,7.1,33.2,7.1z M27.7,21.4c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5S27.7,20.6,27.7,21.4z M17.7,9.8
                    c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5S16.9,9.8,17.7,9.8z M9.2,19.9c0.8,0,1.5,0.7,1.5,1.5
                    c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5C7.7,20.6,8.3,19.9,9.2,19.9z"
                />
            </svg>
        );
    }
}

ResearchIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default ResearchIcon;