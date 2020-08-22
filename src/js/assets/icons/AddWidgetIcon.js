import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class AddWidgetIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect y="15" width="33" height="3" rx="1.5" />
                <rect
                    x="15"
                    y="33"
                    width="33"
                    height="3"
                    rx="1.5"
                    transform="rotate(-90 15 33)"
                />
            </svg>
        );
    }
}

AddWidgetIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default AddWidgetIcon;
