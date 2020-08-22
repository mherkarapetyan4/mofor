import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class DocumentUpdate extends PureComponent {
    render() {
        const { sex, firstName, middleName } = this.props.data;

        return (
            <Wrapper>
                <Heading>
                    {sex === "FEMALE" ? "Уважаемая " : "Уважаемый "}
                    {firstName} {middleName}
                </Heading>
                <Text>
                    Для обновления паспортных данных в РС ЕРЗЛ и личном кабинете
                    застрахованного МГФОМС, просим:
                </Text>
                <Text>
                    <ol>
                        <li>Выйти из личного кабинета МГФОМС;</li>
                        <li>
                            Войти в свою учетную запись на сайте государственных
                            услуг, внести в профиле корректные паспортные данные
                            и выйти из системы;
                        </li>
                        <li>
                            Войти в личный кабинет МГФОМС и повторить процедуру
                            подтверждения паспортных данных.
                        </li>
                    </ol>
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
    margin-bottom: 10px;

    :last-child {
        margin-bottom: 10px;
    }

    ol {
        li {
            margin-bottom: 5px;
        }
    }
`;

DocumentUpdate.propTypes = {
    data: PropTypes.object,
};

export default DocumentUpdate;
