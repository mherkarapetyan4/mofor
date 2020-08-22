export const validate = (values) => {
    const errors = {};
    if (
        values.type === "PRESSURE" &&
        values.systolic &&
        values.diastolic &&
        Number(values.systolic) < Number(values.diastolic)
    ) {
        errors["systolic"] =
            "Значение систолического давления не может быть меньше диастолического.";
        errors["diastolic"] =
            "Значение диастолического давления не может быть больше систолического.";
    }
    return errors;
};
