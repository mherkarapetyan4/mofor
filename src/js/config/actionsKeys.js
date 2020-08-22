import keyMirror from "fbjs/lib/keyMirror";

export const appKeyActions = keyMirror({
    TOGGLE_LEFT_MENU: undefined,
    THEME: undefined,
    START_AUTH_PENDING: undefined,
    END_AUTH_PENDING: undefined,
    AUTH_FULLFILLED: undefined,
    ADMIN_IS_AUTH: undefined,
    APP_START_FETCHING: undefined,
    APP_END_FETCHING: undefined,
    LOGOUT: undefined,
    SHOW_HELPERS: undefined,
    HIDE_HELPERS: undefined,
    CHANGE_APP_BACKGROUND: undefined,
    CHANGE_USER_THEME: undefined,
});

export const serviceActions = keyMirror({
    GET_SERVICES_LIST_FULLFILLED: undefined,
    GET_PRINT_SERVICES_LIST_FULLFILLED: undefined,
    FACT_OF_CONFIRMATON_SERVICE_FULLFILLED: undefined,
    ADD_REVIEW_SERVICE_FULLFILLED: undefined,
    GET_SERVICE_FULLFILLED: undefined,
    START_FETCHING: undefined,
    END_FETCHING: undefined,
});

export const myDataActions = keyMirror({
    GET_MY_DATA_PENDING: undefined,
    GET_MY_DATA_FULLFILLED: undefined,
    GET_MY_DATA_REJECTED: undefined,
    SET_CHECK_EMAIL: undefined,
    SET_SAVED_CONTACTS: undefined,
    // CHECK_EMAIL_MY_DATA_FULLFILLED: undefined,
    // START_MY_DATA_FETCHING: undefined,
    // END_MY_DATA_FETCHING: undefined,
    // GET_VITAL_INFORMATION_FULLFILLED: undefined,
    // CONFIRM_EMAIL: undefined,
});

export const myResearchesActions = keyMirror({
    GET_MY_RESEARCHES_FULLFILLED: undefined,
    GET_MY_PRINT_RESEARCHES_FULLFILLED: undefined,
    STATISTIC_FULLFILLED: undefined,
    MY_RESEARCHES_ELEMENT_FULLFILLED: undefined,
    SHOW_FILE_FULLFILLED: undefined,
    CLEAR_FILE: undefined,
    DELETE_RESEARCHES_ELEMENT: undefined,
    ADD_RESEARCH_ELEMENT: undefined,
});

export const directoryActions = keyMirror({
    FILL_RESEARCHES_TYPES: undefined,
    FILL_RESEARCHES_TYPES_EXISTING: undefined,
});

export const calendarActions = keyMirror({
    GET_CALENDAR_COUNT_FULLFILLED: undefined,
    GET_CALENDAR_LIST_PENDING: undefined,
    GET_CALENDAR_LIST_OF_DAY_FULLFILLED: undefined,
    GET_CALENDAR_LIST_FULLFILLED: undefined,
    GET_CALENDAR_LIST_REJECTED: undefined,
    SAVE_CALENDAR_EVENT_FULLFILLED: undefined,
    DELETE_CALENDAR_EVENT_FULLFILLED: undefined,
    GET_CALENDAR_EVENT_FULLFILLED: undefined,
});

