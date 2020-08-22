import { popupActions } from "config/actionsKeys";

const initial = {
    show: false,
    title: "",
    component: null,
    data: null,
    options: {
        scrollable: true,
    },
};

export function popup(state = initial, action) {
    switch (action.type) {
        case popupActions.POPUP_SHOW:
            return {
                ...state,
                show: true,
                title: action.payload.title,
                component: action.payload.component,
                data: action.payload.data,
                options: action.payload.options
                    ? { ...action.payload.options }
                    : {
                          scrollable: true,
                      },
            };
        case popupActions.POPUP_HIDE:
            return {
                ...state,
                show: false,
                title: "",
                component: null,
                data: null,
                options: {},
            };
        default:
            return state;
    }
}
