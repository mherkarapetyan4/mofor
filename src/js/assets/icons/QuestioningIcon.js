import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class QuestioningIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                x="0px"
                y="0px"
                width="37.6px"
                height="39.9px"
                viewBox="0 0 37.6 39.9"
                fill={color}
                fillOpacity={opacity}
            >
                <path
                    d="M19.5,0C9.5,0,1.4,8.1,1.4,18.1c0,3.3,0.9,6.4,2.5,9.1l-3.7,9.5c-0.7,1.9,1.2,3.8,3,3l10.5-4.4c1.8,0.6,3.8,1,5.8,1
                c10,0,18.1-8.1,18.1-18.1S29.5,0,19.5,0z M19.5,33.3c-0.3,0-0.6,0-0.9,0c-1.8-0.1-3.4-0.5-5-1.2L10,33.6l-6.5,2.7l2.4-6.2l1.3-3.3
                c-0.8-1.1-1.4-2.3-1.9-3.5c-0.6-1.6-0.9-3.4-0.9-5.2C4.4,9.8,11.2,3,19.5,3c8.3,0,15.1,6.8,15.1,15.1C34.6,26.5,27.9,33.3,19.5,33.3
                z"
                />
                <path
                    d="M20.6,23h-3.7v-5.9c0.3,0.1,0.7,0.1,1.1,0.1c1.3,0,2.2-0.3,2.8-0.9c0.6-0.6,0.9-1.3,0.9-2.1c0-0.7-0.2-1.2-0.6-1.7
                    s-1-0.7-1.6-0.7c-0.5,0-0.9,0.1-1.2,0.3s-0.5,0.5-0.7,0.8c-0.1,0.3-0.2,0.6-0.2,0.7c0,0.2,0,0.3,0,0.5v0.2h-3.9v-0.2
                    c0-1.7,0.6-3.1,1.7-4.1c1.2-1,2.6-1.5,4.3-1.5c1.8,0,3.3,0.5,4.4,1.5c1.1,1,1.7,2.4,1.7,4.1c0,1.4-0.4,2.7-1.3,3.7
                    c-0.9,1-2.1,1.7-3.6,1.9V23z M17,28.8c-0.5-0.5-0.7-1-0.7-1.7s0.2-1.2,0.7-1.7s1-0.7,1.7-0.7s1.2,0.2,1.7,0.7s0.7,1,0.7,1.7
                    s-0.2,1.2-0.7,1.7s-1,0.7-1.7,0.7S17.5,29.3,17,28.8z"
                />
            </svg>
        );
    }
}

QuestioningIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default QuestioningIcon;
