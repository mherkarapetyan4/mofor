import axios from "axios";
// import {servicesPaths} from 'config/paths';
import { adminActions, appKeyActions } from "config/actionsKeys";
import { adminLogin, adminPaths } from "config/paths";
import { endAppFetching, startAppFetching } from "actions/app";
import { ADMIN_ELEMENTS } from "config/menu";
import { history } from "routes/history";
import { getPageSizeAndNumber } from "utils/getPageSizeAndNumber";
import dayjs from "dayjs";
// import isEmpty from "lodash/isEmpty";
import { showSystemMessage } from "actions/app";

const getBudgetListFullFilled = (payload) => {
    return {
        type: adminActions.GET_BUDGET_LIST_FULLFILLED,
        payload,
    };
};
export const startFetching = () => {
    return {
        type: adminActions.START_FETCHING,
    };
};
const endFetching = () => {
    return {
        type: adminActions.END_FETCHING,
    };
};

export const downloadBudgetList = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${adminPaths.GET_BUDGET_LIST}/upload`, {
                headers: { Cookie: "" },
            })
            .then(() => {
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getBudgetList = ({ pageNumber, pageSize, params }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_BUDGET_LIST}/list`, {
                params: { pageNumber, pageSize, ...params },
            })
            .then((response) => {
                dispatch(getBudgetListFullFilled({ data: response.data }));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

const getStatisticCountFullfilled = (payload) => {
    return {
        type: adminActions.GET_STATISTIC_COUNT_FULLFILLED,
        payload,
    };
};

const getStatisticFeedBacksFullFilled = (payload) => {
    return {
        type: adminActions.GET_STATISTIC_FEED_BACKS_FULLFILLED,
        payload,
    };
};

const getStatisticAttachmentsFullFilled = (payload) => {
    return {
        type: adminActions.GET_STATISTIC_ATTACHMENTS_FULLFILLED,
        payload,
    };
};

const getStatisticUnconfirmedServicesFullFilled = (payload) => {
    return {
        type: adminActions.GET_STATISTIC_UNCONFIRMED_SERVICES_FULLFILLED,
        payload,
    };
};

const getStatisticDispanserResultsFullFilled = (payload) => {
    return {
        type: adminActions.GET_STATISTIC_DISPANSER_RESULTS_FULLFILLED,
        payload,
    };
};

const getSystemListFullFilled = (payload) => {
    return {
        type: adminActions.GET_SYSTEM_LIST_FULLFILLED,
        payload,
    };
};
const getUserListFullFilled = (payload) => {
    return {
        type: adminActions.GET_USER_LIST_FULLFILLED,
        payload,
    };
};

const getQuestioningListFullFilled = (payload, objName = "draft") => {
    return {
        type: adminActions.GET_QUESTIONING_LIST_FULLFILLED,
        payload,
        objName,
    };
};

export const getQuestioningDetailFull = (params) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(adminPaths.GET_QUESTIONING_DETAIL_FULL, { params })
            .then(({ data }) => {
                dispatch(getQuestioningListFullFilled(data, "detailFull"));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};
export const getPBDUser = (params) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(adminPaths.GET_PBD_USER, { params })
            .then(({ data }) => {
                dispatch(getQuestioningListFullFilled(data, "PBDUser"));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};
export const getQuestioningStatisticCompleted = (params) => {
    return (dispatch) => {
        axios
            .get(adminPaths.GET_QUESTIONING_STATISTIC_COMPLETED, { params })
            .then(({ data }) => {
                dispatch(
                    getQuestioningListFullFilled(data, "statisticsCompleted"),
                );
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

const setQuestioningStatisticFull = (payload) => ({
    type: adminActions.GET_QUESTIONING_STATISTIC_FULL,
    payload,
});

export const getQuestioningList = ({
    params,
    pageNumber = 1,
    pageSize = 10,
}) => {
    return (dispatch) => {
        dispatch(startFetching());
        const sendParams = params.states.map((e) => `states=${e}`).join("&");
        axios
            .get(
                `/${adminPaths.GET_QUESTIONING_LIST}?pageNumber=${pageNumber}&pageSize=${pageSize}&${sendParams}`,
            )
            .then((response) => {
                dispatch(
                    getQuestioningListFullFilled(response.data, params.action),
                );
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const createQuestioning = (data, path) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        bodyFormData.append(key, data[key]);
    });
    return async (dispatch) => {
        try {
            await axios.post(path, bodyFormData);
            await dispatch(
                getQuestioningList({
                    params: { states: ["DRAFT"], action: "draft" },
                }),
            );
            history.push(ADMIN_ELEMENTS.QUESTIONING.path);
        } finally {
            dispatch(endFetching());
        }
    };
};

export const saveFullQuestioning = (data, getParams) => {
    return (dispatch) => {
        axios
            .post(`${adminPaths.SAVE_FULL_QUESTIONING}`, data)
            .then(() => {
                history.push(ADMIN_ELEMENTS.QUESTIONING.path);
                getParams.map((e) => {
                    dispatch(getQuestioningList({ params: e }));
                });
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const actionWithQuestionary = (path, data, getParams) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        bodyFormData.append(key, data[key]);
    });
    return (dispatch) => {
        axios.post(`/${path}`, bodyFormData).then(() => {
            getParams.map((e) => {
                dispatch(getQuestioningList({ params: e }));
            });
        });
    };
};

export const actionGetQuestioningStatisticFull = (id) => async (dispatch) => {
    dispatch(startFetching());
    try {
        const response = await axios.get(
            `/${adminPaths.GET_QUESTIONING_STATISTIC_FULL}?id=${id}`,
        );
        const {
            countsByAgeAndSex,
            countsBySex,
            completionsCount,
            questions,
        } = response.data;
        dispatch(
            setQuestioningStatisticFull({
                countsByAgeAndSex,
                countsBySex,
                completionsCount,
                questions,
            }),
        );
    } finally {
        dispatch(endFetching());
    }
};

export const getQuestioningFull = (id) => async (dispatch) => {
    dispatch(startFetching());
    try {
        const { data } = await axios.get(
            `/${adminPaths.GET_FULL_QUESTIONING}?id=${id}`,
        );
        return {
            ...data.questionary,
            plannedEndDate: dayjs(data.questionary.plannedEndDate),
            questions: data.questions,
            author: data.author,
        };
    } finally {
        dispatch(endFetching());
    }
};

const getRolesListFullFiled = (payload) => {
    return {
        type: adminActions.GET_RULES_LIST_FULLFILLED,
        payload,
    };
};

export const getStatisticCount = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_STATISTIC_COUNT}`)
            .then((response) => {
                dispatch(getStatisticCountFullfilled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getUsersList = ({
    pageNumber = null,
    pageSize = null,
    params,
} = {}) => {
    return (dispatch, getState) => {
        dispatch(startFetching());
        const pageSizeAndNumber = getPageSizeAndNumber(
            getState,
            `admin.usersList`,
            {
                pageNumber,
                pageSize,
            },
        );
        const getParams = {
            pageNumber: pageSizeAndNumber.pageNumber,
            pageSize: pageSizeAndNumber.pageSize,
        };
        axios
            .get(`/${adminPaths.GET_USERS_LIST}`, {
                params: { ...getParams, ...params },
            })
            .then((response) => {
                dispatch(getUserListFullFilled({ data: response.data }));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getRolesList = (pageNumber = 1, pageSize = 10) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_ROLES_LIST}`, {
                params: { pageNumber, pageSize },
            })
            .then((response) => {
                dispatch(getRolesListFullFiled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const saveUser = (data, callback) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        if (key === "role") {
            bodyFormData.append("role.id", data[key]);
            return true;
        }
        bodyFormData.append(key, data[key]);
    });

    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${adminPaths.SAVE_USER}`, bodyFormData)
            .then(() => {
                dispatch(getUsersList());
                dispatch(endFetching());
                callback();
            })
            .catch(() => {
                dispatch(endFetching());
            });
    };
};

export const getStatisticFeedBacks = ({ pageNumber, pageSize, params }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_STATISTIC_FEED_BACKS}`, {
                params: { pageNumber, pageSize, ...params },
            })
            .then((response) => {
                dispatch(getStatisticFeedBacksFullFilled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getStatisticAttachments = ({ pageNumber, pageSize, params }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_STATISTIC_ATTACHMENTS}`, {
                params: { pageNumber, pageSize, ...params },
            })
            .then((response) => {
                dispatch(getStatisticAttachmentsFullFilled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getStatisticDispanserResults = ({
    pageNumber,
    pageSize,
    params,
}) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_STATISTIC_DISPANSER_RESULTS}`, {
                params: { pageNumber, pageSize, ...params },
            })
            .then((response) => {
                dispatch(getStatisticDispanserResultsFullFilled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};
export const getStatisticUnconfirmedServices = ({
    pageNumber,
    pageSize,
    params,
}) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_STATISTIC_UNCONFIRMED_SERVICES}`, {
                params: { pageNumber, pageSize, ...params },
            })
            .then((response) => {
                dispatch(
                    getStatisticUnconfirmedServicesFullFilled(response.data),
                );
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getSystemLists = ({ params, pageNumber = 1, pageSize = 10 }) => {
    return (dispatch, getState) => {
        dispatch(startFetching());
        const pageSizeAndNumber = getPageSizeAndNumber(getState, `admin`, {
            pageNumber,
            pageSize,
        });
        const getParams = {
            pageNumber: pageSizeAndNumber.pageNumber,
            pageSize: pageSizeAndNumber.pageSize,
        };
        axios
            .get(`/${adminPaths.GET_SYSTEM_LIST}`, {
                params: { ...getParams, ...params },
            })
            .then((response) => {
                dispatch(getSystemListFullFilled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

const getNewsListFullFilled = (payload) => {
    return {
        type: adminActions.GET_NEWS_LIST_FULLFILLED,
        payload,
    };
};

export const getNewsList = ({ pageNumber = 1, pageSize = 10, params = {} }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_NEWS_LIST}`, {
                params: { pageNumber, pageSize, ...params },
            })
            .then((response) => {
                dispatch(getNewsListFullFilled({ data: response.data }));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const createOrUpdateNews = (data) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        bodyFormData.append(key, data[key]);
    });
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${adminPaths.SAVE_NEWS}`, bodyFormData)
            .then(() => {
                dispatch(getNewsList({}));
                history.push(ADMIN_ELEMENTS.UPDATES.path);
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const deleteNews = (data) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        bodyFormData.append(key, data[key]);
    });
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${adminPaths.DELETE_NEWS}`, bodyFormData)
            .then(() => {
                dispatch(getNewsList({}));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const publishNews = (data) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        bodyFormData.append(key, data[key]);
    });
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${adminPaths.PUBLISH_NEWS}`, bodyFormData)
            .then(() => {
                dispatch(getNewsList({}));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const unpublishNews = (data) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        bodyFormData.append(key, data[key]);
    });
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${adminPaths.UNPUBLISH_NEWS}`, bodyFormData)
            .then(() => {
                dispatch(getNewsList({}));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const authUserSuccess = (user) => {
    return {
        type: appKeyActions.ADMIN_IS_AUTH,
        payload: user,
    };
};

export const logIn = (username, password) => {
    return (dispatch) => {
        dispatch(startAppFetching());
        const bodyFormData = new FormData();
        bodyFormData.append("email", username);
        bodyFormData.append("password", password);
        axios.post(adminLogin.LOG_IN, bodyFormData).then((response) => {
            if (response.data.id) {
                axios.defaults.headers["mgfoms-admin-session"] =
                    response.data.id;
                history.push(ADMIN_ELEMENTS.STATISTIC_PAGE.path);
                dispatch(authUserSuccess(response.data.user));
                localStorage.setItem(
                    "adminUserInfo",
                    JSON.stringify(response.data),
                );
            } else {
                dispatch(showSystemMessage("Неверная связка логин/пароль!"));
            }
            dispatch(endAppFetching());
        });
    };
};

export const adminLogout = () => {
    return () => {
        axios
            .get(adminLogin.LOG_OUT)
            .then(() => document.location.reload(true));
    };
};

const getHotlineListFullFilled = (payload) => {
    return {
        type: adminActions.GET_HOTLINE_LIST_FULLFILLED,
        payload,
    };
};

export const getHotlineList = ({ pageNumber, pageSize, params }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_HOTLINE_LIST}/list`, {
                params: { pageNumber, pageSize, ...params },
            })
            .then((response) => {
                dispatch(getHotlineListFullFilled({ data: response.data }));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const downloadHotlineList = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(`/${adminPaths.GET_HOTLINE_LIST}/upload`, {
                headers: { Cookie: "" },
            })
            .then(() => {
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const setFirstAvailRoute = (firstAvailRoute) => (dispatch) => {
    dispatch({
        type: adminActions.SET_FIRST_AVAIL_ROUTE,
        payload: firstAvailRoute,
    });
};

const getWardsCountBySmoFullfilled = (payload) => {
    return {
        type: adminActions.GET_WARDS_COUNT_BY_SMO_FULLFILLED,
        payload,
    };
};

export const getWardsCountBySmo = ({ params }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_WARDS_COUNT_BY_SMO}`, { params })
            .then((response) => {
                dispatch(getWardsCountBySmoFullfilled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

const getSmoAppealsCountFullfilled = (payload) => {
    return {
        type: adminActions.GET_SMO_APPEALS_COUNT_FULLFILLED,
        payload,
    };
};

export const getSmoAppealsCount = ({ params }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_SMO_APPEALS_COUNT}`, { params })
            .then((response) => {
                dispatch(getSmoAppealsCountFullfilled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};

const getPlatformStatsFullfilled = (payload) => {
    return {
        type: adminActions.GET_PLATFORM_STATS,
        payload,
    };
};

export const getPlatformStats = (params) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(`/${adminPaths.GET_PLATFORM_STATS}`, { params })
            .then((response) => {
                dispatch(getPlatformStatsFullfilled(response.data));
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};
