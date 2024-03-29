import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class RadiologyIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                version="1.1"
                x="0px"
                y="0px"
                width="42.38px"
                height="40.33px"
                viewBox="0 0 42.38 40.33"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M40.88,0H1.5C0.67,0,0,0.67,0,1.5v28.1c0,0.83,0.67,1.5,1.5,1.5h18.19v6.23H8.31c-0.83,0-1.5,0.67-1.5,1.5
                    s0.67,1.5,1.5,1.5h25.77c0.83,0,1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5H22.69V31.1h18.19c0.83,0,1.5-0.67,1.5-1.5V1.5
                    C42.38,0.67,41.71,0,40.88,0z M39.38,28.1H3V3h36.38V28.1z"
                />
                <path
                    d="M9.17,25.95c2.49,0,4.5-2.01,4.5-4.5c0-0.88-0.26-1.7-0.7-2.39l3.17-3.56c0.49,0.18,1.01,0.3,1.57,0.3
                    c0.65,0,1.26-0.14,1.81-0.39l2.99,3.54c-0.48,0.72-0.76,1.58-0.76,2.5c0,2.49,2.01,4.5,4.5,4.5s4.5-2.01,4.5-4.5
                    c0-1.17-0.45-2.22-1.18-3.02l2.94-5.4c0.23,0.04,0.46,0.07,0.7,0.07c2.49,0,4.5-2.01,4.5-4.5s-2.01-4.5-4.5-4.5s-4.5,2.01-4.5,4.5
                    c0,1.15,0.45,2.2,1.16,2.99l-2.95,5.42c-0.22-0.03-0.44-0.07-0.67-0.07c-0.46,0-0.89,0.09-1.31,0.22l-3.24-3.83
                    c0.32-0.62,0.51-1.3,0.51-2.04c0-2.49-2.01-4.5-4.5-4.5s-4.5,2.01-4.5,4.5c0,0.83,0.24,1.6,0.64,2.27L10.6,17.2
                    c-0.45-0.15-0.93-0.25-1.43-0.25c-2.49,0-4.5,2.01-4.5,4.5C4.67,23.93,6.69,25.95,9.17,25.95z M33.21,7.1c0.83,0,1.5,0.67,1.5,1.5
                    s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S32.38,7.1,33.21,7.1z M27.75,21.45c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5
                    c0-0.83,0.67-1.5,1.5-1.5S27.75,20.62,27.75,21.45z M17.71,9.79c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5
                    S16.88,9.79,17.71,9.79z M9.17,19.95c0.83,0,1.5,0.67,1.5,1.5c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5
                    C7.67,20.62,8.35,19.95,9.17,19.95z"
                />
            </svg>
        );
    }
}

RadiologyIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default RadiologyIcon;
