import { HEALTH_TYPES, validateRules } from "config/consts";

export const doctorFields = {
    normalSystolicPressure: {
        name: "систолическое (верхнее), мм.рт.ст",
        rules: [
            `${validateRules.min}:${
                HEALTH_TYPES.find((item) => item.type === "PRESSURE")
                    .customValue.systolic.min
            }`,
            `${validateRules.max}:${
                HEALTH_TYPES.find((item) => item.type === "PRESSURE")
                    .customValue.systolic.max
            }`,
            `${validateRules.round}:${
                HEALTH_TYPES.find((item) => item.type === "PRESSURE")
                    .customValue.systolic.round
            }`,
        ],
        type: "number",
    },
    normalDiastolicPressure: {
        name: "диастолическое (нижнее), мм.рт.ст",
        rules: [
            `${validateRules.min}:${
                HEALTH_TYPES.find((item) => item.type === "PRESSURE")
                    .customValue.diastolic.min
            }`,
            `${validateRules.max}:${
                HEALTH_TYPES.find((item) => item.type === "PRESSURE")
                    .customValue.diastolic.max
            }`,
            `${validateRules.round}:${
                HEALTH_TYPES.find((item) => item.type === "PRESSURE")
                    .customValue.diastolic.round
            }`,
        ],
        type: "number",
    },
    dispensaryRegistration: {
        name: "состою на диспансерном учете",
        rules: [`${validateRules.max}:200`],
        type: "string",
    },
    emergencyContactPhones: {
        name: "контакты лиц/лица для связи в случае нарушения сознания",
        rules: [`${validateRules.max}:200`],
        type: "string",
    },
    bloodType: {
        name: "группа крови",
        rules: [
            validateRules.required,
            `${validateRules.min}:1`,
            `${validateRules.max}:4`,
            `${validateRules.round}:0`,
        ],
        type: "number",
    },
    rhFactor: {
        name: "резус фактор",
        rules: [],
        type: "string",
    },
    surgeryAndTrauma: {
        name: "операции, травмы и гемотрансфузии",
        rules: [`${validateRules.max}:200`],
        type: "string",
    },
    implants: {
        name: "импланты",
        rules: [`${validateRules.max}:200`],
        type: "string",
    },
    regularDrugs: {
        name: "постоянно принимаемые лекарственные препараты",
        rules: [`${validateRules.max}:200`],
        type: "string",
    },
    other: {
        name: "иное",
        rules: [`${validateRules.max}:200`],
        type: "string",
    },
};
