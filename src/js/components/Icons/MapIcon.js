/*
*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class MapIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M5.27221 17C5.15759 17 5.04298 16.9448 4.92837 16.8896L0.229226 13.4123C0.0573066 13.3019 0 13.1364 0 12.9708V0.551948C0 0.331169 0.114613 0.165584 0.34384 0.0551949C0.573066 -0.0551947 0.744986 6.70552e-08 0.916905 0.11039L5.32951 3.36688L14.3266 6.33299e-08C14.4986 -0.0551947 14.7278 -0.0551947 14.8997 0.0551949L19.7708 3.53247C19.9427 3.64286 20 3.80844 20 3.97403V16.3929C20 16.6136 19.8854 16.7792 19.7135 16.8896C19.5415 17 19.3123 16.9448 19.1404 16.8344L14.4986 13.5779L5.44413 16.9448C5.38682 17 5.32951 17 5.27221 17ZM1.14613 12.6948L5.32951 15.7857L14.3266 12.4188C14.4986 12.3636 14.7278 12.3636 14.8997 12.474L18.8539 15.289V4.25L14.4413 1.15909L5.44413 4.52597C5.27221 4.58117 5.04298 4.58117 4.87106 4.41558L1.14613 1.65584V12.6948Z" />
                <path d="M15.1289 0.551941H13.9828V12.9708H15.1289V0.551941Z" />
                <path d="M5.84527 4.02924H4.69914V16.4481H5.84527V4.02924Z" />
            </svg>
        );
    }
}

MapIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};
export default MapIcon;
