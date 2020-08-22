export const validate = (values) => {
    const errors = {};

    if (
        values.periodicity === "DAYS_OF_WEEK" &&
        ![
            values.monday,
            values.sunday,
            values.wednesday,
            values.thursday,
            values.friday,
            values.saturday,
            values.tuesday,
        ].includes(true)
    ) {
        errors.daysOfWeek = "Хотя бы один день недели должен быть выбран";
    }
    if (
        values.periodicity !== "ONCE" &&
        !values.endDate &&
        !values.repetitionsCount
    ) {
        errors.endDate = "Поле дата окончания обязательно для заполнения";
        errors.repetitionsCount =
            "Поле количество повторений обязательно для заполнения";
    }

    return errors;
};
