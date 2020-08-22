import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class LiquidIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="30"
                height="39"
                viewBox="0 0 30 39"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M23 8V1.5C23 0.7 22.3 0 21.5 0H8.09998C7.29998 0 6.59998 0.7 6.59998 1.5V8C2.79998 9.3 0 12.9 0 17.1V33.9C0 36.3 2.00002 38.3 4.40002 38.3H25C27.4 38.3 29.4 36.3 29.4 33.9V17.1C29.5 12.9 26.8 9.3 23 8ZM9.59998 2.90001H20V7.40001C19.9 7.40001 19.8999 7.40001 19.7999 7.40001H9.59998C9.59998 7.40001 9.6 7.40001 9.5 7.40001V2.90001H9.59998ZM26.5 33.8C26.5 34.6 25.9 35.2 25.1 35.2H4.5C3.7 35.2 3.09998 34.6 3.09998 33.8V17C3.09998 13.3 6.09995 10.4 9.69995 10.4H19.9C23.6 10.4 26.5 13.4 26.5 17V33.8Z" />
                <path d="M20.7 21.3H16.1V16.7C16.1 15.9 15.4 15.2 14.6 15.2C13.8 15.2 13.1 15.9 13.1 16.7V21.3H8.5C7.7 21.3 7 22 7 22.8C7 23.6 7.7 24.3 8.5 24.3H13.1V28.9C13.1 29.7 13.8 30.4 14.6 30.4C15.4 30.4 16.1 29.7 16.1 28.9V24.3H20.7C21.5 24.3 22.2 23.6 22.2 22.8C22.2 22 21.5 21.3 20.7 21.3Z" />
            </svg>
        );
    }
}

LiquidIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default LiquidIcon;
