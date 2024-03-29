import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class DiseaseIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                height="30px"
                viewBox="0 0 45.2 43.9"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M23.1,24.1c-2.7,0-5,2.2-5,5s2.2,5,5,5c2.7,0,5-2.2,5-5S25.9,24.1,23.1,24.1z M23.1,31c-1.1,0-2-0.9-2-2s0.9-2,2-2
                    c1.1,0,2,0.9,2,2S24.2,31,23.1,31z"
                />
                <path d="M32.8,14.8c1.5,0,2.8-1.2,2.8-2.8c0-1.5-1.2-2.8-2.8-2.8c-1.5,0-2.8,1.2-2.8,2.8C30,13.6,31.2,14.8,32.8,14.8z" />
                <path
                    d="M33,16.8c-2.7,0-5,2.2-5,5c0,2.7,2.2,5,5,5s5-2.2,5-5C38,19,35.8,16.8,33,16.8z M33,23.8c-1.1,0-2-0.9-2-2s0.9-2,2-2
                    s2,0.9,2,2S34.1,23.8,33,23.8z"
                />
                <path
                    d="M43.7,22.2h-1c0.2-3.7-0.2-6.8-0.4-8.3c-0.2-1.8-1-4-2.3-6l1-0.9c0.6-0.6,0.6-1.5,0-2.1c-0.6-0.6-1.5-0.6-2.1,0l-0.9,0.9
                    c-1.4-1.1-3-1.8-5.1-1.8c-1.4,0-2.6,0.2-3.7,0.5l-0.6-1c-0.4-0.7-1.3-1-2-0.6c-0.7,0.4-1,1.3-0.6,2l0.6,1.1
                    c-1.6,1.4-2.4,3.5-3.1,5.8c0,0-0.3,1.6-1.7,3.4L21,14.2c-0.6-0.6-1.5-0.6-2.1,0c-0.6,0.6-0.6,1.5,0,2.1l0.9,0.9
                    c-0.4,0.3-0.8,0.6-1.3,0.9c-2.9,1.7-4.8,3.5-5.7,5.7l-0.9-0.4c-0.8-0.3-1.6,0.1-1.9,0.8c-0.3,0.8,0.1,1.6,0.8,1.9l1.3,0.5
                    c-0.1,1.2-0.1,2.4,0.1,3.9c0.1,1.2,0.7,2.6,1.5,3.9l-0.7,0.6c-0.6,0.6-0.6,1.5-0.1,2.1c0.3,0.3,0.7,0.5,1.1,0.5
                    c0.4,0,0.7-0.1,1-0.4l0.5-0.5c2.2,2.4,5.4,4.3,9.1,4.8v0.6c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5v-0.6c2.1-0.2,4.3-0.9,6.5-2.3
                    c0.8-0.5,1.5-1.1,2.2-1.7l0.3,0.3c0.3,0.3,0.6,0.4,1,0.4c0.4,0,0.8-0.2,1.1-0.5c0.6-0.6,0.5-1.6-0.1-2.1l-0.3-0.2
                    c2.5-3.1,3.7-6.9,4.2-10.4h1.3c0.8,0,1.5-0.7,1.5-1.5S44.5,22.2,43.7,22.2z M32.3,36.9c-2,1.3-4,1.9-6,1.9c-0.1,0-0.2,0-0.3,0
                    c-0.1,0-0.1,0-0.2,0c-6-0.2-10.4-5.7-10.7-8.6c-0.6-4.9,0.5-6.9,4.9-9.6c4.9-2.9,6.2-7.3,6.4-8.3c0.7-2.4,1.5-3.8,2.7-4.6
                    c0.1,0,0.2-0.1,0.3-0.1c0.1-0.1,0.2-0.1,0.3-0.2c0.8-0.4,1.8-0.6,3.1-0.6l0.1,0c4.5,0,6.2,5.5,6.5,7.4l0,0.2
                    C40.7,25.6,38.3,33.1,32.3,36.9z"
                />
                <path
                    d="M9.8,7.7c-2.1-2.3-5.7-2.4-8-0.3c-1.1,1-1.7,2.4-1.8,3.9c-0.1,1.5,0.5,3,1.5,4.1c1,1.1,2.4,1.7,3.9,1.8c0.1,0,0.1,0,0.2,0
                    c1.4,0,2.8-0.5,3.9-1.5c0,0,0,0,0,0C11.8,13.6,11.9,10,9.8,7.7z M7.5,13.6C7,14,6.3,14.3,5.6,14.3c-0.7,0-1.4-0.3-1.9-0.8
                    C3.2,12.9,3,12.2,3,11.5s0.3-1.4,0.8-1.9C4.4,9.2,5,8.9,5.7,8.9c0.7,0,1.4,0.3,2,0.8C8.6,10.9,8.6,12.6,7.5,13.6z"
                />
                <path d="M16.6,5.4c1.5,0,2.7-1.2,2.7-2.7S18.1,0,16.6,0s-2.7,1.2-2.7,2.7S15.1,5.4,16.6,5.4z" />
            </svg>
        );
    }
}

DiseaseIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default DiseaseIcon;
