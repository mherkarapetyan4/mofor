import axios from "axios";
import { pillboxPaths } from "config/paths";
import { myPillboxActions } from "config/actionsKeys";
import {
    endAppFetching,
    startAppFetching,
    showSuccessMessage,
} from "actions/app";
// import { history } from "routes/history";
// import {isEmpty} from "modules/validators";
// import get from "lodash/get";
// import {getCalendarList} from "actions/calendar";

const startPending = () => {
    return {
        type: myPillboxActions.START_PENDING,
    };
};

const endPending = () => {
    return {
        type: myPillboxActions.END_PENDING,
    };
};

const getPillboxListFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_MY_PILLBOX_LIST_FULLFILLED,
        payload,
    };
};

const getCurrentPillboxFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_MY_CURRENT_PILLBOX_FULLFILLED,
        payload,
    };
};

const clearPillboxEmail = () => {
    return {
        type: myPillboxActions.CLEAR_EMAIL_PILLBOX,
    };
};

const clearCurrentPillbox = () => {
    return {
        type: myPillboxActions.CLEAR_CURRENT_PILLBOX,
    };
};

export const getCurrentPillbox = (id, handleHide) => {
    return (dispatch) => {
        dispatch(startPending());
        dispatch(clearCurrentPillbox());
        dispatch(clearPillboxEmail());
        axios
            .get(pillboxPaths.GET_CURRENT_PILLBOX + "?id=" + id)
            .then((response) => {
                dispatch(getCurrentPillboxFullfilled(response.data));
                if (handleHide) handleHide();
            })
            .catch(() => dispatch(endPending()));
    };
};

const fillDefaultPillboxId = (payload) => {
    return {
        type: myPillboxActions.FILL_DEFAULT_PILLBOX_ID,
        payload,
    };
};

export const getPillboxList = (id = null) => {
    return (dispatch) => {
        dispatch(startPending());
        axios
            .get(pillboxPaths.GET_PILLBOX_LIST)
            .then((response) => {
                dispatch(getPillboxListFullfilled(response.data.content));
                if (!id) {
                    const defaultProfileId = response.data.content.find(
                        (obj) => obj.byDefault,
                    ).id;
                    dispatch(fillDefaultPillboxId(defaultProfileId));
                    dispatch(getCurrentPillbox(defaultProfileId));
                } else {
                    dispatch(getCurrentPillbox(id));
                }
            })
            .catch(() => dispatch(endPending()));
    };
};

export const deleteProfile = (profileId, onCloseFunc = () => {}) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", profileId);
    return (dispatch) => {
        dispatch(startPending());
        axios
            .post(pillboxPaths.DELETE_PROFILE, bodyFormData) //
            .then(() => {
                dispatch(endPending());
                onCloseFunc();
                dispatch(getPillboxList());
            })
            .catch(() => dispatch(endPending()));
    };
};

export const addProfileAllergens = (payload) => {
    const bodyFormData = new FormData();
    bodyFormData.append("name", payload.name);
    bodyFormData.append("code", payload.code);
    bodyFormData.append("type", payload.type);
    bodyFormData.append("uniqueId", payload.uniqueId);
    bodyFormData.append("profileId", payload.profileId);
    bodyFormData.append("displayName", payload.displayName);
    return (dispatch) => {
        dispatch(startPending());
        axios
            .post(pillboxPaths.ADD_PROFILE_ALLERGEN, bodyFormData)
            .then(() => {
                dispatch(endPending());
                dispatch(getCurrentPillbox(payload.profileId));
            })
            .catch(() => dispatch(endPending()));
    };
};

export const deleteProfileAllergen = (id, profileId) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("profileId", profileId);
    return (dispatch) => {
        dispatch(startPending());
        axios
            .post(pillboxPaths.DELETE_PROFILE_ALLERGEN, formData)
            .then(() => {
                dispatch(endPending());
                dispatch(getCurrentPillbox(profileId));
            })
            .catch(() => dispatch(endPending()));
    };
};

