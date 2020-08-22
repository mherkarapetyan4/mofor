import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class DocumentIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="30.1px"
                height="39.1px"
                viewBox="0 0 30.1 39.1"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M27,39.1H3.2C1.4,39.1,0,37.7,0,36V3.2C0,1.4,1.4,0,3.2,0H27c1.7,0,3.2,1.4,3.2,3.2V36C30.1,37.7,28.7,39.1,27,39.1z
                 M27,36.1c0.1,0,0.2-0.1,0.2-0.2V3.2C27.1,3.1,27,3,27,3H3.2C3.1,3,3,3.1,3,3.2V36c0,0.1,0.1,0.2,0.2,0.2H27z"
                />
                <path
                    d="M22,16.5H8.1c-0.8,0-1.5-0.7-1.5-1.5V7.6c0-0.8,0.7-1.5,1.5-1.5H22c0.8,0,1.5,0.7,1.5,1.5V15C23.5,15.8,22.8,16.5,22,16.5z
                 M9.6,13.5h10.9V9.1H9.6V13.5z"
                />
                <path d="M22,23.9H8.1c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5H22c0.8,0,1.5,0.7,1.5,1.5S22.8,23.9,22,23.9z" />
                <path d="M15.1,31.2H8.1c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h6.9c0.8,0,1.5,0.7,1.5,1.5S15.9,31.2,15.1,31.2z" />
            </svg>
        );
    }
}

DocumentIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default DocumentIcon;
