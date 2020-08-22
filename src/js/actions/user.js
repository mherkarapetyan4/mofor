import React from "react";
import axios from "axios";
import { myDataPaths, questionaryPath, userPath } from "config/paths";
import { userActions } from "config/actionsKeys";
import {
    endAppFetching,
    startAppFetching,
    showSuccessMessage,
    showSystemMessage,
} from "actions/app";
import { newsPath } from "config/paths";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { showPopup } from "actions/popup";
import { getCurrentUserInfo } from "actions/myData";
import { replacePhoneChar } from "utils/numberHandler";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { AUTH_REDIRECT } from "config/menu";
import { history } from "routes/history";

const getLastActionsFulfilled = (payload) => {
    return {
        type: userActions.LAST_ACTIONS_FULFILLED,
        payload,
    };
};

const getLastActionsRejected = () => {
    return {
        type: userActions.LAST_ACTIONS_REJECTED,
    };
};

const setUserSubProfiles = (payload) => {
    return {
        type: userActions.SUB_PROFILES,
        payload,
    };
};

export const getLastActions = (size = 3) => {
    return async (dispatch) => {
        await axios(`${userPath.LAST_ACTIONS_GET_DATA}?pageSize=${size}`)
            .then((response) =>
                dispatch(getLastActionsFulfilled(response.data)),
            )
            .catch(() => dispatch(getLastActionsRejected()));
    };
};

export const getUserSubProfiles = () => {
    return async (dispatch) => {
        await axios(userPath.GET_USER_PROFILES_LIST)
            .then((response) => {
                const data = response.data.content;
                dispatch(setUserSubProfiles(data));
            })
            .catch(() => dispatch(getLastActionsRejected()));
    };
};

export const switchProfile = (data) => {
    return async () => {
        return await axios.post(userPath.SWITCH_PROFILE, data);
    };
};

const getVitalFulfilled = (payload) => {
    return {
        type: userActions.VITAL_FULFILLED,
        payload,
    };
};

export const getVitalData = () => {
    return async (dispatch) => {
        dispatch(startAppFetching());
        await axios
            .get(userPath.VITAL_GET_DATA)
            .then(({ data }) => {
                dispatch(getVitalFulfilled(data));
                dispatch(endAppFetching());
            })
            .catch(() => {
                dispatch(endAppFetching());
            });
    };
};

