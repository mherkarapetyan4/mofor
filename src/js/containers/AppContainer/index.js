import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import RootComponent from "routes/Root";
import LkApp from "routes/Lk";
import { ThemeProvider, withTheme } from "styled-components";
import { connect } from "react-redux";
import AnchorPopup from "components/AnchorPopup";
import Helper from "modules/Helper";
import Popup from "components/Popup";
import ReactGA from "react-ga";

@connect(({ app }) => ({
    theme: app.theme,
    userTheme: app.userTheme,
}))
@withTheme
class AppContainer extends PureComponent {
    componentDidMount() {
        ReactGA.event({
            category: "Enter",
            action: "EnterOnSite",
        });
    }

    static propTypes = {
        theme: PropTypes.object.isRequired,
        userTheme: PropTypes.object.isRequired,
    };

    render() {
        const { theme, userTheme } = this.props;

        return (
            <ThemeProvider theme={{ ...theme, userTheme }}>
                <RootComponent>
                    <AnchorPopup />
                    <Popup />
                    <LkApp />
                    <Helper />
                </RootComponent>
            </ThemeProvider>
        );
    }
}

export default AppContainer;
