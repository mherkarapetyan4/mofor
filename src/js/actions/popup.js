import { popupActions } from "config/actionsKeys";

export const showPopup = (title, component, data, options) => {
    return {
        type: popupActions.POPUP_SHOW,
        payload: { data, component, title, options },
    };
};

export const hidePopup = () => {
    return {
        type: popupActions.POPUP_HIDE,
    };
};
