import { myDataActions } from "config/actionsKeys";

const initial = {
    myData: {},
    checkEmail: {},
    myDataFetching: false,
};

export function myData(state = initial, action) {
    switch (action.type) {
        case myDataActions.GET_MY_DATA_PENDING: {
            return {
                ...state,
                myDataFetching: true,
            };
        }

        case myDataActions.GET_MY_DATA_FULLFILLED: {
            return {
                ...state,
                myData: action.payload,
                myDataFetching: false,
            };
        }

        case myDataActions.GET_MY_DATA_REJECTED: {
            return {
                ...state,
                myDataFetching: false,
            };
        }

        case myDataActions.SET_CHECK_EMAIL: {
            return {
                ...state,
                checkEmail: action.payload,
            };
        }

        case myDataActions.SET_SAVED_CONTACTS: {
            return {
                ...state,
                myData: {
                    ...state.myData,
                    myData: {
                        ...state.myData.myData,
                        contacts: action.payload,
                    },
                },
            };
        }

        default:
            return state;
    }
}
