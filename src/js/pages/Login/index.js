import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import { loginPaths } from "config/paths";
import styled from "styled-components";
import FullLogo from "icons/FullLogo";
import appleStore from "images/mobileApps/appleStoreLogo.png";
import googlePlay from "images/mobileApps/google.png";
import { getParameterByName } from "utils/handleUrl";
import InlineFormField from "components/InlineFormField";
import { form } from "wrappers/Formik";
import { validateRules } from "config/consts";
import { FormikFormField } from "wrappers/Formik/FormField";
import { sendForm } from "utils/sendForm";
import { loginByPolicy } from "actions/auth";
import { connect } from "react-redux";
import { history } from "routes/history";
import { LK_MENU_ELEMENTS } from "config/menu";
import { logout } from "actions/auth";

const fields = {
    policy: {
        rules: [validateRules.required],
        type: "number",
        name: "серия и номер полиса",
    },
};

@form({
    fields,
})
@connect()
class Login extends PureComponent {
    state = {
        passport_err: null,
        active_err: null,
        attemptsLeft: 5,
    };

    byEsia = () => (location.href = loginPaths.ESIA_LOGIN_HREF);

    componentDidMount() {
        if (getParameterByName("passport_err")) {
            this.setState({
                passport_err: 1,
            });
        }
        if (getParameterByName("active_err")) {
            this.setState({
                active_err: 1,
            });
        }
    }

    loginByPolicy = () => {
        sendForm(this.props, fields).then((response) => {
            this.props.dispatch(loginByPolicy(response));
            this.setState((state) => ({
                attemptsLeft: state.attemptsLeft - 1,
            }));
        });
    };

    render() {
        const { passport_err, active_err, attemptsLeft } = this.state;

        const isSUDIR = /mgfoms_authsystem=SUDIR/.test(document.cookie);
        const link = isSUDIR
            ? "https://www.mos.ru/"
            : "https://esia.gosuslugi.ru/idp/AuthnEngine";

        return (
            <AuthWrapper>
                <AuthContentWrapper>
                    <FullLogoWrapper>
                        <FullLogo color={"#fff"} />
                    </FullLogoWrapper>
                    {passport_err && (
                        <>
                            <Info>
                                <p>
                                    Данные паспорта, предъявленного при
                                    получении полиса обязательного медицинского
                                    страхования, отличаются от данных паспорта,
                                    получаемых из системы предоставления
                                    государственных услуг в электронном виде.
                                    Пожалуйста, обратитесь в Вашу страховую
                                    медицинскую организацию для актуализации
                                    паспортных данных.
                                </p>
                                <p>
                                    Сейчас для входа в Сервис информирования
                                    застрахованных лиц Вы можете ввести номер
                                    полиса ОМС для подтверждения Вашей личности.
                                    Войти в Сервис, вводя номер полиса ОМС без
                                    актуализации паспортных данных, можно будет
                                    в течение одного календарного месяца с
                                    момента первого входа в Сервис.
                                </p>
                                {attemptsLeft > 0 ? (
                                    <p>{`Осталось попыток: ${attemptsLeft}`}</p>
                                ) : (
                                    <p>{`К сожалению, вы 5 раз ввели неправильный номер полиса, попыток больше не осталось. Пожалуйста, обратитесь в Вашу страховую медицинскую организацию для актуализации паспортных данных.`}</p>
                                )}
                            </Info>
                            {attemptsLeft > 0 && (
                                <>
                                    <InlineFormFieldWrapper>
                                        <FormikFormField
                                            name={"policy"}
                                            component={(props) => (
                                                <InlineFormField
                                                    {...props}
                                                    placeholder={
                                                        "Ввeдите серию и номер полиса ОМС без пробелов"
                                                    }
                                                    type={"number"}
                                                />
                                            )}
                                        />
                                    </InlineFormFieldWrapper>
                                    <ActionsWrapper>
                                        <Button
                                            label={"Войти"}
                                            onClick={this.loginByPolicy}
                                            white
                                            disabled={attemptsLeft === 0}
                                        />
                                        <Button
                                            label={"Отмена"}
                                            onClick={() => {
                                                this.props.dispatch(logout());
                                                history.push(
                                                    LK_MENU_ELEMENTS.LOGIN_PAGE
                                                        .path,
                                                );
                                            }}
                                            white
                                        />
                                    </ActionsWrapper>
                                </>
                            )}
                        </>
                    )}
                    {active_err && (
                        <>
                            <Info>
                                Для получения доступа к Сервису информирования
                                застрахованных лиц по ОМС, Вам необходимо
                                создать подтвержденную учетную запись{" "}
                                {isSUDIR
                                    ? "на Портал"
                                    : "портале государственных услуг."}
                                .
                                {isSUDIR ? (
                                    <a href={link}>mos.ru</a>
                                ) : (
                                    <a href={link}>Портал гос. услуг</a>
                                )}
                            </Info>
                        </>
                    )}
                    {!passport_err && !active_err && (
                        <>
                            <Info>
                                С помощью Сервиса производится информирование
                                застрахованных лиц об оказанной им за счет
                                средств ОМС медицинской помощи. Сервис является
                                интерактивным помощником в планировании
                                мероприятий, связанных с заботой о здоровье и
                                ведением здорового образа жизни.
                            </Info>
                            <ButtonWrapper>
                                <Button
                                    label={"Вход через ГосУслуги"}
                                    onClick={() => this.byEsia()}
                                    white
                                />
                            </ButtonWrapper>
                        </>
                    )}

                    <MobileAdvertising>
                        <a
                            href={
                                "https://itunes.apple.com/us/app/%D0%BC%D0%B3%D1%84%D0%BE%D0%BC%D1%81/id1288040721?l=ru&ls=1&mt=8"
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                        >
                            <img src={appleStore} alt="mobileApp" />
                        </a>
                        <a
                            href={
                                "https://play.google.com/store/apps/details?id=ru.mgfoms.pandora&rdid=ru.mgfoms.pandora"
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                        >
                            <img src={googlePlay} alt="mobileApp" />
                        </a>
                    </MobileAdvertising>
                </AuthContentWrapper>
                <AuthFooter>
                    © 2020 “Московский городской фонд обязательного медицинского
                    страхования”
                </AuthFooter>
            </AuthWrapper>
        );
    }
}

const AuthWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: ${(props) => props.theme.authBackground};
    background-size: cover;
`;

const FullLogoWrapper = styled.div``;

const ButtonWrapper = styled.div``;

const MobileAdvertising = styled.div`
    margin-top: 30px;

    a {
        margin: 0 10px;
    }
`;

const AuthContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 500px;
`;

const AuthFooter = styled.div`
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-family: ${(props) => props.theme.fonts.family.gotham};
    color: ${(props) => props.theme.colors.text.colorWhite};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    opacity: ${(props) => props.theme.textOpacity.half};
`;

const Info = styled.div`
    margin: 40px 0 20px 0;
    font-family: ${(props) => props.theme.fonts.family.gotham};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    color: ${(props) => props.theme.colors.text.colorWhite};
    text-align: center;
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    padding: 0 20px;
    width: 100%;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 16px;

        :last-child {
            margin-right: 0;
        }
    }
`;

const InlineFormFieldWrapper = styled.div`
    width: 100%;
    margin-bottom: 25px;
    padding: 0 16px;
`;

Login.propTypes = {
    passport_err: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
    active_err: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
    attemptsLeft: PropTypes.number,
    inputValue: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
};

export default Login;
