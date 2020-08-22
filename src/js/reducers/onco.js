import { oncoActions } from "config/actionsKeys";

const initial = {
    isFetching: false,
    currentInfo: {},
    archiveList: {},
    indicator: {},
    notifications: {},
    askDoctors: {},
    chat: {
        messages: [],
        isFetching: false,
        messageExist: false,
    },
    events: {},
};

export function onco(state = initial, action) {
    switch (action.type) {
        case oncoActions.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case oncoActions.END_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }
        case oncoActions.CURRENT_INFO_FULFILLED: {
            return {
                ...state,
                currentInfo: action.payload,
            };
        }
        case oncoActions.GET_ARCHIVE_LIST: {
            return {
                ...state,
                archiveList: { ...action.payload },
            };
        }
        case oncoActions.GET_INDICATOR_LIST_FULFILLED: {
            return {
                ...state,
                indicator: { ...action.payload },
            };
        }
        case oncoActions.GET_CURRENT_NOTIFICATION_LIST_FULLFIELD: {
            return {
                ...state,
                notifications: { ...action.payload },
            };
        }
        case oncoActions.START_CHAT_FETCHING: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    isFetching: true,
                },
            };
        }
        case oncoActions.GET_MESSAGES_FULFILLED: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    messages: action.payload,
                },
            };
        }
        case oncoActions.END_CHAT_FETCHING: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    isFetching: false,
                },
            };
        }
        case oncoActions.FILL_ASK_DOCTORS: {
            return {
                ...state,
                askDoctors: {
                    ...action.payload,
                    // required: false,
                    // count: 1
                },
            };
        }
        case oncoActions.CHECK_UNREAD_MESSAGES_FULFILLED: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    messageExist: action.payload,
                },
            };
        }
        case oncoActions.GET_EVENTS_LIST_FULLFILLED: {
            return {
                ...state,
                events: { ...action.payload },
            };
        }
        default:
            return state;
    }
}
