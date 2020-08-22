import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class DocumentSend extends PureComponent {
    render() {
        const { sex, firstName, middleName } = this.props.data;

        return (
            <Wrapper>
                <Heading>
                    {sex === "FEMALE" ? "Уважаемая " : "Уважаемый "}
                    {firstName} {middleName}
                </Heading>
                <Text>
                    Для отправки запроса на обновление паспортных данных в
                    личном кабинете застрахованного лица, небходимо сначала
                    указать и подтвердить свой адрес электронной почты в разделе
                    контакты.
                </Text>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 0 16px;
`;

const Heading = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
            font: "bold",
        })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-bottom: 10px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
`;

DocumentSend.propTypes = {
    data: PropTypes.object,
};

export default DocumentSend;
