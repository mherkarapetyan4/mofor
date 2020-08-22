import { validateRules } from "config/consts";

export const surveyFields = {
    title: {
        name: "название",
        rules: [validateRules.required],
        type: "string",
    },
    kindId: {
        name: "тип документа",
        rules: [validateRules.required],
        type: "number",
    },
    executionDate: {
        name: "дата проведения",
        rules: [validateRules.required],
        type: "date",
    },
    comment: {
        name: "комментарий",
        rules: [],
        type: "string",
    },
    availableToDoctor: {
        name: "доступен врачу",
        rules: [validateRules.required],
        type: "boolean",
    },
    uploadDate: {
        name: "дата загрузки",
        rules: [],
        type: "date",
    },
    diseaseDisplayName: {
        name: "diseaseDisplayName",
        rules: [],
        type: "string",
    },
    diseaseUniqueId: {
        name: "diseaseUniqueId",
        rules: [],
        type: "string",
    },
    diseaseType: {
        name: "diseaseType",
        rules: [],
        type: "string",
    },
    diseaseCode: {
        name: "diseaseCode",
        rules: [],
        type: "string",
    },
    diseaseName: {
        name: "diseaseName",
        rules: [],
        type: "string",
    },
    vaccineName: {
        name: "название вакцины",
        rules: [],
        type: "string",
    },
};
