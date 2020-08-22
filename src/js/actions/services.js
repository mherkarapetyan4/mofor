import axios from "axios";
import { serviceActions } from "config/actionsKeys";
import {
    endAppFetching,
    startAppFetching,
    showSuccessMessage,
} from "actions/app";
// import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import { getPageSizeAndNumber } from "utils/getPageSizeAndNumber";
import { getCurrentUserInfo } from "actions/myData";

const getListFullfilled = (type, payload) => {
    return {
        type: serviceActions.GET_SERVICES_LIST_FULLFILLED,
        option: type,
        payload,
    };
};

const getPrintListFullfilled = (type, payload) => {
    return {
        type: serviceActions.GET_PRINT_SERVICES_LIST_FULLFILLED,
        payload,
    };
};

const servicesFetchStart = (type) => {
    return {
        type: serviceActions.START_FETCHING,
        option: type,
    };
};

const servicesFetchEnd = (type) => {
    return {
        type: serviceActions.END_FETCHING,
        option: type,
    };
};

export const getServicesList = ({ params, pageNumber, pageSize }) => {
    return (dispatch, getState) => {
        const pageSizeAndNumber = getPageSizeAndNumber(
            getState,
            `services.${params.type}`,
            { pageNumber, pageSize },
        );
        dispatch(servicesFetchStart(params.type));
        const newParams = {};
        Object.keys(params).map((item) => {
            if (params[item]) newParams[item] = params[item];
        });
        axios
            .get(`/${params.type}/list`, {
                params: {
                    ...omit(newParams, ["type"]),
                    pageNumber: pageSizeAndNumber.pageNumber,
                    pageSize: pageSizeAndNumber.pageSize,
                },
            })
            .then((response) => {
                dispatch(getListFullfilled(params.type, response.data));
                dispatch(servicesFetchEnd(params.type));
            })
            .catch(() => dispatch(servicesFetchEnd(params.type)));
    };
};

export const getPrintServicesList = ({ params, pageNumber, pageSize }) => {
    return (dispatch, getState) => {
        const pageSizeAndNumber = getPageSizeAndNumber(
            getState,
            `services.${params.type}`,
            { pageNumber, pageSize },
        );
        const newParams = {};
        Object.keys(params).map((item) => {
            if (params[item]) newParams[item] = params[item];
        });
        axios
            .get(`/${params.type}/list`, {
                params: {
                    ...omit(newParams, ["type"]),
                    pageNumber: pageSizeAndNumber.pageNumber,
                    pageSize: pageSizeAndNumber.pageSize,
                },
            })
            .then((response) => {
                dispatch(getPrintListFullfilled(params.type, response.data));
            })
            .catch(() => {
                return null;
            });
    };
};

const getServiceFullfilled = (type, payload) => {
    return {
        type: serviceActions.GET_SERVICE_FULLFILLED,
        option: type,
        payload,
    };
};

export const getServices = (id, type) => {
    return (dispatch) => {
        dispatch(startAppFetching());
        dispatch(getServiceFullfilled(type, {}));
        axios
            .get(`/${type}?id=${id}`)
            .then((response) => {
                dispatch(getServiceFullfilled(type, response.data));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const factOfConfirmationService = (
    service,
    type,
    callback = () => {},
) => {
    const bodyFormData = new FormData();
    bodyFormData.append("status", service.status);
    bodyFormData.append("serviceId", service.serviceId);
    bodyFormData.append("comment", service.comment);
    if (service.phone) bodyFormData.append("phone", service.phone);
    return (dispatch) => {
        axios.post(`/${type}/confirmation`, bodyFormData).then(() => {
            if (service?.status === "CONFIRMED")
                dispatch(
                    showSuccessMessage("Вы подтвердили факт оказания услуги!"),
                );
            dispatch(getServices(service.serviceId, type));
            callback();
            dispatch(getServicesList({ params: { type } }));
            dispatch(getCurrentUserInfo());
        });
    };
};

export const addReview = (params, type) => {
    const bodyFormData = new FormData();
    bodyFormData.append("satisfaction", params.satisfaction);
    bodyFormData.append("availability", params.availability);
    bodyFormData.append("serviceId", params.id);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`/${type}/review`, bodyFormData)
            .then(() => {
                dispatch(showSuccessMessage("Вы отправили отзыв об услуге!"));
                dispatch(getServices(params.id, type));
                dispatch(endAppFetching());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};
