import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class PoliclinicIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12.042 10.9454H9.9578V13.5108H7.35254V15.563H9.9578V18.1283H12.042V15.563H14.6473V13.5108H12.042V10.9454Z" />
                <path d="M11 0L0 10.8314V12.8266H2.02632V24H20.4947V12.8266H22V10.8314L11 0ZM18.7579 11.1164V22.2898H3.76316V11.1164V9.52019L11 2.3943L18.7579 10.0333V11.1164Z" />
            </svg>
        );
    }
}

PoliclinicIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default PoliclinicIcon;
