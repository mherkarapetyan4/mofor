export const loginPaths = {
    LOGIN_BY_UKL: "/user/login/byUkl",
    LOGIN_BY_POLICY: "/user/login/byPolicy",
    LOGOUT: "/user/logout",
    // ESIA_LOGIN_HREF: "/authesia/sp/client",
    ESIA_LOGIN_HREF: "https://pandora.mgfoms.ru/authesia/sp/client",
    // ESIA_LOGOUT_HREF: "/authesia/saml/Logout",
    ESIA_LOGOUT_HREF: "https://pandora.mgfoms.ru/authesia/saml/Logout",
};

export const myDataPaths = {
    GET_CURRENT_USER: "/user/current",
    SEND_MODATA_CONFIRMATION: "/user/confirmation/moData",
    SEND_DENTAL_MODATA_CONFIRMATION: "/user/confirmation/dentalMoData",
    SAVE_CONTACTS: "/user/contacts/save",
    CHECK_EMAIL: "/emailAddress/check",
    SEND_CODE_EMAIL: "/emailAddress/sendCode",
    SEND_PERSONAL_DATA_CONFIRMATION: "/user/confirmation/personalDataAccess",
};

export const adminLogin = {
    LOG_IN: "admin/login",
    LOG_OUT: "admin/logout",
};

export const directoryPaths = {
    GET_RESEARCHES_TYPES: "/survey/kind/list",
    GET_RESEARCHES_TYPES_EXISTING: "/survey/kind/list/existing",
};

export const myResearchedPaths = {
    GET_RESEARCHES_LIST: "/survey/list",
    GET_RESEARCH: "/survey/get",
    DELETE_RESEARCH: "/survey/delete",
    ADD_RESEARCH: "/survey/create",
    EDIT_RESEARCH: "/survey/edit",
    DELETE_RESEARCH_FILE: "/survey/file/delete",
    GET_STATISTIC: "/survey/statistics",
    ADD_FILES: "/survey/file/add",
    GET_FILE: "/survey/file/",
    GET_ZIP: "/survey/zip/",
};

export const myCalendarPath = {
    GET_CALENDAR_COUNTS: "/calendar/event/counts",
    GET_CALENDAR_LIST: "/calendar/event/list",
    SAVE_CALENDAR_EVENT: "/calendar/setting/save",
    DELETE_CALENDAR_EVENT: "/calendar/setting/delete",
    GET_CALENDAR_EVENT: "/calendar/setting/get",
};

export const policyPaths = {
    GET_CURRENT_POLICY: "/policy/claim",
    GET_POLICY_LIST: "/policy/claim/list",
    GET_CLAIM_DICTIONARY_EXISTENCE_KIND_LIST:
        "/policy/claim/dictionary/existingKind/list",
    GET_CLAIM_DICTIONARY_EXISTENCE_LIST:
        "/policy/claim/dictionary/existence/list",
    GET_CLAIM_DICTIONARY_REASON_LIST: "/policy/claim/dictionary/reason/list",
    SEND_CLAIM: "/policy/claim/send",
    GET_TEMP_PDF: "/policy/claim/temp/pdf",
    GET_TEMP_SIGN: "/policy/claim/temp/sign",
};

