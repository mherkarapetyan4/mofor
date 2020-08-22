import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class ServicesIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="44.5px"
                height="38.9px"
                viewBox="0 0 44.5 38.9"
                fillOpacity={opacity}
                fill={color}
            >
                <path
                    d="M7.1,38.9c-0.9,0-1.9-0.4-2.6-1.1c-1.1-1.1-1.3-2.8-0.5-4.2L7.2,28C2.7,25.3,0,20.4,0,15.2c0-4.1,1.6-7.9,4.4-10.7
                C7.3,1.6,11.1,0,15.1,0h13.8c8.1,0,14.9,6.2,15.5,14.1l0,0c0.3,4.4-1.3,8.7-4.4,11.8c-2.9,2.9-6.7,4.4-10.7,4.4h-4.6L8.7,38.5
                C8.2,38.7,7.6,38.9,7.1,38.9z M15.1,3c-3.2,0-6.3,1.3-8.6,3.6C4.3,8.9,3,11.9,3,15.2c0,4.3,2.3,8.2,5.9,10.4c1.3,0.8,1.7,2.4,1,3.7
                l-3.3,5.7c-0.2,0.3,0,0.5,0.1,0.6c0.1,0.1,0.3,0.3,0.6,0.1l16.1-8.2c0.4-0.2,0.8-0.3,1.3-0.3h4.6c3.2,0,6.3-1.3,8.6-3.6
                c2.5-2.5,3.8-5.9,3.5-9.4l0,0C41,8,35.5,3,28.9,3H15.1z M24.8,30.3L24.8,30.3L24.8,30.3z"
                />
                <path d="M11.6,13.6c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S12.4,13.6,11.6,13.6L11.6,13.6z" />
                <path d="M22,13.6c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S22.8,13.6,22,13.6L22,13.6z" />
                <path d="M32.4,13.6c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S33.2,13.6,32.4,13.6L32.4,13.6z" />
            </svg>
        );
    }
}

ServicesIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default ServicesIcon;
