import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FullLogo from "icons/FullLogo";
import { fontStyles } from "styledMixins/mixins";

class PrintHeader extends PureComponent {
    render() {
        const { title } = this.props;

        return (
            <Wrapper>
                <Logo>
                    <FullLogo color={"#000"} opacity={1} />
                </Logo>
                <Title>{title}</Title>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: none;

    @media print {
        display: flex;
        margin-bottom: 0.5cm;
        align-items: center;
    }
`;

const Logo = styled.div`
    margin-right: 1cm;
    flex: 0 0 auto;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
            font: "bold",
        })};
    text-align: right;
    flex: 1 1 auto;
`;

PrintHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PrintHeader;
