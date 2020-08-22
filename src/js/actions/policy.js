import axios from "axios";
import get from "lodash/get";
import isObject from "lodash/isObject";
import findIndex from "lodash/findIndex";
import { policyPaths } from "config/paths";
import { policyActions } from "config/actionsKeys";
import meta from "pages/NewPolis/Forms/meta";
import { getFormData } from "pages/NewPolis/Forms/helper";
import { serverFormatDate } from "utils/formatDate";
import cloneDeep from "lodash/cloneDeep";

const startPending = () => {
    return {
        type: policyActions.START_PENDING,
    };
};

const endPending = () => {
    return {
        type: policyActions.END_PENDING,
    };
};
const editAccordionsFuLlFilled = (payload) => {
    return {
        type: policyActions.GET_EDIT_ACCORDIONS_POLICY_FULFILLED,
        payload,
    };
};
const getPolicyListFullFilled = (payload) => {
    return {
        type: policyActions.GET_POLICY_LIST_FULL_FILLED,
        payload,
    };
};

const getCurrentPolicyFullFilled = (payload) => {
    return {
        type: policyActions.GET_CURRENT_POLICY_FULL_FILLED,
        payload,
    };
};

const getClaimDictionaryFulfilled = (payload, name) => {
    return {
        type: policyActions.GET_CLAIM_DICTIONARY_FULFILLED,
        payload,
        name,
    };
};

export const getClaimDictionary = (url, componentName, params = {}) => {
    return (dispatch) => {
        dispatch(startPending());
        axios
            .get(url, { params })
            .then(({ data }) => {
                dispatch(getClaimDictionaryFulfilled(data, componentName));
                dispatch(endPending());
            })
            .catch(() => dispatch(endPending()));
    };
};

export const editEachItem = (componentName, key, value) => {
    return (dispatch, getState) => {
        const data = [...getState().policy.accordions];
        const index = findIndex(
            data,
            ({ component }) => component === componentName,
        );
        if (index < 0) return false;

        dispatch(startPending());

        let currentData = { ...data[index] };
        currentData = { ...currentData, [key]: value };
        const dataForm = { ...getFormData };

        if (key === "isShow" && !value) {
            currentData = { ...currentData, checked: false };
            const values = get(meta, componentName, {});
            Object.keys(values).map((index) => {
                if (dataForm[index]) {
                    delete dataForm[index];
                }
                return;
            });
            dispatch(setFinalFormFulfilled({ ...dataForm }));
        }
        data[index] = currentData;

        dispatch(editAccordionsFuLlFilled(data));
        dispatch(endPending());
    };
};

export const getPolicyList = ({ pageNumber = 1, pageSize = 10 }) => {
    return (dispatch) => {
        dispatch(startPending());
        axios
            .get(policyPaths.GET_POLICY_LIST, {
                params: { pageNumber, pageSize },
            })
            .then((response) => {
                dispatch(endPending());
                const defId = get(response, "data.content.0.id", false);
                dispatch(getPolicyListFullFilled(response.data));
                if (defId) {
                    dispatch(getCurrentPolicy(defId));
                }
            })
            .catch((e) => dispatch(endPending(e)));
    };
};

export const getCurrentPolicy = (id) => {
    return (dispatch) => {
        dispatch(startPending());
        axios
            .get(policyPaths.GET_CURRENT_POLICY, { params: { id } })
            .then((response) => {
                dispatch(endPending());
                dispatch(
                    getCurrentPolicyFullFilled(get(response, "data.claim", {})),
                );
            })
            .catch((e) => dispatch(endPending(e)));
    };
};

export const setFinalFormFulfilled = (payload) => {
    return {
        type: policyActions.FINAL_FORM_FULFILLED,
        payload,
        name,
    };
};

export const resetAccordions = () => {
    return {
        type: policyActions.RESET_ACCORDIONS,
    };
};

export const setAccordions = (payload) => {
    return {
        type: policyActions.SET_ACCORDIONS,
        payload,
    };
};

export const sendPolicy = (response, successCallback, errorCallback) => {
    const data = cloneDeep(response);
    const bodyFormData = new FormData();

    if (data.policyClaimReasonCode !== "ATTRIBUTES_CHANGED") {
        delete data.personalData.newBirthday;
        delete data.personalData.newBirthplace;
        delete data.personalData.newLastName;
        delete data.personalData.newFirstName;
        delete data.personalData.newMiddleName;
        delete data.personalData.newSex;
    }
    if (data.policyClaimReasonCode === "ATTRIBUTES_CHANGED") {
        data.personalData.confirmationDocumentName = "паспорт";
    }

    if (data.policyClaimReasonCode !== "INACCURACY_FOUND") {
        delete data.inaccuracyComment;
    }

    let buffData = {
        ...data,
        personalData: {
            ...data.personalData,
            newBirthday:
                data.personalData.newBirthday ??
                serverFormatDate(data.personalData.newBirthday),
            birthday:
                data.personalData.birthday ??
                serverFormatDate(data.personalData.birthday),
            snils: response.personalData.snils
                .replace("-", "")
                .replace("-", "")
                .replace(" ", ""),
        },
        passportData: {
            ...data.passportData,
            issueDate:
                data.passportData.issueDate ??
                serverFormatDate(data.passportData.issueDate),
        },
    };

    Object.keys(buffData).map((key) => {
        if (meta[key]?.type === "file" && !buffData[key]) {
            return false;
        }
        if (isObject(buffData[key]) && meta[key]?.type !== "file") {
            Object.keys(buffData[key]).map((nestedKey) => {
                bodyFormData.append(
                    `${key}.${nestedKey}`,
                    buffData[key][nestedKey],
                );
            });
        } else {
            bodyFormData.append(key, buffData[key]);
        }
    });
    // return async () => {
    //     try {
    //         await axios.post(policyPaths.SEND_CLAIM, bodyFormData);
    //         // history.push(ADMIN_ELEMENTS.QUESTIONING.path);
    //     } finally {
    //         // dispatch(endFetching());
    //         // history.push(LK_MENU_ELEMENTS.POLIS_PAGE);
    //         callback();
    //     }
    // };

    return () => {
        axios
            .post(policyPaths.SEND_CLAIM, bodyFormData)
            .then(() => {
                successCallback();
            })
            .catch(() => {
                errorCallback();
            });
    };
};

// export const setFinalForm = (id) => {
//     return (dispatch) => {
//         dispatch(startPending());
//         axios
//             .get(policyPaths.GET_CURRENT_POLICY, { params: { id } })
//             .then((response) => {
//                 dispatch(endPending());
//                 dispatch(
//                     getCurrentPolicyFullFilled(get(response, "data.claim", {})),
//                 );
//             })
//             .catch((e) => dispatch(endPending(e)));
//     };
// };
