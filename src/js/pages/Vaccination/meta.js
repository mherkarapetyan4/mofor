import { validateRules } from "config/consts";

export const vaccinationFields = {
    title: {
        name: "название прививки",
        rules: [],
        type: "string",
    },
    vaccineName: {
        name: "название вакцины",
        rules: [],
        type: "string",
    },
    eventId: {
        name: "идентификатор мероприятия",
        rules: [validateRules.required],
        type: "number",
    },
    moName: {
        name: "название МО",
        rules: [validateRules.required],
        type: "string",
    },
    comment: {
        name: "комментарий",
        rules: [],
        type: "string",
    },
    availableToDoctor: {
        name: "доступен врачу",
        rules: [],
        type: "boolean",
    },
    date: {
        name: "дата проведения",
        rules: [validateRules.required],
        type: "date",
    },
    uploadDate: {
        name: "дата загрузки",
        rules: [],
        type: "date",
    },
};