export const addVitalAutocomplete = (data, path) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        bodyFormData.append(key, data[key]);
    });
    return (dispatch) => {
        dispatch(startAppFetching());
        axios
            .post(path, bodyFormData)
            .then(() => {
                dispatch(endAppFetching());
                dispatch(getVitalData());
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const deleteVitalAutocomplete = (id, path) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", id);
    return (dispatch) => {
        dispatch(startAppFetching());
        axios.post(path, bodyFormData).then(() => {
            dispatch(endAppFetching());
            dispatch(getVitalData());
        });
    };
};

export const saveVital = (data) => {
    const bodyFormData = new FormData();
    Object.keys(data).map((key) => {
        if (
            (key === "normalSystolicPressure" && data[key] === null) ||
            (key === "normalDiastolicPressure" && data[key] === null)
        ) {
            bodyFormData.append(key, "");
        } else {
            bodyFormData.append(key, data[key]);
        }
    });

    return (dispatch) => {
        dispatch(startAppFetching());
        axios.post(userPath.SAVE_VITAL, bodyFormData).then(() => {
            dispatch(endAppFetching());
            dispatch(getVitalData());
        });
    };
};

export const fetchActual = (payload) => {
    return {
        type: userActions.ACTUAL_FULFILLED,
        payload,
    };
};

export const getActual = () => {
    return (dispatch) => {
        axios.get(newsPath.ACTUAL_DATA).then((response) => {
            dispatch(fetchActual(response.data));
        });
    };
};

export const fillQuestionary = (payload) => {
    return {
        type: userActions.QUESTIONARY_FULFILLED,
        payload,
    };
};

export const getQuestionary = () => {
    return (dispatch) => {
        axios.get(questionaryPath.AVAILABLE_LIST).then((response) => {
            // dispatch(fetchQuestionary({"pageNumber":1,"pageSize":0,"pagesCount":1,"elementsTotalCount":0,"elementsOnPageCount":0,"content":[{"id":1}]}));
            if (!isEmpty(response.data.content)) {
                axios
                    .get(`${questionaryPath.AVAILABLE_FULL}`, {
                        params: { id: response.data.content[0].id },
                    })
                    .then((response) => {
                        dispatch(fillQuestionary(response.data));
                    });
            } else {
                dispatch(fillQuestionary({}));
            }
        });
    };
};

export const saveQuestionary = (params) => {
    return (dispatch) => {
        axios.post(questionaryPath.COMPLETE, params).then(() => {
            dispatch(showSuccessMessage("Ваши ответы отправлены!"));
            dispatch(getQuestionary());
        });
    };
};

export const checkAllowConfirmation = (confirmed) => {
    return (dispatch) => {
        return axios
            .get(userPath.CHECK_ALLOWED, { params: { confirmed } })
            .then((response) => {
                const result = response.data.result;
                if (result === "OK") {
                    return Promise.resolve();
                } else if (result === "EMAIL_REQUIRED") {
                    dispatch(
                        showPopup(
                            "Внимание!",
                            <Text>
                                Данная функция доступна только пользователям, у
                                которых в личном кабинете заполнен и подтвержден
                                Email в разделе контактной информации.
                            </Text>,
                        ),
                    );
                    return Promise.reject();
                } else if (result === "ENTITLED_EMAIL_REQUIRED") {
                    dispatch(
                        showPopup(
                            "Внимание!",
                            <Text>
                                Данная функция доступна только законным
                                представителям, у которых в личном кабинете
                                заполнен и подтвержден Email в разделе
                                контактной информации. Для этого: перейдите из
                                профиля подопечного в профиль законного
                                представителя. Заполните и подтвердите Email в
                                разделе контактной информации.
                            </Text>,
                        ),
                    );
                    return Promise.reject();
                } else if (result === "PHONE_REQUIRED") {
                    return Promise.resolve();
                    // dispatch(
                    //     showPopup(
                    //         "Внимание!",
                    //         <div>
                    //             Данная функция доступна только пользователям, у
                    //             которых в личном кабинете заполнен телефон
                    //             разделе контактной информации.
                    //         </div>,
                    //     ),
                    // );
                    // return Promise.reject();
                } else if (result === "ENTITLED_PHONE_REQUIRED") {
                    return Promise.resolve();
                    // dispatch(
                    //     showPopup(
                    //         "Внимание!",
                    //         <div>
                    //             Данная функция доступна только законным
                    //             представителям, у которых в личном кабинете
                    //             заполнен телефон в разделе контактной
                    //             информации. Для этого: перейдите из профиля
                    //             подопечного в профиль законного представителя.
                    //             Заполните телефон в разделе контактной
                    //             информации.
                    //         </div>,
                    //     ),
                    // );
                    // return Promise.reject();
                }
            });
    };
};

const setPhoneRequiredKey = (payload) => ({
    type: userActions.SET_PHONE_REQUIRED_KEY,
    payload,
});

export const checkAllowConfirmationForPhone = (confirmed) => {
    return (dispatch) => {
        return axios
            .get(userPath.CHECK_ALLOWED, { params: { confirmed } })
            .then((response) => {
                const result = response.data.result;
                const needPhone =
                    result === "PHONE_REQUIRED" ||
                    result === "ENTITLED_PHONE_REQUIRED";
                dispatch(setPhoneRequiredKey(needPhone));
            });
    };
};

export const confirmationPasspordData = (params, callback = () => {}) => {
    return (dispatch) => {
        const formData = new FormData();
        Object.keys(params).map((e) => {
            if (params[e] || params[e] === false || params[e] === 0)
                formData.append(e, params[e]);
        });
        axios.post(userPath.CONFIRMATION_PASSPORT_DATA, formData).then(() => {
            callback();
            dispatch(getCurrentUserInfo());
            dispatch(checkAllowConfirmationForPhone(false));
        });
    };
};

export const confirmationWardSnilsData = (params, callback = () => {}) => {
    return (dispatch) => {
        const formData = new FormData();
        Object.keys(params).map((key) => {
            formData.append(key, params[key]);
        });
        axios.post(userPath.CONFIRMATION_SNILS_DATA, formData).then(() => {
            callback();
            dispatch(getCurrentUserInfo());
            dispatch(checkAllowConfirmationForPhone(false));
        });
    };
};

export const checkEmail = () => {
    return (dispatch, getState) => {
        const address = get(getState(), "myData.myData.contacts.email");
        if (!address) {
            dispatch(
                showPopup(
                    "Необходимо заполнить и подтвердить Email",
                    <Text>
                        Данная функция доступна только пользователям, у которых
                        заполнен и подтвержден Email в контактной информации.
                    </Text>,
                ),
            );
            return Promise.reject();
        } else {
            return axios
                .get(myDataPaths.CHECK_EMAIL, { params: { address } })
                .then((response) => {
                    if (!response.data.confirmed) {
                        dispatch(
                            showPopup(
                                "Необходимо подтвердить Email",
                                <Text>
                                    Данная функция доступна только
                                    пользователям, у которых подтвержден Email в
                                    контактной информации.
                                </Text>,
                            ),
                        );
                        return Promise.reject();
                    } else {
                        return Promise.resolve();
                    }
                });
        }
    };
};

export const checkAllowConfirmationPassportData = () => {
    return new Promise((resolve) => {
        axios
            .get(userPath.CONFIRMATION_PASSPORT_DATA_ALLOWED)
            .then((response) => {
                resolve(response.data.code);
            });
    });
};

export const correntFromAuthPassportData = (reason, callback = () => {}) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append("reason", reason);
        axios
            .post(userPath.CORRENT_PASSPORT_DATA_FROM_AUTH, formData)
            .then(() => {
                callback();
                dispatch(getCurrentUserInfo());
            })
            .catch((error) => {
                callback();
                const userMessage =
                    error?.response?.data?.userMessage ||
                    "Во время обработки вашего запроса произошла ошибка. Пожалуйста, повторите запрос позже.";
                dispatch(showSystemMessage(userMessage));
            });
    };
};

