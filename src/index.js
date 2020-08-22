import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";
import AppContainer from "containers/AppContainer";
import GlobalStyle from "./GlobalStyle";

import ReactGA from "react-ga";
import { isDev } from "config/consts";

ReactGA.initialize(isDev ? "UA-169844834-1" : "UA-11241935-4");

const renderContainer = (App) => {
    ReactDOM.render(
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>,
        document.getElementById("app"),
    );
};

renderContainer(AppContainer);

if (module.hot) {
    module.hot.accept("./js/containers/AppContainer", () => {
        const NewApp = require("./js/containers/AppContainer").default;
        renderContainer(NewApp);
    });
}
