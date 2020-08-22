/*
*
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMMMMMMM
MMMMMMMMMKc:xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXo;lKMMMMMM
MMMMMMMMWO;  ,xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXo. .cKMMMMMM
MMMMMMMMMMNk;  ,xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKo. .:OWMMMMMMM
MMMMMMMMMMMMNk;  ,xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKo. .c0WMMMMMMMMM
MMMMMMMMMMMMMMNk;  ,xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKo. .c0WMMMMMMMMMMM
MMMMMMMMMMMMMMMMNk;  ,xNMMMMMMMMMMMMMMMMMMMMMMMMMKo. .c0WMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMNk;. 'dXMMMMMMMMMMMMMMMMMMMMWKo. .c0WMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMNk;  'dXMMMMMMMMMMMMMMMMWKl. .c0WMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMNk;. 'dXMMMMMMMMMMMMWKl. .c0WMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMNO;. 'dXMMMMMMMMWKl. .c0WMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMWO;. 'dXMMMMWKl. .c0WMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMWO;. 'd0K0l. .c0WMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO:. ... .l0WMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0,     :XMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0l. .,:;. 'dXMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMW0l. .lKWWWO:. 'dXMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMW0c. .lKWMMMMMWO:. .dXMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMW0c. .lKWMMMMMMMMMWO:. .oXMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMW0c. .lKWMMMMMMMMMMMMMWO:. .oXMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMW0c. .lKWMMMMMMMMMMMMMMMMMWO:. .oXMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMW0c. .lKWMMMMMMMMMMMMMMMMMMMMMWO:. .oKMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMW0c. .oKMMMMMMMMMMMMMMMMMMMMMMMMMMW0:. .oKMMMMMMMMMMMMM
MMMMMMMMMMMMMW0c. .oKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0c. .oKMMMMMMMMMMM
MMMMMMMMMMMW0c. .oKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0c. .oKMMMMMMMMM
MMMMMMMMMW0c. .oKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0c. .lKMMMMMMM
MMMMMMMMMO. .oKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0c. ;KMMMMMM
MMMMMMMMMNOxKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0d0WMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class WidgetPlusIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                onClick={this.props.onClick}
                fill={color}
                fillOpacity={opacity}
            >
                <polygon points="25.5,0.5 25.5,25.5 49.5,25.5 25.5,25.5 25.5,49.5 	" />
                <polygon points="26,0 25,0 25,25 0,25 0,26 25,26 25,50 26,50 26,26 50,26 50,25 26,25 26,0 	" />
            </svg>
        );
    }
}

WidgetPlusIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
    onClick: PropTypes.func,
};

export default WidgetPlusIcon;