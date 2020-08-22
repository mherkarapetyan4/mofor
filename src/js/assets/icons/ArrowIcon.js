import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class ArrowIcon extends PureComponent {
    render() {
        const { color, opacity, rotate } = this.props;

        return (
            <svg
                width={"24"}
                height={"24"}
                style={{
                    transform: `rotate(${rotate}deg)`,
                    transformOrigin: "50% 50%",
                }}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 16 16"
                fill={color}
                fillOpacity={opacity}
            >
                <polygon points="9.8,13.2 4.6,8 9.8,2.8 11.2,4.2 7.4,8 11.2,11.8 " />
            </svg>
        );
    }
}

ArrowIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
    rotate: PropTypes.number,
};

ArrowIcon.defaultProps = {
    rotate: 0,
};

export default ArrowIcon;
