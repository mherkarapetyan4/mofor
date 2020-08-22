import { polisActions } from "config/actionsKeys";

const initial = {
    smos: null,
    smoOffices: {
        content: [],
    },
    moDistricts: {
        content: [],
    },
    mcOffices: {
        content: [],
    },
    isFetching: true,
};

export function polis(state = initial, action) {
    switch (action.type) {
        case polisActions.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case polisActions.END_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case polisActions.GET_SMOS_DATA_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                smos: action.payload,
            };
        }

        case polisActions.GET_SMO_OFFICES_DATA_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                smoOffices: action.payload,
            };
        }

        case polisActions.GET_MO_DISTRICTS_DATA_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                moDistricts: action.payload,
            };
        }

        case polisActions.GET_MC_OFFICES_DATA_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                mcOffices: action.payload,
            };
        }
        case polisActions.SET_SMO_OFFICES_DATA_EMPTY: {
            return {
                ...state,
                isFetching: false,
                smoOffices: null,
            };
        }

        default:
            return state;
    }
}
