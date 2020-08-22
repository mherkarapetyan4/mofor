import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Overflow extends PureComponent {
    render() {
        const { children, direction } = this.props;

        return (
            <OverflowWrapper direction={direction}>{children}</OverflowWrapper>
        );
    }
}

const OverflowWrapper = styled.div`
    overflow: auto;
    width: 100%;
`;

Overflow.propTypes = {
    direction: PropTypes.oneOf(["horizontal", "vertical"]),
    children: PropTypes.any.isRequired,
};

Overflow.defaultProps = {
    direction: "vertical",
};

export default Overflow;
