/*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class PillAngleIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg viewBox="0 0 18 21" fill={color} fillOpacity={opacity}>
                <path d="M5.59047 21C4.42323 21 3.31743 20.6228 2.33449 19.9312C1.10583 19.0509 0.307191 17.7306 0.122891 16.2216C-0.122843 14.7126 0.245757 13.2036 1.10583 11.9461L7.8635 2.32637C9.70651 -0.251469 13.2082 -0.754463 15.6656 1.06889C18.1843 2.95512 18.6758 6.53895 16.8942 9.05392L10.0751 18.6108C9.03074 20.1827 7.3106 21 5.59047 21ZM3.01026 18.8623C4.97613 20.3084 7.6792 19.8683 9.09217 17.8563L15.9113 8.29943C17.3243 6.28745 16.8942 3.52099 14.9284 2.07488C12.9625 0.62877 10.2594 1.06889 8.84644 3.08087L2.08876 12.6378C1.41299 13.5809 1.10583 14.7755 1.29013 15.9701C1.47443 17.1647 2.08876 18.1707 3.01026 18.8623Z" />
                <path d="M5.32336 7.00742L4.59967 8.02359L12.6421 14.0229L13.3657 13.0068L5.32336 7.00742Z" />
            </svg>
        );
    }
}

PillAngleIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default PillAngleIcon;
