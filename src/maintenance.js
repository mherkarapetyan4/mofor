import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "./GlobalStyle";
import store from "store/index";
import { Provider } from "react-redux";
import Maintenance from "pages/Maintenance";

ReactDOM.render(
    <Provider store={store}>
        <GlobalStyle />
        <Maintenance />
    </Provider>,
    document.getElementById("app"),
);
