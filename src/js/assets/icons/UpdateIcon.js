import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class UpdateIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M21 10.12H14.22L16.96 7.3C14.23 4.6 9.81 4.5 7.08 7.2C4.35 9.91 4.35 14.28 7.08 16.99C9.81 19.7 14.23 19.7 16.96 16.99C18.32 15.65 19 14.08 19 12.1H21C21 14.08 20.12 16.65 18.36 18.39C14.85 21.87 9.15 21.87 5.64 18.39C2.14 14.92 2.11 9.28 5.62 5.81C9.13 2.34 14.76 2.34 18.27 5.81L21 3V10.12ZM12.5 8V12.25L16 14.33L15.28 15.54L11 13V8H12.5Z" />
            </svg>
        );
    }
}

UpdateIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default UpdateIcon;
