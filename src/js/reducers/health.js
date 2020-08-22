import { healthActions } from "config/actionsKeys";

const initial = {
    widgets: {
        existing: [],
        available: [],
        isFetching: false,
    },
};

/*HEALTH_TYPES.map((item) => {
    initial[item.type] = undefined;
});*/

export function health(state = initial, action) {
    switch (action.type) {
        case healthActions.SET_IS_FETCHING: {
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    isFetching: action.payload,
                },
            };
        }
        case healthActions.GET_HEALTH_DATA_PENDING: {
            return {
                ...state,
                [action.healthType]: {
                    ...state[action.healthType],
                    loading: true,
                },
            };
        }

        case healthActions.GET_HEALTH_DATA_FULLFILLED: {
            return {
                ...state,
                [action.healthType]: {
                    ...action.payload,
                    loading: false,
                },
            };
        }

        case healthActions.GET_HEALTH_DATA_REJECTED: {
            return {
                ...state,
                [action.healthType]: {
                    ...state[action.healthType],
                    loading: false,
                },
            };
        }

        case healthActions.SAVE_HEALTH_DATA_PENDING: {
            return {
                ...state,
                loading: true,
            };
        }

        case healthActions.SAVE_HEALTH_DATA_FULLFILLED: {
            return {
                ...state,
                loading: false,
            };
        }

        case healthActions.SAVE_HEALTH_DATA_REJECTED: {
            return {
                ...state,
                loading: false,
            };
        }

        case healthActions.DELETE_HEALTH_DATA_PENDING: {
            return {
                ...state,
                loading: true,
            };
        }

        case healthActions.DELETE_HEALTH_DATA_FULLFILLED: {
            return {
                ...state,
                loading: false,
            };
        }

        case healthActions.DELETE_HEALTH_DATA_REJECTED: {
            return {
                ...state,
                loading: false,
            };
        }

        case healthActions.SAVE_TARGET_HEALTH_DATA_PENDING: {
            return {
                ...state,
                loading: true,
            };
        }

        case healthActions.SAVE_TARGET_HEALTH_DATA_FULLFILLED: {
            return {
                ...state,
                loading: false,
            };
        }

        case healthActions.SAVE_TARGET_HEALTH_DATA_REJECTED: {
            return {
                ...state,
                loading: false,
            };
        }

        case healthActions.GET_TARGET_HEALTH_DATA_PENDING: {
            return {
                ...state,
                loading: true,
            };
        }

        case healthActions.GET_TARGET_HEALTH_DATA_FULLFILLED: {
            return {
                ...state,
                target: action.payload,
                loading: false,
            };
        }

        case healthActions.GET_TARGET_HEALTH_DATA_REJECTED: {
            return {
                ...state,
                loading: false,
            };
        }

        case healthActions.SET_AVAILABLE_HEALTH_WIDGETS: {
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    available: action.payload.filter(
                        (widget) =>
                            !state.widgets.existing.find(
                                (exW) => exW === widget.type,
                            ),
                    ),
                },
            };
        }

        case healthActions.SET_EXISTING_HEALTH_WIDGETS: {
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    existing: action.payload,
                },
            };
        }

        case healthActions.ADD_WIDGET: {
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    existing: [...state.widgets.existing, action.payload],
                },
            };
        }

        case healthActions.REMOVE_WIDGET: {
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    existing: state.widgets.existing.filter(
                        (widget) => widget !== action.payload,
                    ),
                },
            };
        }

        default:
            return state;
    }
}
