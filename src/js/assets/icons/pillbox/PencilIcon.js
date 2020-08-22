import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class PencilIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M37.6362 10.25L27.8361 0.45C27.2361 -0.15 26.3361 -0.15 25.7361 0.45L3.13616 23.05C3.03616 23.15 2.93609 23.25 2.93609 23.35V23.45C2.93609 23.45 2.93611 23.55 2.83611 23.55C2.83611 23.65 2.83611 23.65 2.83611 23.75C2.83611 23.75 2.83611 23.75 2.83611 23.85L0.0360645 36.45C-0.0639355 36.95 0.0360889 37.45 0.436089 37.85C0.736089 38.15 1.13606 38.25 1.53606 38.25C1.63606 38.25 1.73611 38.25 1.83611 38.25L14.4361 35.45H14.5361H14.6362C14.6362 35.45 14.7361 35.45 14.7361 35.35H14.8361C14.9361 35.25 15.0362 35.25 15.1362 35.15L37.7361 12.55C38.2361 11.75 38.2362 10.85 37.6362 10.25ZM26.8361 3.65L29.6362 6.45L10.9361 25.15L6.93609 23.65L26.8361 3.65ZM5.23614 26.15L10.0361 28.05L11.8361 32.85L3.23614 34.75L5.23614 26.15ZM14.5361 31.25L13.0361 27.25L31.7361 8.55001L34.5361 11.35L14.5361 31.25Z" />
            </svg>
        );
    }
}

PencilIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default PencilIcon;
