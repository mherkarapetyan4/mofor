import React from "react";
import axios from "axios";
import { appKeyActions } from "config/actionsKeys";
import { loginPaths } from "config/paths";
import { history } from "routes/history";
import { AUTH_REDIRECT, LK_MENU_ELEMENTS } from "config/menu";
import { getCurrentUserInfo } from "actions/myData";
import { showPopup } from "actions/popup";
import cookies from "js-cookie";
import { policyStorageKey } from "config/consts";

const startAuthPending = () => ({
    type: appKeyActions.START_AUTH_PENDING,
});

const endAuthPending = () => ({
    type: appKeyActions.END_AUTH_PENDING,
});

export const authFullfilled = () => ({
    type: appKeyActions.AUTH_FULLFILLED,
});

export const logoutFullfilled = () => ({
    type: appKeyActions.LOGOUT,
});

export const logout = (from401 = false) => {
    return (dispatch) => {
        dispatch(endAuthPending());
        dispatch(logoutFullfilled());
        localStorage.setItem("mgfoms_sessionid", "");
        localStorage.setItem(policyStorageKey, "");
        axios.defaults.headers["mgfoms_sessionid"] = null;
        history.push(AUTH_REDIRECT);
        if (location.hostname === "localhost")
            cookies.remove("mgfoms_sessionid");
        else if (!from401 && location.hostname !== "localhost")
            location.href = "/sizl" + loginPaths.LOGOUT;
    };
};

export const loginByUkl = (ukl) => {
    return (dispatch) => {
        dispatch(startAuthPending());

        const formData = new FormData();
        formData.append("ukl", ukl);

        axios
            .post(loginPaths.LOGIN_BY_UKL, formData)
            .then((response) => {
                const sessionId = response.data.sessionId;
                if (sessionId) {
                    axios.defaults.headers["mgfoms_sessionid"] = sessionId;
                    localStorage.setItem("mgfoms_sessionid", sessionId);
                    dispatch(authFullfilled());
                    history.push(LK_MENU_ELEMENTS.MAIN_PAGE.path);
                    dispatch(getCurrentUserInfo(true));
                }
                dispatch(endAuthPending());
            })
            .catch(() => dispatch(endAuthPending()));
    };
};

export const loginByPolicy = (params) => {
    return (dispatch) => {
        dispatch(startAuthPending());
        axios
            .post(loginPaths.LOGIN_BY_POLICY, params)
            .then((response) => {
                dispatch(endAuthPending());
                const status = response.data.status;
                if (status === "TEMP_ACCESS_EXPIRED") {
                    dispatch(
                        showPopup(
                            "Срок действия истёк",
                            <div style={{ padding: "10px" }}>
                                Истёк месяц с момента первой авторизации по
                                номеру полиса. Обратитесь в свою страховую
                                организацию для уточнения Ваших паспортных
                                данных.
                            </div>,
                        ),
                    );
                } else if (status === "NOT_IDENTIFIED") {
                    dispatch(
                        showPopup(
                            "Некорректный номер полиса",
                            <div style={{ padding: "10px" }}>
                                Данные вашего полиса не найдены, обратитесь в
                                страховую компанию для уточнения данных.
                            </div>,
                        ),
                    );
                } else if (status === "OK") {
                    axios.defaults.headers["mgfoms_sessionid"] =
                        response.data.sessionId;
                    dispatch(getCurrentUserInfo(true));
                }
            })
            .catch(() => {
                dispatch(endAuthPending());
            });
    };
};
