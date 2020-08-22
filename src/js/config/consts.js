import React from "react";
import dayjs from "dayjs";
import keyMirror from "fbjs/lib/keyMirror";
import { keyframes } from "styled-components";

const devHosts = [
    "127.0.0.1",
    "localhost",
    "betapandora2.mgfoms.ru",
    "testpandora.mgfoms.ru",
    "betapandora.mgfoms.ru",
];

export const isDev = devHosts.includes(location.host);

export const POSITION_INCREASE = -1;
export const POSITION_DECREASE = 1;

export const BASE_URL = "https://betapandora.mgfoms.ru/sizl";
// export const BASE_URL = "/sizl";

export const PREGNANCY_TYPES = {
    GLUCOSE: "Глюкоза",
    WEIGHT: "Мой вес",
    PRESSURE: "Давление",
};
export const OCNO_TYPES = {
    TEMPERATURE: "Температура",
    WEIGHT: "Мой вес",
    PRESSURE: "Давление",
};

export const MOSCOW_CODE = "77";

export const placeHolder = "Нет данных";

export const YMAP_API_KEY = "eKdksfiMbZUPBBHfQNWiK08KkHuTJlkR";

export const validateRules = keyMirror({
    // обязательно для заполнения
    required: undefined,
    // максимальное значение
    max: undefined,
    // минимальное значение
    min: undefined,
    email: undefined,
    round: undefined,
    phone: undefined,
    password: undefined,
});

export const ARROW_ANIMATION = keyframes`
    0% {
        transform: translateX(0px);
    }
    
    50% {
        transform: translateX(20px);
    }
    
    100% {
        transform: translateX(0px);
    }
`;
export const MAX_FILE_SIZE = 2097152;
export const MAX_RESEARCH_FILE_SIZE = 1048576;
export const MAX_FILE_NAME = 50;

export const PREGNANCY_SHARE_DATE_SELECT = [
    { value: "last_0_dey", label: "Сегодня" },
    { value: "last_1_dey", label: "Вчера" },
    { value: "pregnancy", label: " С начала беременности" },
    { value: "last_30_dey", label: "последние 30 дней" },
    { value: "last_60_dey", label: "последние 60 дней" },
    { value: "last_90_dey", label: "последние 90 дней" },
    { value: "outer", label: "произвольный период" },
];
export const ONCO_SHARE_DATE_SELECT = [
    { value: "last_0_dey", label: "Сегодня" },
    { value: "last_1_dey", label: "Вчера" },
    { value: "onco", label: " С начала онкологии" },
    { value: "last_30_dey", label: "последние 30 дней" },
    { value: "last_60_dey", label: "последние 60 дней" },
    { value: "last_90_dey", label: "последние 90 дней" },
    { value: "outer", label: "произвольный период" },
];

export const DATE_MORNING = "morning";
export const DATE_DAY = "day";
export const DATE_EVENING = "evening";
export const DATE_NIGHT = "night";

export const ADMIN_STATISTIC_FEED_BACKS_TYPES = [
    { value: "AVAILABILITY", label: "Доступность" },
    { value: "SATISFACTION", label: "Удовлетворённость" },
];

export const ADMIN_STATISTIC_ATTACHMENTS_PROFILE = [
    { value: "GENERAL", label: "Общий" },
    { value: "DENTAL", label: "Стоматологический" },
];

export const ADMIN_REPORTS_UNCONFIRMED_SERVICES_SECTION = [
    { value: "BY_SERVICE_DATE", label: "по дате услуги" },
    { value: "BY_CONFIRMATION_DATE", label: "по дате обращения" },
];

