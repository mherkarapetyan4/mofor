import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const calculateMargin = (margin) => {
    switch (margin) {
        case "small":
            return "10px";
        case "normal":
            return "20px";
        case "big":
            return "30px";
    }
};

const RowWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: ${(props) => props.alignItems};
    margin-bottom: ${(props) => calculateMargin(props.marginBottom)};
    width: 100%;
`;

class Row extends PureComponent {
    render() {
        const { children, marginBottom, alignItems } = this.props;

        return (
            <RowWrapper marginBottom={marginBottom} alignItems={alignItems}>
                {children}
            </RowWrapper>
        );
    }
}

Row.propTypes = {
    children: PropTypes.any,
    marginBottom: PropTypes.oneOf(["small", "normal", "big"]),
    alignItems: PropTypes.oneOf(["flex-start", "center"]),
};

Row.defaultProps = {
    marginBottom: "normal",
    alignItems: "flex-start",
};

export default Row;
