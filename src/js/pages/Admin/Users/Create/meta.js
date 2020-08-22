import { validateRules } from "config/consts";

export const crateUserFields = {
    id: {
        name: "id",
        rules: [],
        type: "string",
    },
    name: {
        name: "имя",
        rules: [validateRules.required, `${validateRules.max}:200`],
        type: "string",
    },
    email: {
        name: "e-mail",
        rules: [validateRules.required, validateRules.email],
        type: "string",
    },
    password: {
        name: "пароль",
        rules: [validateRules.password],
        type: "string",
    },
    confirm_password: {
        name: "повторение пароля",
        rules: [],
        type: "string",
        omit: true,
    },
    blocked: {
        name: "признак заблокирован",
        rules: [],
        type: "boolean",
    },
    role: {
        name: "роль",
        rules: [validateRules.required],
        type: "string",
    },
};
