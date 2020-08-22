import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class SmallCheckIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg width="11" height="9" viewBox="0 0 11 9">
                <path
                    d="M1 4L4 7L10 1"
                    stroke={color}
                    strokeOpacity={opacity}
                    strokeWidth="2"
                />
            </svg>
        );
    }
}

SmallCheckIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default SmallCheckIcon;