export const addProfileDiseases = (payload) => {
    const bodyFormData = new FormData();
    bodyFormData.append("name", payload.name);
    bodyFormData.append("code", payload.code);
    bodyFormData.append("type", payload.type);
    bodyFormData.append("uniqueId", payload.uniqueId);
    bodyFormData.append("profileId", payload.profileId);
    bodyFormData.append("displayName", payload.displayName);
    return (dispatch) => {
        dispatch(startPending());
        axios
            .post(pillboxPaths.ADD_PROFILE_DISEASE, bodyFormData)
            .then(() => {
                dispatch(endPending());
                dispatch(getCurrentPillbox(payload.profileId));
            })
            .catch(() => dispatch(endPending()));
    };
};

export const deleteProfileDiseases = (id, profileId) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("profileId", profileId);
    return (dispatch) => {
        dispatch(startPending());
        axios
            .post(pillboxPaths.DELETE_PROFILE_DISEASE, formData) //
            .then(() => {
                dispatch(endPending());
                dispatch(getCurrentPillbox(profileId));
            })
            .catch(() => dispatch(endPending()));
    };
};

const getPillboxScreeningFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_MY_PILLBOX_SCREENING_FULLFILLED,
        payload,
    };
};
//
export const getPillboxScreeningResult = (id) => {
    return (dispatch) => {
        dispatch(getPillboxScreeningFullfilled({}));
        dispatch(startPending());
        axios
            .get(pillboxPaths.GET_PILLBOX_SCREENING + "?id=" + id)
            .then((response) => {
                dispatch(getPillboxScreeningFullfilled(response.data));
            })
            .catch(() => dispatch(endPending()));
    };
};
//
export const getPillboxDoScreening = (id) => {
    return (dispatch) => {
        dispatch(startPending());
        const bodyFormData = new FormData();
        bodyFormData.append("id", id);
        axios
            .post(pillboxPaths.GET_PILLBOX_DOSCREENING, bodyFormData, {
                withCredentials: true,
            })
            .then((response) => {
                dispatch(getScreeningResultCounts());
                dispatch(getPillboxScreeningFullfilled(response.data));
                dispatch(getCurrentPillbox(id));
            })
            .catch(() => dispatch(endPending()));
    };
};
//
export const getScreeningHtml = (id, callback) => {
    axios
        .get(pillboxPaths.GET_SCREENING_RESULT_HTML + "?id=" + id)
        .then((response) => {
            const doc = document.createElement("div");
            doc.innerHTML = response.data.html;
            const header = doc.getElementsByClassName("HeaderContainer");
            if (header[0]) header[0].remove();
            const style = doc.getElementsByTagName("style");
            if (style[0]) style[0].remove();
            callback(doc.innerHTML);
        });
};
//
const getDrugListFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_DRUG_LIST,
        payload,
    };
};

