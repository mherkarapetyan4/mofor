/*
*

* */

import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";

@Icon
class PaperIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M19.7393 18H5.40351C4.19048 18 3.19799 17.0328 3.19799 15.8507V3.65372C3.19799 3.33133 3.41855 3.11641 3.74937 3.11641C4.0802 3.11641 4.30075 3.33133 4.30075 3.65372V15.8507C4.30075 16.4418 4.79699 16.9254 5.40351 16.9254H19.7393C20.0702 16.9254 20.2907 17.1403 20.2907 17.4627C20.2907 17.7851 20.0702 18 19.7393 18Z" />
                <path d="M19.7393 18C18.5263 18 17.5338 17.0328 17.5338 15.8507V2.14925C17.5338 1.55821 17.0376 1.07463 16.4311 1.07463C15.8246 1.07463 15.3283 1.55821 15.3283 2.14925V3.65373C15.3283 3.97612 15.1078 4.19105 14.7769 4.19105H0.551378C0.220551 4.19105 0 3.97612 0 3.65373V2.14925C0 0.967164 0.992481 0 2.20551 0H16.4311C17.6441 0 18.6366 0.967164 18.6366 2.14925V13.9164H21.4486C21.7794 13.9164 22 14.1313 22 14.4537V15.8507C22 17.0328 21.0075 18 19.7393 18ZM18.6366 14.991V15.8507C18.6366 16.4418 19.1328 16.9254 19.7393 16.9254C20.3459 16.9254 20.8421 16.4418 20.8421 15.8507V14.991H18.6366ZM1.10276 3.11642H14.2256V2.14925C14.2256 1.77313 14.3358 1.39701 14.5013 1.07463H2.20551C1.599 1.07463 1.10276 1.55821 1.10276 2.14925V3.11642Z" />
                <path d="M13.8396 7.25373H6.50626C6.17544 7.25373 5.95489 7.03881 5.95489 6.71642C5.95489 6.39403 6.17544 6.17911 6.50626 6.17911H13.8396C14.1704 6.17911 14.391 6.39403 14.391 6.71642C14.391 7.03881 14.1704 7.25373 13.8396 7.25373Z" />
                <path d="M13.8396 10.3164H6.50626C6.17544 10.3164 5.95489 10.1015 5.95489 9.7791C5.95489 9.45672 6.17544 9.24179 6.50626 9.24179H13.8396C14.1704 9.24179 14.391 9.45672 14.391 9.7791C14.391 10.1015 14.1704 10.3164 13.8396 10.3164Z" />
                <path d="M10.3659 13.3254H6.50626C6.17544 13.3254 5.95489 13.1104 5.95489 12.7881C5.95489 12.4657 6.17544 12.2507 6.50626 12.2507H10.3659C10.6967 12.2507 10.9173 12.4657 10.9173 12.7881C10.9173 13.1104 10.6416 13.3254 10.3659 13.3254Z" />
            </svg>
        );
    }
}

PaperIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};
export default PaperIcon;