export const pillboxPaths = {
    GET_PILLBOX: "/pillbox",
    GET_PILLBOX_LIST: "/pillbox/profile/list",
    GET_CURRENT_PILLBOX: "/pillbox/profile/get",
    SAVE_PILLBOX: "/pillbox/profile/save",
    DELETE_PROFILE: "/pillbox/profile/delete",
    GET_ALLERGEN_LIST: "/pillbox/allergen/list",
    ADD_PROFILE_ALLERGEN: "/pillbox/profile/addAllergen",
    DELETE_PROFILE_ALLERGEN: "/pillbox/profile/deleteAllergen",
    GET_DISEASE_LIST: "/pillbox/disease/list",
    ADD_PROFILE_DISEASE: "/pillbox/profile/addDisease",
    DELETE_PROFILE_DISEASE: "/pillbox/profile/deleteDisease",
    GET_PILLBOX_DRUGS_LIST: "/pillbox/drug/course/list",
    GET_CALENDAR_DRUGS_LIST: "/pillbox/drug/intake/list",
    GET_DRUG_INSTRUCTION: "/pillbox/instruction",
    GET_DRUG_INSTRUCTION_LIST: "/pillbox/instruction/list",
    GET_DRUG_LIST: "/pillbox/drug/list",
    GET_SCREENING_RESULT_COUNTS: "/pillbox/screening/result/counts",
    DELETE_PILLBOX_DRUG: "/pillbox/drug/course/delete",
    CHANGE_CONFIRM_DRUG: "/pillbox/drug/intake/confirmation",
    SAVE_PILLBOX_DRUG: "/pillbox/drug/course/save",
    GET_PILLBOX_DOSCREENING: "/pillbox/profile/screening",
    GET_PILLBOX_SCREENING: "/pillbox/screening/result",
    GET_SCREENING_RESULT_PDF: "/pillbox/screening/result/pdf",
    GET_SCREENING_RESULT_HTML: "/pillbox/screening/result/html",
    GET_DRUG_FORM_DOSING_UNIT: "/pillbox/drugFormDosingUnit/list",
    GET_DOSING_UTILS_LIST: "/pillbox/dosingUnit/list",
    DOCTOR_VISITED: "/pillbox/profile/screening/status/doctorVisited",
    EMAIL_SCREENING: "/pillbox/screening/result/email",
    GET_DRUG_COURSE: "/pillbox/drug/course/get",
    PILLBOX_CHECK_EMAIL: "/emailAddress/check",
    PILLBOX_SEND_CODE_EMAIL: "/emailAddress/sendCode",
};

export const adminPaths = {
    GET_BUDGET_LIST: "admin/moBudget/version",
    GET_HOTLINE_LIST: "admin/smoContact/version",
    GET_STATISTIC_COUNT: "admin/statistics/counts",
    GET_STATISTIC_FEED_BACKS: "admin/statistics/feedbacks",
    GET_STATISTIC_ATTACHMENTS: "admin/statistics/attachments",
    GET_STATISTIC_SMOS: "admin/statistics/smos",
    GET_STATISTIC_UNCONFIRMED_SERVICES: "admin/statistics/unconfirmedServices",
    GET_STATISTIC_UNCONFIRMED_SERVICES_TYPES:
        "admin/statistics/unconfirmedServicesTypes",
    GET_STATISTIC_DISPANSER_RESULTS:
        "admin/statistics/seenDispanserisationResults",
    GET_ROLES_LIST: "admin/roles/list",
    GET_USERS_LIST: "admin/users/list",
    SAVE_USER: "admin/users/save",
    GET_SYSTEM_LIST: "admin/journal/list",
    GET_UNCONFIRMED_SERVICES_TABLE_XLS:
        "admin/reports/unconfirmedServicesTable.xls",
    GET_UNCONFIRMED_SERVICES_LIST_XLS:
        "admin/reports/unconfirmedServicesList.xls",
    GET_STATISTIC_ATTACHMENTS_XLS: "admin/reports/attachmentsStatistics.xls",
    GET_STATISTIC_DISPANSERISATION_XLS:
        "admin/reports/dispanserisationReport.xls",
    GET_STATISTIC_UNCONFIRMED_SERVICES_STATISTICS_XLS:
        "admin/reports/unconfirmedServicesStatistics.xls",
    GET_STATISTIC_WARDS_COUNT_SMO_XLS: "admin/reports/wardsCountBySmo.xls",
    GET_STATISTIC_SMO_APPEALS_COUNT_XLS: "admin/reports/smoAppealsCount.xls",
    GET_STATISTIC_FEED_BACKS_XLS: "admin/reports/feedbacksStatistics.xls",
    GET_MONTHLY_REPORT_XLS: "admin/reports/monthlyReport.xls", // TODO:: do this rout
    GET_NEWS_LIST: "admin/news/list",
    DELETE_NEWS: "admin/news/delete",
    SAVE_NEWS: "admin/news/save",
    PUBLISH_NEWS: "admin/news/publish",
    UNPUBLISH_NEWS: "admin/news/unpublish",
    GET_QUESTIONING_LIST: "admin/questionary/list",
    GET_FULL_QUESTIONING: "admin/questionary/full",
    CREATE_QUESTIONING: "admin/questionary/create",
    SAVE_FULL_QUESTIONING: "admin/questionary/full/save",
    EDIT_QUESTIONING: "admin/questionary/edit",
    DELETE_QUESTIONING: "admin/questionary/delete",
    COPY_QUESTIONING: "admin/questionary/copy",
    PUBLISH_QUESTIONING: "admin/questionary/switchState",
    GET_PBD_USER: "/admin/pbd/user",
    GET_QUESTIONING_STATISTIC_FULL: "admin/questionary/result/statistic/full",
    GET_QUESTIONING_STATISTIC_COMPLETED:
        "/admin/questionary/result/statistic/completed",
    GET_QUESTIONING_DETAIL_FULL: "/admin/questionary/result/detail/full",
    GET_WARDS_COUNT_BY_SMO: "admin/statistics/wardsCountBySmo",
    GET_SMO_APPEALS_COUNT: "admin/statistics/smoAppealsCount",
    GET_PLATFORM_STATS: "admin/statistics/platforms",
    DOWNLOAD_PLATFORM_REPORT: "admin/reports/platformsStatistics.xls",
};

