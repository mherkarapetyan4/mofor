import axios from "axios";
import { vaccinationsPath } from "config/paths";
import { vaccinationActions } from "config/actionsKeys";
import { endAppFetching, startAppFetching } from "actions/app";

const getVaccinationsFulfilled = (payload) => {
    return {
        type: vaccinationActions.VACCINATIONS_FULLFILLED,
        payload,
    };
};

const getVaccinationsRejected = () => {
    return {
        type: vaccinationActions.VACCINATIONS_REJECTED,
    };
};

export const getVaccinationsCalendar = () => {
    return async (dispatch) => {
        await axios(vaccinationsPath.VACCINATIONS_GET_CALENDAR)
            .then((response) =>
                dispatch(getVaccinationsFulfilled(response.data)),
            )
            .catch(() => dispatch(getVaccinationsRejected()));
    };
};

const getVaccinationsPlainFulfilled = (payload) => {
    return {
        type: vaccinationActions.VACCINATIONS_PLAIN_FULLFILLED,
        payload,
    };
};

const getVaccinationsPlainRejected = () => {
    return {
        type: vaccinationActions.VACCINATIONS_PLAIN_REJECTED,
    };
};

export const getVaccinationsCalendarPlain = () => {
    return async (dispatch) => {
        await axios(vaccinationsPath.VACCINATIONS_GET_CALENDAR_PLAIN)
            .then((response) => {
                dispatch(getVaccinationsPlainFulfilled(response.data));
            })
            .catch(() => dispatch(getVaccinationsPlainRejected()));
    };
};

const getEpidemicListFulfilled = (payload) => {
    return {
        type: vaccinationActions.CONFIRMATION_EPIDEMIC_LIST_FULLFILLED,
        payload,
    };
};

const getEpidemicListRejected = () => {
    return {
        type: vaccinationActions.CONFIRMATION_EPIDEMIC_LIST_REJECTED,
    };
};

export const getEpidemicList = () => {
    return async (dispatch) => {
        await axios(vaccinationsPath.CONFIRMATION_EPIDEMIC_LIST)
            .then((response) =>
                dispatch(getEpidemicListFulfilled(response.data)),
            )
            .catch(() => dispatch(getEpidemicListRejected()));
    };
};

const getVaccinationEpidemicListFulfilled = (payload) => {
    return {
        type: vaccinationActions.VACCINATION_EPIDEMIC_LIST_FULLFILLED,
        payload,
    };
};

const getVaccinationEpidemicListRejected = () => {
    return {
        type: vaccinationActions.VACCINATION_EPIDEMIC_LIST_REJECTED,
    };
};

export const getVaccinationEpidemicList = () => {
    return async (dispatch) => {
        await axios(vaccinationsPath.VACCINATION_EPIDEMIC_LIST)
            .then((response) =>
                dispatch(getVaccinationEpidemicListFulfilled(response.data)),
            )
            .catch(() => dispatch(getVaccinationEpidemicListRejected()));
    };
};

export const saveConfirmationWithSurvey = (params, handleHide) => {
    const bodyFormData = new FormData();
    bodyFormData.append("eventId", params.eventId);
    bodyFormData.append("moName", params.moName);
    if (params.vaccineName)
        bodyFormData.append("vaccineName", params.vaccineName);
    bodyFormData.append("date", params.date);
    if (params.comment) bodyFormData.append("comment", params.comment);
    bodyFormData.append("availableToDoctor", params.availableToDoctor);
    Object.keys(params).map((key) => {
        if (key === "files") {
            for (let i = 0; i < params.files.length; i++) {
                bodyFormData.append("files", params.files[i].originalFile);
            }
            return true;
        }
    });
    bodyFormData.append("fileIdsToBeKept", params.fileIdsToBeKept);
    if (params.id && params.type === "epidemic")
        bodyFormData.append("id", params.id);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(
                params.type === "regular"
                    ? vaccinationsPath.SAVE_CONFIRMATION_WITH_SURVEY
                    : vaccinationsPath.SAVE_CONFIRMATION_EPIDEMIC_WITH_SURVEY,
                bodyFormData,
            )
            .then(() => {
                dispatch(getVaccinationsCalendar());
                dispatch(endAppFetching());
                handleHide();
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

// export const saveConfirmationEpidemicWithSurvey = (params, handleHide) => {
//     const bodyFormData = new FormData();
//     bodyFormData.append("eventId", params.eventId);
//     bodyFormData.append("moName", params.moName);
//     if (params.vaccineName)
//         bodyFormData.append("vaccineName", params.vaccineName);
//     bodyFormData.append("date", params.date);
//     if (params.comment) bodyFormData.append("comment", params.comment);
//     bodyFormData.append("availableToDoctor", params.availableToDoctor);
//     bodyFormData.append("files", params.files);
//     return (dispatch) => {
//         dispatch(startAppFetching());
//         axios
//             .post(
//                 vaccinationsPath.SAVE_CONFIRMATION_EPIDEMIC_WITH_SURVEY,
//                 bodyFormData,
//             )
//             .then(() => {
//                 dispatch(getVaccinationsCalendar());
//                 dispatch(endAppFetching());
//                 history.push({
//                     pathname: `${LK_MENU_ELEMENTS.VACCINATION_PAGE.path}`,
//                 });
//                 handleHide();
//             })
//             .catch(() => dispatch(endAppFetching()));
//     };
// };

export const deleteConfirmation = (eventId, handleHide) => {
    const bodyFormData = new FormData();
    bodyFormData.append("eventId", eventId);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(vaccinationsPath.DELETE_CONFIRMATION, bodyFormData)
            .then(() => {
                handleHide();
                dispatch(getVaccinationsCalendarPlain());
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const deleteEpidemicConfirmation = (id) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", id);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(vaccinationsPath.CONFIRMATION_EPIDEMIC_DELETE, bodyFormData)
            .then(() => {
                dispatch(getEpidemicList());
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

// export const downloadVaccinationReportPdf = () => {
//     return () => {
//         axios({
//             url: vaccinationsPath.VACCINATION_REPORT_PDF,
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

// export const downloadVaccinationCalendarPdf = () => {
//     return () => {
//         axios({
//             url: vaccinationsPath.VACCINATION_CALENDAR_PDF,
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
