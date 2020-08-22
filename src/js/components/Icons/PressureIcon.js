import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class PressureIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="30.1px"
                height="42.5px"
                viewBox="0 0 30.1 42.5"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M15.1,0C12.9,4,0,15.7,0,27.5c0,8.3,6.7,15.1,15.1,15.1s15.1-6.7,15.1-15.1C30.1,16.2,17.2,4.2,15.1,0z M15,5.1
                c0.4,0.5,0.9,1.1,1.3,1.7c3.9,4.9,9.7,12.1,10.6,18.8h-1.7l-3.1-4.9c-0.5-0.8-1.3-1.2-2.2-1.2c-0.1,0-0.1,0-0.2,0
                c-1,0.1-1.8,0.7-2.1,1.6l-2.8,6.9l-2.6-4.7c-0.4-0.8-1.2-1.3-2.1-1.3c-0.1,0-0.1,0-0.2,0c-0.8,0-1.6,0.4-2,1l-2.1,2.7H3.1
                C3.9,18.6,10,11.3,14,6.3C14.4,5.9,14.7,5.5,15,5.1z M15.1,39.5c-6.2,0-11.3-4.7-12-10.7h3.5c0.5,0,0.9-0.2,1.2-0.6l2.1-2.8l3.8,6.8
                c0.3,0.5,0.8,0.8,1.3,0.8c0,0,0.1,0,0.1,0c0.6,0,1.1-0.4,1.3-0.9l3.7-9.1l3.1,4.9c0.3,0.4,0.8,0.7,1.3,0.7H27
                C26.5,34.7,21.3,39.5,15.1,39.5z"
                />
            </svg>
        );
    }
}

PressureIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};
export default PressureIcon;
