import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class DischargeIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                version="1.1"
                x="0px"
                y="0px"
                width="33.1px"
                height="41.75px"
                viewBox="0 0 33.1 41.75"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M31.78,10.54l-9.21-9.22C21.72,0.47,20.59,0,19.38,0H4.5C2.02,0,0,2.02,0,4.5v32.75c0,2.48,2.02,4.5,4.5,4.5h24.1
                    c2.48,0,4.5-2.02,4.5-4.5V13.73C33.1,12.52,32.63,11.39,31.78,10.54z M27.97,10.97c-1.12,0-2.53,0-4.37,0c0,0,0,0,0,0
                    c-0.39,0-0.76-0.15-1.04-0.43c-0.28-0.28-0.43-0.65-0.43-1.05V5.12L27.97,10.97z M28.6,38.75H4.5c-0.83,0-1.5-0.67-1.5-1.5V4.5
                    C3,3.67,3.67,3,4.5,3h14.63v6.5c0,1.2,0.47,2.32,1.31,3.17c0.84,0.84,1.97,1.31,3.16,1.31c0,0,0,0,0.01,0c2.93,0,5.2-0.01,6.49,0
                    v23.28C30.1,38.08,29.43,38.75,28.6,38.75z"
                />
                <path d="M24.16,22.36H9.24c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5h14.92c0.83,0,1.5,0.67,1.5,1.5S24.99,22.36,24.16,22.36z" />
                <path d="M24.16,29.05H9.24c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5h14.92c0.83,0,1.5,0.67,1.5,1.5S24.99,29.05,24.16,29.05z" />
                <path d="M16.01,35.75H9.24c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5h6.77c0.83,0,1.5,0.67,1.5,1.5S16.84,35.75,16.01,35.75z" />
            </svg>
        );
    }
}

DischargeIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default DischargeIcon;
