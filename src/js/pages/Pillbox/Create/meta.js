import { validateRules } from "config/consts";

export const pillboxFields = {
    id: {
        rules: [],
        name: "",
        type: "string",
        initial: null,
    },
    name: {
        rules: [validateRules.required, `${validateRules.max}:50`],
        name: "название профиля таблетницы",
        type: "string",
    },
    birthday: {
        rules: [validateRules.required],
        name: "дата рождения",
        type: "date",
    },
    sex: {
        rules: [validateRules.required],
        name: "пол",
        type: "string",
    },
    pregnancy: {
        rules: [],
        name: "беременность",
        type: "boolean",
    },
    lactation: {
        rules: [],
        name: "кормление грудью",
        type: "boolean",
    },
    owner: {
        rules: [`${validateRules.max}:10`],
        name: "вледелец полиса",
        type: "string",
    },
    policy: {
        rules: [`${validateRules.max}:17`],
        name: "серия и номер полиса ОМС",
        type: "string",
    },
};
