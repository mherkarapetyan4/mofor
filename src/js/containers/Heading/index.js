import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Heading extends PureComponent {
    render() {
        const { children, autoHeight } = this.props;

        return (
            <HeadingWrapper autoHeight={autoHeight}>{children}</HeadingWrapper>
        );
    }
}

const HeadingWrapper = styled.div`
    height: ${(props) => (props.autoHeight ? "auto" : "60px")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => (props.autoHeight ? "12px" : "0")}
        ${(props) => props.theme.paddings.normal};
    flex: 0 0 auto;
`;

Heading.propTypes = {
    children: PropTypes.any.isRequired,
    autoHeight: PropTypes.bool,
    dataStep: PropTypes.number,
    dataDescription: PropTypes.string,
};

export default Heading;
