import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class CalendarIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="37.3px"
                height="38.9px"
                viewBox="0 0 37.3 38.9"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M32.7,3.7h-3.4V1.5c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v2.2H11.5V1.5C11.5,0.7,10.8,0,10,0S8.5,0.7,8.5,1.5v2.2H4.6
                    C2.1,3.7,0,5.8,0,8.3v26c0,2.5,2.1,4.6,4.6,4.6h28.1c2.5,0,4.6-2.1,4.6-4.6v-26C37.3,5.8,35.3,3.7,32.7,3.7z M4.6,6.7h3.9v2.4
                    c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V6.7h14.8v2.4c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V6.7h3.4c0.9,0,1.6,0.7,1.6,1.6v4.4H3
                    V8.3C3,7.4,3.7,6.7,4.6,6.7z M32.7,35.9H4.6c-0.9,0-1.6-0.7-1.6-1.6V15.7h31.3v18.6C34.3,35.2,33.6,35.9,32.7,35.9z"
                />
                <path
                    d="M18.3,19.2H8.1c-0.8,0-1.5,0.7-1.5,1.5v10.2c0,0.8,0.7,1.5,1.5,1.5h10.2c0.8,0,1.5-0.7,1.5-1.5V20.7
                    C19.8,19.9,19.1,19.2,18.3,19.2z M16.8,29.4H9.6v-7.2h7.2V29.4z"
                />
            </svg>
        );
    }
}

CalendarIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default CalendarIcon;
