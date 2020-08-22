import { doctorActions } from "config/actionsKeys";
const initial = {
    isFetching: false,
    records: {
        appointment: {},
        referral: {},
        prescription: {},
    },
    speciality: {
        data: {},
        current: {},
        schedule: {},
    },
};

export function doctor(state = initial, action) {
    switch (action.type) {
        case doctorActions.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case doctorActions.END_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }
        case doctorActions.GET_DOCTOR_DATA_FULLFILLED: {
            return {
                ...state,
                records: {
                    ...state.records,
                    [action.key]: { ...action.payload },
                },
            };
        }
        case doctorActions.GET_ADDRESS_INFO: {
            return {
                ...state,
                addressInfo: action.payload,
            };
        }

        case doctorActions.GET_SPECIALITY_DATA_FULLFILLED: {
            return {
                ...state,
                speciality: {
                    ...state.speciality,
                    [action.key]: action.payload,
                },
            };
        }

        case doctorActions.GET_NEW_SCHEDULE_INFO: {
            return {
                ...state,
                speciality: {
                    ...state.speciality,
                    schedule: {
                        ...state.speciality.schedule,
                        ...action.payload,
                    },
                },
            };
        }
        default:
            return state;
    }
}
