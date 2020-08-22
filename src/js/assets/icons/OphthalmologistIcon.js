import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class OphthalmologistIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="24"
                height="15"
                viewBox="0 0 24 15"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 0C6.74336 0 2.17699 3.04271 0 7.52669C2.17699 11.9573 6.74336 15.0534 12 15.0534C17.2566 15.0534 21.823 12.0107 24 7.52669C21.823 3.04271 17.2566 0 12 0ZM12 13.3986C7.75221 13.3986 3.9292 11.1566 1.80531 7.47331C3.9292 3.84342 7.75221 1.60142 12 1.60142C16.2478 1.60142 20.0708 3.84342 22.1947 7.52669C20.0708 11.1566 16.2478 13.3986 12 13.3986Z" />
                <path d="M17.8406 5.97865C17.8406 9.28826 15.1857 11.9573 11.8937 11.9573C8.60164 11.9573 5.94678 9.28826 5.94678 5.97865C5.94678 2.66904 8.60164 0 11.8937 0C15.1857 0 17.8406 2.66904 17.8406 5.97865ZM16.2477 5.97865C16.2477 3.57651 14.2831 1.60142 11.8937 1.60142C9.5043 1.60142 7.5397 3.57651 7.5397 5.97865C7.5397 8.38078 9.5043 10.3559 11.8937 10.3559C14.2831 10.3559 16.2477 8.38078 16.2477 5.97865Z" />
            </svg>
        );
    }
}

OphthalmologistIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default OphthalmologistIcon;
