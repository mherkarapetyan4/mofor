import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class ShampooIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="30"
                height="40"
                viewBox="0 0 30 40"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M28.6 3L24 0.200012C23.8 0.100012 23.5 0 23.2 0H6.69995C5.89995 0 5.19995 0.7 5.19995 1.5C5.19995 2.3 5.89995 3 6.69995 3H11.4V5.60001H9.39996C8.59996 5.60001 7.89996 6.30001 7.89996 7.10001V12.1C3.49996 12.4 0 16.1 0 20.6V35.1C0 37.3 1.8 39.1 4 39.1H21.8C24 39.1 25.8 37.3 25.8 35.1V20.6C25.8 16.1 22.3 12.4 18 12.1V7.10001C18 6.30001 17.3 5.60001 16.5 5.60001H14.5V3H22.9L27.1 5.60001C27.3 5.80001 27.6 5.8 27.9 5.8C28.4 5.8 28.9 5.50001 29.2 5.10001C29.5 4.40001 29.3 3.4 28.6 3ZM22.8 29H2.89996V24.3H22.8V29ZM21.8 36.1H4C3.4 36.1 3 35.6 3 35.1V32H22.9V35.1C22.8 35.7 22.4 36.1 21.8 36.1ZM22.8 20.6V21.3H2.89996V20.6C2.89996 17.5 5.39996 15.1 8.39996 15.1H17.2C20.4 15.1 22.8 17.6 22.8 20.6ZM15 12.1H10.9V8.60001H15V12.1Z" />
            </svg>
        );
    }
}

ShampooIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default ShampooIcon;
