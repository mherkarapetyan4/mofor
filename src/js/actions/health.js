import axios from "axios";
import { healthPaths } from "config/paths";
import { healthActions } from "config/actionsKeys";
import {
    endAppFetching,
    startAppFetching,
    showSuccessMessage,
} from "actions/app";
import { HEALTH_TYPES } from "config/consts";
import { hidePopup } from "actions/popup";

const getHealthDataFullfilled = (payload, healthType) => {
    return {
        type: healthActions.GET_HEALTH_DATA_FULLFILLED,
        payload,
        healthType,
    };
};

export const getHealthData = (healthType, pageNumber = 1, pageSize = 5) => {
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .get(
                `${healthPaths.HEALTH_GET_DATA}?type=${healthType}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
            )
            .then((response) => {
                const data = {
                    ...response.data,
                    content: response.data.content.reverse(),
                };
                dispatch(getHealthDataFullfilled(data, healthType));
                dispatch(endAppFetching());
            });
    };
};

const saveHealthDataFullfilled = (payload, healthType) => {
    return {
        type: healthActions.SAVE_HEALTH_DATA_FULLFILLED,
        payload,
        healthType,
    };
};

export const saveHealthData = (params, handleHide) => {
    const healthType = params.type;
    const bodyFormData = new FormData();
    bodyFormData.append("type", healthType);
    bodyFormData.append("date", params.date + " " + params.time + ":00");
    if (params.id) bodyFormData.append("id", params.id);

    if (params.note) {
        let noteStr = params.note.trim();
        if (noteStr && noteStr !== "null")
            bodyFormData.append("note", params.note);
    }

    if (healthType === "PRESSURE") {
        if (params.modifier) bodyFormData.append("modifier", params.modifier);
        bodyFormData.append("systolic", params.systolic);
        bodyFormData.append("diastolic", params.diastolic);
    } else {
        bodyFormData.append("value", params.value);
    }
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${healthPaths.HEALTH_SAVE_DATA}`, bodyFormData)
            .then((response) => {
                if (!params.id)
                    dispatch(showSuccessMessage("Показание добавлено!"));
                dispatch(saveHealthDataFullfilled(response.data, healthType));
                dispatch(getHealthData(healthType));
                handleHide();
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

const deleteHealthDataFullfilled = () => {
    return {
        type: healthActions.DELETE_HEALTH_DATA_FULLFILLED,
    };
};

export const deleteHealthData = (
    id,
    healthType,
    handleHide,
    pageNumber = 1,
    pageSize = 5,
) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", id);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${healthPaths.HEALTH_DELETE_DATA}`, bodyFormData)
            .then(() => {
                dispatch(deleteHealthDataFullfilled());
                dispatch(getHealthData(healthType, pageNumber, pageSize));
                handleHide();
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

const saveTargetHealthDataFullfilled = (payload, healthType) => {
    return {
        type: healthActions.SAVE_TARGET_HEALTH_DATA_FULLFILLED,
        payload,
        healthType,
    };
};

export const saveTargetHealthData = (params, handleHide) => {
    const healthType = params.type;
    const bodyFormData = new FormData();
    bodyFormData.append("type", healthType);
    if (healthType === "PRESSURE") {
        bodyFormData.append("systolic", params.systolic);
        bodyFormData.append("diastolic", params.diastolic);
    } else bodyFormData.append("value", params.value);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(`${healthPaths.HEALTH_SAVE_TARGET_DATA}`, bodyFormData)
            .then((response) => {
                dispatch(showSuccessMessage("Целевое значение изменено!"));
                dispatch(
                    saveTargetHealthDataFullfilled(response.data, healthType),
                );
                dispatch(getTargetHealthData(healthType));
                handleHide();
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

const getTargetHealthDataFullfilled = (payload) => {
    return {
        type: healthActions.GET_TARGET_HEALTH_DATA_FULLFILLED,
        payload,
    };
};

export const getTargetHealthData = () => {
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .get(`${healthPaths.HEALTH_GET_TARGET_DATA}`)
            .then((response) => {
                dispatch(getTargetHealthDataFullfilled(response.data));
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const setIsFetching = (payload) => (dispatch) =>
    dispatch({
        type: healthActions.SET_IS_FETCHING,
        payload,
    });

export const setExistingHealthWidgets = (payload) => ({
    type: healthActions.SET_EXISTING_HEALTH_WIDGETS,
    payload,
});

export const setAvailableHealthWidgets = (payload) => (dispatch) =>
    dispatch({
        type: healthActions.SET_AVAILABLE_HEALTH_WIDGETS,
        payload,
    });

export const setRemovedWidget = (payload) => ({
    type: healthActions.REMOVE_WIDGET,
    payload,
});

export const setAddedWidget = (payload) => ({
    type: healthActions.ADD_WIDGET,
    payload,
});

export const getExistingHealthWidgets = () => async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
        const response = await axios.get(
            `${healthPaths.HEALTH_WIDGETS_DATA}?key=healthWidgets`,
        );
        const existingWidgets = response.data.json ? response.data.json : [];
        dispatch(setExistingHealthWidgets(existingWidgets));
    } finally {
        dispatch(setIsFetching(false));
    }
};

export const updateExistingWidgets = (widgetType, action) => async (
    dispatch,
    getState,
) => {
    dispatch(setIsFetching(true));

    action === "add"
        ? dispatch(setAddedWidget(widgetType))
        : dispatch(setRemovedWidget(widgetType));

    try {
        await axios.post(
            `${healthPaths.HEALTH_WIDGETS_DATA}?key=healthWidgets`,
            {
                json: getState().health.widgets.existing,
            },
        );
    } finally {
        dispatch(setAvailableHealthWidgets(HEALTH_TYPES));
        dispatch(setIsFetching(false));
        dispatch(hidePopup());
    }
};
