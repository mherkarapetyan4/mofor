import React, { PureComponent } from "react";
import { ThemeProvider, withTheme } from "styled-components";
import { connect } from "react-redux";
import styled from "styled-components";
import { RESPONSIVE } from "config/consts";
import FullLogo from "icons/FullLogo";
import { fontStyles } from "styledMixins/mixins";
import "scss/fonts.scss";
// import { Button } from "components/Button";
import PropTypes from "prop-types";

@connect((state) => ({
    theme: state.app.theme,
    userTheme: state.app.userTheme,
}))
@withTheme
class Maintenance extends PureComponent {
    static propTypes = {
        theme: PropTypes.object.isRequired,
        userTheme: PropTypes.object.isRequired,
    };

    render() {
        const { theme, userTheme } = this.props;

        return (
            <ThemeProvider theme={{ ...theme, userTheme }}>
                <Wrapper>
                    <LogoWrapper>
                        <FullLogo color={theme.colors.background.gradientOne} />
                    </LogoWrapper>
                    <Content>
                        <Status>
                            Производятся технические работы на сервере
                        </Status>
                        <Text>
                            Приносим свои извинения за перебои в работе сайта
                        </Text>
                        {/*<Button*/}
                        {/*    label={"Попробовать войти снова"}*/}
                        {/*    onClick={this.handleClick}*/}
                        {/*/>*/}
                    </Content>
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

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Status = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.large,
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 16px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 50px;
`;

export default Maintenance;
