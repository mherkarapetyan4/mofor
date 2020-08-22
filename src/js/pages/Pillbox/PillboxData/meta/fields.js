export const formFields = {
    id: {
        rules: [],
        name: "",
    },
    name: {
        rules: ["required"],
        name: "название профиля",
    },
    birthday: {
        rules: ["required"],
        name: "дата рождения",
        type: "date",
    },
    sex: {
        rules: ["required"],
        name: "пол",
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
    allergens: {
        rules: [],
        name: "аллергологический анамнез",
    },
    diseases: {
        rules: [],
        name: "наличие хронических и перенесенных заболеваний",
    },
    remindersEmail: {
        rules: ["isEmail"],
        name: "адрес для отправки напоминаний",
    },
    confirmationsEmail: {
        rules: ["isEmail"],
        name: "адрес для отправки подтверждений приёма",
    },
    sendRemindersToUser: {
        rules: [],
        name: "отправлять напоминания на адрес указанный в контактах",
        type: "boolean",
    },
    sendConfirmationsToUser: {
        rules: [],
        name: "отправлять подтверждения приёма на адрес указанный в контактах",
        type: "boolean",
    },
    owner: {
        rules: [],
        name: "владелец полиса",
    },
    policy: {
        rules: [],
        name: "серия и номер полиса ОМС подопечного",
    },
};
