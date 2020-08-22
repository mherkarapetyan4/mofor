import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class LongArrowIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="44"
                height="8"
                viewBox="0 0 44 8"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M43.3536 4.35356C43.5488 4.1583 43.5488 3.84171 43.3536 3.64645L40.1716 0.46447C39.9763 0.269207 39.6597 0.269207 39.4645 0.46447C39.2692 0.659732 39.2692 0.976314 39.4645 1.17158L42.2929 4L39.4645 6.82843C39.2692 7.02369 39.2692 7.34028 39.4645 7.53554C39.6597 7.7308 39.9763 7.7308 40.1716 7.53554L43.3536 4.35356ZM-4.37114e-08 4.5L43 4.5L43 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" />
            </svg>
        );
    }
}

LongArrowIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default LongArrowIcon;
