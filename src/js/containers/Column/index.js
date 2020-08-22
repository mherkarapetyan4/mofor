import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RESPONSIVE } from "config/consts";

class Column extends PureComponent {
    render() {
        const {
            children,
            fraction,
            paddings,
            paddingLeft,
            paddingRight,
            fixed,
            auto,
            mobilePaddingLeft,
            mobilePaddingRight,
            "basis-0": basis0,
        } = this.props;

        return (
            <ColumnWrapper
                auto={auto}
                basis={basis0}
                fixed={fixed}
                fraction={fraction}
                paddings={paddings}
                paddingLeft={paddingLeft}
                paddingRight={paddingRight}
                mobilePaddingLeft={mobilePaddingLeft}
                mobilePaddingRight={mobilePaddingRight}
            >
                {children}
            </ColumnWrapper>
        );
    }
}

const ColumnWrapper = styled.div`
    display: flex;
    width: ${(props) =>
        props.fixed
            ? props.fixed + "px"
            : props.auto
            ? "auto"
            : props.fraction * 8.3333 + "%"};
    flex: ${(props) =>
        props.auto
            ? props.basis === true
                ? "1 1 0"
                : "1 1 auto"
            : "0 0 auto"};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: ${(props) =>
        props.paddings !== undefined
            ? props.paddings
            : props.paddingLeft >= 0
            ? props.paddingLeft
            : 16}px;
    padding-right: ${(props) =>
        props.paddings !== undefined
            ? props.paddings
            : props.paddingRight >= 0
            ? props.paddingRight
            : 16}px;
    height: 100%;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
        height: auto;
        padding-left: ${(props) =>
            props.paddings >= 0
                ? props.paddings
                : props.mobilePaddingLeft >= 0
                ? props.mobilePaddingLeft
                : props.paddingLeft >= 0
                ? props.paddingLeft
                : 16}px;
        padding-right: ${(props) =>
            props.paddings >= 0
                ? props.paddings
                : props.mobilePaddingRight >= 0
                ? props.mobilePaddingRight
                : props.paddingRight >= 0
                ? props.paddingRight
                : 16}px;
    }
`;

Column.propTypes = {
    children: PropTypes.any.isRequired,
    fraction: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        .isRequired,
    paddings: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    fixed: PropTypes.number,
    auto: PropTypes.bool,
    mobilePaddingLeft: PropTypes.number,
    mobilePaddingRight: PropTypes.number,
    "basis-0": PropTypes.bool,
};

Column.defaultProps = {
    fraction: 12,
};

export default Column;
