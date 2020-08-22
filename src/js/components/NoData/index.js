import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class NoData extends PureComponent {
    render() {
        const { title, message } = this.props;

        return (
            <Wrapper>
                <Title>{title}</Title>
                <Message>{message}</Message>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 375px;
    padding: 10px;
    margin: 0 auto;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.large,
        })};
    margin-bottom: 25px;
`;

const Message = styled.div`
    width: 100%;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    text-align: center;
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
`;

NoData.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default NoData;
