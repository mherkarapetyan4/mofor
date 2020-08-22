import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class SuppositoryIcon extends PureComponent {
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
                <path d="M11.75 32.5496C10.25 32.5496 8.75 31.9496 7.75 30.8496C6.65 29.7496 6.04999 28.3496 6.04999 26.8496C6.04999 25.3496 6.65 23.8496 7.75 22.8496L19.55 11.0496C20.65 9.94961 22.05 9.34961 23.55 9.34961C25.05 9.34961 26.55 9.94961 27.55 11.0496C29.75 13.2496 29.75 16.8496 27.55 19.1496L15.75 30.8496C14.75 31.9496 13.25 32.5496 11.75 32.5496ZM23.55 12.3496C22.85 12.3496 22.15 12.6496 21.65 13.1496L9.85001 24.9496C9.35001 25.4496 9.04999 26.1496 9.04999 26.8496C9.04999 27.5496 9.35001 28.2496 9.85001 28.7496C10.85 29.7496 12.65 29.7496 13.65 28.7496L25.45 16.9496C26.55 15.8496 26.55 14.1496 25.45 13.1496C24.95 12.6496 24.25 12.3496 23.55 12.3496Z" />
                <path d="M11.75 38.55C8.64999 38.55 5.65 37.35 3.45 35.15C-1.15 30.55 -1.15 23.15 3.45 18.55L15.25 6.74999C18.25 3.74999 22.65 2.64999 26.65 3.74999L28.75 1.65C31.05 -0.55 34.65 -0.55 36.95 1.65C38.05 2.75 38.65 4.24999 38.65 5.74999C38.65 7.34999 38.05 8.75 36.95 9.85L34.85 11.95C35.15 12.95 35.25 13.95 35.25 15.05C35.25 18.15 34.05 21.15 31.85 23.35L20.05 35.15C17.85 37.35 14.85 38.55 11.75 38.55ZM23.55 6.35C21.25 6.35 19.05 7.25 17.35 8.85L5.54998 20.65C2.14998 24.05 2.14998 29.55 5.54998 32.95C7.14998 34.55 9.34999 35.55 11.75 35.55C14.05 35.55 16.25 34.65 17.85 32.95L29.65 21.15C31.25 19.55 32.25 17.35 32.25 14.95C32.25 13.95 32.05 12.95 31.75 11.95L31.45 11.05L34.85 7.65C35.35 7.15 35.65 6.45 35.65 5.65C35.65 4.85 35.35 4.15 34.85 3.65C33.75 2.55 31.95 2.55 30.85 3.65L27.45 7.04999L26.55 6.74999C25.55 6.54999 24.55 6.35 23.55 6.35Z" />
            </svg>
        );
    }
}

SuppositoryIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default SuppositoryIcon;
