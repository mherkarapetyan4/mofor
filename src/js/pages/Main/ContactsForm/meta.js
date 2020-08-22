import { validateRules } from "config/consts";

export const contactsFields = {
    address: {
        name: "Почтовый адрес",
        rules: [],
        type: "string",
    },
    phone: {
        name: "Контактный телефон",
        rules: [validateRules.phone],
        type: "string",
    },
    email: {
        name: "Электронная почта",
        rules: [],
        type: "string",
    },
};
