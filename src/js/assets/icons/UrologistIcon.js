import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class UrologistIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M15.2 0V1.6H21.28L15.7867 7.09333C14.1333 5.65333 11.9467 4.8 9.6 4.8C4.32 4.8 0 9.12 0 14.4C0 19.68 4.32 24 9.6 24C14.88 24 19.2 19.68 19.2 14.4C19.2 12.0533 18.3467 9.86667 16.9067 8.21333L22.4 2.72V8.8H24V0H15.2ZM9.6 22.4C5.17333 22.4 1.6 18.8267 1.6 14.4C1.6 9.97333 5.17333 6.4 9.6 6.4C14.0267 6.4 17.6 9.97333 17.6 14.4C17.6 18.8267 14.0267 22.4 9.6 22.4Z" />
            </svg>
        );
    }
}

UrologistIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default UrologistIcon;
