import { validateRules } from "config/consts";

export const adminAuthFields = {
    login: {
        name: "Логин",
        rules: [validateRules.required],
        type: "string",
    },
    password: {
        name: "Пароль",
        rules: [validateRules.required],
        type: "string",
    },
};
