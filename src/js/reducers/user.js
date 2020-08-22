import { appKeyActions, userActions } from "config/actionsKeys";

const initial = {
    isAuth: false,
    isAuthLoading: false,
    showLoginByUkl: false,
    subProfiles: [],
    vital: {},
    actual: {},
    questionary: {},
    settings: {},
    phoneIsRequired: false,
};

export function user(state = initial, action) {
    switch (action.type) {
        case userActions.CHANGE_SET_LOGIN_BY_UKL: {
            return {
                ...state,
                showLoginByUkl: action.payload,
            };
        }

        case userActions.SET_PHONE_REQUIRED_KEY: {
            return {
                ...state,
                phoneIsRequired: action.payload,
            };
        }

        case appKeyActions.START_AUTH_PENDING: {
            return {
                ...state,
                isAuthLoading: true,
            };
        }

        case appKeyActions.END_AUTH_PENDING: {
            return {
                ...state,
                isAuthLoading: false,
            };
        }

        case appKeyActions.AUTH_FULLFILLED: {
            return {
                ...state,
                isAuth: true,
            };
        }

        case userActions.SUB_PROFILES: {
            return {
                ...state,
                subProfiles: action.payload,
            };
        }
        case userActions.VITAL_FULFILLED: {
            return {
                ...state,
                vital: action.payload,
            };
        }

        case userActions.ACTUAL_FULFILLED:
            return {
                ...state,
                actual: action.payload,
            };

        case userActions.QUESTIONARY_FULFILLED:
            return {
                ...state,
                questionary: action.payload,
            };

        case userActions.FILL_CLIENT_SETTINGS: {
            return {
                ...state,
                settings: action.payload,
            };
        }

        default:
            return state;
    }
}
