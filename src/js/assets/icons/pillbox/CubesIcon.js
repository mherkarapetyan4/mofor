import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class CubesIcon extends PureComponent {
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
                <path d="M16.5 21.8502L10.9 18.6502C9.79996 18.0502 8.49996 18.0502 7.39996 18.6502L1.79999 21.8502C1.29999 22.1502 0.899976 22.5502 0.599976 22.9502C0.599976 22.9502 0.599976 22.9502 0.599976 23.0502C0.199976 23.6502 0 24.2502 0 24.9502V31.4502C0 32.7502 0.699988 33.8502 1.79999 34.4502L7.39996 37.6502C7.89996 37.9502 8.59995 38.1502 9.19995 38.1502C9.79995 38.1502 10.4 37.9502 11 37.6502L16.6 34.4502C17.7 33.8502 18.4 32.6502 18.4 31.4502V24.9502C18.3 23.5502 17.6 22.4502 16.5 21.8502ZM15 31.7502L9.39996 34.9502C9.19996 35.0502 8.99996 35.0502 8.89996 34.9502L3.29999 31.7502C3.09999 31.6502 3 31.4502 3 31.2502V25.9502L6.09998 27.3502C6.29998 27.4502 6.49995 27.4502 6.69995 27.4502C7.29995 27.4502 7.79998 27.1502 8.09998 26.5502C8.39998 25.7502 8.09996 24.9502 7.39996 24.5502L4.79999 23.3502L8.89996 21.0502C8.99996 21.0502 9.09995 20.9502 9.19995 20.9502C9.29995 20.9502 9.4 20.9502 9.5 21.0502L13.4 23.3502L10.7 24.5502C9.89995 24.8502 9.6 25.7502 10 26.5502C10.3 27.1502 10.8 27.4502 11.4 27.4502C11.6 27.4502 11.8 27.4502 12 27.3502L15.4 25.8502V31.2502C15.3 31.4502 15.2 31.6502 15 31.7502Z" />
                <path d="M37.4 21.8502L31.8 18.6502C30.7 18.0502 29.4 18.0502 28.3 18.6502L22.7 21.8502C21.6 22.4502 20.9 23.6502 20.9 24.8502V31.3502C20.9 32.6502 21.6 33.7502 22.7 34.3502L28.3 37.5502C28.8 37.8502 29.5 38.0502 30.1 38.0502C30.7 38.0502 31.3 37.8502 31.9 37.5502L37.5 34.3502C38.6 33.7502 39.3 32.5502 39.3 31.3502V24.8502C39.1 23.5502 38.4 22.4502 37.4 21.8502ZM35.9 31.7502L30.3 34.9502C30.1 35.0502 29.9 35.0502 29.8 34.9502L24.2 31.7502C24 31.6502 23.9 31.4502 23.9 31.2502V25.9502L27.1 27.4502C27.3 27.5502 27.5 27.5502 27.7 27.5502C28.3 27.5502 28.8 27.2502 29.1 26.6502C29.4 25.8502 29.1 25.0502 28.4 24.6502L25.8 23.4502L29.8 21.1502C29.9 21.1502 30 21.0502 30.1 21.0502C30.2 21.0502 30.3 21.0502 30.4 21.1502L34.4 23.4502L31.7 24.6502C30.9 24.9502 30.6 25.8502 31 26.6502C31.3 27.2502 31.8 27.5502 32.4 27.5502C32.6 27.5502 32.8 27.5502 33 27.4502L36.3 25.9502V31.3502C36.1 31.4502 36 31.6502 35.9 31.7502Z" />
                <path d="M27 16.15C28.1 15.55 28.8 14.35 28.8 13.15V6.65C28.8 5.35 28.1 4.25 27 3.65L21.4 0.45C20.3 -0.15 19 -0.15 17.9 0.45L12.3 3.65C11.2 4.25 10.5 5.45 10.5 6.65V13.15C10.5 14.45 11.2 15.55 12.3 16.15L17.9 19.35C18.4 19.65 19.1 19.85 19.7 19.85C20.3 19.85 20.9 19.65 21.5 19.35L27 16.15ZM19.4 16.75L13.8 13.55C13.6 13.45 13.5 13.25 13.5 13.05V7.75L16.7 9.25C16.9 9.35 17.1 9.34999 17.3 9.34999C17.9 9.34999 18.4 9.05 18.7 8.45C19 7.65 18.7 6.85 18 6.45L15.3 5.25L19.4 2.84999C19.5 2.84999 19.6 2.75 19.7 2.75C19.8 2.75 19.9 2.74999 20 2.84999L24.1 5.25L21.4 6.45C20.6 6.75 20.3 7.65 20.7 8.45C21 9.05 21.5 9.34999 22.1 9.34999C22.3 9.34999 22.5 9.35 22.7 9.25L25.9 7.75V13.05C25.9 13.25 25.8 13.45 25.6 13.55L20 16.75C19.8 16.85 19.6 16.85 19.4 16.75Z" />
            </svg>
        );
    }
}

CubesIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default CubesIcon;