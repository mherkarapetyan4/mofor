import { adminActions, appKeyActions } from "config/actionsKeys";
const initial = {
    moBudget: {},
    adminIsAuth: false,
    isFetching: true,
    user: {},
    statisticsCounts: {},
    questioning: { draft: {}, pub_end: {}, data: {} },
    rules: {},
    usersList: {},
    statisticsCompleted: {},
    statisticsFeedBacks: {},
    statisticsAttachments: {},
    statisticsUnconfirmedServices: {},
    statisticsDispanserResults: {},
    wardsCountBySmo: {},
    smoAppealsCount: {},
    data: {},
    news: {},
    smoHotline: {},
    firstAvailRoute: "/",
    platforms: {},
};

export function admin(state = initial, action) {
    switch (action.type) {
        case adminActions.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case adminActions.END_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }
        case adminActions.GET_QUESTIONING_LIST_FULLFILLED: {
            return {
                ...state,
                questioning: {
                    ...state.questioning,
                    [action.objName]: action.payload,
                },
            };
        }
        case adminActions.GET_BUDGET_LIST_FULLFILLED: {
            return {
                ...state,
                moBudget: action.payload,
            };
        }
        case adminActions.GET_HOTLINE_LIST_FULLFILLED: {
            return {
                ...state,
                smoHotline: action.payload,
            };
        }
        case adminActions.GET_RULES_LIST_FULLFILLED: {
            return {
                ...state,
                rules: action.payload,
            };
        }
        case appKeyActions.ADMIN_IS_AUTH: {
            return {
                ...state,
                adminIsAuth: true,
                user: { ...action.payload },
            };
        }
        case adminActions.GET_STATISTIC_COUNT_FULLFILLED: {
            return {
                ...state,
                statisticsCounts: { ...action.payload },
            };
        }
        case adminActions.GET_USER_LIST_FULLFILLED: {
            return {
                ...state,
                usersList: { ...action.payload },
            };
        }
        case adminActions.GET_STATISTIC_FEED_BACKS_FULLFILLED: {
            return {
                ...state,
                statisticsFeedBacks: { ...action.payload },
            };
        }
        case adminActions.GET_STATISTIC_ATTACHMENTS_FULLFILLED: {
            return {
                ...state,
                statisticsAttachments: { ...action.payload },
            };
        }
        case adminActions.GET_STATISTIC_UNCONFIRMED_SERVICES_FULLFILLED: {
            return {
                ...state,
                statisticsUnconfirmedServices: { ...action.payload },
            };
        }
        case adminActions.GET_STATISTIC_DISPANSER_RESULTS_FULLFILLED: {
            return {
                ...state,
                statisticsDispanserResults: { ...action.payload },
            };
        }
        case adminActions.GET_QUESTIONING_STATISTIC_COMPLETED: {
            return {
                ...state,
                statisticsCompleted: { ...action.payload },
            };
        }
        case adminActions.GET_SYSTEM_LIST_FULLFILLED: {
            return {
                ...state,
                data: { ...action.payload },
            };
        }
        case adminActions.GET_NEWS_LIST_FULLFILLED: {
            return {
                ...state,
                news: { ...action.payload },
            };
        }
        case adminActions.GET_WARDS_COUNT_BY_SMO_FULLFILLED: {
            return {
                ...state,
                wardsCountBySmo: { ...action.payload },
            };
        }
        case adminActions.GET_SMO_APPEALS_COUNT_FULLFILLED: {
            return {
                ...state,
                smoAppealsCount: { ...action.payload },
            };
        }
        case adminActions.SET_FIRST_AVAIL_ROUTE: {
            return {
                ...state,
                firstAvailRoute: action.payload,
            };
        }
        case adminActions.GET_QUESTIONING_STATISTIC_FULL: {
            return {
                ...state,
                questioning: {
                    ...state.questioning,
                    data: action.payload,
                },
            };
        }
        case adminActions.GET_PLATFORM_STATS: {
            return {
                ...state,
                platforms: action.payload,
            };
        }
        default:
            return state;
    }
}