export const getDrugList = (query, profileId) => {
    return (dispatch) => {
        dispatch(startPending());
        axios
            .get(
                pillboxPaths.GET_DRUG_LIST +
                    "?query=" +
                    query +
                    `&pageSize=10${profileId ? `&profileId=${profileId}` : ``}`,
            )
            .then((response) => {
                dispatch(getDrugListFullfilled(response.data));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};
//
const getScreeningResultCountsFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_SCREENING_RESULT_COUNTS,
        payload,
    };
};
//
export const getScreeningResultCounts = () => {
    return (dispatch) => {
        dispatch(startPending());
        axios
            .get(pillboxPaths.GET_SCREENING_RESULT_COUNTS)
            .then((response) => {
                dispatch(getScreeningResultCountsFullfilled(response.data));
            })
            .catch(() => dispatch(endPending()));
    };
};

const savePillboxPending = () => {
    return {
        type: myPillboxActions.SAVE_MY_PILLBOX_PENDING,
    };
};
//
// // const savePillboxFullfilled = (payload) => {
// //     return {
// //         type: myPillboxActions.SAVE_MY_PILLBOX_FULLFILLED,
// //         payload,
// //     }
// // };
//
const savePillboxRejected = () => {
    return {
        type: myPillboxActions.SAVE_MY_PILLBOX_REJECTED,
    };
};

export const savePillbox = (params, callback = () => {}) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", params.id);
    bodyFormData.append("name", params.name);
    bodyFormData.append("birthday", params.birthday);
    bodyFormData.append("sex", params.sex);
    bodyFormData.append("pregnancy", params.pregnancy);
    bodyFormData.append("lactation", params.lactation);
    if (params.remindersEmail)
        bodyFormData.append("remindersEmail", params.remindersEmail);
    if (params.confirmationsEmail)
        bodyFormData.append("confirmationsEmail", params.confirmationsEmail);
    bodyFormData.append("owner", params.owner);
    bodyFormData.append("policy", params.policy);
    if (params.sendRemindersToUser)
        bodyFormData.append("sendRemindersToUser", params.sendRemindersToUser);
    if (params.sendConfirmationsToUser)
        bodyFormData.append(
            "sendConfirmationsToUser",
            params.sendConfirmationsToUser,
        );
    return (dispatch) => {
        dispatch(savePillboxPending());
        axios
            .post(pillboxPaths.SAVE_PILLBOX, bodyFormData)
            .then((response) => {
                if (!params.id)
                    dispatch(showSuccessMessage("Профиль таблетницы создан!"));
                dispatch(getPillboxList(response.data.id));
                callback();
            })
            .catch(() => dispatch(savePillboxRejected()));
    };
};

export const savePillboxDrug = ({
    params,
    handleHide = () => {},
    isCalendar = false,
}) => {
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(pillboxPaths.SAVE_PILLBOX_DRUG, params)
            .then(() => {
                dispatch(showSuccessMessage("Курс приема лекарства сохранен!"));
                handleHide();
                if (!isCalendar) {
                    dispatch(getPillboxDrugs({ params: params.profileId }));
                    dispatch(getCurrentPillbox(params.profileId));
                } else {
                    // dispatch(getCalendarList());
                }
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

// const getPillboxFullPending = () => {
//     return {
//         type: myPillboxActions.GET_MY_PILLBOX_PENDING,
//     }
// };
//
// const getPillboxFullfilled = (payload) => {
//     return {
//         type: myPillboxActions.GET_MY_PILLBOX_FULLFILLED,
//         payload,
//     }
// };
//
// const getPillboxRejected = () => {
//     return {
//         type: myPillboxActions.GET_MY_PILLBOX_REJECTED,
//     }
// };
//
// export const getPillbox = (id) => {
//     return (dispatch) => {
//         dispatch(getPillboxFullPending());
//         axios.get(`${pillboxPaths.GET_PILLBOX}?id=${id}&_=1554469373654`)
//             .then(response => {
//                 dispatch(getPillboxFullfilled(response.data));
//             })
//             .catch(() => dispatch(getPillboxRejected()))
//     }
// };

const getPillboxDrugsPending = () => {
    return {
        type: myPillboxActions.GET_MY_PILLBOX_DRUGS_LIST_PENDING,
    };
};

const getPillboxDrugsFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_MY_PILLBOX_DRUGS_LIST_FULLFILLED,
        payload,
    };
};

const getPillboxDrugsRejected = () => {
    return {
        type: myPillboxActions.GET_MY_PILLBOX_DRUGS_LIST_REJECTED,
    };
};

export const getPillboxDrugs = ({ params, pageNumber = 1, pageSize = 999 }) => {
    return (dispatch) => {
        dispatch(getPillboxDrugsPending());
        axios
            .get(pillboxPaths.GET_PILLBOX_DRUGS_LIST, {
                params: {
                    pageSize,
                    pageNumber,
                    profileId: params.profileId,
                },
            })
            .then((response) => {
                dispatch(getPillboxDrugsFullfilled(response.data));
            })
            .catch(() => dispatch(getPillboxDrugsRejected()));
    };
};

const getCalendarListDrugsFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_CALENDAR_DRUG_LIST_FULLFILLED,
        payload,
    };
};

