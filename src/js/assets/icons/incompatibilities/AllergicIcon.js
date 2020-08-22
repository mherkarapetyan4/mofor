import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class AllergicIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                height="30px"
                viewBox="0 0 45.7 46.7"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M23.8,15.1c0,3.6-2.9,6.5-6.5,6.5s-6.5-2.9-6.5-6.5s2.9-6.5,6.5-6.5S23.8,11.5,23.8,15.1z M20.8,15.1c0-1.9-1.6-3.5-3.5-3.5
                s-3.5,1.6-3.5,3.5s1.6,3.5,3.5,3.5S20.8,17,20.8,15.1z"
                />
                <circle cx="34.9" cy="6.4" r="1.5" />
                <circle cx="44.2" cy="9.6" r="1.5" />
                <circle cx="38.2" cy="18.9" r="1.5" />
                <circle cx="43.7" cy="25.2" r="1.5" />
                <circle cx="40.1" cy="31.1" r="1.5" />
                <circle cx="43.7" cy="38.8" r="1.5" />
                <circle cx="36.7" cy="41.8" r="1.5" />
                <path
                    d="M33.3,28.2c-8.2,0-12.5,4.8-14.4,9.7V30c1.5-0.5,2.8-1.6,3.4-3.1c1.9,0.8,4.2,0.5,5.8-1.1c1.6-1.6,1.9-3.9,1.1-5.8
                c2-0.8,3.4-2.6,3.4-4.9c0-2.2-1.4-4.1-3.4-4.9C30,8.3,29.6,6,28.1,4.4c-1.6-1.6-3.9-1.9-5.8-1.1c-0.8-2-2.6-3.4-4.9-3.4
                c-2.2,0-4.1,1.4-4.9,3.4c-1.9-0.8-4.2-0.5-5.8,1.1s-1.9,3.9-1.1,5.8c-2,0.8-3.4,2.6-3.4,4.9c0,2.2,1.4,4.1,3.4,4.9
                c-0.8,1.9-0.5,4.2,1.1,5.8c1.6,1.6,3.9,1.9,5.8,1.1c0.6,1.5,1.8,2.7,3.4,3.1v7.7c-2-4.9-6.3-9.6-14.4-9.6H0v1.5
                c0,14.5,15.6,16.8,15.7,16.8l0.2,0v0h0l1.5,0.2l0,0l0,0l0,0l0,0l1.7-0.2c0.2,0,15.7-2.4,15.7-16.8v-1.5H33.3z M3.1,31.2
                c8.5,0.8,10.6,8.3,11.2,11.9C10.8,42.2,3.9,39.3,3.1,31.2z M15.3,25.8c-0.3-0.8-0.9-1.4-1.6-1.7c-0.4-0.2-0.8-0.2-1.1-0.2
                c-0.4,0-0.8,0.1-1.2,0.3c-0.3,0.1-0.6,0.2-0.9,0.2c-0.6,0-1.1-0.2-1.6-0.6C8.2,23,8,22,8.4,21.2c0.3-0.8,0.3-1.6,0-2.4
                c-0.3-0.8-0.9-1.4-1.7-1.6c-0.9-0.3-1.4-1.1-1.4-2.1s0.6-1.7,1.4-2.1c0.8-0.3,1.4-0.9,1.7-1.6c0.3-0.8,0.3-1.6,0-2.4
                C8,8.2,8.2,7.2,8.8,6.5c0.4-0.4,1-0.6,1.6-0.6c0.3,0,0.6,0.1,0.9,0.2c0.4,0.2,0.8,0.3,1.2,0.3c0.4,0,0.8-0.1,1.1-0.2
                c0.8-0.3,1.4-0.9,1.6-1.7C15.6,3.6,16.5,3,17.4,3s1.7,0.6,2.1,1.4c0.3,0.8,0.9,1.4,1.7,1.7c0.4,0.2,0.8,0.2,1.1,0.2
                c0.4,0,0.8-0.1,1.2-0.3c0.3-0.1,0.6-0.2,0.9-0.2c0.6,0,1.1,0.2,1.6,0.6c0.7,0.7,0.8,1.6,0.5,2.5c-0.3,0.8-0.3,1.6,0,2.4
                c0.3,0.8,0.9,1.4,1.7,1.6c0.9,0.3,1.4,1.1,1.4,2.1s-0.6,1.7-1.4,2.1c-0.8,0.3-1.4,0.9-1.7,1.6c-0.3,0.8-0.3,1.6,0,2.4
                c0.4,0.9,0.2,1.8-0.5,2.5c-0.4,0.4-1,0.6-1.6,0.6c-0.3,0-0.6-0.1-0.9-0.2c-0.4-0.2-0.8-0.3-1.2-0.3c-0.4,0-0.8,0.1-1.1,0.2
                c-0.8,0.3-1.4,0.9-1.7,1.7c-0.3,0.9-1.1,1.4-2.1,1.4S15.6,26.6,15.3,25.8z M20.6,43.1c0.5-3.6,2.7-11.1,11.2-11.9
                C30.9,39.2,24,42.1,20.6,43.1z"
                />
            </svg>
        );
    }
}

AllergicIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default AllergicIcon;