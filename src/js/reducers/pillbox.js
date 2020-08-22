import { myPillboxActions } from "config/actionsKeys";

const initial = {
    myPillboxList: [],
    isFetching: true,
    currentPillbox: {},
    myPillbox: {},
    calendarList: {},
    drugsList: {},
    autocompleteDrugsList: {},
    instruction: "",
    instructionList: [],
    screening: {},
    drugFormDosing: {},
    dosingUnitList: [],
    screeningResultCounts: {},
    courseDetails: {},
    defaultProfileId: null,
    checkEmailConfirmations: {},
    checkEmailReminders: {},
};

export function pillbox(state = initial, action) {
    switch (action.type) {
        case myPillboxActions.START_PENDING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case myPillboxActions.GET_MY_PILLBOX_LIST_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                myPillboxList: action.payload,
            };
        }

        case myPillboxActions.GET_MY_CURRENT_PILLBOX_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                currentPillbox: action.payload,
            };
        }

        case myPillboxActions.END_PENDING: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case myPillboxActions.SAVE_MY_PILLBOX_PENDING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case myPillboxActions.SAVE_MY_PILLBOX_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                currentPillbox: action.payload,
            };
        }

        case myPillboxActions.SAVE_MY_PILLBOX_REJECTED: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case myPillboxActions.SAVE_PILLBOX: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case myPillboxActions.GET_MY_PILLBOX_DRUGS_LIST_PENDING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case myPillboxActions.GET_MY_PILLBOX_DRUGS_LIST_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                drugsList: { data: action.payload },
            };
        }

        case myPillboxActions.GET_MY_PILLBOX_DRUGS_LIST_REJECTED: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case myPillboxActions.GET_MY_PILLBOX_PENDING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case myPillboxActions.GET_MY_PILLBOX_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                myPillbox: action.payload,
            };
        }

        case myPillboxActions.GET_MY_PILLBOX_REJECTED: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case myPillboxActions.GET_CALENDAR_DRUG_LIST_FULLFILLED: {
            return {
                ...state,
                calendarList: action.payload,
            };
        }

        case myPillboxActions.GET_INSTRUCTION_LIST_PENDING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case myPillboxActions.GET_INSTRUCTION_LIST_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                instructionList: action.payload,
            };
        }

        case myPillboxActions.GET_INSTRUCTION_LIST_REJECTED: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case myPillboxActions.GET_INSTRUCTION_PENDING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case myPillboxActions.GET_INSTRUCTION_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                instruction: action.payload,
            };
        }

        case myPillboxActions.GET_INSTRUCTION_REJECTED: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case myPillboxActions.DELETE_MY_PILLBOX_DRUG_PENDING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case myPillboxActions.DELETE_MY_PILLBOX_DRUG_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case myPillboxActions.GET_DRUG_LIST: {
            return {
                ...state,
                autocompleteDrugsList: action.payload,
            };
        }

        case myPillboxActions.GET_SCREENING_RESULT_COUNTS: {
            return {
                ...state,
                screeningResultCounts: action.payload,
                isFetching: false,
            };
        }

        case myPillboxActions.DELETE_MY_PILLBOX_DRUG_REJECTED: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case myPillboxActions.GET_MY_PILLBOX_SCREENING_FULLFILLED: {
            return {
                ...state,
                isFetching: false,
                screening: action.payload,
            };
        }

        case myPillboxActions.GET_DRUG_FORM_DOSING_UNIT: {
            return {
                ...state,
                isFetching: false,
                drugFormDosing: action.payload,
            };
        }

        case myPillboxActions.GET_DOSING_UNIT_LIST: {
            return {
                ...state,
                isFetching: false,
                dosingUnitList: action.payload,
            };
        }

        case myPillboxActions.FILL_COURSE_DETAILS: {
            return {
                ...state,
                courseDetails: action.payload,
            };
        }

        case myPillboxActions.FILL_DEFAULT_PILLBOX_ID: {
            return {
                ...state,
                defaultProfileId: action.payload,
            };
        }

        case myPillboxActions.CHECK_EMAIL_PILLBOX_FULLFILLED: {
            return {
                ...state,
                [action.mailType]: action.payload,
            };
        }

        case myPillboxActions.CLEAR_EMAIL_PILLBOX: {
            return {
                ...state,
                checkEmailConfirmations: {},
                checkEmailReminders: {},
            };
        }

        case myPillboxActions.CLEAR_CURRENT_PILLBOX: {
            return {
                ...state,
                currentPillbox: {},
            };
        }

        default:
            return state;
    }
}
