import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class AboutIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="43px"
                height="37.8px"
                viewBox="0 0 43 37.8"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M39.9,22.1c-6.6,10.3-18.5,15.7-18.5,15.7S9.6,32.4,3,22.1C-3.5,11.8,1.7,3.2,7.6,1s10.9-0.2,13.8,3.2
                c2.9-3.5,7.9-5.5,13.8-3.2S46.5,11.8,39.9,22.1z M37.4,20.5c2.5-3.9,3.2-7.7,2.1-11c-0.9-2.6-2.9-4.8-5.2-5.7
                C32.9,3.3,31.6,3,30.4,3c-3.5,0-5.7,2-6.6,3.1l-2.3,2.7l-2.3-2.7C18.2,4.9,16,3,12.6,3C11.3,3,10,3.3,8.7,3.8
                C6.4,4.7,4.4,6.8,3.5,9.4c-1.1,3.3-0.4,7.2,2.1,11c4.8,7.5,12.9,12.3,15.9,14C24.6,32.8,32.6,28.1,37.4,20.5z"
                />
            </svg>
        );
    }
}

AboutIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default AboutIcon;
