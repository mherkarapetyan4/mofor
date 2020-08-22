/*
* MMMMMMMMMMMMMMNKkoc::;;;;:ldkKWMMMMMMMMM
MMMMMMMMMMMNOl,.  .'',,,,..  .,oONMMMMMM
MMMMMMMMMNx,  .:dOKNWWWWWNKOd:. .;kNMMMM
MMMMMMMW0;  ,xXMMMMMMMMMMMMMMWKd'  :0MMM
MMMMMMWk. .dNMMMMMMMMMMMMMMMMMMMXl. 'OWM
MMMMMMk. .kWMMMMMMMMMMMMMMMMMMMMMWx. '0M
MMMMMX: .dWMMMMMMMMMMMMMMMMMMMMMMMWo  cN
MMMMMk. ,KMMMMMMMMMMMMMMMMMMMMMMMMM0' '0
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMK; .k
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMX; .k
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMX; .k
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMX; .k
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMX; .k
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMX; .k
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMX; .k
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMX; .k
MMMMMx. :NMMMMMMMMMMMMMMMMMMMMMMMMMK; .k
MMMMMx. .,;;;;;;;;;;;;;;;;;;;;;;;;;,. .k
MMMMMx.                               .k
MMMMMx.                               .k
MMMMMx.                               .k
MMMMMx.                               .k
MMMMMx.                               .k
MMMMMx.                               .k
MMMMMx.                               .k
MMMMMx.                               .k
MMMMMx.                               .O
MMMMM0'                               ,K
MMMMMWl                               oW
MMMMMMX:                             cXM
MMMMMMMK:                          .lXMM
MMMMMMMMNx'                       ,kWMMM
MMMMMMMMMMXx;.                 .;xNMMMMM
MMMMMMMMMMMMW0d:'.         .,cdKWMMMMMMM
MMMMMMMMMMMMMMMMNK0kkxxxxk0XWMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class PillIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M5.02201 21.728C2.70023 19.4062 2.71212 15.5881 5.04842 13.2518L14.0489 4.25129C16.3852 1.915 20.2033 1.9031 22.5251 4.22488C24.8469 6.54666 24.835 10.3648 22.4987 12.7011L13.4982 21.7015C11.1619 24.0378 7.34379 24.0497 5.02201 21.728ZM21.7591 4.99088C19.856 3.08778 16.7251 3.09754 14.8101 5.01253L5.80966 14.013C3.89466 15.928 3.88491 19.0589 5.78801 20.962C7.69111 22.8651 10.8219 22.8553 12.7369 20.9403L21.7374 11.9398C23.6524 10.0248 23.6622 6.89398 21.7591 4.99088Z" />
                <path d="M17.637 16.8016L9.94844 9.11304L5.12265 13.9388L4.00671 16.7295L4.3407 19.8211L5.97618 21.8396L8.72212 22.8237L11.3198 22.3574L13.2708 21.1678L17.637 16.8016Z" />
            </svg>
        );
    }
}

PillIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};
export default PillIcon;
