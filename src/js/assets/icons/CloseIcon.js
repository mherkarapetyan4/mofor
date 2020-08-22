import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class CloseIcon extends PureComponent {
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
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
            </svg>
        );
    }
}

CloseIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default CloseIcon;
