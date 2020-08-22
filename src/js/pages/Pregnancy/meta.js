import { validateRules } from "config/consts";
import { HEALTH_TYPES } from "config/consts";

const WEIGHT = HEALTH_TYPES.find((e) => e.type === "WEIGHT");
const PRESSURE = HEALTH_TYPES.find((e) => e.type === "PRESSURE");

export const primaryValuesFields = {
    id: {
        rules: [],
        name: "",
        type: "string",
    },
    initialWeight: {
        rules: [
            `${validateRules.min}:${WEIGHT.targetValue.value.min}`,
            `${validateRules.max}:${WEIGHT.targetValue.value.max}`,
        ],
        name: "начальный вес",
        type: "number",
    },
    height: {
        rules: [`${validateRules.min}:50`, `${validateRules.max}:300`],
        name: "рост",
        type: "number",
    },
    normalSystolicPressure: {
        rules: [
            `${validateRules.min}:${PRESSURE.customValue.systolic.min}`,
            `${validateRules.max}:${PRESSURE.customValue.systolic.max}`,
        ],
        name: "нормальное систолическое давление",
        type: "number",
    },
    normalDiastolicPressure: {
        rules: [
            `${validateRules.min}:${PRESSURE.customValue.diastolic.min}`,
            `${validateRules.max}:${PRESSURE.customValue.diastolic.max}`,
        ],
        name: "нормальное диастолическое давление",
        type: "number",
    },
};