export const fiasPaths = {
    REGION_LIST: "/fias/region/list",
    AREA_LIST: "/fias/area/list",
    CITY_LIST: "/fias/city/list",
    PLACE_LIST: "/fias/place/list",
    HOUSE_LIST: "/fias/house/list",
    STREET_LIST: "/fias/street/list", //улица
};

export const healthPaths = {
    HEALTH_GET_DATA: "/healthbook/actual/list",
    HEALTH_SAVE_DATA: "/healthbook/actual/save",
    HEALTH_DELETE_DATA: "/healthbook/actual/delete",
    HEALTH_SAVE_TARGET_DATA: "/healthbook/target/save",
    HEALTH_GET_TARGET_DATA: "/healthbook/target/list",
    HEALTH_WIDGETS_DATA: "/widgets/config",
};

export const questionaryPath = {
    AVAILABLE_LIST: "/questionary/available/list",
    AVAILABLE_FULL: "/questionary/available/full",
    COMPLETE: "/questionary/complete",
};

export const allergyPath = {
    ALLERGY_GET_DATA: "/forecast/allergy/today",
};

export const dispanserPath = {
    GET_DISPANSER_DATA: "/dispanserisation/state",
    SAVE_DISPANSER_ANSWERS: "/dispanserisation/questionary/save",
    DOWNLOAD_DISPANSER_FORM: "/dispanserisation/questionary/pdf",
    CHILD_DISPANSER_WIDGET: "dispanserisation/child/all",
};

export const meteoPath = {
    METEO_GET_DATA: "/forecast/meteo/today",
};

export const widgetsPath = {
    WIDGETS_GET_DATA: "/widgets/config",
    WIDGETS_SAVE_DATA: "/widgets/config",
    CALENDAR_GET_LIST: "/calendar/event/list",
    GET_PILLBOX_DRUGS_LIST: "/pillbox/drug/intake/list",
    GET_PILLBOX_LIST: "/pillbox/profile/list",
};

