import axios from "axios";
import { myCalendarPath } from "config/paths";
import { calendarActions } from "config/actionsKeys";
import { startOfMonth, endOfMonth } from "utils/handleDate";
import dayjs from "dayjs";
import { endAppFetching, startAppFetching, showSuccessMessage } from "./app";

let from = startOfMonth(dayjs()).format("YYYY-MM-DD");
let to = endOfMonth(dayjs()).format("YYYY-MM-DD");
let size = 99999;
let number = 1;
let currentDay = dayjs().format("YYYY-MM-DD");

// const getCalendarCountPending = () => {
//     return {
//         type: calendarActions.GET_CALENDAR_COUNT_PENDING,
//     }
// };
//
// const getCalendarCountFullfilled = (payload) => {
//     return {
//         type: calendarActions.GET_CALENDAR_COUNT_FULLFILLED,
//         payload,
//     }
// };
//
// const getCalendarCountRejected = () => {
//     return {
//         type: calendarActions.GET_CALENDAR_COUNT_REJECTED,
//     }
// };

// export const getCalendarCount = (fromDate, toDate, groupBy) => {
//     return (dispatch) => {
//         dispatch(getCalendarCountPending());
//         axios.get(`${myCalendarPath.GET_CALENDAR_COUNTS}?fromDate=${fromDate}&toDate=${toDate}&groupBy=${groupBy}&_=1554115986755`)
//             .then(response => {
//                 dispatch(getCalendarCountFullfilled(response.data));
//             })
//             //.catch(() => dispatch(getCalendarCountRejected()))
//             .catch(() => dispatch(getCalendarCountRejected()))
//     }
// };

const getCalendarListFullfilled = (payload) => {
    return {
        type: calendarActions.GET_CALENDAR_LIST_FULLFILLED,
        payload,
    };
};

export const getCalendarList = ({
    params: { fromDate = from, toDate = to, name = "" },
    pageNumber = number,
    pageSize = size,
}) => {
    return (dispatch) => {
        from = fromDate;
        to = toDate;
        size = pageSize;
        number = pageNumber;
        dispatch(startAppFetching());
        axios
            .get(`${myCalendarPath.GET_CALENDAR_LIST}`, {
                params: {
                    pageSize,
                    pageNumber,
                    fromDate,
                    toDate,
                    name,
                },
            })
            .then((response) => {
                dispatch(getCalendarListFullfilled(response.data));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

const getCalendarListOfDayFullfilled = (payload) => {
    return {
        type: calendarActions.GET_CALENDAR_LIST_OF_DAY_FULLFILLED,
        payload,
    };
};

export const getCalendarListOfDay = (
    fromDate = currentDay,
    pageSize = 999999,
    pageNumber = 1,
) => {
    currentDay = fromDate;
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .get(
                `${myCalendarPath.GET_CALENDAR_LIST}?pageSize=${pageSize}&pageNumber=${pageNumber}&fromDate=${fromDate}&toDate=${fromDate}`,
            )
            .then((response) => {
                dispatch(getCalendarListOfDayFullfilled(response.data));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

const saveCalendarEventFullfilled = (payload) => {
    return {
        type: calendarActions.SAVE_CALENDAR_EVENT_FULLFILLED,
        payload,
    };
};

export const saveCalendarEvent = (params, onCloseFunc) => {
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${myCalendarPath.SAVE_CALENDAR_EVENT}`, params)
            .then((response) => {
                dispatch(showSuccessMessage("Событие сохранено!"));
                dispatch(saveCalendarEventFullfilled(response.data));
                dispatch(getCalendarList({ params: {} }));
                dispatch(getCalendarListOfDay());
                if (onCloseFunc) onCloseFunc();
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const getCalendarEventFullfilled = (payload = {}) => {
    return {
        type: calendarActions.GET_CALENDAR_EVENT_FULLFILLED,
        payload,
    };
};

export const getCalendarEvent = (id) => {
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .get(`${myCalendarPath.GET_CALENDAR_EVENT}?id=${id}`)
            .then((response) => {
                dispatch(getCalendarEventFullfilled(response.data));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

const deleteCalendarEventFullfilled = (payload) => {
    return {
        type: calendarActions.DELETE_CALENDAR_EVENT_FULLFILLED,
        payload,
    };
};

export const deleteCalendarEvent = (id, handleHide) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", id);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${myCalendarPath.DELETE_CALENDAR_EVENT}`, bodyFormData)
            .then((response) => {
                if (handleHide) handleHide();
                dispatch(deleteCalendarEventFullfilled(response.data));
                dispatch(getCalendarList({ params: {} }));
                dispatch(getCalendarListOfDay());
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};
