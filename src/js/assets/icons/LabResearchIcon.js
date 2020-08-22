import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class LabResearchIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="40.5px"
                height="40.4px"
                viewBox="0 0 40.5 40.4"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M35.7,25.4c0,0-4.8,4.1-4.8,8.5c0,2.7,2.2,4.8,4.8,4.8s4.8-2.2,4.8-4.8C40.5,29.8,35.7,25.4,35.7,25.4z M35.7,35.8
                    c-1,0-1.8-0.8-1.8-1.8c0-1.3,0.9-2.8,1.8-4.1c1,1.3,1.9,2.8,1.9,4.1C37.5,34.9,36.7,35.8,35.7,35.8z"
                />
                <path
                    d="M37.8,17.4c0.6,0.6,1.5,0.6,2.1,0c0.6-0.6,0.6-1.5,0-2.1L25.1,0.4c-0.6-0.6-1.5-0.6-2.1,0c-0.6,0.6-0.6,1.5,0,2.1l0.3,0.3
                    L2.9,23.2C-1,27.1-1,33.6,2.9,37.5c4.1,3.9,10.4,3.9,14.3,0l20.3-20.3L37.8,17.4z M15.1,35.4c-1.3,1.3-3.1,2-4.9,2
                    c-1.9,0-3.7-0.7-5.2-2.1c-1.2-1.2-2-3-2-5c0-1.8,0.6-3.4,1.7-4.7h20.1L15.1,35.4z M27.8,22.7H7.7l5.2-5.2l2.6,2.6
                    c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1l-2.6-2.6l4.4-4.4l2.6,2.6c0.3,0.3,0.7,0.4,1.1,0.4
                    s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1l-2.6-2.6L25.4,5l10,10L27.8,22.7z"
                />
            </svg>
        );
    }
}

LabResearchIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default LabResearchIcon;
