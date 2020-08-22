import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "./GlobalStyle";
import Message from "pages/Message";
import store from "store/index";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <GlobalStyle />
        <Message />
    </Provider>,
    document.getElementById("app"),
);
