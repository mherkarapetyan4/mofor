import { anchorPopupActions } from "config/actionsKeys";

const initial = {
    show: false,
    position: {
        x: 0,
        y: 0,
    },
    title: null,
    data: null,
    size: {
        w: 0,
        h: 0,
    },
    place: "left",
};

export function anchorPopup(state = initial, action) {
    switch (action.type) {
        case anchorPopupActions.SHOW: {
            return {
                ...state,
                show: true,
                position: {
                    x: action.payload.position.x,
                    y: action.payload.position.y,
                },
                title: action.payload.title,
                data: action.payload.component,
                size: action.payload.size,
                place: action.payload.place,
            };
        }

        case anchorPopupActions.HIDE: {
            return {
                ...state,
                show: false,
                component: null,
            };
        }

        default:
            return state;
    }
}
