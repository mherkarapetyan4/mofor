import { validateRules } from "config/consts";

export const sendSmoFields = {
    type: {
        rules: [validateRules.required],
        name: "тип обращения",
        type: "string",
    },
    text: {
        rules: [validateRules.required, `${validateRules.max}:4000`],
        name: "текст обращения",
        type: "string",
    },
    phone: {
        rules: [validateRules.phone],
        name: "телефон",
        type: "string",
    },
};
