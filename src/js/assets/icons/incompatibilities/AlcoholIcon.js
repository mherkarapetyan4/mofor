import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class AlcoholIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="20"
                height="30"
                viewBox="0 0 20 30"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M20 11.2826C20 7.69565 17.9805 3.32609 16.9381 1.23913C16.4821 0.456522 15.7003 0 14.8534 0H10.0326H5.14658C4.29967 0 3.51792 0.456522 3.06189 1.23913C2.01954 3.32609 0 7.69565 0 11.2826C0 18.913 8.72964 20.0217 8.72964 20.0217V27.7826H3.51792C2.9316 27.7826 2.47557 28.3043 2.47557 28.8913C2.47557 29.4783 2.99674 30 3.58306 30H10.0326H16.4169C17.0033 30 17.5244 29.4783 17.5244 28.8913C17.5244 28.3043 17.0684 27.8478 16.4821 27.7826H11.2704V20.0217C11.2704 20.0217 20 18.8478 20 11.2826ZM9.44625 11.5435C8.33876 11.087 7.36156 10.6957 6.25407 10.6957C4.16938 10.6957 2.9316 11.8043 2.9316 11.8043L1.8241 12.7826V11.2826C1.8241 8.02174 3.7785 3.91304 4.62541 2.21739L4.82085 1.8913H15.114L15.3094 2.21739C16.1564 3.84783 18.1107 8.02174 18.1107 11.2826V11.8043L17.6547 11.9348C17.5896 11.9348 15.4397 12.5217 13.0293 12.5217C11.7915 12.5217 10.6189 12 9.44625 11.5435Z" />
            </svg>
        );
    }
}

AlcoholIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default AlcoholIcon;
