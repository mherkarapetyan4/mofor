import React from "react";
import HomeIcon from "icons/HomeIcon";
import CalendarIcon from "components/Icons/CalendarIcon";
import ServicesIcon from "icons/ServicesIcon";
import VaccinationIcon from "icons/VaccinationIcon";
import DiaryIcon from "icons/DiaryIcon";
import PillsIcon from "components/Icons/pillbox/PillsIcon";
import PregnancyIcon from "icons/PregnancyIcon";
import DocumentIcon from "icons/DocumentIcon";
import DoctorIcon from "icons/services/DoctorIcon";
import PulseIcon from "icons/PulseIcon";
import AboutIcon from "icons/AboutIcon";
import GearIcon from "icons/GearIcon";
import PositionIcon from "icons/PositionIcon";
import InquiryIcon from "icons/InquiryIcon";
import MarkedMapIcon from "icons/MarkedMapIcon";
import DischargeIcon from "icons/DischargeIcon";

export const LK_MENU_ELEMENTS = {
    AUTH_PAGE: {
        id: 0,
        path: "/auth",
        name: "Авторизация",
        leftMenu: false,
        auth: true,
        siteMap: false,
    },
    MAIN_PAGE: {
        id: 1,
        path: "/",
        name: "Главная",
        leftMenu: true,
        main: true,
        icon: <HomeIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Добро пожаловать в Сервис застрахованных лиц по ОМС!
                Здесь Вы можете:
                -ознакомиться со сведениями о своем прикреплении к поликлинике и
                данными полиса ОМС
                -получить доступ к информации об оказанных Вам медицинских услугах
                -вести личный медицинский календарь, дневник здоровья
                -планировать и отслеживать прием лекарственных средств
                -заполнить раздел с информацией, предназначенной для
                использования врачами скорой помощи в случае экстренной ситуации
                -и многое другое
            `,
        },
    },
    SERVICES_PAGE: {
        id: 2,
        path: "/services",
        name: "Мои услуги",
        wardName: "Медицинские услуги",
        leftMenu: true,
        icon: <ServicesIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Страховые медицинские организации один раз в месяц присылают нам
                информацию об оказанных Вам медицинских услугах. Мы предлагаем Вам
                доступ к:
                 своим услугам, полученным в городе Москве или в другом субъекте РФ
                 оказанной скорой медицинской помощи
                Оцените качество и доступность услуги. Если какая-либо отображаемая
                услуга Вам не была оказана – направьте нам обращение.
            `,
        },
    },
    CALENDAR_PAGE: {
        id: 3,
        path: "/calendar",
        name: "Календарь",
        leftMenu: true,
        icon: <CalendarIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Здесь Вы можете самостоятельно планировать события (например, прием
                лекарств, дату госпитализации и т.п.)
            `,
        },
    },
    TREATMENT_PAGE: {
        id: 4,
        path: "/researches",
        name: "Мое лечение",
        wardName: "Лечение",
        leftMenu: true,
        icon: <PulseIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Создайте свой архив медицинской документации: протоколы приемов
                врачей, результаты лабораторно-инструментальных исследований,
                диспансеризации, выписки из стационаров
                Просматривайте загруженные файлы, скачивайте их на свой компьютер,
                ненужные документы удаляйте.
            `,
        },
    },
    DIARY_PAGE: {
        id: 5,
        path: "/health",
        name: "Дневник здоровья",
        leftMenu: true,
        icon: <DiaryIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Мы предлагаем Вам сервис для отслеживания важных показателей
                состояния своего здоровья: глюкоза, давление, пульс, вес, температура,
                холестерин, каллории.
                Добавляйте показания, следите за динамикой изменений в табличном, либо
                графическом виде, оставляйте примечания.
            `,
        },
    },
    MEDICINES_PAGE: {
        id: 6,
        path: "/medicine",
        name: "Мои лекарства",
        wardName: "Лекарства",
        leftMenu: true,
        items: {
            CREATEORUPDATE: {
                id: 0,
                path: "/medicine/profile/create",
                name: "Добавить или редактировать профиль",
            },
        },
        icon: <PillsIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Удобный сервис контроля приема лекарств, назначенных Вам или
                подопечному лечащим врачом. Заполните данные о своем здоровье.
                Внесите в таблетницу назначенное медикаментозное лечение в соответствии
                с рецептом и настройте уведомления.
                Дополнительно Вы найдете сервис скрининга лекарственных средств,
                который позволит получить информацию о совместимости медицинских
                препаратов Вашей таблетницы. Сервис проверки совместимости носит
                информационный характер, однако может помочь Вам обратить внимание
                на взаимодействия лекарственных средств друг с другом с учетом пола,
                возраста, заболеваний, аллергий и т.п.
            `,
        },
    },
    PREGNANCY_PAGE: {
        id: 7,
        path: "/pregnancy",
        name: "Беременность",
        leftMenu: true,
        icon: <PregnancyIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Добро пожаловать в раздел ведения беременности в вашем личном
                кабинете! МГФОМС создал этот раздел специально для Вас, чтобы Вы могли
                следить за своим здоровьем на всех этапах беременности, контролировать
                изменения всех важных показателейполучать уведомления и напоминания,
                а также всегда оставались на связи со своим лечащим врачом.
            `,
        },
    },
    ONCO_PAGE: {
        id: 17,
        path: "/onco",
        name: "OnlineDoc",
        leftMenu: true,
        icon: <PregnancyIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Заготовка раздела "Онкопоиск"
            `,
        },
    },
    POLIS_PAGE: {
        id: 8,
        path: "/polis",
        name: "Заявление на полис",
        leftMenu: true,
        icon: <DocumentIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Ваш полис пришел в негодность? Вы сменили фамилию или потеряли полис?
                Мы предлагаем Вам не выходя из дома заполнить и подать заявление на
                получение полиса ОМС, а также выбрать удобный для Вас пункт выдачи
                готового полиса. Пока оформляется полис, Вы можете скачать временное
                свидетельство в электронном виде для посещения медицинской
                организации и получать статусы по обработке Вашего заявления.
            `,
        },
    },
    DOCTOR_PAGE: {
        id: 9,
        path: "/doctor",
        name: "Запись к врачу",
        leftMenu: true,
        icon: <DoctorIcon color={"#fff"} />,
    },
    SITE_MAP_PAGE: {
        id: 11,
        path: "/sitemap",
        name: "Карта сайта",
        leftMenu: false,
        icon: <MarkedMapIcon color={"#fff"} />,
    },
    BIOMETEOROLOGY_PAGE: {
        id: 12,
        path: "/biometeorology",
        name: "Биометеорологический прогноз",
        leftMenu: false,
        siteMap: false,
    },
    CONFIDENTIAL_PAGE: {
        id: 13,
        path: "/confidential",
        name: "Положение о конфиденциальности",
        leftMenu: false,
        icon: <DischargeIcon color={"#fff"} />,
    },
    RULES_PAGE: {
        id: 14,
        path: "/rules",
        name: "Правила работы с сервисом",
        leftMenu: false,
        icon: <InquiryIcon color={"#fff"} />,
    },
    VACCINATION_PAGE: {
        id: 15,
        path: "/vaccination",
        name: "Вакцинации",
        leftMenu: true,
        icon: <VaccinationIcon color={"#fff"} />,
        helper: {
            dataStep: 1,
            dataDescription: `
                Удобный сервис для отслеживания и ведения истории о прохождении
                вакцинации Вашего ребенка.
                Получайте информацию о периодах вакцинации Вашего ребенка в
                соответствии с Национальным календарем профилактических прививок.
                Подтверждайте факт получения прививки и прикладывайте скан-копию
                проведенной вакцинации – данная информация может пригодиться Вам в
                будущем.
                Фиксируйте прививки, полученные вне Национального календаря, и также
                сохраняйте скан-копию о факте проведенной вакцинации.
                Для Вашего удобства мы предоставили Вам возможность скачать календарь
                прививок, а также паспорт полученных прививок
            `,
        },
    },
    LOGIN_PAGE: {
        id: 16,
        path: "/login",
        name: "Авторизация через Госуслуги",
        leftMenu: false,
        auth: true,
        siteMap: false,
    },
};

export const AUTH_REDIRECT = LK_MENU_ELEMENTS.LOGIN_PAGE.path;
// export const AUTH_REDIRECT = LK_MENU_ELEMENTS.AUTH_PAGE.path;

export const LK_MAP_ELEMENTS = {
    ABOUT_PAGE: {
        id: 0,
        path: "/about",
        name: "О проекте",
        leftMenu: true,
        icon: <AboutIcon color={"#fff"} />,
    },
    SETTINGS_PAGE: {
        id: 1,
        path: "/settings",
        name: "Настройки приложения",
        leftMenu: true,
        icon: <GearIcon color={"#fff"} />,
    },
    QUESTIONING_PAGE: {
        id: 2,
        path: "/questioning",
        name: "Анкетирование",
        leftMenu: false,
        siteMap: false,
    },
    UPDATE_PAGE: {
        id: 3,
        path: "/update",
        name: "Обновление системы",
        leftMenu: false,
        siteMap: false,
    },
    CONTACTS_PAGE: {
        id: 4,
        path: "/contacts",
        name: "Схема проезда и контакты МГФОМС",
        leftMenu: true,
        icon: <PositionIcon color={"#fff"} />,
    },
    ONCOLOGY_PAGE: {
        id: 5,
        path: "/assignment",
        name: "Онкомессенджер",
        leftMenu: true,
        siteMap: false,
    },
};

export const ADMIN_ELEMENTS = {
    STATISTIC_PAGE: {
        id: 0,
        path: "/statistic",
        name: "Статистика",
        leftMenu: true,
        roles: [
            "SystemAdministrators",
            "ContentManager",
            "MedicalExpert",
            "Statistic",
        ],
    },
    USERS: {
        id: 1,
        path: "/users",
        name: "Журнал пользователей",
        leftMenu: true,
        roles: ["SystemAdministrators"],
    },
    SYSTEM: {
        id: 2,
        path: "/system",
        name: "Системный журнал",
        leftMenu: true,
        roles: ["SystemAdministrators"],
    },
    BUDGET: {
        id: 3,
        path: "/budget",
        name: "Бюджет МО",
        leftMenu: true,
        roles: ["SystemAdministrators", "MedicalExpert", "MoBudgetOperator"],
    },
    HOTLINE: {
        id: 4,
        path: "/hotline",
        name: "Контакты СМО",
        leftMenu: true,
        roles: ["SystemAdministrators", "MedicalExpert", "MoBudgetOperator"],
    },
    AUTH_PAGE: {
        id: 5,
        path: "",
        name: "Логин",
        leftMenu: false,
    },
    USER_CREATE: {
        id: 6,
        path: "/users/create",
        name: "Добавить пользователя",
        leftMenu: false,
    },
    USER_EDIT: {
        id: 9,
        path: "/users/edit",
        name: "Редактировать пользователя",
        leftMenu: false,
    },
    UPDATES: {
        id: 7,
        path: "/updates",
        name: "Обновления сервиса",
        leftMenu: true,
        roles: ["ContentManager", "MedicalExpert"],
    },
    QUESTIONING: {
        id: 8,
        path: "/questioning",
        name: "Анкетирование",
        leftMenu: true,
        roles: ["ContentManager", "MedicalExpert"],
    },
};

const menuValues = Object.values(LK_MENU_ELEMENTS);
const menuAdmin = Object.values(ADMIN_ELEMENTS);

export const LK_LEFT_MENU_ELEMENTS = menuValues.filter((e) => e.leftMenu);
export const LK_AUTH_ELEMENTS = menuValues.filter((e) => e.auth);
export const LK_MAIN_PAGE = menuValues.find((e) => e.main);
export const ADMIN_LEFT_MENU_ELEMENTS = menuAdmin.filter((e) => e.leftMenu);
