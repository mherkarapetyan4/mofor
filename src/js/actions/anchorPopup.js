import { anchorPopupActions } from "config/actionsKeys";

export const show = (data) => {
    return {
        type: anchorPopupActions.SHOW,
        payload: {
            position: data.position,
            component: data.component,
            title: data.title,
            size: data.size,
            place: data.place,
        },
    };
};

export const hide = () => {
    return {
        type: anchorPopupActions.HIDE,
    };
};
