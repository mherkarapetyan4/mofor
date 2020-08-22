import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class FilterIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg>
        );
    }
}

FilterIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default FilterIcon;