export const policyActions = keyMirror({
    START_PENDING: undefined,
    END_PENDING: undefined,
    GET_POLICY_LIST_FULL_FILLED: undefined,
    GET_CLAIM_DICTIONARY_FULFILLED: undefined,
    GET_EDIT_ACCORDIONS_POLICY_FULFILLED: undefined,
    GET_CURRENT_POLICY_FULL_FILLED: undefined,
    FINAL_FORM_FULFILLED: undefined,
    SET_ACCORDIONS: undefined,
    RESET_ACCORDIONS: undefined,
    FILL_AREAS: undefined,
});
export const myPillboxActions = keyMirror({
    START_PENDING: undefined,
    GET_MY_PILLBOX_LIST_FULLFILLED: undefined,
    END_PENDING: undefined,
    GET_CALENDAR_DRUG_LIST_PENDING: undefined,
    GET_CALENDAR_DRUG_LIST_FULLFILLED: undefined,
    GET_CALENDAR_DRUG_LIST_REJECTED: undefined,
    GET_MY_PILLBOX_DRUGS_LIST_PENDING: undefined,
    GET_MY_PILLBOX_DRUGS_LIST_FULLFILLED: undefined,
    GET_MY_PILLBOX_DRUGS_LIST_REJECTED: undefined,
    GET_INSTRUCTION_PENDING: undefined,
    GET_INSTRUCTION_FULLFILLED: undefined,
    GET_INSTRUCTION_REJECTED: undefined,
    GET_INSTRUCTION_LIST_PENDING: undefined,
    GET_INSTRUCTION_LIST_FULLFILLED: undefined,
    GET_INSTRUCTION_LIST_REJECTED: undefined,
    DELETE_MY_PILLBOX_DRUG_FULLFILLED: undefined,
    GET_DRUG_LIST: undefined,
    SAVE_MY_PILLBOX_PENDING: undefined,
    SAVE_MY_PILLBOX_FULLFILLED: undefined,
    SAVE_MY_PILLBOX_REJECTED: undefined,
    GET_MY_PILLBOX_SCREENING_FULLFILLED: undefined,
    GET_DRUG_FORM_DOSING_UNIT: undefined,
    GET_DOSING_UNIT_LIST: undefined,
    GET_MY_CURRENT_PILLBOX_FULLFILLED: undefined,
    GET_SCREENING_RESULT_COUNTS: undefined,
    FILL_COURSE_DETAILS: undefined,
    FILL_DEFAULT_PILLBOX_ID: undefined,
    CHECK_EMAIL_PILLBOX_FULLFILLED: undefined,
    CLEAR_EMAIL_PILLBOX: undefined,
    CLEAR_CURRENT_PILLBOX: undefined,
});

export const adminActions = keyMirror({
    START_FETCHING: undefined,
    END_FETCHING: undefined,
    GET_QUESTIONING_LIST_FULLFILLED: undefined,
    GET_RULES_LIST_FULLFILLED: undefined,
    GET_BUDGET_LIST_FULLFILLED: undefined,
    GET_SYSTEM_LIST_FULLFILLED: undefined,
    GET_USER_LIST_FULLFILLED: undefined,
    GET_STATISTIC_COUNT_FULLFILLED: undefined,
    GET_STATISTIC_FEED_BACKS_FULLFILLED: undefined,
    GET_STATISTIC_ATTACHMENTS_FULLFILLED: undefined,
    GET_STATISTIC_UNCONFIRMED_SERVICES_FULLFILLED: undefined,
    GET_STATISTIC_DISPANSER_RESULTS_FULLFILLED: undefined,
    GET_NEWS_LIST_FULLFILLED: undefined,
    GET_QUESTIONING_STATISTIC_FULL: undefined,
    GET_QUESTIONING_STATISTIC_COMPLETED: undefined,
    GET_QUESTIONING_DETAIL_FULL: undefined,
    GET_HOTLINE_LIST_FULLFILLED: undefined,
    SET_FIRST_AVAIL_ROUTE: undefined,
    GET_WARDS_COUNT_BY_SMO_FULLFILLED: undefined,
    GET_SMO_APPEALS_COUNT_FULLFILLED: undefined,
    GET_PLATFORM_STATS: undefined,
});

export const healthActions = keyMirror({
    GET_HEALTH_DATA_FULLFILLED: undefined,
    SAVE_HEALTH_DATA_FULLFILLED: undefined,
    DELETE_HEALTH_DATA_FULLFILLED: undefined,
    SAVE_TARGET_HEALTH_DATA_FULLFILLED: undefined,
    GET_TARGET_HEALTH_DATA_FULLFILLED: undefined,
    SET_AVAILABLE_HEALTH_WIDGETS: undefined,
    SET_EXISTING_HEALTH_WIDGETS: undefined,
    ADD_WIDGET: undefined,
    REMOVE_WIDGET: undefined,
    SET_IS_FETCHING: undefined,
});

export const anchorPopupActions = keyMirror({
    SHOW: undefined,
    HIDE: undefined,
});

export const allergiesActions = keyMirror({
    ALLERGY_DATA_FULFILLED: undefined,
    ALLERGY_DATA_REJECTED: undefined,
});

export const meteoActions = keyMirror({
    METEO_DATA_FULFILLED: undefined,
    METEO_DATA_REJECTED: undefined,
});

export const dispanserActions = keyMirror({
    DISPANSER_FULFILLED: undefined,
    DISPANSER_REJECTED: undefined,
    CHILD_WIDGET_FULFILLED: undefined,
});

export const popupActions = keyMirror({
    POPUP_SHOW: undefined,
    POPUP_HIDE: undefined,
});