export const userPath = {
    LAST_ACTIONS_GET_DATA: "/user/journalEvents/list",
    NOTIFICATIONS_GET_DATA: "/notification/list",
    GET_USER_PROFILES_LIST: "/user/profile/list",
    SWITCH_PROFILE: "/user/profile/switch",
    ADD_DISEASE: "/user/vital/addDisease",
    ADD_ALLERGENS: "/user/vital/addAllergen",
    ADD_COMPLICATION_KIND: "/user/vital/addPregnancyComplicationKind",
    VITAL_GET_DATA: "/user/vital/get",
    VITAL_GET_COMPLICATION_KIND_LIST:
        "/user/vital/pregnancyComplicationKind/list",
    DELETE_COMPLICATION_KIND: "/user/vital/deletePregnancyComplicationKind",
    DELETE_ALLERGEN: "/user/vital/deleteAllergen",
    DELETE_DISEASE: "/user/vital/deleteDisease",
    SAVE_VITAL: "/user/vital/save",
    CHECK_ALLOWED: "/user/confirmation/checkAllowed",
    CONFIRMATION_PASSPORT_DATA: "/user/confirmation/passportData",
    CONFIRMATION_SNILS_DATA: "/user/confirmation/snilsData",
    GET_CLIENT_CONFIG: "/client/settings",
    CONFIRMATION_PASSPORT_DATA_ALLOWED:
        "/user/confirmation/passportData/correctionAllowed",
    CORRENT_PASSPORT_DATA_FROM_AUTH:
        "/user/confirmation/passportData/correctFromAuth",
    SEND_SMO_MESSAGE: "smoAppeal/send",
    CHECK_ALLOW_AUTH_BY_UKL: "/empty/restricted",
};

export const newsPath = {
    ACTUAL_DATA: "/news/actual",
    SUPPRESS: "/news/suppress",
};

export const pregnancyPath = {
    CURRENT_INFO: "pregnancy/current/info",
    CURRENT_EVENT_EVENT_LIST: "pregnancy/current/event/list",
    CURRENT_INDICATOR_LIST: "/pregnancy/current/indicator/list",
    CHECK_UNREAD_MESSAGES: "pregnancy/checkUnreadMessages",
    GET_MESSAGES: "/pregnancy/getMessages",
    SEND_MESSAGE: "/pregnancy/sendMessage",
    NOTIFICATIONS_GET_DATA: "/notification/list",
    EVENT_CONFIRMATION: "pregnancy/current/event/confirm",
    EVENT_UNCONFIRMATION: "pregnancy/current/event/unconfirm",
    EVENT_REJECTION: "pregnancy/current/event/reject",
    CURRENT_NOTIFICATION_GET_DATA: "pregnancy/current/notification/list",
    CURRENT_NOTIFICATION_SUPPRESS: "pregnancy/current/notification/suppress",
    ARCHIVE_LIST: "pregnancy/archive/list",
    HOLIDAY_LIST: "holiday/list",
    ARTICLE_SECTION_LIST: "pregnancy/article/section/list",
    CURRENT_ARTICLE_LIST: "pregnancy/current/article/list",
    COMPLICATION_LIST: "pregnancy/current/complication/list",
    COMPLICATION_KIND_LIST: "pregnancy/complication/kind/list",
    ADD_COMPLICATION: "pregnancy/current/complication/save",
    SAVE_INITIAL_VALUES: "pregnancy/edit",
    GET_CURRENT_SCREENING: "pregnancy/current/screening",
    GET_PREGNANCY_PDF_REPORT: "pregnancy/current/report/pdf",
    SEND_PREGNANCY_REPORT_BY_EMAIL: "pregnancy/current/report/send",
    GET_ASK_DOCTORS: "pregnancy/checkPolicies",
    SEND_ASK_DOCTORS: "pregnancy/sendPolicies",
    CHECK_PREGNANCY_EMAIL: "pregnancy/checkEmail",
};

