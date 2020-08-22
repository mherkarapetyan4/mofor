import { appKeyActions } from "config/actionsKeys";
import { show } from "redux-modal";
import { modalName } from "config/consts";
import { widgetsPath } from "config/paths";
import axios from "axios";
import isEmpty from "lodash/isEmpty";

export const showSystemMessage = (systemMessage, timeToClose = 10000) => {
    return (dispatch) => {
        const action = show(modalName.SYSTEM_MESSAGE, {
            systemMessage,
            timeToClose,
        });
        dispatch(action);
    };
};

export const showSuccessMessage = (successMessage, timeToClose = 7000) => {
    return (dispatch) => {
        const action = show(modalName.SUCCESS_MESSAGE, {
            successMessage,
            timeToClose,
        });
        dispatch(action);
    };
};

export const startAppFetching = () => {
    return {
        type: appKeyActions.APP_START_FETCHING,
    };
};

export const endAppFetching = () => {
    return {
        type: appKeyActions.APP_END_FETCHING,
    };
};
export const isShowHelper = () => {
    return {
        type: appKeyActions.SHOW_HELPERS,
    };
};

export const isHideHelper = () => {
    return {
        type: appKeyActions.HIDE_HELPERS,
    };
};

export const saveUserTheme = (params) => {
    const data = JSON.stringify(params);

    axios.post(
        `${widgetsPath.WIDGETS_SAVE_DATA}?key=themeKey`,
        { json: data },
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
};

export const getUserTheme = () => {
    return (dispatch) => {
        axios
            .get(`${widgetsPath.WIDGETS_GET_DATA}?key=themeKey`)
            .then((response) => {
                if (!isEmpty(response.data)) {
                    dispatch(changeUserTheme(JSON.parse(response.data.json)));
                }
            });
    };
};

export const changeUserTheme = (payload) => ({
    type: appKeyActions.CHANGE_USER_THEME,
    payload,
});
