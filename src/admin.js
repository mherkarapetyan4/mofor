import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";
import AdminContainer from "containers/AdminContainer";
import GlobalStyle from "./GlobalStyle";

ReactDOM.render(
    <Provider store={store}>
        <GlobalStyle />
        <AdminContainer />
    </Provider>,
    document.getElementById("app"),
);
