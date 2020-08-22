import axios from "axios";
import { myDataPaths, userPath } from "config/paths";
import { myDataActions, userActions } from "config/actionsKeys";
import { history } from "routes/history";
import { AUTH_REDIRECT, LK_MENU_ELEMENTS } from "config/menu";
import { isAuthPage } from "utils/handlePathname";
import { authFullfilled } from "actions/auth";
import {
    endAppFetching,
    startAppFetching,
    showSuccessMessage,
} from "actions/app";
import { getActual, getQuestionary } from "./user";
import { checkAllowConfirmationForPhone } from "actions/user";
import { replacePhoneChar } from "utils/numberHandler";
import ReactGA from "react-ga";

const getMyDataPending = () => ({
    type: myDataActions.GET_MY_DATA_PENDING,
});

const getMyDataFullfilled = (payload) => ({
    type: myDataActions.GET_MY_DATA_FULLFILLED,
    payload,
});

const getMyDataRejected = () => ({
    type: myDataActions.GET_MY_DATA_REJECTED,
});

export const getCurrentUserInfo = (isStart = false) => {
    return (dispatch) => {
        dispatch(getMyDataPending());
        axios
            .get(myDataPaths.GET_CURRENT_USER)
            .then((response) => {
                const personalDataAgree =
                    response.data.confirmations?.personalData;
                if (isStart && personalDataAgree) {
                    dispatch(getClientSettings());
                    dispatch(getActual());
                    dispatch(getQuestionary());
                }
                if (isStart) {
                    ReactGA.set({ userId: response.data.ukl });
                }
                dispatch(getMyDataFullfilled(response.data));
                dispatch(authFullfilled());
                if (isAuthPage()) {
                    history.push(LK_MENU_ELEMENTS.MAIN_PAGE.path);
                }
            })
            .catch(() => {
                history.push(AUTH_REDIRECT);
                dispatch(getMyDataRejected());
            });
    };
};

export const fillClientSettings = (payload) => ({
    type: userActions.FILL_CLIENT_SETTINGS,
    payload,
});

export const getClientSettings = () => {
    return (dispatch) => {
        axios.get(userPath.GET_CLIENT_CONFIG).then((response) => {
            dispatch(fillClientSettings(response.data));
        });
    };
};

export const setMoDataConfirmation = (
    { confirmed, comment, phone },
    callback = () => {},
) => {
    const bodyFormData = new FormData();
    bodyFormData.append("confirmed", confirmed);
    bodyFormData.append("comment", comment);
    if (phone) bodyFormData.append("phone", phone);
    return (dispatch) => {
        axios
            .post(myDataPaths.SEND_MODATA_CONFIRMATION, bodyFormData)
            .then(() => {
                if (confirmed)
                    dispatch(
                        showSuccessMessage(
                            "Вы подтвердили прикрепление к данной МО!",
                        ),
                    );
                dispatch(getCurrentUserInfo());
                callback();
                dispatch(checkAllowConfirmationForPhone(false));
            })
            .catch(() => {
                return null;
            });
    };
};

export const setDentalMoDataConfirmation = (
    { confirmed, comment, phone },
    callback,
) => {
    const bodyFormData = new FormData();
    bodyFormData.append("confirmed", confirmed);
    bodyFormData.append("comment", comment);
    if (phone) bodyFormData.append("phone", phone);
    return (dispatch) => {
        axios
            .post(myDataPaths.SEND_DENTAL_MODATA_CONFIRMATION, bodyFormData)
            .then(() => {
                if (confirmed)
                    dispatch(
                        showSuccessMessage(
                            "Вы подтвердили прикрепление к данной МО!",
                        ),
                    );
                dispatch(getCurrentUserInfo());
                callback();
                dispatch(checkAllowConfirmationForPhone(false));
            })
            .catch(() => {
                return null;
            });
    };
};

export const setCheckEmail = (payload) => ({
    type: myDataActions.SET_CHECK_EMAIL,
    payload,
});

export const checkEmailMyData = (email) => async (dispatch) => {
    if (!email) return;
    dispatch(startAppFetching());
    try {
        const response = await axios.get(
            `${myDataPaths.CHECK_EMAIL}?address=${email}`,
        );
        dispatch(setCheckEmail(response.data));
    } finally {
        dispatch(endAppFetching());
    }
};

export const sendEmailCode = (email) => {
    const bodyFormData = new FormData();
    bodyFormData.append("address", email);
    return async (dispatch) => {
        dispatch(startAppFetching());
        try {
            const response = await axios.post(
                `${myDataPaths.SEND_CODE_EMAIL}`,
                bodyFormData,
            );
            dispatch(setCheckEmail(response.data));
        } finally {
            dispatch(endAppFetching());
        }
    };
};

export const setSavedContacts = (payload) => ({
    type: myDataActions.SET_SAVED_CONTACTS,
    payload,
});

export const saveContacts = (data, oldEmail = "") => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        if (key === "phone") {
            bodyFormData.append(key, replacePhoneChar(data[key]));
        } else {
            bodyFormData.append(key, data[key]);
        }
    });
    return async (dispatch) => {
        dispatch(startAppFetching());
        try {
            await axios.post(myDataPaths.SAVE_CONTACTS, bodyFormData);
            if (oldEmail !== data.email && data.email) {
                dispatch(checkEmailMyData(data.email));
            }
            dispatch(checkAllowConfirmationForPhone(false));
            dispatch(setSavedContacts(data));
            dispatch(getCurrentUserInfo());
        } finally {
            dispatch(endAppFetching());
        }
    };
};
