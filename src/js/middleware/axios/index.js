import axios from "axios/index";
import get from "lodash/get";
import set from "lodash/set";
import { getParameterByName } from "utils/handleUrl";
import { logout } from "actions/auth";
import { showSystemMessage } from "actions/app";
import { LK_MENU_ELEMENTS } from "config/menu";

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

export const axiosMiddlewareResponse = ({ dispatch }) => {
    return (next) => (action) => {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (!get(error, "config.__isRetryRequest")) {
                    if (
                        get(error.response, "status") === 401 &&
                        location.hash.indexOf(
                            LK_MENU_ELEMENTS.LOGIN_PAGE.path,
                        ) === -1 &&
                        location.hash.indexOf(
                            LK_MENU_ELEMENTS.AUTH_PAGE.path,
                        ) === -1 &&
                        location.hash !== "#/"
                    ) {
                        dispatch(logout(true));
                    } else {
                        if (action.type !== "GET_MY_DATA_PENDING") {
                            const userMessage =
                                error?.response?.data?.userMessage ||
                                "Во время обработки вашего запроса произошла ошибка. Пожалуйста, повторите запрос позже.";
                            dispatch(showSystemMessage(userMessage));
                        }
                    }
                }
                set(error, "config.__isRetryRequest", true);
                return Promise.reject(error);
            },
        );

        return next(action);
    };
};

export const axiosMiddlewareRequest = () => {
    return (next) => (action) => {
        if (!isIE11) {
            axios.interceptors.request.use((config) => {
                if (!getParameterByName("_", config.url)) {
                    let url = config.url;
                    try {
                        url = new URL(config.url);
                    } catch (e) {
                        url = new URL(location.origin + config.url);
                    }
                    config.url = `${config.url}${
                        url.search ? "&" : "?"
                    }_=${new Date().getTime()}`;
                }
                return config;
            });
        }
        return next(action);
    };
};
