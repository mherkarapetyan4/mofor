import { pregnancyActions } from "config/actionsKeys";

const initial = {
    isFetching: false,
    currentInfo: {},
    holiday: {},
    events: {},
    indicator: {},
    notifications: {},
    archiveList: {},
    usefulArticle: {
        tabs: {},
        tabsThatIsNotEmpty: [],
        data: {},
    },
    complicationList: {},
    complicationKindList: {},
    chat: {
        messages: [],
        isFetching: false,
        messageExist: false,
    },
    currentScreening: {},
    askDoctors: {},
};

export function pregnancy(state = initial, action) {
    switch (action.type) {
        case pregnancyActions.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case pregnancyActions.END_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }
        case pregnancyActions.CHECK_UNREAD_MESSAGES_FULFILLED: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    messageExist: action.payload,
                },
            };
        }
        case pregnancyActions.GET_MESSAGES_FULFILLED: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    messages: action.payload,
                },
            };
        }
        case pregnancyActions.CURRENT_INFO_FULFILLED: {
            return {
                ...state,
                currentInfo: action.payload,
            };
        }
        case pregnancyActions.GET_HOLIDAY_INFO_FULFILLED: {
            return {
                ...state,
                holiday: action.payload,
            };
        }
        case pregnancyActions.GET_EVENTS_LIST_FULLFILLED: {
            return {
                ...state,
                events: { ...action.payload },
            };
        }
        case pregnancyActions.GET_CURRENT_NOTIFICATION_LIST_FULLFIELD: {
            return {
                ...state,
                notifications: { ...action.payload },
            };
        }
        case pregnancyActions.GET_INDICATOR_LIST_FULFILLED: {
            return {
                ...state,
                indicator: { ...action.payload },
            };
        }
        case pregnancyActions.GET_ARCHIVE_LIST: {
            return {
                ...state,
                archiveList: { ...action.payload },
            };
        }
        case pregnancyActions.GET_ARTICLE_SECTION_LIST: {
            return {
                ...state,
                usefulArticle: {
                    ...state.usefulArticle,
                    ...action.payload,
                },
            };
        }
        case pregnancyActions.GET_COMPLICATION_LIST: {
            return {
                ...state,
                complicationList: { ...action.payload },
            };
        }
        case pregnancyActions.GET_COMPLICATION_KIND_LIST: {
            return {
                ...state,
                complicationKindList: { ...action.payload },
            };
        }
        case pregnancyActions.START_CHAT_FETCHING: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    isFetching: true,
                },
            };
        }
        case pregnancyActions.END_CHAT_FETCHING: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    isFetching: false,
                },
            };
        }
        case pregnancyActions.FILL_ASK_DOCTORS: {
            return {
                ...state,
                askDoctors: {
                    ...action.payload,
                    // required: false,
                    // count: 1
                },
            };
        }
        case pregnancyActions.FILL_CURRENT_SCREENING: {
            return {
                ...state,
                currentScreening: action.payload,
            };
        }

        default:
            return state;
    }
}
