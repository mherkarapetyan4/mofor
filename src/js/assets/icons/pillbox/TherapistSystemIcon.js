import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class TherapistSystemIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="40"
                height="39"
                viewBox="0 0 40 39"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M34.7 0H4.5C2 0 0 2 0 4.5V26.8C0 29 1.50001 30.8 3.60001 31.2V33.9C3.60001 36.4 5.60001 38.5 8.10001 38.5H30.9C33.4 38.5 35.4 36.5 35.4 33.9V31.2C37.4 30.8 39 29 39 26.8V4.5C39.2 2 37.2 0 34.7 0ZM32.6 33.8C32.6 34.7 31.9 35.4 31.1 35.4H8.30002C7.40002 35.4 6.80002 34.7 6.80002 33.8V31.2H15.1L15 29.6C15 29.5 15 29.4 15 29.2C15 26.6 17.1 24.4 19.8 24.4C22.4 24.4 24.6 26.5 24.6 29.2C24.6 29.3 24.6 29.4 24.6 29.6L24.5 31.2H32.8V33.8H32.6ZM36.2 26.7C36.2 27.5 35.5 28.2 34.7 28.2H27.3C26.8 24.4 23.5 21.4 19.6 21.4C15.7 21.4 12.4 24.3 11.9 28.2H4.5C3.7 28.2 3 27.5 3 26.7V4.39999C3 3.59999 3.6 2.89999 4.5 2.89999H34.7C35.5 2.89999 36.2 3.59999 36.2 4.39999V26.7Z" />
                <path d="M19.6 26.2002C17.9 26.2002 16.6 27.6002 16.6 29.2002C16.6 29.3002 16.6 29.5002 16.6 29.7002C16.8 31.1002 18.1 32.2002 19.6 32.2002C21.1 32.2002 22.3 31.1002 22.5 29.7002C22.6 29.5002 22.6 29.3002 22.6 29.2002C22.6 27.6002 21.3 26.2002 19.6 26.2002Z" />
            </svg>
        );
    }
}

TherapistSystemIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default TherapistSystemIcon;
