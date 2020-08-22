import axios from "axios";
import { pregnancyActions } from "config/actionsKeys";
import { pregnancyPath } from "config/paths";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";

const startFetching = () => {
    return {
        type: pregnancyActions.START_FETCHING,
    };
};
const endFetching = () => {
    return {
        type: pregnancyActions.END_FETCHING,
    };
};
export const getCurrentPregnancyInfoFullFiled = (payload) => {
    return {
        type: pregnancyActions.CURRENT_INFO_FULFILLED,
        payload,
    };
};
export const getCurrentPregnancyInfo = (date = serverFormatDate(dayjs())) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${pregnancyPath.CURRENT_INFO}`, { params: { date } })
            .then((response) => {
                dispatch(getCurrentPregnancyInfoFullFiled(response.data));
                dispatch(endFetching());
            })
            .catch(() => {
                dispatch(endFetching());
            });
    };
};

const getHolidayListFullFiled = (payload) => {
    return {
        type: pregnancyActions.GET_HOLIDAY_INFO_FULFILLED,
        payload,
    };
};
export const getHolidayList = ({ params }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${pregnancyPath.HOLIDAY_LIST}`, {
                params: { date: params.date },
            })
            .then((response) => {
                dispatch(getHolidayListFullFiled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const checkUnreadMessagesFullFiled = (payload) => {
    return {
        type: pregnancyActions.CHECK_UNREAD_MESSAGES_FULFILLED,
        payload,
    };
};

export const checkUnreadMessages = () => {
    return (dispatch) => {
        axios
            .get(`/${pregnancyPath.CHECK_UNREAD_MESSAGES}`)
            .then((response) => {
                dispatch(checkUnreadMessagesFullFiled(response.data.exist));
            });
    };
};

export const getMessagesFullFiled = (payload) => {
    return {
        type: pregnancyActions.GET_MESSAGES_FULFILLED,
        payload,
    };
};
export const getMessages = () => {
    return (dispatch) => {
        dispatch(startChatFetching());
        dispatch(getMessagesFullFiled([]));
        axios
            .get(pregnancyPath.GET_MESSAGES)
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

const getEventsListFullFiled = (payload) => {
    return {
        type: pregnancyActions.GET_EVENTS_LIST_FULLFILLED,
        payload,
    };
};
export const getEventsList = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${pregnancyPath.CURRENT_EVENT_EVENT_LIST}`)
            .then((response) => {
                dispatch(getEventsListFullFiled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

const getIndicatorListFulFiled = (payload) => {
    return {
        type: pregnancyActions.GET_INDICATOR_LIST_FULFILLED,
        payload,
    };
};
export const getIndicatorList = (currentDate) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(pregnancyPath.CURRENT_INDICATOR_LIST, {
                params: {
                    date: serverFormatDate(currentDate),
                },
            })
            .then((response) => {
                dispatch(getIndicatorListFulFiled(response.data));
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

const getCurrentNotificationListFullFiled = (payload) => {
    return {
        type: pregnancyActions.GET_CURRENT_NOTIFICATION_LIST_FULLFIELD,
        payload,
    };
};
export const getCurrentNotification = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${pregnancyPath.CURRENT_NOTIFICATION_GET_DATA}`)
            .then((response) => {
                dispatch(getCurrentNotificationListFullFiled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getArticleSectionListFullFiled = (payload) => {
    return {
        type: pregnancyActions.GET_ARTICLE_SECTION_LIST,
        payload,
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
export const getArticleSectionList = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${pregnancyPath.ARTICLE_SECTION_LIST}`)
            .then((response) => {
                const fullTabsList = response.data;

                const tabsThatIsNotEmpty = fullTabsList.content.filter(
                    (item) => item.articlesCount !== 0,
                );
                dispatch(
                    getArticleSectionListFullFiled({
                        tabs: fullTabsList,
                        tabsThatIsNotEmpty: tabsThatIsNotEmpty,
                    }),
                );
                dispatch(endFetching());
            })
            .catch(() => {
                dispatch(endFetching());
            });
    };
};

const getArchiveListFullfield = (payload) => {
    return {
        type: pregnancyActions.GET_ARCHIVE_LIST,
        payload,
    };
};
export const getArchiveList = () => {
    return (dispatch) => {
        // dispatch(startFetching());
        axios.get(`/${pregnancyPath.ARCHIVE_LIST}`).then((response) => {
            dispatch(getArchiveListFullfield(response.data));
            // dispatch(endFetching());
        });
        // .catch(() => dispatch(endFetching()));
    };
};
export const getCurrentArticleList = ({
    params,
    pageNumber = 1,
    pageSize = 10,
}) => {
    return (dispatch) => {
        // dispatch(startFetching());
        if (params.sectionId === null) return false;
        axios
            .get(`/${pregnancyPath.CURRENT_ARTICLE_LIST}`, {
                params: { ...params, pageNumber, pageSize },
            })
            .then((response) => {
                dispatch(
                    getArticleSectionListFullFiled({ data: response.data }),
                );
                // dispatch(endFetching());
            });
        // .catch(() => {
        //     dispatch(endFetching());
        // });
    };
};

const getComplicationListFullfield = (payload) => {
    return {
        type: pregnancyActions.GET_COMPLICATION_LIST,
        payload,
    };
};
export const getComplicationList = ({
    params,
    pageNumber = 1,
    pageSize = 10,
}) => {
    return (dispatch) => {
        // dispatch(startFetching());
        axios
            .get(`/${pregnancyPath.COMPLICATION_LIST}`, {
                params: { ...params, pageNumber, pageSize },
            })
            .then((response) => {
                dispatch(getComplicationListFullfield(response.data));
                // dispatch(endFetching());
            });
        // .catch(() => dispatch(endFetching()));
    };
};

const getComplicationKindListFullfield = (payload) => {
    return {
        type: pregnancyActions.GET_COMPLICATION_KIND_LIST,
        payload,
    };
};
export const getComplicationKindList = () => {
    return (dispatch) => {
        // dispatch(startFetching());
        axios
            .get(`/${pregnancyPath.COMPLICATION_KIND_LIST}`)
            .then((response) => {
                dispatch(getComplicationKindListFullfield(response.data));
                // dispatch(endFetching());
            });
        // .catch(() => dispatch(endFetching()));
    };
};

export const addComplication = (params) => {
    const bodyFormData = new FormData();
    Object.keys(params).map((key) => {
        bodyFormData.append(key, params[key]);
    });
    return (dispatch) => {
        // dispatch(startFetching());
        axios
            .post(`/${pregnancyPath.ADD_COMPLICATION}`, bodyFormData)
            .then(() => {
                // dispatch(endFetching())
                dispatch(getComplicationList({}));
            });
        // .catch(() => dispatch(endFetching()));
    };
};

export const saveInitialValues = (params) => {
    const bodyFormData = new FormData();
    Object.keys(params).map((key) => {
        bodyFormData.append(key, params[key]);
    });
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${pregnancyPath.SAVE_INITIAL_VALUES}`, bodyFormData)
            .then(() => {
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

const fillCurrentScreening = (payload) => ({
    type: pregnancyActions.FILL_CURRENT_SCREENING,
    payload,
});

export const getCurrentScreening = () => {
    return (dispatch) => {
        axios
            .get(`/${pregnancyPath.GET_CURRENT_SCREENING}`)
            .then((response) => {
                dispatch(fillCurrentScreening(response.data));
            });
    };
};

const fillAskDoctors = (payload) => ({
    type: pregnancyActions.FILL_ASK_DOCTORS,
    payload,
});
export const getAskDoctors = () => {
    return (dispatch) => {
        axios.get(`/${pregnancyPath.GET_ASK_DOCTORS}`).then((response) => {
            dispatch(fillAskDoctors(response.data));
        });
    };
};
const startChatFetching = () => {
    return {
        type: pregnancyActions.START_CHAT_FETCHING,
    };
};

const endChatFetching = () => {
    return {
        type: pregnancyActions.END_CHAT_FETCHING,
    };
};

export const sendPregnancyReportByEmail = ({ fromDate, toDate }) => {
    return () =>
        axios.get(pregnancyPath.SEND_PREGNANCY_REPORT_BY_EMAIL, {
            params: { fromDate, toDate },
        });
};

export const sendMessage = (message) => {
    const bodyFormData = new FormData();
    bodyFormData.append("text", message);

    return (dispatch) => {
        axios
            .post(pregnancyPath.SEND_MESSAGE, bodyFormData)
            .then(() => {
                dispatch(getMessages());
            })
            .catch(() => null);
    };
};

export const checkPregnancyEmail = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(pregnancyPath.CHECK_PREGNANCY_EMAIL)
            .then((response) => {
                const confirmed = response.data?.confirmed;
                if (confirmed) {
                    resolve();
                } else {
                    reject();
                }
            })
            .catch(() => reject());
    });
};
