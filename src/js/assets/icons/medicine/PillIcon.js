import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class PillIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="35"
                height="34"
                viewBox="0 0 35 34"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M31.9 18.2C36 14 36 7.3 31.9 3.1C29.8 1 27 0 24.3 0C21.6 0 18.8 1 16.8 3.1L4.10001 15.8C-0.0999877 20 -0.0999877 26.7 4.10001 30.9C6.20001 33 8.90001 34 11.6 34C14.3 34 17.1 33 19.1 30.9L23.7 26.3L26.3 23.7L31.9 18.2ZM13.4 10.7L18.9 5.2C20.3 3.8 22.3 3 24.3 3C26.3 3 28.3 3.8 29.7 5.2C32.7 8.2 32.7 13.1 29.7 16L24.2 21.5L13.4 10.7Z" />
            </svg>
        );
    }
}

PillIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default PillIcon;
