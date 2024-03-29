import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class DrugsIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M20.1966 11.8182C22.9417 9.09091 22.9417 4.74026 20.1966 2.01299C18.8241 0.649351 17.0594 0 15.2293 0C13.3992 0 11.6345 0.649351 10.3273 2.01299L2.0267 10.2597C-0.653043 12.987 -0.653043 17.3377 2.0267 20.0649C3.39924 21.4286 5.16395 22.0779 6.99402 22.0779C8.82408 22.0779 10.5888 21.4286 11.896 20.0649L14.9025 17.0779L16.6019 15.3896L20.1966 11.8182ZM8.17049 6.94805L11.7653 3.37662C12.6803 2.46753 13.9221 1.94805 15.2293 1.94805C16.5365 1.94805 17.8437 2.46753 18.7587 3.37662C20.7195 5.32468 20.7195 8.50649 18.7587 10.3896L15.1639 13.961L8.17049 6.94805Z" />
                <path d="M22.4837 15.0649C18.366 15.0649 14.9673 18.4416 14.9673 22.5325C14.9673 26.6234 18.366 30 22.4837 30C26.6013 30 30 26.6234 30 22.5325C30 18.4416 26.6667 15.0649 22.4837 15.0649ZM22.4837 17.013C25.2941 17.013 27.6471 19.1559 27.9739 21.8831H16.9935C17.3203 19.1559 19.6732 17.013 22.4837 17.013Z" />
            </svg>
        );
    }
}

DrugsIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default DrugsIcon;
