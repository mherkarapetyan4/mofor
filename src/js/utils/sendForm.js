import { serverFormatDate } from "utils/formatDate";
import get from "lodash/get";
import set from "lodash/set";

const getValue = (value, type) => {
    if (type === "boolean") {
        return !!value;
    } else if (!value) {
        if (type === "number") {
            return null;
        }
        return "";
    } else if (type === "date") {
        return serverFormatDate(value);
    } else if (type === "number") {
        return Number(value);
    }
    return value;
};

const fillValues = (fields, values) => {
    const formValues = {};
    Object.keys(fields).map((item) => {
        const field = fields[item];
        if (!field.omit) {
            const value = get(values, item);
            set(formValues, `${item}`, getValue(value, field.type));
        }
    });
    return formValues;
};

export const sendForm = (
    { values, submitForm, validateForm, setFieldTouched },
    fields,
) => {
    return new Promise((resolve, reject) => {
        submitForm()
            .then(validateForm)
            .then((errors) => {
                const isValid = Object.keys(errors).length === 0;
                if (isValid) {
                    resolve(fillValues(fields, values));
                } else {
                    Object.keys(fields).map((key) =>
                        setFieldTouched(key, true),
                    );
                    reject(errors);
                }
            });
    });
};
