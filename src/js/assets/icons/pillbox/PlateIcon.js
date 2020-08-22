import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class PlateIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="38"
                height="39"
                viewBox="0 0 38 39"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M29.2 38.8H8.70001C3.90001 38.8 0 34.9 0 30.1V8.7C0 3.9 3.90001 0 8.70001 0H29.2C34 0 37.9 3.9 37.9 8.7V30.1C37.8 34.9 33.9 38.8 29.2 38.8ZM8.70001 3.09999C5.60001 3.09999 3 5.6 3 8.8V30.2C3 33.3 5.50001 35.9 8.70001 35.9H29.2C32.3 35.9 34.9 33.4 34.9 30.2V8.7C34.9 5.6 32.4 3 29.2 3H8.70001V3.09999Z" />
                <path d="M31.8 13.3001H28.8V9.1001H23.9V6.1001H29.3C30.7 6.1001 31.8 7.2001 31.8 8.6001V13.3001Z" />
            </svg>
        );
    }
}

PlateIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default PlateIcon;
