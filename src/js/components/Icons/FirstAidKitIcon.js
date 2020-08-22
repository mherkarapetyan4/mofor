/*
* MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMWKdc::::::::::::::::::::::::clkXMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMNd.  ........................   ,OWMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMx. .o0KKKKKKKKKKKKKKKKKKKKKK0O;  ;KMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMN:  lWMMMMMMMMMMMMMMMMMMMMMMMMMO. .xMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMO. .OMMMMMMMMMMMMMMMMMMMMMMMMMMN:  :XMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWl  :NMMMMMMMMMMMMMMMMMMMMMMMMMMMx. .kMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMM0' .xMMMMMMMMMMMMMMMMMMMMMMMMMMMMX;  cNMMMMMMMMMMMMMMM
MMMMWKkxdddddddd:  .cddddddddddddddddddddddddddddo,  .ldddddddxxOXWMMM
MMNx;.                                                           .:OWM
MXc  .cdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxo;. .xW
Mx. .kWMMMMMMMMMMMMMMMMMMMMMMMNK0000000KWMMMMMMMMMMMMMMMMMMMMMMMWl  ,K
Md  ,KMMMMMMMMMMMMMMMMMMMMMMMK:.........oWMMMMMMMMMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMMMMMMMMMMk.  ,cc:.  :NMMMMMMMMMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMMMMMMMMMMk. .OMMWo  :NMMMMMMMMMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMMMMMMMMMMk. .OMMWo  :NMMMMMMMMMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMW0xdddddd:. .OMMWl  .oddddddkXMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMK,          '0MMWd           oWMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMM0'  :xdddddx0WMMMNkxdddddo'  cWMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMM0' .xWWWWWWWWMMMMMWWWWWWWX:  cWMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMM0'  .'''''''lXMMMO:'''''''.  lWMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMXo'''''''.  .OMMWl   .'''''';OMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMMWWNNNNNNx. .OMMWo  ;KNNNNNNWMMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMMMMMMMMMMk. .OMMWo  :XMMMMMMMMMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMMMMMMMMMMk. .o00O:  :NMMMMMMMMMMMMMMMMMMMMMMMx. '0
Md  ,KMMMMMMMMMMMMMMMMMMMMMMMO.         :NMMMMMMMMMMMMMMMMMMMMMMMx. '0
Md  '0MMMMMMMMMMMMMMMMMMMMMMMNxccccccccl0WMMMMMMMMMMMMMMMMMMMMMMMd  '0
MO.  :OXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXx'  :X
MWk'  ..'''''''''''''''''''''''''''''''''''''''''''''''''''''''.   :KM
MMMXxc;'''''''''''''''''''''''''''''''''''''''''''''''''''''''',;lONMM
MMMMMMWNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWMMMMM
* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class FirstAidKitIcon extends PureComponent {
    render() {
        const { color } = this.props;

        return (
            <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill={color}
                    d="M41.1248 42H7.97056C5.78675 42 4 40.2137 4 38.0305V19.9695C4 17.7863 5.78675 16 7.97056 16H41.0255C43.2093 16 44.9961 17.7863 44.9961 19.9695V37.9313C45.0953 40.2137 43.3086 42 41.1248 42ZM7.97056 17.9847C6.87866 17.9847 5.98528 18.8779 5.98528 19.9695V37.9313C5.98528 39.0229 6.87866 39.916 7.97056 39.916H41.0255C42.1174 39.916 43.0108 39.0229 43.0108 37.9313V19.9695C43.0108 18.8779 42.1174 17.9847 41.0255 17.9847H7.97056Z"
                />
                <path
                    fill={color}
                    d="M34.9819 18H14.0181C13.7242 18 13.4303 17.8972 13.2344 17.5888C13.0384 17.3832 12.9405 17.0748 13.0384 16.7664L14.6058 9.57009C14.8997 8.02804 16.1732 7 17.6427 7H31.3573C32.8268 7 34.1003 8.02804 34.3942 9.57009L35.9616 16.7664C36.0595 17.0748 35.9616 17.3832 35.7656 17.5888C35.5697 17.7944 35.2758 18 34.9819 18ZM15.1936 15.9439H33.7084L32.4349 9.98131C32.337 9.46729 31.8472 9.05607 31.3573 9.05607H17.6427C17.0549 9.05607 16.663 9.46729 16.4671 9.98131L15.1936 15.9439Z"
                />
                <path
                    fill={color}
                    d="M26.5517 38H22.4483C21.8621 38 21.4713 37.5862 21.4713 36.9655V32.2069H16.977C16.3908 32.2069 16 31.7931 16 31.1724V26.8276C16 26.2069 16.3908 25.7931 16.977 25.7931H21.4713V21.0345C21.4713 20.4138 21.8621 20 22.4483 20H26.5517C27.1379 20 27.5287 20.4138 27.5287 21.0345V25.7931H32.023C32.6092 25.7931 33 26.2069 33 26.8276V31.1724C33 31.7931 32.6092 32.2069 32.023 32.2069H27.5287V36.9655C27.5287 37.4828 27.1379 38 26.5517 38ZM23.4253 35.931H25.5747V31.1724C25.5747 30.5517 25.9655 30.1379 26.5517 30.1379H31.046V27.8621H26.5517C25.9655 27.8621 25.5747 27.4483 25.5747 26.8276V22.069H23.4253V26.8276C23.4253 27.4483 23.0345 27.8621 22.4483 27.8621H17.954V30.1379H22.4483C23.0345 30.1379 23.4253 30.5517 23.4253 31.1724V35.931Z"
                />
            </svg>
        );
    }
}

FirstAidKitIcon.propTypes = {
    color: PropTypes.string,
};
export default FirstAidKitIcon;