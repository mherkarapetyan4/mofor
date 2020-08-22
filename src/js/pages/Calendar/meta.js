import { validateRules } from "config/consts";

export const calendarFields = {
    id: {
        name: "id",
        rules: [],
        type: "number",
    },
    startDate: {
        name: "дата начала",
        rules: [validateRules.required],
        type: "date",
    },
    startTime: {
        name: "время начала",
        rules: [validateRules.required],
        type: "string",
    },
    endDate: {
        name: "дата окончания",
        rules: [],
        type: "date",
    },
    endTime: {
        name: "время окончания",
        rules: [],
        type: "string",
    },
    type: {
        name: "тип события",
        rules: [validateRules.required],
        type: "string",
    },
    periodicity: {
        name: "периодичность",
        rules: [validateRules.required],
        type: "string",
    },
    name: {
        name: "название события",
        rules: [validateRules.required],
        type: "string",
    },
    emailNotification: {
        name: "напоминание по E-mail",
        rules: [],
        type: "boolean",
    },
    pushNotification: {
        name: "пуш уведомления",
        rules: [],
        type: "boolean",
    },
    comment: {
        name: "комментарий",
        rules: [],
        type: "string",
    },
    repetitionsCount: {
        name: "количество повторений",
        rules: [
            `${validateRules.min}:1`,
            `${validateRules.max}:50`,
            `${validateRules.round}:0`,
        ],
        type: "number",
    },
    sunday: {
        name: "воскресенье",
        rules: [],
        type: "boolean",
    },
    saturday: {
        name: "суббота",
        rules: [],
        type: "boolean",
    },
    wednesday: {
        name: "среда",
        rules: [],
        type: "boolean",
    },
    monday: {
        name: "поднедельник",
        rules: [],
        type: "boolean",
    },
    tuesday: {
        name: "вторник",
        rules: [],
        type: "boolean",
    },
    thursday: {
        name: "четверг",
        rules: [],
        type: "boolean",
    },
    friday: {
        name: "пятница",
        rules: [],
        type: "boolean",
    },
};

export const searchFields = {
    name: {
        name: "название",
        rules: [],
        type: "string",
    },
    fromDate: {
        name: "дата с",
        rules: [],
        type: "date",
    },
    toDate: {
        name: "дата по",
        rules: [],
        type: "date",
    },
};
