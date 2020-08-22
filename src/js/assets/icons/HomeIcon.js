import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class HomeIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="38px"
                height="42.1px"
                viewBox="0 0 38 42.1"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M19,0L0,19v3.5h3.5v19.6h31.9V22.5H38V19L19,0z M32.4,19.5v19.6H6.5V19.5v-2.8L19,4.2l13.4,13.4L32.4,19.5z" />
                <path
                    d="M23.3,24.1l0,7.7l-7.7,0l0-7.7H23.3 M23.3,21.1h-7.7c-1.6,0-3,1.3-3,3v7.7c0,1.6,1.3,3,3,3h7.7c1.6,0,3-1.3,3-3V24
                C26.3,22.4,25,21.1,23.3,21.1L23.3,21.1z"
                />
            </svg>
        );
    }
}

HomeIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default HomeIcon;
