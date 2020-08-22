import { validateRules, HEALTH_TYPES } from "config/consts";

export const healthFields = (type) => {
    const constObj = HEALTH_TYPES.find((el) => el.type === type);

    return {
        id: {
            name: "id",
            rules: [],
            type: "string",
        },
        type: {
            name: "тип",
            rules: [validateRules.required],
            type: "string",
        },
        date: {
            name: "дата",
            rules: [validateRules.required],
            type: "date",
        },
        time: {
            name: "время",
            rules: [validateRules.required],
            type: "string",
        },
        value: {
            name: "значение",
            rules: [
                validateRules.required,
                `${validateRules.min}:${constObj.customValue.value.min}`,
                `${validateRules.max}:${constObj.customValue.value.max}`,
                `${validateRules.round}:${constObj.customValue.value.round}`,
            ],
            type: "number",
        },
        note: {
            name: "комментарий",
            rules: [],
            type: "string",
        },
    };
};

export const healthFieldsPressure = (type) => {
    const constObj = HEALTH_TYPES.find((el) => el.type === type);

    return {
        id: {
            name: "id",
            rules: [],
            type: "string",
        },
        type: {
            name: "тип",
            rules: [validateRules.required],
            type: "string",
        },
        date: {
            name: "дата",
            rules: [validateRules.required],
            type: "date",
        },
        time: {
            name: "время",
            rules: [validateRules.required],
            type: "string",
        },
        note: {
            name: "комментарий",
            rules: [],
            type: "string",
        },
        modifier: {
            name: "рука",
            rules: [],
            type: "string",
        },
        systolic: {
            name: "давление систолическое",
            rules: [
                validateRules.required,
                `${validateRules.min}:${constObj.customValue.systolic.min}`,
                `${validateRules.max}:${constObj.customValue.systolic.max}`,
                `${validateRules.round}:${constObj.customValue.systolic.round}`,
            ],
            type: "number",
        },
        diastolic: {
            name: "давление диастолическое",
            rules: [
                validateRules.required,
                `${validateRules.min}:${constObj.customValue.diastolic.min}`,
                `${validateRules.max}:${constObj.customValue.diastolic.max}`,
                `${validateRules.round}:${constObj.customValue.diastolic.round}`,
            ],
            type: "number",
        },
    };
};

export const targetFields = (type) => {
    const constObj = HEALTH_TYPES.find((el) => el.type === type);

    return {
        type: {
            name: "type",
            rules: [validateRules.required],
            type: "string",
        },
        value: {
            name: "значение",
            rules: [
                validateRules.required,
                `${validateRules.min}:${constObj.targetValue.value.min}`,
                `${validateRules.max}:${constObj.targetValue.value.max}`,
                `${validateRules.round}:${constObj.targetValue.value.round}`,
            ],
            type: "number",
        },
    };
};

export const targetFieldsPressure = (type) => {
    const constObj = HEALTH_TYPES.find((el) => el.type === type);

    return {
        type: {
            name: "type",
            rules: [validateRules.required],
            type: "string",
        },
        systolic: {
            name: "давление систолическое",
            rules: [
                validateRules.required,
                `${validateRules.min}:${constObj.targetValue.systolic.min}`,
                `${validateRules.max}:${constObj.targetValue.systolic.max}`,
                `${validateRules.round}:${constObj.targetValue.systolic.round}`,
            ],
            type: "number",
        },
        diastolic: {
            name: "давление диастолическое",
            rules: [
                validateRules.required,
                `${validateRules.min}:${constObj.targetValue.diastolic.min}`,
                `${validateRules.max}:${constObj.targetValue.diastolic.max}`,
                `${validateRules.round}:${constObj.targetValue.diastolic.round}`,
            ],
            type: "number",
        },
    };
};
