import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";
@icon
class DeleteIcon extends PureComponent {
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
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
            </svg>
        );
    }
}

DeleteIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default DeleteIcon;
