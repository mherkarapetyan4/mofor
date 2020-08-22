import isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";

export const checkSymbols = (number) => {
    if (number <= 9) {
        return `0${number}`;
    }
    return number;
};

export const formatDate = (date, needTime = false, needYearText = false) => {
    if (!date) return null;
    const d = dayjs(date);
    const dateString =
        checkSymbols(d.date()) +
        "." +
        checkSymbols(d.month() + 1) +
        "." +
        d.year();

    if (needYearText) {
        return dateString + " г. ";
    }

    if (!needTime) {
        return dateString;
    }
    return (
        dateString +
        " " +
        checkSymbols(d.hour()) +
        ":" +
        checkSymbols(d.minute())
    );
};

export const formatDateWithDayNames = (date, hideWeekDays = false) => {
    if (!date) return null;
    const d = dayjs(date);
    const today = dayjs();
    const weekDays = [
        "воскресение",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
    ];
    const monthsNames = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    let weekString = "";
    if (!hideWeekDays) weekString = weekDays[d.day()] + ", ";

    const dateString =
        weekString +
        d.date() +
        " " +
        monthsNames[d.month()] +
        " " +
        d.year() +
        " г.";
    if (d.date() === today.date()) {
        return "Сегодня, " + dateString;
    } else if (d.date() === today.date() + 1) {
        return "Завтра, " + dateString;
    } else if (d.date() === today.date() - 1) {
        return "Вчера, " + dateString;
    }

    return dateString;
};

export const serverFormatDate = (date, format = "YYYY-MM-DD") => {
    if (date && !isEmpty(date)) {
        return dayjs(date)
            .clone()
            .format(format);
    }
    return "";
};
