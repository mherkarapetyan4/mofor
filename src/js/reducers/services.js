import { serviceActions } from "config/actionsKeys";

const initial = {
    services: {
        data: {},
        item: {},
        isFetching: false,
    },
    "service/emergency": {
        data: {},
        item: {},
        isFetching: false,
    },
    "service/region": {
        data: {},
        item: {},
        isFetching: false,
    },
    printServices: {
        data: {},
        item: {},
        isFetching: false,
    },
};

export function services(state = initial, action) {
    switch (action.type) {
        case serviceActions.GET_SERVICES_LIST_FULLFILLED: {
            return {
                ...state,
                [action.option]: {
                    ...state[action.option],
                    data: action.payload,
                },
            };
        }

        case serviceActions.GET_PRINT_SERVICES_LIST_FULLFILLED: {
            return {
                ...state,
                printServices: {
                    ...state.printServices,
                    data: action.payload,
                },
            };
        }

        case serviceActions.GET_SERVICE_FULLFILLED: {
            return {
                ...state,
                [action.option]: {
                    ...state[action.option],
                    item: action.payload,
                },
            };
        }

        case serviceActions.START_FETCHING: {
            return {
                ...state,
                [action.option]: {
                    ...state[action.option],
                    isFetching: true,
                },
            };
        }

        case serviceActions.END_FETCHING: {
            return {
                ...state,
                [action.option]: {
                    ...state[action.option],
                    isFetching: false,
                },
            };
        }

        default:
            return state;
    }
}
