import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Row extends PureComponent {
    render() {
        const { children, fullHeight, fullPage, height } = this.props;

        return (
            <RowWrapper
                fullHeight={fullHeight}
                fullPage={fullPage}
                height={height}
            >
                {children}
            </RowWrapper>
        );
    }
}

const RowWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 0 0 ${(props) => props.theme.paddings.normal} 0;
    height: ${(props) =>
        props.fullHeight
            ? `calc(100% - ${props.theme.footer.height})`
            : props.fullPage
            ? "100%"
            : props.height
            ? props.height
            : "auto"};

    &:last-child {
        padding: 0;
    }
`;

Row.propTypes = {
    children: PropTypes.any.isRequired,
    fullHeight: PropTypes.bool,
    fullPage: PropTypes.bool,
    height: PropTypes.string,
};

Row.defaultProps = {
    fullHeight: false,
    fullPage: false,
    height: "auto",
};

export default Row;
