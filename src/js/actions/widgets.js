import axios from "axios";
import { endAppFetching, startAppFetching } from "actions/app";
import {
    widgetsPath,
    allergyPath,
    meteoPath,
    userPath,
    dispanserPath,
    vaccinationsPath,
} from "config/paths";
import { authFullfilled } from "actions/auth";
import {
    widgetActions,
    allergiesActions,
    meteoActions,
    userActions,
    dispanserActions,
    vaccinationActions,
} from "config/actionsKeys";

const startWidgetsPillboxFetching = () => {
    return {
        type: widgetActions.START_WIDGETS_PILLBOX_FETCHING,
    };
};

const endWidgetsPillboxFetching = () => {
    return {
        type: widgetActions.END_WIDGETS_PILLBOX_FETCHING,
    };
};

const getWidgetsDataFulfilled = (payload) => {
    return {
        type: widgetActions.WIDGETS_DATA_FULFILLED,
        payload,
    };
};

const getWidgetsDataRejected = () => {
    return {
        type: widgetActions.WIDGETS_DATA_REJECTED,
    };
};

const setCalendarList = (payload, field) => ({
    type: widgetActions.WIDGETS_GET_CALENDAR_LIST,
    payload,
    field,
});

export const getWidgets = () => {
    return async (dispatch) => {
        await axios(widgetsPath.WIDGETS_GET_DATA)
            .then((response) => {
                dispatch(getWidgetsDataFulfilled(response.data));
            })
            .catch(() => {
                dispatch(getWidgetsDataRejected());
            });
    };
};

const saveWidgetDataFulfilled = () => {
    return {
        type: widgetActions.WIDGETS_SAVE_DATA_FULFILLED,
    };
};

const saveWidgetDataRejected = () => {
    return {
        type: widgetActions.WIDGETS_SAVE_DATA_REJECTED,
    };
};

export const saveWidgets = (data) => {
    return async (dispatch) => {
        await axios
            .post(`${widgetsPath.WIDGETS_SAVE_DATA}`, data)
            .then(() => dispatch(saveWidgetDataFulfilled()))
            .catch(() => dispatch(saveWidgetDataRejected()));
    };
};

export const getCalendarList = (
    { fromDate, toDate },
    pageSize,
    pageNumber,
    field,
) => async (dispatch) => {
    try {
        dispatch(startAppFetching());
        const response = await axios.get(
            `${widgetsPath.CALENDAR_GET_LIST}?pageSize=${pageSize}&pageNumber=${pageNumber}&fromDate=${fromDate}&toDate=${toDate}`,
        );
        dispatch(setCalendarList(response.data, field));
    } finally {
        dispatch(endAppFetching());
    }
};

const setWidgetsPillboxDrugsList = (payload) => {
    return {
        type: widgetActions.WIDGETS_PILLBOX_DRUGS_LIST,
        payload,
    };
};

export const getWidgetsPillboxDrugsList = ({ fromDate, toDate, profileId }) => {
    return (dispatch) => {
        dispatch(startWidgetsPillboxFetching());
        axios
            .get(
                `${widgetsPath.GET_PILLBOX_DRUGS_LIST}?fromDate=${fromDate}&toDate=${toDate}&profileId=${profileId}`,
            )
            .then((response) => {
                dispatch(setWidgetsPillboxDrugsList(response.data.content));
                dispatch(endWidgetsPillboxFetching());
            })
            .catch(() => dispatch(endWidgetsPillboxFetching()));
    };
};

const getAllergiesFullfilled = (payload) => ({
    type: allergiesActions.ALLERGY_DATA_FULFILLED,
    payload,
});

const getAllergiesRejected = () => ({
    type: allergiesActions.ALLERGY_DATA_REJECTED,
});

