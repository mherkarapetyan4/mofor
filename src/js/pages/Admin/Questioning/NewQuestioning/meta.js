import { validateRules } from "config/consts";

export const questioningFields = {
    id: {
        name: "id",
        rules: [],
        type: "string",
    },
    title: {
        name: "название",
        rules: [validateRules.required, `${validateRules.max}:256`],
        type: "string",
    },
    description: {
        name: "описание",
        rules: [validateRules.required, `${validateRules.max}:512`],
        type: "string",
    },
    plannedEndDate: {
        name: "дата окончания",
        rules: [validateRules.required],
        type: "date",
    },
    questions: {
        name: "",
        rules: [],
        type: "array",
    },
};
