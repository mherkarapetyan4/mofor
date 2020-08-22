import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class LastActionIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="41px"
                height="41px"
                viewBox="0 0 41 41"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M21.3,18.3h-13c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h9.4L0.4,38.5c-0.6,0.6-0.6,1.5,0,2.1C0.7,40.9,1.1,41,1.5,41
	s0.8-0.1,1.1-0.4l17.2-17.2v9.4c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5v-13C22.8,18.9,22.1,18.3,21.3,18.3z"
                />
                <path
                    d="M41,19.7c0,10.9-8.8,19.7-19.7,19.7c-3.8,0-7.3-1.1-10.3-2.9l2.2-2.2c2.4,1.4,5.2,2.1,8.1,2.1c9.2,0,16.7-7.5,16.7-16.7
	C38,10.5,30.5,3,21.3,3C12.1,3,4.6,10.5,4.6,19.7c0,3,0.8,5.8,2.2,8.2l-2.2,2.2c-1.9-3-3-6.6-3-10.4C1.6,8.8,10.4,0,21.3,0
	C32.2,0,41,8.8,41,19.7z"
                />
                <path
                    d="M33,19.7c0,4.9-3,9.1-7.2,10.8v-3.4c2.5-1.5,4.2-4.3,4.2-7.5c0-4.8-3.9-8.7-8.7-8.7c-3.2,0-6,1.7-7.5,4.3h-3.3
	C12.2,11,16.4,8,21.3,8C27.8,8,33,13.2,33,19.7z"
                />
            </svg>
        );
    }
}

LastActionIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default LastActionIcon;