export const getAllergies = () => {
    return (dispatch) => {
        axios
            .get(allergyPath.ALLERGY_GET_DATA)
            .then((response) => {
                dispatch(getAllergiesFullfilled(response.data));
                dispatch(authFullfilled());
            })
            .catch(() => {
                dispatch(getAllergiesRejected());
            });
    };
};

const getMeteoFullfilled = (payload) => ({
    type: meteoActions.METEO_DATA_FULFILLED,
    payload,
});

const getMeteoRejected = () => ({
    type: meteoActions.METEO_DATA_REJECTED,
});

export const getMeteo = (full) => {
    return (dispatch) => {
        axios
            .get(`${meteoPath.METEO_GET_DATA}${full ? "?full=true" : ""}`)
            .then((response) => {
                dispatch(getMeteoFullfilled(response.data));
                dispatch(authFullfilled());
            })
            .catch(() => {
                dispatch(getMeteoRejected());
            });
    };
};

const getUserNotificationsFulfilled = (payload) => {
    return {
        type: userActions.NOTIFICATIONS_FULFILLED,
        payload,
    };
};

const getUserNotificationsRejected = () => {
    return {
        type: userActions.NOTIFICATIONS_REJECTED,
    };
};

export const getUserNotifications = (pageSize = 3, pageNumber = 1) => {
    return async (dispatch) => {
        await axios(
            `${userPath.NOTIFICATIONS_GET_DATA}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        )
            .then((response) =>
                dispatch(getUserNotificationsFulfilled(response.data)),
            )
            .catch(() => dispatch(getUserNotificationsRejected()));
    };
};

const getDispanserFullfilled = (payload) => {
    return {
        type: dispanserActions.DISPANSER_FULFILLED,
        payload,
    };
};

const getDispanserRejected = () => {
    return {
        type: dispanserActions.DISPANSER_REJECTED,
    };
};

export const getDispanserState = () => {
    return (dispatch) => {
        axios
            .get(dispanserPath.GET_DISPANSER_DATA)
            .then((response) => {
                dispatch(getDispanserFullfilled(response.data));
            })
            .catch(() => {
                dispatch(getDispanserRejected());
            });
    };
};

export const saveDispanserAnswers = (items) => {
    return (dispatch) => {
        axios
            .post(dispanserPath.SAVE_DISPANSER_ANSWERS, { items })
            .then(() => {
                dispatch(getDispanserState());
            })
            .catch(() => {
                return null;
            });
    };
};

// export const downloadDispanserForm = (id) => {
//     return () => {
//         axios({
//             url: `${dispanserPath.DOWNLOAD_DISPANSER_FORM}?id=${id}`,
//             method: "GET",
//             responseType: "blob",
//         })
//             .then((response) => {
//                 const url = window.URL.createObjectURL(
//                     new Blob([response.data]),
//                 );
//                 const link = document.createElement("a");
//                 link.href = url;
//                 link.setAttribute("download", "file.pdf");
//                 document.body.appendChild(link);
//                 link.click();
//             })
//             .catch(() => {
//                 return null;
//             });
//     };
// };

const getVaccinationWidgetInfoFullfilled = (payload) => {
    return {
        type: vaccinationActions.WIDGET_FULFILLED,
        payload,
    };
};

export const getVaccinationWidgetInfo = () => {
    return (dispatch) => {
        axios
            .get(`${vaccinationsPath.VACCINATION_WIDGET}`)
            .then((response) => {
                dispatch(getVaccinationWidgetInfoFullfilled(response.data));
            })
            .catch(() => {
                return null;
            });
    };
};

const getChildWidgetInfoFullfilled = (payload) => {
    return {
        type: dispanserActions.CHILD_WIDGET_FULFILLED,
        payload,
    };
};

export const getChildWidgetInfo = () => {
    return (dispatch) => {
        axios
            .get(`${dispanserPath.CHILD_DISPANSER_WIDGET}`)
            .then((response) => {
                dispatch(getChildWidgetInfoFullfilled(response.data));
            })
            .catch(() => {
                return null;
            });
    };
};
