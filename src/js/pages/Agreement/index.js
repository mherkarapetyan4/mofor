import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "components/Button";
import { logout } from "actions/auth";
import { confirmPersonalDataAccess } from "actions/user";
import { history } from "routes/history";
import { AUTH_REDIRECT } from "config/menu";
import styled from "styled-components";
import { RESPONSIVE } from "config/consts";
import { fontStyles } from "styledMixins/mixins";

@connect((state) => ({
    fullName: state.myData.myData.person?.fullName || "",
    pbdDocument: state.myData.myData.pbdDocument,
    isFetching: state.app.isFetching,
}))
class AgreementPage extends PureComponent {
    static propTypes = {
        fullName: PropTypes.string.isRequired,
        pbdDocument: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
    };

    onAgree = () => {
        const { dispatch } = this.props;
        dispatch(confirmPersonalDataAccess());
    };

    onDisagree = () => {
        const { dispatch } = this.props;
        dispatch(logout());
        history.push(AUTH_REDIRECT);
    };

    render() {
        const { pbdDocument, fullName, isFetching } = this.props;
        return (
            <Wrapper>
                <Heading>СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ</Heading>
                <Text>
                    Я (далее - Пользователь), {fullName}
                    {pbdDocument ? "," : ""}
                </Text>
                {pbdDocument && (
                    <Text>
                        серия и номер паспорта {pbdDocument?.series}{" "}
                        {pbdDocument?.number}
                    </Text>
                )}
                <Text>
                    Даю свое согласие Московскому городскому фонду обязательного
                    медицинского страхования (МГФОМС), зарегистрированному по
                    адресу: 127473, г. Москва, ул. Достоевского, д. 31, корп.
                    1А, на обработку своих персональных данных на следующих
                    условиях:
                </Text>
                <Text>
                    <ul>
                        <li>
                            МГФОМС осуществляет обработку персональных данных в
                            целях предоставления Пользователю возможности
                            использования Сервиса информирования застрахованных
                            лиц по ОМС;
                        </li>
                        <li>
                            Пользователь дает согласие на совершение следующих
                            действий с персональными данными с использованием
                            средств автоматизации: сбор, запись, систематизация,
                            накопление, хранение, уточнение (обновление,
                            изменение), извлечение, использование, передачу
                            (предоставление, доступ), обезличивание,
                            блокирование, удаление, уничтожение персональных
                            данных.
                        </li>
                    </ul>
                </Text>
                <Text>
                    Подтверждаю, что ознакомлен (а) с положениями Федерального
                    закона от 27.07.2006 № 152-ФЗ «О персональных данных» (
                    <a
                        href="http://www.rg.ru/2006/07/29/personaljnye-dannye-dok.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        http://www.rg.ru/2006/07/29/personaljnye-dannye-dok.html
                    </a>
                    ).
                </Text>
                <ActionsWrapper>
                    <Button
                        label={"Согласен (согласна)"}
                        onClick={this.onAgree}
                        disabled={isFetching}
                    />
                    <Button label={"Отказываюсь"} onClick={this.onDisagree} />
                </ActionsWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: 700px;
    height: 100vh;
    margin: 0 auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

const Heading = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.large,
        })};
    margin-bottom: 10px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    ul {
        li {
            margin-bottom: 10px;
        }
    }
`;

const ActionsWrapper = styled.div`
    display: flex;

    > div {
        margin-right: 16px;
        :last-child {
            margin-right: 0;
        }
    }
`;

export default AgreementPage;
