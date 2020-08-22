import "dayjs/locale/ru";
import dayjs from "dayjs";
dayjs.locale("ru");

export const startOfMonth = (date) => {
    const firstMonthDay = date.clone().startOf("month");
    const firstMonthDayWeekday = firstMonthDay.day();
    if (firstMonthDayWeekday === 1) {
        return firstMonthDay;
    } else if (firstMonthDayWeekday === 0) {
        return firstMonthDay.clone().subtract(6, "day");
    }
    const substDays = firstMonthDayWeekday - 1;
    return firstMonthDay.clone().subtract(substDays, "day");
};

export const endOfMonth = (date) => {
    const lastMonthDay = date.clone().endOf("month");
    const lastMonthDayWeekday = lastMonthDay.day();
    if (lastMonthDayWeekday === 0) {
        return lastMonthDay;
    }
    const addDays = 7 - lastMonthDayWeekday;
    return lastMonthDay.clone().add(addDays, "day");
};

export const getMonth = (date) => {
    return date.format("MMMM");
};

export const getDay = (date) => {
    return date.format("dddd");
};
