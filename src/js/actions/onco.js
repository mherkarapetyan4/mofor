import axios from "axios";
import { oncoPath } from "config/paths";
import { oncoActions } from "config/actionsKeys";

const startFetching = () => ({
    type: oncoActions.START_FETCHING,
});

const endFetching = () => ({
    type: oncoActions.END_FETCHING,
});

export const getCurrentOncoInfoFullFiled = (payload) => ({
    type: oncoActions.CURRENT_INFO_FULFILLED,
    payload,
});

const getArchiveListFullField = (payload) => ({
    type: oncoActions.GET_ARCHIVE_LIST,
    payload,
});

export const checkOncoEmail = async () => {
    let confirmed;
    try {
        const response = await axios.get(oncoPath.CHECK_ONCO_EMAIL);
        confirmed = Boolean(response.data?.confirmed);
    } catch (e) {
        confirmed = false;
    }
    return confirmed;
};

export const getCurrentOncoInfo = () => async (dispatch) => {
    dispatch(startFetching());
    try {
        const response = await axios.get(oncoPath.CURRENT_INFO);
        dispatch(getCurrentOncoInfoFullFiled(response.data));
    } finally {
        dispatch(endFetching());
    }
};

export const saveInitialValues = (params) => {
    const bodyFormData = new FormData();
    Object.keys(params).map((key) => {
        bodyFormData.append(key, params[key]);
    });
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            await axios.post(`/${oncoPath.SAVE_INITIAL_VALUES}`, bodyFormData);
        } finally {
            dispatch(endFetching());
        }
    };
};

export const getArchiveList = () => async (dispatch) => {
    try {
        const response = await axios.get(`/${oncoPath.ARCHIVE_LIST}`);
        dispatch(getArchiveListFullField(response.data));
    } catch (e) {
        console.log(e);
    }
};

const getIndicatorListFulFiled = (payload) => {
    return {
        type: oncoActions.GET_INDICATOR_LIST_FULFILLED,
        payload,
    };
};
export const getIndicatorList = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(oncoPath.CURRENT_INDICATOR_LIST, { params: { count: 5 } })
            .then((response) => {
                dispatch(getIndicatorListFulFiled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

const getCurrentNotificationListFullFiled = (payload) => {
    return {
        type: oncoActions.GET_CURRENT_NOTIFICATION_LIST_FULLFIELD,
        payload,
    };
};
export const getCurrentNotification = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${oncoPath.CURRENT_NOTIFICATION_GET_DATA}`)
            .then((response) => {
                dispatch(getCurrentNotificationListFullFiled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const notificationActionHandler = (params, path) => {
    const bodyFormData = new FormData();
    Object.keys(params).map((key) => {
        bodyFormData.append(key, params[key]);
    });
    return (dispatch) => {
        // dispatch(startFetching());
        axios.post(`/${path}`, bodyFormData).then(() => {
            dispatch(getCurrentNotification());
            // dispatch(endFetching());
        });
        // .catch(() => dispatch(endFetching()));
    };
};

export const sendOncoReportByEmail = ({ fromDate, toDate }) => {
    return () => {
        axios.get(oncoPath.SEND_PREGNANCY_REPORT_BY_EMAIL, {
            params: { fromDate, toDate },
        });
    };
};

export const getMessagesFullFiled = (payload) => {
    return {
        type: oncoActions.GET_MESSAGES_FULFILLED,
        payload,
    };
};
export const getMessages = () => {
    return (dispatch) => {
        dispatch(startChatFetching());
        dispatch(getMessagesFullFiled([]));
        axios
            .get(oncoPath.GET_MESSAGES)
            .then((response) => {
                dispatch(getMessagesFullFiled(response.data.content));
                dispatch(checkUnreadMessagesFullFiled(true));
                dispatch(endChatFetching());
            })
            .catch(() => {
                dispatch(endChatFetching());
            });
    };
};

const startChatFetching = () => {
    return {
        type: oncoActions.START_CHAT_FETCHING,
    };
};

const endChatFetching = () => {
    return {
        type: oncoActions.END_CHAT_FETCHING,
    };
};

export const checkUnreadMessagesFullFiled = (payload) => {
    return {
        type: oncoActions.CHECK_UNREAD_MESSAGES_FULFILLED,
        payload,
    };
};

export const checkUnreadMessages = () => {
    return (dispatch) => {
        axios.get(`/${oncoPath.CHECK_UNREAD_MESSAGES}`).then((response) => {
            dispatch(checkUnreadMessagesFullFiled(response.data.exist));
        });
    };
};

const fillAskDoctors = (payload) => ({
    type: oncoActions.FILL_ASK_DOCTORS,
    payload,
});
export const getAskDoctors = () => {
    return (dispatch) => {
        axios.get(`/${oncoPath.GET_ASK_DOCTORS}`).then((response) => {
            dispatch(fillAskDoctors(response.data));
        });
    };
};

export const sendMessage = (message) => {
    const bodyFormData = new FormData();
    bodyFormData.append("text", message);

    return (dispatch) => {
        axios
            .post(oncoPath.SEND_MESSAGE, bodyFormData)
            .then(() => {
                dispatch(getMessages());
            })
            .catch(() => null);
    };
};

const getEventsListFullFiled = (payload) => {
    return {
        type: oncoActions.GET_EVENTS_LIST_FULLFILLED,
        payload,
    };
};
export const getEventsList = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${oncoPath.CURRENT_EVENT_EVENT_LIST}`)
            .then((response) => {
                dispatch(getEventsListFullFiled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const eventActionHandler = (params, path) => {
    const bodyFormData = new FormData();
    Object.keys(params).map((key) => {
        bodyFormData.append(key, params[key]);
    });
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${path}`, bodyFormData)
            .then(() => {
                dispatch(getEventsList());
                // dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};
