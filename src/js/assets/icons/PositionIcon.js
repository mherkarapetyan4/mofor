import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class PositionIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="39.6px"
                height="44.4px"
                viewBox="0 0 39.6 44.4"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M26.4,12.4c0,3.6-2.9,6.6-6.6,6.6s-6.6-2.9-6.6-6.6s2.9-6.6,6.6-6.6S26.4,8.8,26.4,12.4z M23.4,12.4c0-2-1.6-3.6-3.6-3.6
                c-2,0-3.6,1.6-3.6,3.6c0,2,1.6,3.6,3.6,3.6C21.8,16,23.4,14.4,23.4,12.4z"
                />
                <path
                    d="M39.4,41.7L33.7,29c-0.3-0.7-1-1.1-1.7-1.1h-2.2c-0.6,1.1-1.3,2.1-2,3h3.4L36,41.4H3.6l4.7-10.5h3.4c-0.7-0.9-1.3-1.9-2-3
                    H7.6c-0.7,0-1.4,0.4-1.7,1.1L0.2,41.7c-0.6,1.2,0.4,2.7,1.7,2.7h35.8C39.1,44.4,40,43,39.4,41.7z"
                />
                <path
                    d="M32.1,11.6c0.4,9.2-7.5,19.2-10.8,23c-0.8,0.9-2.1,0.9-2.9,0C15.1,30.9,7.5,21.2,7.5,12.3c0-6.6,5.3-12,11.8-12.3
                C26-0.2,31.8,5,32.1,11.6z M29.1,11.7C28.8,6.9,24.7,3,19.8,3c-0.1,0-0.2,0-0.3,0c-5,0.2-8.9,4.3-8.9,9.3c0,7.4,6.3,15.8,9.3,19.3
                C22.9,28,29.4,19.2,29.1,11.7z"
                />
            </svg>
        );
    }
}

PositionIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default PositionIcon;
