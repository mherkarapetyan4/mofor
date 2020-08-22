/*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class ClipBoardIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg viewBox="0 0 18 22" fill={color} fillOpacity={opacity}>
                <path d="M15.1493 21.08H2.85086C1.72857 21.08 0.840088 20.1958 0.840088 19.0789V6.28114C0.840088 5.16424 1.72857 4.28003 2.85086 4.28003H5.23573C5.51631 4.28003 5.40009 4.46618 5.40009 4.7454C5.40009 5.02463 5.51631 5.21078 5.23573 5.21078H2.85086C2.24295 5.21078 1.77533 5.67615 1.77533 6.28114V19.1255C1.77533 19.7304 2.24295 20.1958 2.85086 20.1958H15.1493C15.7572 20.1958 16.2248 19.7304 16.2248 19.1255V6.28114C16.2248 5.67615 15.7572 5.21078 15.1493 5.21078H12.8112C12.5306 5.21078 12.3436 5.02463 12.3436 4.7454C12.3436 4.46618 12.5306 4.28003 12.8112 4.28003H15.1493C16.2716 4.28003 17.1601 5.16424 17.1601 6.28114V19.1255C17.1601 20.1958 16.2716 21.08 15.1493 21.08Z" />
                <path d="M12.783 6.67994H5.16807C4.87519 6.67994 4.67993 6.48794 4.67993 6.19994V2.83994C4.67993 2.55194 4.87519 2.35994 5.16807 2.35994H6.48603C6.7301 1.25594 7.70637 0.439941 8.92671 0.439941C10.147 0.439941 11.1233 1.25594 11.3674 2.40794H12.8318C13.1247 2.40794 13.3199 2.59994 13.3199 2.88794V6.24794C13.2711 6.48794 13.0759 6.67994 12.783 6.67994ZM5.6562 5.71994H12.2948V3.31994H10.8793C10.5864 3.31994 10.3911 3.12794 10.3911 2.83994C10.3911 2.02394 9.70773 1.35194 8.92671 1.35194C8.09688 1.35194 7.41349 2.02394 7.41349 2.83994C7.41349 3.12794 7.21824 3.31994 6.92535 3.31994H5.6562V5.71994Z" />
                <path d="M7.75197 16.76C7.60797 16.76 7.51197 16.714 7.41597 16.622L3.86397 13.2159C3.67197 13.0318 3.67197 12.7557 3.86397 12.5715C4.05597 12.3874 4.34397 12.3874 4.53597 12.5715L7.75197 15.6554L13.464 10.1781C13.656 9.99401 13.944 9.99401 14.136 10.1781C14.328 10.3622 14.328 10.6384 14.136 10.8225L8.08797 16.622C7.99197 16.714 7.89597 16.76 7.75197 16.76Z" />
            </svg>
        );
    }
}

ClipBoardIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default ClipBoardIcon;