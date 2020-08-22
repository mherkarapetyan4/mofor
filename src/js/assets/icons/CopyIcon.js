import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class CopyIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" />
            </svg>
        );
    }
}

CopyIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default CopyIcon;