export const ADMIN_STATISTIC_UNCONFIRMED_SERVICE_SECTION = [
    { value: "COMMON", label: "услуги в Москве" },
    { value: "EMERGENCY", label: "услуги СМП" },
    { value: "REGION", label: "услуги в регионах" },
];
export const USER_VITAL_RH_FACTOR_SELECT_SECTION = [
    { value: "NONE", label: "Не указан" },
    { value: "POSITIVE", label: "Положительный" },
    { value: "NEGATIVE", label: "Отрицательный" },
];
export const MONTHS = [
    { value: 1, label: "январь" },
    { value: 2, label: "февраль" },
    { value: 3, label: "март" },
    { value: 4, label: "апрель" },
    { value: 5, label: "май" },
    { value: 6, label: "июнь" },
    { value: 7, label: "июль" },
    { value: 8, label: "август" },
    { value: 9, label: "сентябрь" },
    { value: 10, label: "октябрь" },
    { value: 11, label: "ноябрь" },
    { value: 12, label: "декабрь" },
];
export const ADMIN_STATISTIC_LABELS = {
    cabinets: "Количество пользователей",
    calendars: "Количество пользующихся календарём",
    healthBooks: "Количество пользующихся дневником здоровья",
    vitalInformations:
        'Количество пользующихся разделом "Расскажи о себе врачу"',
    defaultPillboxProfilesCount:
        "Количество профилей таблетницы для пользователей",
    nonDefaultPillboxProfilesCount:
        "Количество профилей таблетницы для подопечных",
    maxScreeningsCount:
        "Максимальное количество запросов к сервису скрининга от одного пользователя",
    averageScreeningsCount:
        "Среднее количество запросов к сервису скрининга от одного пользователя",
    surveyUsersCount: 'Количество пользующихся разделом "Мое лечение"',
    policyClaims: "Количество поданных заявок на полис ОМС",
    rejectedPolicyClaims: "из них отклонено",
    successfulPolicyClaims: "из них согласовано",
    policyClaimsFromUniqueUsers: "из них от уникальных ЗЛ",
    passportDataCorrections: "Заявок на обновление данных документов в ЕРЗЛ",
    passportDataCorrectionsWithSnils: "из них с указанием СНИЛСа",
    wardsTotalCount: "Количество личных кабинетов для детей",
};
export const HEALTH_TYPES = [
    {
        type: "PRESSURE",
        label: "Давление",
        targetValue: {
            systolic: {
                min: 60,
                max: 300,
                round: 0,
            },
            diastolic: {
                min: 40,
                max: 200,
                round: 0,
            },
        },
        customValue: {
            systolic: {
                min: 60,
                max: 300,
                round: 0,
            },
            diastolic: {
                min: 40,
                max: 200,
                round: 0,
            },
        },
    },
    {
        type: "PULSE",
        label: "Пульс",
        targetValue: {
            value: {
                min: 10,
                max: 300,
                round: 0,
            },
        },
        customValue: {
            value: {
                min: 10,
                max: 300,
                round: 0,
            },
        },
    },
    {
        type: "TEMPERATURE",
        label: "Температура",
        targetValue: {
            value: {
                min: 32,
                max: 43,
                round: 1,
            },
        },
        customValue: {
            value: {
                min: 32,
                max: 43,
                round: 1,
            },
        },
    },
    {
        type: "GLUCOSE",
        label: "Глюкоза",
        targetValue: {
            value: {
                min: 3.3,
                max: 5.5,
                round: 1,
            },
        },
        customValue: {
            value: {
                min: 1,
                max: 15,
                round: 1,
            },
        },
    },
    {
        type: "CHOLESTEROL",
        label: "Холестерин",
        targetValue: {
            value: {
                min: 0,
                max: 10,
            },
        },
        customValue: {
            value: {
                min: 0,
                max: 10,
            },
        },
    },
    {
        type: "WEIGHT",
        label: "Вес",
        targetValue: {
            value: {
                min: 0,
                max: 500,
                round: 3,
            },
        },
        customValue: {
            value: {
                min: 0,
                max: 500,
                round: 3,
            },
        },
    },
    {
        type: "CALORIES",
        label: "Потребленные калории",
        targetValue: {
            value: {
                min: 0,
                max: 20000,
                round: 0,
            },
        },
        customValue: {
            value: {
                min: 0,
                max: 20000,
                round: 0,
            },
        },
    },
];

export const CALENDAR = {
    weekdays: [
        {
            value: 1,
            name: "Понедельник",
            shortName: "Пн",
        },
        {
            value: 2,
            name: "Вторник",
            shortName: "Вт",
        },
        {
            value: 3,
            name: "Среда",
            shortName: "Ср",
        },
        {
            value: 4,
            name: "Четверг",
            shortName: "Чт",
        },
        {
            value: 5,
            name: "Пятница",
            shortName: "Пт",
        },
        {
            value: 6,
            name: "Суббота",
            shortName: "Сб",
        },
        {
            value: 0,
            name: "Воскресенье",
            shortName: "Вс",
        },
    ],
    months: [
        {
            value: 0,
            name: "Январь",
        },
        {
            value: 1,
            name: "Февраль",
        },
        {
            value: 2,
            name: "Март",
        },
        {
            value: 3,
            name: "Апрель",
        },
        {
            value: 4,
            name: "Май",
        },
        {
            value: 5,
            name: "Июнь",
        },
        {
            value: 6,
            name: "Июль",
        },
        {
            value: 7,
            name: "Август",
        },
        {
            value: 8,
            name: "Сентябрь",
        },
        {
            value: 9,
            name: "Октябрь",
        },
        {
            value: 10,
            name: "Ноябрь",
        },
        {
            value: 11,
            name: "Декабрь",
        },
    ],
    maxDate: dayjs()
        .set("date", 31)
        .set("month", 11)
        .set("year", 2100),
    minDate: dayjs()
        .set("date", 1)
        .set("month", 0)
        .set("year", 1900),
};

