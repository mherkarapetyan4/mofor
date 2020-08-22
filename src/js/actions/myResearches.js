import axios from "axios";
import { myResearchedPaths } from "config/paths";
import { myResearchesActions } from "config/actionsKeys";
import {
    endAppFetching,
    startAppFetching,
    showSuccessMessage,
} from "actions/app";
import isEmpty from "lodash/isEmpty";
import { getPageSizeAndNumber } from "utils/getPageSizeAndNumber";
import { history } from "routes/history";
import { getExt } from "utils/checkFiles";

const getMyResearchesFullfilled = (payload) => {
    return {
        type: myResearchesActions.GET_MY_RESEARCHES_FULLFILLED,
        payload,
    };
};

const getMyPrintResearchesFullfilled = (payload) => {
    return {
        type: myResearchesActions.GET_MY_PRINT_RESEARCHES_FULLFILLED,
        payload,
    };
};

export const getMyResearches = ({
    params = {},
    pageNumber = 1,
    pageSize = 10,
    sortField = "EXECUTION_DATE",
    sortDirection = "DESC",
}) => {
    return (dispatch, getState) => {
        dispatch(startAppFetching());
        const pageSizeAndNumber = getPageSizeAndNumber(getState, `researches`, {
            pageNumber,
            pageSize,
        });
        const getParams = {
            pageNumber: pageSizeAndNumber.pageNumber,
            pageSize: pageSizeAndNumber.pageSize,
            sortField,
            sortDirection,
        };
        axios
            .get(myResearchedPaths.GET_RESEARCHES_LIST, {
                params: { ...params, ...getParams },
            })
            .then((response) => {
                dispatch(getMyResearchesFullfilled(response.data));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const getMyPrintResearches = ({
    params = {},
    sortField = "EXECUTION_DATE",
    sortDirection = "DESC",
}) => {
    return (dispatch) => {
        const getParams = {
            sortField,
            sortDirection,
        };
        axios
            .get(myResearchedPaths.GET_RESEARCHES_LIST, {
                params: {
                    pageNumber: 1,
                    pageSize: 999,
                    ...params,
                    ...getParams,
                },
            })
            .then((response) => {
                dispatch(getMyPrintResearchesFullfilled(response.data));
            })
            .catch(() => {
                return null;
            });
    };
};

export const getResearchFullfilled = (payload) => {
    return {
        type: myResearchesActions.MY_RESEARCHES_ELEMENT_FULLFILLED,
        payload,
    };
};

export const getResearch = (id) => {
    return (dispatch) => {
        dispatch(getResearchFullfilled({}));
        dispatch(startAppFetching());
        axios
            .get(`${myResearchedPaths.GET_RESEARCH}?id=${id}`)
            .then((response) => {
                dispatch(getResearchFullfilled(response.data));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};
export const deleteResearchElement = () => {
    return {
        type: myResearchesActions.DELETE_RESEARCHES_ELEMENT,
    };
};
export const addResearchElement = (payload) => {
    return {
        type: myResearchesActions.ADD_RESEARCH_ELEMENT,
        payload,
    };
};

export const deleteMyResearches = ({ id, filters }) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", id);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${myResearchedPaths.DELETE_RESEARCH}`, bodyFormData)
            .then(() => {
                dispatch(endAppFetching());
                dispatch(
                    getMyResearches({
                        params: filters,
                    }),
                );
                dispatch(
                    getMyPrintResearches({
                        params: filters,
                    }),
                );
                dispatch(getStatistics());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const addMyResearch = (params) => {
    const bodyFormData = new FormData();
    Object.keys(params).map((key) => {
        if (key === "files") {
            for (let i = 0; i < params.files.length; i++) {
                bodyFormData.append("files", params.files[i].originalFile);
            }
            return true;
        }
        return bodyFormData.append(key, params[key]);
    });
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${myResearchedPaths.ADD_RESEARCH}`, bodyFormData)
            .then(() => {
                dispatch(showSuccessMessage("Вы создали новый документ!"));
                dispatch(endAppFetching());
                dispatch(getMyResearches({}));
                history.goBack();
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const editMyResearch = (params) => {
    const bodyFormData = new FormData();
    Object.keys(params).map((key) => {
        return bodyFormData.append(key, params[key]);
    });
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${myResearchedPaths.EDIT_RESEARCH}`, bodyFormData)
            .then(() => {
                const callback = () => {
                    dispatch(getMyResearches({}));
                    history.goBack();
                };
                dispatch(endAppFetching());
                if (!isEmpty(params.files)) {
                    dispatch(addFiles(params, callback));
                } else {
                    callback();
                }
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const addFiles = (params, callback) => {
    const formData = new FormData();
    formData.append("surveyId", params.id);
    for (let i = 0; i < params.files.length; i++) {
        formData.append("files", params.files[i].originalFile);
    }
    formData.append(
        "mgfoms_sessionid",
        axios.defaults.headers["mgfoms_sessionid"],
    );

    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${myResearchedPaths.ADD_FILES}`, formData)
            .then(() => {
                dispatch(endAppFetching());
                callback();
                // dispatch(getMyResearches());
                //dispatch(getStatistics());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const deleteResearchFile = (
    id,
    handleHide = () => {},
    removeFile = () => {},
    clearPreview = () => {},
) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", id);
    return (dispatch) => {
        axios
            .post(`${myResearchedPaths.DELETE_RESEARCH_FILE}`, bodyFormData)
            .then(() => {
                dispatch(getStatistics());
                handleHide();
                removeFile();
                clearPreview();
            });
    };
};

export const getStatisticsFullfilled = (payload) => ({
    type: myResearchesActions.STATISTIC_FULLFILLED,
    payload,
});

export const getStatistics = () => {
    return (dispatch) => {
        axios.get(`${myResearchedPaths.GET_STATISTIC}`).then((response) => {
            dispatch(getStatisticsFullfilled(response.data));
        });
    };
};

export const showFileFullfilled = (payload, ext, additional) => {
    return {
        type: myResearchesActions.SHOW_FILE_FULLFILLED,
        payload,
        ext,
        additional,
    };
};

export const clearFile = () => ({
    type: myResearchesActions.CLEAR_FILE,
});

export const showTempFile = (file, width, height) => {
    return (dispatch) => {
        const newFile = window.URL.createObjectURL(new Blob([file]));
        dispatch(
            showFileFullfilled(newFile, getExt(file.name), { width, height }),
        );
    };
};

export const getTempFile = (file, name) => {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
};

export const showFile = (id, name) => {
    return (dispatch) => {
        // dispatch(myResearchesElementEndPending());
        axios({
            url: `${myResearchedPaths.GET_FILE}${id}`,
            method: "GET",
            responseType: "blob",
        }).then((response) => {
            // dispatch(myResearchesElementEndPending());
            const file = window.URL.createObjectURL(new Blob([response.data]));
            dispatch(showFileFullfilled(file, getExt(name)));
        });
        // .catch(() => dispatch(myResearchesElementEndPending()))
    };
};

// export const getFile = (id, name) => {
//     return () => {
//         axios({
//             url: `${myResearchedPaths.GET_FILE}${id}`,
//             method: "GET",
//             responseType: "blob",
//         }).then((response) => {
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", name);
//             document.body.appendChild(link);
//             link.click();
//         });
//     };
// };

// export const getZip = (id) => {
// window.open(`${BASE_URL}${myResearchedPaths.GET_ZIP}${id}`, "_blank");
// return (dispatch) => {
//     axios({
//         url: `${myResearchedPaths.GET_ZIP}${id}`,
//         method: 'GET',
//         responseType: 'blob',
//     })
//         .then(response => {
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             window.open(url);
//             // const link = document.createElement('a');
//             // link.href = url;
//             // link.setAttribute('download', name);
//             // document.body.appendChild(link);
//             // link.click();
//         })
//         .catch(() => null)
// }
// };
