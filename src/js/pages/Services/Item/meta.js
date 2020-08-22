import { validateRules } from "config/consts";

export const notConfirmFields = {
    phone: {
        name: "телефон",
        rules: [validateRules.phone],
        type: "string",
    },
    comment: {
        name: "комментарий",
        rules: [validateRules.required],
        type: "string",
    },
};

export const rewievFields = {
    satisfaction: {
        name: "качество оказанной медицинской услуги",
        rules: [validateRules.required],
        type: "number",
    },
    availability: {
        name: "доступность оказанной медицинской услуги",
        rules: [validateRules.required],
        type: "number",
    },
};

export const validate = (values, props) => {
    const errors = {};
    if (props.phoneIsRequired && !values.phone) {
        errors["phone"] = "Поле телефон обязательное для заполнения";
    }
    return errors;
};