export const oncoPath = {
    CHECK_ONCO_EMAIL: "onco/checkEmail",
    CURRENT_INFO: "onco/current",
    SAVE_INITIAL_VALUES: "onco/current",
    ARCHIVE_LIST: "onco/closed",
    CURRENT_INDICATOR_LIST: "onco/current/indicator/list",
    CURRENT_NOTIFICATION_GET_DATA: "onco/current/notification/list",
    CURRENT_NOTIFICATION_SUPPRESS: "onco/current/notification/suppress",
    GET_PREGNANCY_PDF_REPORT: "onco/current/report/pdf",
    SEND_PREGNANCY_REPORT_BY_EMAIL: "onco/current/report/send",
    CHECK_UNREAD_MESSAGES: "onco/checkUnreadMessages",
    GET_MESSAGES: "/onco/getMessages",
    SEND_MESSAGE: "/onco/sendMessage",
    // GET_ASK_DOCTORS: "onco/checkPolicies",
    CURRENT_EVENT_EVENT_LIST: "onco/current/event/list",
    EVENT_CONFIRMATION: "onco/current/event/confirm",
    EVENT_UNCONFIRMATION: "onco/current/event/unconfirm",
    EVENT_REJECTION: "onco/current/event/reject",
    EVENT_RESCHEDULE: "onco/current/event/reschedule",
};

export const vaccinationsPath = {
    VACCINATIONS_GET_CALENDAR: "/vaccination/calendar",
    VACCINATIONS_GET_CALENDAR_PLAIN: "/vaccination/calendar/plain",
    SAVE_CONFIRMATION_WITH_SURVEY: "/vaccination/confirmation/save/withSurvey",
    DELETE_CONFIRMATION: "/vaccination/confirmation/delete",
    VACCINATION_CALENDAR_PDF: "/vaccination/calendar/pdf",
    VACCINATION_REPORT_PDF: "/vaccination/report/pdf",
    CONFIRMATION_EPIDEMIC_LIST: "/vaccination/confirmation/epidemic/list",
    CONFIRMATION_EPIDEMIC_DELETE: "/vaccination/confirmation/epidemic/delete",
    VACCINATION_EPIDEMIC_LIST: "vaccination/epidemic/list",
    SAVE_CONFIRMATION_EPIDEMIC_WITH_SURVEY:
        "vaccination/confirmation/epidemic/save/withSurvey",
    VACCINATION_WIDGET: "vaccination/calendar/plain/active",
};

export const doctorPath = {
    APPOINTMENT_LIST: "/emias/appointment/list",
    REFERRAL_LIST: "/emias/referral/list",
    PRESCRIPTION_LIST: "/emias/prescription/list",
    SPECIALITY_LIST: "/emias/speciality/list",
    GET_CURRENT_DOCTORS: "/emias/doctor/list",
    GET_DOCTOR_SCHEDULE: "/emias/doctor/schedule",
    CREATE_APPOINTMENT: "/emias/appointment/create",
    DOWNLOAD_TICKET: "/emias/appointment/ticket",
    CANCEL_APPOINTMENT: "/emias/appointment/cancel",
    SHIFT_APPOINTMENT: "/emias/appointment/shift",
};

export const geoPath = {
    GET_COORDINATES: "/geo/coordinates",
};

export const subscriptionsPaths = {
    SUBSCRIPTIONS_GET: "/notificationsSettings",
    SUBSCRIPTIONS_SAVE: "/notificationsSettings/save",
    SUBSCRIPTIONS_SEND_CODE_EMAIL: "/emailAddress/sendCode",
};

export const polisPaths = {
    GET_SMOS: "/smo/list",
    GET_SMO_OFFICES: "/smo/office/list",
    GET_SMO_COORDINATES: "/smo/office/list/coordinates",
    GET_MO_DISTRICTS: "/mfc/district/list",
    GET_MC_OFFICES: "/mfc/list",
    GET_MC_COORDINATES: "/mfc/list/coordinates",
};
