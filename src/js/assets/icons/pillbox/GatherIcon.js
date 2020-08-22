import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class GatherIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="35"
                height="36"
                viewBox="0 0 35 36"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M32.4996 0.726009C32.2996 0.326009 31.8996 0.0260122 31.3996 0.0260122C30.8996 -0.0739878 30.4996 0.126021 30.0996 0.426021C26.9996 3.32602 23.8996 4.42602 20.6996 5.62602C17.8996 6.62602 14.9996 7.62602 11.8996 9.82602C9.2996 11.626 7.89956 14.426 7.79956 17.826C7.69956 19.826 8.29956 21.826 9.29956 23.526C2.09956 27.626 0.199609 32.826 0.0996095 33.026C-0.200391 33.826 0.199573 34.626 0.999573 34.926C1.19957 35.026 1.29957 35.026 1.49957 35.026C2.09957 35.026 2.6996 34.626 2.8996 34.026C2.8996 34.026 4.59959 29.426 11.1996 25.826C12.0996 26.626 13.1996 27.326 14.3996 27.826C16.5996 28.726 18.7996 29.126 20.7996 29.126C23.4996 29.126 25.9996 28.326 28.0996 26.826C35.9996 20.826 35.6996 6.32601 32.4996 0.726009ZM26.2996 24.326C22.7996 26.926 18.4996 26.126 15.4996 25.026C14.9996 24.826 14.5996 24.626 14.0996 24.326C20.9996 20.326 23.9996 15.526 24.0996 15.326C24.4996 14.626 24.2996 13.726 23.5996 13.226C22.8996 12.826 21.9996 13.026 21.4996 13.726C21.4996 13.726 18.5996 18.426 11.7996 22.026C10.9996 20.826 10.5996 19.326 10.6996 17.826C10.7996 15.326 11.7996 13.426 13.5996 12.126C16.3996 10.126 18.9996 9.22601 21.6996 8.22601C24.5996 7.22601 27.5996 6.12602 30.5996 3.82602C32.4996 9.32602 32.0996 20.026 26.2996 24.326Z" />
            </svg>
        );
    }
}

GatherIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default GatherIcon;