export const getCalendarDrugsList = (fromDate, toDate, profileId) => {
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .get(pillboxPaths.GET_CALENDAR_DRUGS_LIST, {
                params: { fromDate, toDate, profileId, pageSize: 999 },
            })
            .then((response) => {
                dispatch(getCalendarListDrugsFullfilled(response.data));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

const getInstructionListPending = () => {
    return {
        type: myPillboxActions.GET_INSTRUCTION_LIST_PENDING,
    };
};

const getInstructionListFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_INSTRUCTION_LIST_FULLFILLED,
        payload,
    };
};

const getInstructionListRejected = () => {
    return {
        type: myPillboxActions.GET_INSTRUCTION_LIST_REJECTED,
    };
};

export const getInstructionList = (code) => {
    return (dispatch) => {
        dispatch(getInstructionFullfilled(""));
        dispatch(getInstructionListFullfilled([]));
        dispatch(getInstructionListPending());
        axios
            .get(
                `${pillboxPaths.GET_DRUG_INSTRUCTION_LIST}?type=DispensableDrug&code=${code}`,
            )
            .then((response) => {
                if (response.data.content.length === 1) {
                    dispatch(
                        getInstructionListFullfilled(response.data.content),
                    );
                }
                // } else {
                //     history.goBack();
                // }
            })
            .catch(() => dispatch(getInstructionListRejected()));
    };
};

const getInstructionPending = () => {
    return {
        type: myPillboxActions.GET_INSTRUCTION_PENDING,
    };
};

const getInstructionFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_INSTRUCTION_FULLFILLED,
        payload,
    };
};

const getInstructionRejected = () => {
    return {
        type: myPillboxActions.GET_INSTRUCTION_REJECTED,
    };
};

export const getInstruction = (code) => {
    return (dispatch) => {
        dispatch(getInstructionFullfilled(""));
        dispatch(getInstructionPending());
        axios
            .get(`${pillboxPaths.GET_DRUG_INSTRUCTION}?code=${code}`)
            .then((response) => {
                const doc = document.createElement("div");
                doc.innerHTML = response.data.html;
                const header = doc.getElementsByClassName("HeaderContainer");
                if (header[0]) header[0].remove();
                const style = doc.getElementsByTagName("style");
                if (style[0]) style[0].remove();
                dispatch(getInstructionFullfilled(doc.innerHTML));
            })
            .catch(() => dispatch(getInstructionRejected()));
    };
};
// //
// // export const getInstructionByDrugCode = (code) => {
// //     return (dispatch) => {
// //         dispatch(getInstructionListPending());
// //         axios.get(`${pillboxPaths.GET_DRUG_INSTRUCTION_LIST}?type=DispensableDrug&code=${code}`)
// //             .then(response => {
// //                 // if (!isEmpty(getInstruction(response.data.content))) {
// //                     dispatch(getInstruction(response.data.content[0].code));
// //                 // }
// //             })
// //             .catch(() => dispatch(getInstructionListRejected()))
// //     }
// // };
// //
const getDrugFormDosingUnitFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_DRUG_FORM_DOSING_UNIT,
        payload,
    };
};

export const getDrugFormDosingUnit = () => {
    return (dispatch) => {
        dispatch(getPillboxDrugsPending());
        axios
            .get(`${pillboxPaths.GET_DRUG_FORM_DOSING_UNIT}`)
            .then((response) => {
                dispatch(getDrugFormDosingUnitFullfilled(response.data));
            })
            .catch(() => dispatch(getPillboxDrugsRejected()));
    };
};

