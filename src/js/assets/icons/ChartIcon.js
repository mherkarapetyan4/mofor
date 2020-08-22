import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class ChartIcon extends PureComponent {
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
                <path d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92001L20.59 5.51001L13.5 13.48L9.5 9.48001L2 16.99L3.5 18.49Z" />
            </svg>
        );
    }
}

ChartIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default ChartIcon;
