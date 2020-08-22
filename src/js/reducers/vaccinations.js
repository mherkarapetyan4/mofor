import { vaccinationActions } from "config/actionsKeys";

const initial = {
    vaccinationsCalendar: {},
    vaccinationsCalendarPlain: {},
    confirmationEpidemicList: {},
    vaccinationEpidemicList: {},
    widgetInfo: {},
};

export function vaccinations(state = initial, action) {
    switch (action.type) {
        case vaccinationActions.VACCINATIONS_FULLFILLED: {
            return {
                ...state,
                vaccinationsCalendar: action.payload,
            };
        }

        case vaccinationActions.VACCINATIONS_PLAIN_FULLFILLED: {
            return {
                ...state,
                vaccinationsCalendarPlain: action.payload,
            };
        }

        case vaccinationActions.CONFIRMATION_EPIDEMIC_LIST_FULLFILLED: {
            return {
                ...state,
                confirmationEpidemicList: action.payload,
            };
        }

        case vaccinationActions.VACCINATION_EPIDEMIC_LIST_FULLFILLED: {
            return {
                ...state,
                vaccinationEpidemicList: action.payload,
            };
        }

        case vaccinationActions.WIDGET_FULFILLED: {
            return {
                ...state,
                widgetInfo: action.payload,
            };
        }

        default:
            return state;
    }
}
