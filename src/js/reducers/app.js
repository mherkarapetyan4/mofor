import { appKeyActions } from "config/actionsKeys";
import theme from "config/theme";

const initial = {
    showHelper: false,
    isFetching: false,
    fullLeftMenu: false,
    theme,
    userTheme: {
        id: "g0",
        backgroundImage: "imageOne",
        backgroundColor: theme.colors.gradients.gradientOne,
        color: theme.colors.background.gradientOne,
    },
};

export function app(state = initial, action) {
    switch (action.type) {
        case appKeyActions.TOGGLE_LEFT_MENU: {
            return {
                ...state,
                fullLeftMenu: action.payload,
            };
        }

        case appKeyActions.THEME: {
            return {
                ...state,
                theme,
            };
        }

        case appKeyActions.APP_START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case appKeyActions.APP_END_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case appKeyActions.SHOW_HELPERS: {
            return {
                ...state,
                showHelper: true,
            };
        }

        case appKeyActions.HIDE_HELPERS: {
            return {
                ...state,
                showHelper: false,
            };
        }

        case appKeyActions.CHANGE_APP_BACKGROUND: {
            return {
                ...state,
                userTheme: {
                    ...state.userTheme,
                    backgroundImage: action.payload,
                },
            };
        }

        case appKeyActions.CHANGE_USER_THEME: {
            return {
                ...state,
                userTheme: {
                    ...state.userTheme,
                    ...action.payload,
                },
            };
        }

        default:
            return state;
    }
}
