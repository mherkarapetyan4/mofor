import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class SlimArrowIcon extends PureComponent {
    static propTypes = {
        color: PropTypes.string,
        opacity: PropTypes.number,
        rotate: PropTypes.number,
    };

    static defaultProps = {
        rotate: 0,
    };

    render() {
        const { opacity, color, rotate } = this.props;

        return (
            <svg
                style={{
                    transformOrigin: "50% 50%",
                    transform: `rotate(${rotate}deg)`,
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    fill={color}
                    fillOpacity={opacity}
                    d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                />
                <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
        );
    }
}

export default SlimArrowIcon;
