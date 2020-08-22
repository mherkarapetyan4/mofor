import {
    widgetActions,
    allergiesActions,
    meteoActions,
    userActions,
    dispanserActions,
} from "config/actionsKeys";

const initiate = {
    widgets: {},
    calendar: {
        todayEvents: [],
        upcomingEvents: [],
    },
    pillboxWidget: {
        drugsList: [],
        isFetching: true,
    },
    allergyWidget: {
        allergies: {},
    },
    meteoWidget: {
        meteo: {},
    },
    notificationsWidget: {
        notifications: {},
    },
    lastActionsWidget: {
        lastActions: {},
    },
    dispanserWidget: {
        state: {},
        child: {},
    },
};

export const widgets = (state = initiate, action) => {
    switch (action.type) {
        case widgetActions.WIDGETS_DATA_FULFILLED:
            return {
                ...state,
                widgets: action.payload,
            };
        case widgetActions.WIDGETS_PILLBOX_DRUGS_LIST:
            return {
                ...state,
                pillboxWidget: {
                    ...state.pillboxWidget,
                    drugsList: action.payload,
                },
            };
        case widgetActions.START_WIDGETS_PILLBOX_FETCHING: {
            return {
                ...state,
                pillboxWidget: {
                    ...state.pillboxWidget,
                    isFetching: true,
                },
            };
        }
        case widgetActions.END_WIDGETS_PILLBOX_FETCHING: {
            return {
                ...state,
                pillboxWidget: {
                    ...state.pillboxWidget,
                    isFetching: false,
                },
            };
        }
        case allergiesActions.ALLERGY_DATA_FULFILLED: {
            return {
                ...state,
                allergyWidget: {
                    ...state.allergyWidget,
                    allergies: action.payload,
                },
            };
        }
        case meteoActions.METEO_DATA_FULFILLED: {
            return {
                ...state,
                meteoWidget: {
                    ...state.meteoWidget,
                    meteo: action.payload,
                },
            };
        }
        case userActions.NOTIFICATIONS_FULFILLED:
            return {
                ...state,
                notificationsWidget: {
                    ...state.notificationsWidget,
                    notifications: action.payload,
                },
            };
        case dispanserActions.DISPANSER_FULFILLED:
            return {
                ...state,
                dispanserWidget: {
                    ...state.dispanserWidget,
                    state: action.payload,
                },
            };
        case dispanserActions.CHILD_WIDGET_FULFILLED:
            return {
                ...state,
                dispanserWidget: {
                    ...state.dispanserWidget,
                    child: action.payload,
                },
            };
        case userActions.LAST_ACTIONS_FULFILLED:
            return {
                ...state,
                lastActionsWidget: {
                    ...state.lastActionsWidget,
                    lastActions: action.payload,
                },
            };
        case userActions.LAST_ACTIONS_REJECTED:
            return state;
        case userActions.NOTIFICATIONS_REJECTED:
            return state;
        case dispanserActions.DISPANSER_REJECTED:
            return state;
        case widgetActions.WIDGETS_DATA_REJECTED:
            return state;
        case widgetActions.WIDGETS_GET_CALENDAR_LIST:
            return {
                ...state,
                calendar: { ...state.calendar, [action.field]: action.payload },
            };
        default:
            return state;
    }
};