const getDosingUnitlistFullfilled = (payload) => {
    return {
        type: myPillboxActions.GET_DOSING_UNIT_LIST,
        payload,
    };
};

export const getDosingUnitlist = () => {
    return (dispatch) => {
        dispatch(getPillboxDrugsPending());
        axios
            .get(`${pillboxPaths.GET_DOSING_UTILS_LIST}`)
            .then((response) => {
                const data = response.data.content.map((e) => ({
                    value: e.id,
                    label: e.displayName,
                }));
                dispatch(getDosingUnitlistFullfilled(data));
            })
            .catch(() => dispatch(getPillboxDrugsRejected()));
    };
};

// const deletePillboxDrugPending = () => {
//     return {
//         type: myPillboxActions.DELETE_MY_PILLBOX_DRUG_PENDING,
//     }
// };
//
// const deletePillboxDrugFullfilled = (payload) => {
//     return {
//         type: myPillboxActions.DELETE_MY_PILLBOX_DRUG_FULLFILLED,
//         payload,
//     }
// };
//
// const deletePillboxDrugRejected = () => {
//     return {
//         type: myPillboxActions.DELETE_MY_PILLBOX_DRUG_REJECTED,
//     }
// };

export const deletePillboxDrug = (id, profileId) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", id);
    return (dispatch) => {
        // dispatch(deletePillboxDrugPending());
        axios.post(pillboxPaths.DELETE_PILLBOX_DRUG, bodyFormData).then(() => {
            // dispatch(deletePillboxDrugFullfilled(response.data));
            // dispatch(getCurrentPillbox(profileId));
            dispatch(getPillboxDrugs({ params: { profileId } }));
        });
        // .catch(() => dispatch(deletePillboxDrugRejected()))
    };
};
// //
// // export const changeConfirmDrug = (id, courseId, currentDate, confirmed, profileId, handleHide) => {
// //     const bodyFormData = new FormData();
// //     bodyFormData.append('id', id);
// //     bodyFormData.append('courseId', courseId);
// //     bodyFormData.append('date', currentDate.format('YYYY-MM-DD HH:mm:ss'));
// //     bodyFormData.append('confirmed', confirmed);
// //     return (dispatch) => {
// //         dispatch(startPending());
// //         axios.post(pillboxPaths.CHANGE_CONFIRM_DRUG, bodyFormData)
// //             .then(() => {
// //                 handleHide();
// //                 dispatch(endPending());
// //                 const fromDate = currentDate.startOf('week').format('YYYY-MM-DD');
// //                 const toDate = currentDate.endOf('week').format('YYYY-MM-DD');
// //                 dispatch(getCalendarDrugsList(fromDate, toDate, profileId));
// //             })
// //             .catch(() => {
// //                 handleHide();
// //                 dispatch(endPending());
// //             })
// //     }
// // };
// //

export const changeConfirmDrug = ({
    currentDate,
    id,
    courseId,
    date,
    confirmed,
    profileId,
}) => {
    const bodyFormData = new FormData();
    id ? bodyFormData.append("id", id) : null;
    courseId ? bodyFormData.append("courseId", courseId) : null;
    bodyFormData.append("date", date);
    bodyFormData.append("confirmed", confirmed);
    return (dispatch) => {
        dispatch(startPending());
        axios
            .post(pillboxPaths.CHANGE_CONFIRM_DRUG, bodyFormData)
            .then(() => {
                // handleHide();
                dispatch(endPending());
                const fromDate = currentDate
                    .startOf("week")
                    .format("YYYY-MM-DD");
                const toDate = currentDate.endOf("week").format("YYYY-MM-DD");
                dispatch(getCalendarDrugsList(fromDate, toDate, profileId));
            })
            .catch(() => {
                // handleHide();
                dispatch(endPending());
            });
    };
};

