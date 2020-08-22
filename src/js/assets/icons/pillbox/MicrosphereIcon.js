import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class MicrosphereIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="38"
                height="40"
                viewBox="0 0 38 40"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M26.4 18.8001C26.4 14.5001 22.9 11.1001 18.7 11.1001C14.4 11.1001 11 14.6001 11 18.8001C11 23.0001 14.5 26.5001 18.7 26.5001C23 26.5001 26.4 23.1001 26.4 18.8001ZM18.7 23.5001C16.1 23.5001 14 21.4001 14 18.8001C14 16.2001 16.1 14.1001 18.7 14.1001C21.3 14.1001 23.4 16.2001 23.4 18.8001C23.4 21.4001 21.3 23.5001 18.7 23.5001Z" />
                <path d="M37.4 18.8C37.4 8.5 29 0.0999908 18.7 0.0999908C16.1 0.0999908 13.5 0.699997 11.1 1.7C9.99998 0.599997 8.50002 0 6.90002 0C3.50002 0 0.799988 2.69999 0.799988 6.09999C0.799988 7.49999 1.30001 8.9 2.20001 10C0.800012 12.7 0 15.7 0 18.8C0 29.1 8.40001 37.5 18.7 37.5C20.3 37.5 21.9 37.3 23.5 36.9C24.6 38.4 26.4 39.3 28.3 39.3C31.7 39.3 34.4 36.6 34.4 33.2C34.4 32.1 34.1 31.1 33.6 30.2C36 26.9 37.4 22.9 37.4 18.8ZM6.90002 3.09999C7.90002 3.09999 8.9 3.6 9.5 4.5C9.8 5 10 5.6 10 6.2C10 7.9 8.60002 9.3 6.90002 9.3C6.20002 9.3 5.6 9.1 5 8.7C4.2 8.1 3.79999 7.2 3.79999 6.3C3.79999 4.4 5.20002 3.09999 6.90002 3.09999ZM18.7 34.5C10 34.5 3 27.5 3 18.8C3 16.4 3.60001 13.9 4.70001 11.8H4.79999C4.99999 11.9 5.3 11.9 5.5 12C5.6 12 5.69999 12.1 5.79999 12.1C6.19999 12.2 6.50002 12.2 6.90002 12.2C10.3 12.2 13 9.49999 13 6.09999C13 5.79999 13 5.5 12.9 5.2C12.9 5.1 12.9 4.99999 12.8 4.89999C12.8 4.69999 12.7 4.5 12.7 4.3C14.6 3.5 16.7 3.09999 18.7 3.09999C27.4 3.09999 34.4 10.1 34.4 18.8C34.4 22.1 33.4 25.3 31.4 28C31.4 28 31.4 28 31.3 28C31.1 27.9 30.9 27.8 30.6 27.7H30.5C30.3 27.6 30.1 27.5 29.9 27.5C29.8 27.5 29.8 27.5 29.7 27.4C29.5 27.4 29.3 27.3 29.2 27.3C29.1 27.3 29.1 27.3 29 27.3C28.8 27.3 28.5 27.2 28.2 27.2C24.8 27.2 22.1 29.9 22.1 33.3C22.1 33.6 22.1 33.9 22.2 34.1V34.2C21.1 34.4 19.9 34.5 18.7 34.5ZM28.3 36.3C27.1 36.3 26 35.6 25.5 34.5C25.3 34.1 25.2 33.7 25.2 33.2C25.2 31.5 26.6 30.1 28.3 30.1C29.2 30.1 30 30.5 30.6 31.1C31.1 31.7 31.4 32.4 31.4 33.2C31.4 34.9 30 36.3 28.3 36.3Z" />
            </svg>
        );
    }
}

MicrosphereIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default MicrosphereIcon;
