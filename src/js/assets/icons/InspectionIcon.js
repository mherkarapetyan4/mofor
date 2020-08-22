import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class InspectionIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                version="1.1"
                x="0px"
                y="0px"
                width="42.64px"
                height="42.34px"
                viewBox="0 0 42.64 42.34"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M42.2,39.78l-9.57-9.57c2.65-3.2,4.25-7.3,4.25-11.77C36.89,8.27,28.62,0,18.44,0S0,8.27,0,18.44
                    c0,10.17,8.27,18.45,18.44,18.45c4.62,0,8.84-1.72,12.08-4.54l9.55,9.55c0.29,0.29,0.68,0.44,1.06,0.44s0.77-0.15,1.06-0.44
                    C42.79,41.32,42.79,40.37,42.2,39.78z M18.44,33.89C9.93,33.89,3,26.96,3,18.44C3,9.93,9.93,3,18.44,3s15.44,6.93,15.44,15.44
                    C33.89,26.96,26.96,33.89,18.44,33.89z"
                />
                <path
                    d="M25.59,12.7l-9.73,9.73l-4.55-4.55c-0.59-0.59-1.54-0.59-2.12,0s-0.59,1.54,0,2.12l6.68,6.68l11.85-11.85
                    c0.59-0.59,0.59-1.54,0-2.12S26.17,12.12,25.59,12.7z"
                />
            </svg>
        );
    }
}

InspectionIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default InspectionIcon;