export const confirmPersonalDataAccess = () => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append("confirmed", true);
        dispatch(startAppFetching());
        axios
            .post(myDataPaths.SEND_PERSONAL_DATA_CONFIRMATION, formData)
            .then(() => {
                dispatch(endAppFetching());
                dispatch(getCurrentUserInfo(true));
            })
            .catch(() => dispatch(endAppFetching()));
    };
};

export const sendSmoMessage = (params, callback = () => {}) => {
    return () => {
        const formData = new FormData();
        Object.keys(params).map((key) => {
            if (key === "phone") {
                formData.append(key, replacePhoneChar(params[key]));
            } else {
                formData.append(key, params[key]);
            }
        });
        axios.post(userPath.SEND_SMO_MESSAGE, formData).then(() => {
            callback();
        });
    };
};

const changeSetLoginByUkl = (payload) => ({
    type: userActions.CHANGE_SET_LOGIN_BY_UKL,
    payload,
});

export const checkAuthByUkl = () => {
    return (dispatch) => {
        axios
            .get(userPath.CHECK_ALLOW_AUTH_BY_UKL)
            .then(() => {
                dispatch(changeSetLoginByUkl(true));
            })
            .catch(() => {
                history.push(AUTH_REDIRECT);
            });
    };
};

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    padding: 0 16px;
`;
