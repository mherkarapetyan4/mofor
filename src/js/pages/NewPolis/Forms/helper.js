import { get } from "lodash";
import meta from "./meta";

export const getFormData = ({ values, formData }) => {
    return Object.keys(values).reduce((data, key) => {
        let value = get(formData, key);

        if (typeof values[key] === "object" && values[key] !== null) {
            data[key] =
                getFormData({
                    values: { ...values[key] },
                    formData: value || {},
                }) || {};
            return data;
        }
        if ("tempCertificateAsPaperRequired" === key) {
            data[key] = value || false;
            return data;
        }
        data[key] = value || "";
        return data;
    }, {});
};

export const findError = (keys, errors) => {
    let isNotValid = false;
    keys.map((key) => {
        if (isNotValid) {
            return false;
        }

        if (get(errors, key)) {
            isNotValid = true;
        }
    });
    return isNotValid;
};

export const validFileType = (type) => {
    return (
        type.toLowerCase() === "image/jpg" ||
        type.toLowerCase() === "image/jpeg" ||
        type.toLowerCase() === "application/pdf" ||
        type.toLowerCase() === "application/x-rar-compressed" ||
        type.toLowerCase() === "application/x-zip-compressed" ||
        type.toLowerCase() === "application/zip" ||
        type.toLowerCase() === "application/rar" ||
        type.toLowerCase() === "application/x-rar" ||
        type.toLowerCase() === "rar" ||
        type.toLowerCase() === "zip"
    );
};

export const resetStepStatuses = (item, values) => {
    if (
        (item.component === "AppealReason" &&
            values.policyClaimReasonCode !== "ATTRIBUTES_CHANGED") ||
        (item.component === "PolisShape" && values.policyForm !== "PLASTIC")
    ) {
        return true;
    }
    return false;
};

export const clearFileds = (fieldsKeys) => {
    let emptyFields = {};
    fieldsKeys.map((key) => {
        const current = meta[key];
        if (current) {
            emptyFields = {
                ...emptyFields,
                [key]: current.default,
            };
        }
    });

    return emptyFields;
};
