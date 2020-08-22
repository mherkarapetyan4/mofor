import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class SurgeonIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="24"
                height="23"
                viewBox="0 0 24 23"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M23.3614 3.82423L10.4302 17.0998L9.68515 16.3349L7.98226 18.0831L8.72727 18.848L6.49224 21.1425L5.21508 22.3444C4.5765 22.7268 3.8847 23 3.08647 23C1.86253 23 0.745011 22.4537 0 21.5249L20.2749 0.655582C21.1264 -0.218527 22.51 -0.218527 23.3614 0.655582C24.2129 1.52969 24.2129 2.95012 23.3614 3.82423ZM4.31042 21.0333L5.42794 19.9952L6.54545 18.848L5.6408 17.9192L9.57871 13.8765L10.4302 14.7506L22.2439 2.62233C22.4568 2.4038 22.4568 2.02138 22.2439 1.80285C22.0843 1.63895 21.9246 1.63895 21.8182 1.63895C21.7118 1.63895 21.5521 1.63895 21.3925 1.80285L2.50111 21.2518C2.71397 21.3064 2.92683 21.3064 3.13969 21.3064C3.5122 21.361 3.93792 21.2518 4.31042 21.0333Z" />
            </svg>
        );
    }
}

SurgeonIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default SurgeonIcon;
