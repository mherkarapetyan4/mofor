import { calendarActions } from "config/actionsKeys";

const initial = {
    count: {},
    calendarList: {},
    calendarEvent: {},
    calendarEventOfDay: {},
};

export function calendar(state = initial, action) {
    switch (action.type) {
        case calendarActions.GET_CALENDAR_COUNT_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                count: action.payload,
            };
        }

        case calendarActions.GET_CALENDAR_LIST_FULLFILLED: {
            return {
                ...state,
                calendarList: action.payload,
            };
        }

        case calendarActions.GET_CALENDAR_EVENT_FULLFILLED: {
            return {
                ...state,
                calendarEvent: action.payload,
            };
        }

        case calendarActions.GET_CALENDAR_LIST_OF_DAY_FULLFILLED: {
            return {
                ...state,
                calendarEventOfDay: action.payload,
            };
        }

        default:
            return state;
    }
}
