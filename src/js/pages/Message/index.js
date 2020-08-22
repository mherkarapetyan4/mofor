import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ThemeProvider, withTheme } from "styled-components";
import { connect } from "react-redux";
import styled from "styled-components";
import { RESPONSIVE } from "config/consts";
import FullLogo from "icons/FullLogo";
import { fontStyles } from "styledMixins/mixins";
import "scss/fonts.scss";
import { getParameterByName } from "utils/handleUrl.js";

@connect((state) => ({
    theme: state.app.theme,
    userTheme: state.app.userTheme,
}))
@withTheme
class Message extends PureComponent {
    static propTypes = {
        theme: PropTypes.object.isRequired,
        userTheme: PropTypes.object.isRequired,
        adminIsAuth: PropTypes.bool.isRequired,
    };
    componentDidMount() {
        setTimeout(
            function() {
                window.open("/", "_self");
            }.bind(this),
            5000,
        );
    }

    render() {
        const { theme, userTheme } = this.props;
        const action = getParameterByName("action");
        const result = getParameterByName("result");

        return (
            <ThemeProvider theme={{ ...theme, userTheme }}>
                <Wrapper>
                    <LogoWrapper>
                        {result === "success" ? (
                            <FullLogo
                                color={theme.colors.background.gradientOne}
                            />
                        ) : (
                            <></>
                        )}
                    </LogoWrapper>
                    {getParameterByName("action") ? (
                        <>
                            {action === "emailConfirmation" &&
                                result === "success" && (
                                    <Text>
                                        Подтверждение E-mail прошло успешно!
                                    </Text>
                                )}
                            {action === "emailConfirmation" &&
                                result === "error" && (
                                    <Text>
                                        Ошибка! Не удалось подтвердить ваш
                                        E-mail
                                    </Text>
                                )}
                            {action === "drugIntakeConfirmation" &&
                                result === "success" && (
                                    <Text>
                                        Прием лекарственного средства успешно
                                        подтвержден
                                    </Text>
                                )}
                            {action === "drugIntakeConfirmation" &&
                                result === "error" && (
                                    <Text>
                                        Ошибка в подтверждении приема
                                        лекарственного средства
                                    </Text>
                                )}
                        </>
                    ) : (
                        <>
                            <Text>Ошибка!</Text>
                            <Text>
                                Во время обработки вашего запроса произошла
                                ошибка. Пожалуйста, повторите запрос позже.
                            </Text>
                        </>
                    )}
                </Wrapper>
            </ThemeProvider>
        );
    }
}

const Wrapper = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.backgrounds.imageTwo};
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: 100% 0;
    height: 100vh;
    padding: 16px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        overflow-y: auto;
        overflow-x: hidden;
    }
`;

const LogoWrapper = styled.div`
    margin-bottom: 50px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

Message.propTypes = {};

export default Message;
