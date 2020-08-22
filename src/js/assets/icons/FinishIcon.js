import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class FinishIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
            </svg>
        );
    }
}

FinishIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default FinishIcon;
