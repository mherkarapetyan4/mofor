import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class SMORequestIcon extends PureComponent {
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
                <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM13 11H11V5H13V11ZM13 15H11V13H13V15Z" />
            </svg>
        );
    }
}

SMORequestIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default SMORequestIcon;
