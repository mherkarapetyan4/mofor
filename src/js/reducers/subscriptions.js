import { subscriptionsActions } from "config/actionsKeys";

const initial = {
    subscriptions: {
        calendarEmails: false,
        calendarPushes: false,
        dataUpdates: false,
        pillboxSettings: [],
    },
    isFetching: true,
};

export function subscriptions(state = initial, action) {
    switch (action.type) {
        case subscriptionsActions.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case subscriptionsActions.END_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case subscriptionsActions.GET_SUBSCRIPTIONS_DATA_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                subscriptions: action.payload,
            };
        }

        default:
            return state;
    }
}