export const RESPONSIVE = {
    mobile: "1024px",
    tablet: "1300px",
    pc: "1301px",
};

export const modalName = {
    SYSTEM_MESSAGE: "system-error-message",
    SUCCESS_MESSAGE: "success-confirm-modal",
};

export const calendarElements = [
    {
        value: "week",
        label: "Неделю",
        tooltip: "неделя",
    },
    {
        value: "month",
        label: "Месяц",
        tooltip: "месяц",
    },
    {
        value: "quarter",
        label: "Квартал",
        tooltip: "квартал",
    },
    {
        value: "year",
        label: "Год",
        tooltip: "год",
    },
    {
        value: "list",
        label: "Список",
        tooltip: "список",
    },
];

export const periodicityType = [
    {
        value: "ONCE",
        label: "Однократно",
    },
    {
        value: "DAYS_OF_WEEK",
        label: "Дни недели",
    },
    {
        value: "DAILY",
        label: "Ежедневно",
    },
    {
        value: "MONTHLY",
        label: "Ежемесячно",
    },
    {
        value: "ANNUALLY",
        label: "Ежегодно",
    },
];

export const eventTypes = [
    {
        value: "Временная нетрудоспособность",
        label: "Временная нетрудоспособность",
    },
    {
        value: "Госпитализация в дневной стационар",
        label: "Госпитализация в дневной стационар",
    },
    {
        value: "Госпитализация в стационар",
        label: "Госпитализация в стационар",
    },
    {
        value: "Диспансеризация",
        label: "Диспансеризация",
    },
    {
        value: "Здоровый образ жизни",
        label: "Здоровый образ жизни",
    },
    {
        value: "Измерение физиологических показателей",
        label: "Измерение физиологических показателей",
    },
    {
        value: "Исследования",
        label: "Исследования",
    },
    {
        value: "Иное",
        label: "Иное",
    },
    {
        value: "Операция",
        label: "Операция",
    },
    {
        value: "Посещение МО",
        label: "Посещение МО",
    },
    {
        value: "Прием лекарственных средств",
        label: "Прием лекарственных средств",
    },
    {
        value: "Профилактический осмотр",
        label: "Профилактический осмотр",
    },
];

export const INTAKE_CONDITION = {
    WHILE_EATING: "Во время еды",
    BEFORE_EATING: "Перед едой",
    AFTER_EATING: "После еды",
    NOT_MATTER: "Не важно",
};

export const QUESTIONING_CHART_COLORS = [
    "#e53935",
    "#546E7A",
    "#D81B60",
    "#757575",
    "#8E24AA",
    "#6D4C41",
    "#5E35B1",
    "#F4511E",
    "#3949AB",
    "#FB8C00",
    "#1E88E5",
    "#FFB300",
    "#039BE5",
    "#FDD835",
];

export const SEX_LIST = [
    { value: "MALE", label: "Мужчина" },
    { value: "FEMALE", label: "Женщина" },
];

export const courseConditions = [
    {
        value: 1,
        label: "Каждый день",
    },
    {
        value: 2,
        label: "Через день",
    },
    {
        value: 0,
        label: "Расписание",
    },
];

export const questionTypes = [
    {
        value: "YESNO",
        label: "Да/Нет",
    },
    {
        value: "SINGLE",
        label: "Один из списка",
    },
    {
        value: "MULTIPLE",
        label: "Несколько из списка",
    },
    {
        value: "COMMENT",
        label: "Комментарии",
    },
    {
        value: "RATING",
        label: "Рейтинг",
    },
];

export const ADMIN_ROLES = {
    SystemAdministrators: "Системный администратор",
    ContentManager: "Контент менеджер",
    MedicalExpert: "Медицинский эксперт",
    Statistic: "Статистик",
    MoBudgetOperator: "Оператор бюджета",
};

export const phoneMask = "(999)999-99-99";
export const issuerCode = "999-999";
export const snilsMask = "999-999-999 99";
export const maskChar = "_";

export const policyStorageKey = "new_policy";

export const attachmentTypes = {
    BY_TERRITORY: "По территориальному признаку",
    BY_CLAIM: "По личному заявлению",
    BY_ELECTRONIC_CLAIM: "По личному заявлению в электронном виде",
};

export const filePopupInfo = {
    tooltip: "Требования к файлу",
    title: "Требования к загружаемому файлу",
    text: (
        <div>
            <p>Файл должен предоставляться в формате JPG/JPEG/PDF/RAR/ZIP.</p>
            <p>Размер файла должен быть не более 1 мегабайта.</p>
        </div>
    ),
};
