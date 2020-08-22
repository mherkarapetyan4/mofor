import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class OtherIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="29"
                height="7"
                viewBox="0 0 29 7"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M3.60497 2.33333C4.24586 2.33333 4.80663 2.87778 4.80663 3.5C4.80663 4.12222 4.24586 4.66667 3.60497 4.66667C2.96409 4.66667 2.40331 4.12222 2.40331 3.5C2.40331 2.87778 2.96409 2.33333 3.60497 2.33333ZM3.60497 0C1.60221 0 0 1.55556 0 3.5C0 5.44444 1.60221 7 3.60497 7C5.60773 7 7.20994 5.44444 7.20994 3.5C7.20994 1.55556 5.60773 0 3.60497 0Z" />
                <path d="M14.5 2.33333C15.1409 2.33333 15.7016 2.87778 15.7016 3.5C15.7016 4.12222 15.1409 4.66667 14.5 4.66667C13.8591 4.66667 13.2983 4.12222 13.2983 3.5C13.2983 2.87778 13.8591 2.33333 14.5 2.33333ZM14.5 0C12.4972 0 10.895 1.55556 10.895 3.5C10.895 5.44444 12.4972 7 14.5 7C16.5028 7 18.105 5.44444 18.105 3.5C18.105 1.55556 16.5028 0 14.5 0Z" />
                <path d="M25.395 2.33333C26.0359 2.33333 26.5967 2.87778 26.5967 3.5C26.5967 4.12222 26.0359 4.66667 25.395 4.66667C24.7541 4.66667 24.1934 4.12222 24.1934 3.5C24.1934 2.87778 24.674 2.33333 25.395 2.33333ZM25.395 0C23.3923 0 21.7901 1.55556 21.7901 3.5C21.7901 5.44444 23.3923 7 25.395 7C27.3978 7 29 5.44444 29 3.5C29 1.55556 27.3177 0 25.395 0Z" />
            </svg>
        );
    }
}

OtherIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default OtherIcon;
