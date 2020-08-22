import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class GelIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="31"
                height="38"
                viewBox="0 0 31 38"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M30.2 17.1153C30.8 14.4153 30.7 11.0153 27.9 8.71531C27.9 8.61531 27.9 8.61531 27.9 8.51531C27.9 1.91531 15.9 0.215314 14.5 0.0153141C13.9 -0.0846859 13.2 0.315323 12.9 0.915323C12.6 1.51532 12.7999 2.21532 13.2999 2.61532C14.3999 3.61532 14.4 4.01531 14.4 4.01531C14.2 4.61531 11.7 5.51531 10.4 6.01531C7.20002 7.21531 3.09998 8.71531 3.09998 12.2153C3.09998 12.5153 3.09995 12.8153 3.19995 13.1153C2.19995 14.3153 1.69998 15.5153 1.59998 16.8153C1.29998 16.8153 0.999927 16.8153 0.799927 17.0153C0.299927 17.3153 0 17.8153 0 18.3153V30.6153C0 32.9153 1.4 35.1153 3.5 36.0153C6.3 37.3153 9.30002 37.2153 12.4 37.0153C14.4 36.9153 16.5 36.9153 18.5 37.0153C19.5 37.1153 20.5 37.1153 21.5 37.1153C23.5 37.1153 25.5 36.9153 27.4 36.0153C29.5 35.0153 30.9 32.9153 30.9 30.6153V18.3153C30.9 17.9153 30.6 17.4153 30.2 17.1153ZM11.4 8.91532C14.2 7.91532 16.9 6.91532 17.4 4.61532C17.5 4.31532 17.5 4.01531 17.4 3.71531C20.9 4.61531 24.9 6.21532 24.9 8.61532C24.9 12.6153 19.2 13.1153 19 13.1153C18.2 13.2153 17.6 13.9153 17.6 14.7153C17.7 15.5153 18.4 16.2153 19.2 16.1153C21.4 15.9153 25.1 14.9153 26.9 12.1153C28.1 14.1153 27.2999 16.7153 26.7999 17.9153C24.4999 18.7153 21.9 18.6153 18.9 18.5153C16.7 18.4153 14.3 18.4153 12.1 18.5153C9.49998 18.6153 7.1 18.7153 5 18.2153C4.7 17.8153 4.3 17.0153 5 15.8153C6.1 16.6153 7.40002 16.9153 8.40002 17.0153C8.50002 17.0153 8.49998 17.0153 8.59998 17.0153C9.39998 17.0153 9.99998 16.4153 10.1 15.7153C10.2 14.9153 9.59993 14.1153 8.79993 14.0153C8.79993 14.0153 6.19995 13.6153 6.19995 12.3153C6.09995 10.9153 9.00002 9.81532 11.4 8.91532ZM26.2 33.4153C24.1 34.4153 21.5999 34.3153 18.7999 34.1153C17.7999 34.0153 16.7 34.0153 15.6 34.0153C14.5 34.0153 13.4 34.1153 12.4 34.1153C9.50002 34.2153 7.00002 34.4153 4.90002 33.4153C3.90002 32.9153 3.19995 31.8153 3.19995 30.7153V20.8153C5.99995 21.8153 9.10002 21.7153 12.4 21.5153C14.5 21.4153 16.8 21.4153 18.9 21.5153C22.1 21.6153 25.2 21.7153 28 20.8153V30.7153C27.9 31.8153 27.2 32.9153 26.2 33.4153Z" />
            </svg>
        );
    }
}

GelIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default GelIcon;