export const doctorVisited = (profileId) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", profileId);
    return (dispatch) => {
        dispatch(startPending());
        axios
            .post(pillboxPaths.DOCTOR_VISITED, bodyFormData)
            .then(() => {
                dispatch(getCurrentPillbox(profileId));
            })
            .catch(() => dispatch(endPending()));
    };
};
// //
// // export const emailScreening = (id, profileId) => {
// //     const bodyFormData = new FormData();
// //     bodyFormData.append('id', id);
// //     return (dispatch) => {
// //         dispatch(startPending());
// //         axios.post(pillboxPaths.EMAIL_SCREENING, bodyFormData)
// //             .then(() => {
// //                 dispatch(getPillboxDrugs(profileId));
// //             })
// //             .catch(() => dispatch(endPending()))
// //     }
// // };
// //
// // export const getEmailScreening = (id) => {
// //     return (dispatch) => {
// //         dispatch(startPending());
// //         axios.get(pillboxPaths.EMAIL_SCREENING + '?id=' + id)
// //             .then(() => {
// //                 dispatch(endPending())
// //             })
// //             .catch(() => dispatch(endPending()))
// //     }
// // };

const fillCourseDetails = (payload) => {
    return {
        type: myPillboxActions.FILL_COURSE_DETAILS,
        payload,
    };
};

export const getCourseDetails = (id) => {
    return (dispatch) => {
        dispatch(startPending());
        dispatch(fillCourseDetails({}));
        axios
            .get(pillboxPaths.GET_DRUG_COURSE + "?id=" + id)
            .then((response) => {
                dispatch(fillCourseDetails(response.data));
                dispatch(endPending());
            });
    };
};

// // export function getSeverityLevel(severity) {
// //     const severityCode = parseInt(get(severity, 'code'), 10);
// //
// //     switch (severityCode) {
// //         // Contraindication SeverityLevel
// //         case 23468:
// //             return 1;
// //         case 23467:
// //             return 2;
// //         case 23466:
// //             return 3;
// //         case 23465:
// //             return 4;
// //         case 23464:
// //             return 5;
// //
// //         // Interactions SeverityLevel
// //         case 1:
// //             return 1;
// //         case 2:
// //             return 3;
// //         case 3:
// //             return 5;
// //
// //         default:
// //             return 0;
// //     }
// // }
// //
// // export function getSeverityMod(level) {
// //     switch (level) {
// //         case 0:
// //             //return 'green'
// //             return '#008000';
// //         case 1:
// //             //return 'light_blue'
// //             return '#ADD8E6';
// //         case 2:
// //             //return 'blue'
// //             return '#0000ff';
// //         case 3:
// //             //return 'yellow'
// //             return '#FFFF00';
// //         case 4:
// //             //return 'orange'
// //             return '#ffa500';
// //         case 5:
// //             //return 'red'
// //             return '#FF0000';
// //         default:
// //             //return 'blue'
// //             return '#0000ff';
// //     }
// // }
// //
const checkEmailPillboxFullfilled = (payload, mailType) => {
    return {
        type: myPillboxActions.CHECK_EMAIL_PILLBOX_FULLFILLED,
        payload,
        mailType,
    };
};

export const checkEmail = (email, mailType) => {
    return (dispatch) => {
        dispatch(startPending());
        axios
            .get(`${pillboxPaths.PILLBOX_CHECK_EMAIL}?address=${email}`)
            .then((response) => {
                dispatch(checkEmailPillboxFullfilled(response.data, mailType));
                dispatch(endPending());
            })
            .catch(() => dispatch(endPending()));
    };
};

export const sendEmailCode = (email, mailType) => {
    if (!email) return;
    const bodyFormData = new FormData();
    bodyFormData.append("address", email);
    return (dispatch) => {
        dispatch(startPending());
        axios
            .post(`${pillboxPaths.PILLBOX_SEND_CODE_EMAIL}`, bodyFormData)
            .then((response) => {
                dispatch(checkEmailPillboxFullfilled(response.data, mailType));
                dispatch(endPending());
            })
            .catch(() => dispatch(endPending()));
    };
};
