import { validateRules } from "config/consts";

export const newsFields = {
    id: {
        name: "id",
        rules: [],
        type: "string",
    },
    title: {
        name: "название",
        rules: [validateRules.required, `${validateRules.max}:50`],
        type: "string",
    },
    text: {
        name: "описание",
        rules: [validateRules.required, `${validateRules.max}:4000`],
        type: "string",
    },
    publicationDays: {
        name: "количество дней активности",
        rules: [
            validateRules.required,
            `${validateRules.max}:28`,
            `${validateRules.min}:1`,
        ],
        type: "number",
    },
};
