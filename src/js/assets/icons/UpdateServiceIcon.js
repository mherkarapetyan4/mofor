import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class UpdateServiceIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="38.6px"
                height="36.7px"
                viewBox="0 0 38.6 36.7"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M38.4,10.8L31.8,0.6c-0.5-0.8-1.7-0.8-2.2,0.1L27.7,4c0,0-0.1,0-0.1-0.1c-0.8-0.5-1.7-0.9-2.6-1.2C17.5-0.1,8.9,2.9,4.8,10
                c-2,3.5-2.6,7.3-2,11l3.1,0.2c-0.7-3.2-0.2-6.6,1.5-9.6c2.4-4.2,7-6.8,11.8-6.8c1.4,0,2.8,0.2,4.2,0.7c0.9,0.3,1.8,0.7,2.6,1.2
                c0,0,0.1,0,0.1,0.1l-2.1,3.6c-0.5,0.8,0.1,1.9,1,1.9l6.4,0.3l3.3,0.2l2.4,0.1C38.3,12.8,39,11.7,38.4,10.8z M33.4,9.5l-3.9-0.2
                l-1.4-0.1l0.5-0.9l1.5-2.7l0.7-1.2l3.3,5L33.4,9.5z"
                />
                <path
                    d="M35.7,15.7l-3.1-0.2c0.7,3.2,0.2,6.6-1.5,9.6c-2.4,4.2-7,6.8-11.8,6.8c-1.4,0-2.7-0.2-4-0.6c-1-0.3-1.9-0.7-2.8-1.2l2.1-3.7
                c0.5-0.8-0.1-1.9-1-1.9l-6.6-0.3L3.6,24l-2.2-0.1c-1.1,0-1.7,1.1-1.2,2l6.6,10.2C7.4,36.9,8.6,36.8,9,36l1.9-3.3
                c0.9,0.5,1.8,0.9,2.7,1.3c7.4,2.7,15.9-0.3,20-7.4C35.7,23.2,36.3,19.3,35.7,15.7z M10,28.4L8.5,31l-0.6,1.1l-3.3-5l0.5,0l3.9,0.2
                l1.6,0.1L10,28.4z"
                />
            </svg>
        );
    }
}

UpdateServiceIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default UpdateServiceIcon;
