import { validateRules } from "config/consts";
import { courseConditions } from "config/consts";
import isEmpty from "lodash/isEmpty";

export const courseFields = {
    id: {
        rules: [],
        name: "",
        type: "string",
        initial: null,
    },
    "dose.size": {
        rules: [validateRules.required],
        name: "размер дозировки",
        type: "number",
    },
    "dose.unit.id": {
        rules: [validateRules.required],
        name: "единица измерения",
        type: "string",
    },
    fromDate: {
        rules: [validateRules.required],
        name: "дата начала",
        type: "date",
    },
    duration: {
        rules: [],
        name: "",
        type: "number",
        initial: null,
    },
    daysInterval: {
        rules: [validateRules.required],
        name: "",
        type: "string",
        initial: courseConditions[0].value,
    },
    intakeCondition: {
        rules: [],
        name: "",
        type: "array",
    },
    dates: {
        rules: [],
        name: "",
        type: "array",
    },
    time: {
        rules: [validateRules.required],
        name: "",
        type: "array",
    },
};

export const validate = (values) => {
    const errors = {};
    if (isEmpty(values.time)) {
        errors["time"] = "Время приёма обязательное для заполнения";
    }
    return errors;
};