export const widgetActions = keyMirror({
    WIDGETS_DATA_FULFILLED: undefined,
    WIDGETS_DATA_REJECTED: undefined,
    WIDGETS_SAVE_DATA_FULFILLED: undefined,
    WIDGETS_SAVE_DATA_REJECTED: undefined,
    WIDGETS_GET_CALENDAR_LIST: undefined,
    START_WIDGETS_PILLBOX_FETCHING: undefined,
    END_WIDGETS_PILLBOX_FETCHING: undefined,
    WIDGETS_CURRENT_PILLBOX_ID: undefined,
    // WIDGETS_PILLBOX_DATE: undefined,
    WIDGETS_PILLBOX_DRUGS_LIST: undefined,
});

export const userActions = keyMirror({
    CHANGE_SET_LOGIN_BY_UKL: undefined,
    LAST_ACTIONS_FULFILLED: undefined,
    LAST_ACTIONS_REJECTED: undefined,
    VITAL_FULFILLED: undefined,
    NOTIFICATIONS_FULFILLED: undefined,
    NOTIFICATIONS_REJECTED: undefined,
    ACTUAL_FULFILLED: undefined,
    SUB_PROFILES: undefined,
    QUESTIONARY_FULFILLED: undefined,
    FILL_CLIENT_SETTINGS: undefined,
    SET_PHONE_REQUIRED_KEY: undefined,
});

export const pregnancyActions = keyMirror({
    START_FETCHING: undefined,
    END_FETCHING: undefined,
    CHECK_UNREAD_MESSAGES_FULFILLED: undefined,
    GET_MESSAGES_FULFILLED: undefined,
    CURRENT_INFO_FULFILLED: undefined,
    GET_HOLIDAY_INFO_FULFILLED: undefined,
    GET_EVENTS_LIST_FULLFILLED: undefined,
    GET_INDICATOR_LIST_FULFILLED: undefined,
    GET_CURRENT_NOTIFICATION_LIST_FULLFIELD: undefined,
    GET_ARCHIVE_LIST: undefined,
    GET_ARTICLE_SECTION_LIST: undefined,
    GET_COMPLICATION_LIST: undefined,
    GET_COMPLICATION_KIND_LIST: undefined,
    ADD_COMPLICATION: undefined,
    FILL_CURRENT_SCREENING: undefined,
    START_CHAT_FETCHING: undefined,
    END_CHAT_FETCHING: undefined,
    FILL_ASK_DOCTORS: undefined,
});

export const oncoActions = keyMirror({
    START_FETCHING: undefined,
    END_FETCHING: undefined,
    CURRENT_INFO_FULFILLED: undefined,
    GET_ARCHIVE_LIST: undefined,
    GET_INDICATOR_LIST_FULFILLED: undefined,
    GET_CURRENT_NOTIFICATION_LIST_FULLFIELD: undefined,
    CHECK_UNREAD_MESSAGES_FULFILLED: undefined,
    START_CHAT_FETCHING: undefined,
    END_CHAT_FETCHING: undefined,
    GET_MESSAGES_FULFILLED: undefined,
    GET_EVENTS_LIST_FULLFILLED: undefined,
});

export const vaccinationActions = keyMirror({
    VACCINATIONS_FULLFILLED: undefined,
    VACCINATIONS_REJECTED: undefined,
    VACCINATIONS_PLAIN_FULLFILLED: undefined,
    VACCINATIONS_PLAIN_REJECTED: undefined,
    CONFIRMATION_EPIDEMIC_LIST_FULLFILLED: undefined,
    CONFIRMATION_EPIDEMIC_LIST_REJECTED: undefined,
    VACCINATION_EPIDEMIC_LIST_FULLFILLED: undefined,
    VACCINATION_EPIDEMIC_LIST_REJECTED: undefined,
    WIDGET_FULFILLED: undefined,
});

export const doctorActions = keyMirror({
    START_FETCHING: undefined,
    END_FETCHING: undefined,
    GET_DOCTOR_DATA_FULLFILLED: undefined,
    GET_ADDRESS_INFO: undefined,
    GET_SPECIALITY_DATA_FULLFILLED: undefined,
    GET_NEW_SCHEDULE_INFO: undefined,
});

export const subscriptionsActions = keyMirror({
    START_FETCHING: undefined,
    END_FETCHING: undefined,
    GET_SUBSCRIPTIONS_DATA_FULLFILLED: undefined,
});

export const polisActions = keyMirror({
    START_FETCHING: undefined,
    END_FETCHING: undefined,
    GET_SMOS_DATA_FULLFILLED: undefined,
    GET_SMO_OFFICES_DATA_FULLFILLED: undefined,
    SET_SMO_OFFICES_DATA_EMPTY: undefined,
    GET_MO_DISTRICTS_DATA_FULLFILLED: undefined,
    GET_MC_OFFICES_DATA_FULLFILLED: undefined,
});
