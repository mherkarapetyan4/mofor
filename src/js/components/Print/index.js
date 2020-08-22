import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class Print extends PureComponent {
    static propTypes = {
        children: PropTypes.elements,
    };

    render() {
        const { children } = this.props;

        return <Wrapper>{children}</Wrapper>;
    }
}

const Wrapper = styled.div`
    display: none;

    @media print {
        display: block;
    }
`;

export default Print;
