/*
*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class GlobeIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M11 22C4.92925 22 0 17.0708 0 11C0 4.92925 4.92925 0 11 0C17.0708 0 22 4.92925 22 11C22 17.0708 17.0708 22 11 22ZM11 1.03774C5.5 1.03774 1.03774 5.5 1.03774 11C1.03774 16.5 5.5 20.9623 11 20.9623C16.5 20.9623 20.9623 16.5 20.9623 11C20.9623 5.5 16.5 1.03774 11 1.03774Z" />
                <path d="M11.5189 0.518875H10.4811V21.4811H11.5189V0.518875Z" />
                <path d="M21.4811 10.4811H0.518867V11.5189H21.4811V10.4811Z" />
                <path d="M11 16.2406C4.82547 16.2406 0 13.9575 0 11C0 8.04245 4.82547 5.75943 11 5.75943C17.1745 5.75943 22 8.04245 22 11C22 13.9575 17.1745 16.2406 11 16.2406ZM11 6.79717C5.03302 6.79717 1.03774 8.97641 1.03774 11C1.03774 13.0236 5.03302 15.2028 11 15.2028C16.967 15.2028 20.9623 13.0236 20.9623 11C20.9623 8.97641 16.967 6.79717 11 6.79717Z" />
                <path d="M11 22C7.41981 22 4.61793 17.1745 4.61793 11C4.61793 4.82547 7.41981 0 11 0C14.5802 0 17.3821 4.82547 17.3821 11C17.3821 17.1745 14.5802 22 11 22ZM11 1.03774C8.09434 1.03774 5.65566 5.60377 5.65566 11C5.65566 16.3962 8.09434 20.9623 11 20.9623C13.9057 20.9623 16.3443 16.3962 16.3443 11C16.3443 5.60377 13.9057 1.03774 11 1.03774Z" />
            </svg>
        );
    }
}

GlobeIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};
export default GlobeIcon;