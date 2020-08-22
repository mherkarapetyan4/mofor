import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class StatisticsIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="41.4px"
                height="41.4px"
                viewBox="0 0 41.4 41.4"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M38.6,22.1c0,10.6-8.6,19.3-19.3,19.3S0,32.8,0,22.1S8.6,2.8,19.3,2.8v19.3H38.6z M35.3,25.1h-19v-19C8.7,7.5,3,14.2,3,22.1
                c0,9,7.3,16.3,16.3,16.3C27.2,38.4,33.9,32.7,35.3,25.1z"
                />
                <path d="M22.1,19.3V0c10.6,0,19.3,8.6,19.3,19.3H22.1z M38.1,16.3c-1.2-6.6-6.4-11.8-13-13v13H38.1z" />
            </svg>
        );
    }
}

StatisticsIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default StatisticsIcon;
