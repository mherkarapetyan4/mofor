import { myResearchesActions } from "config/actionsKeys";

const initial = {
    data: {},
    printData: {},
    research: {},
    myStatistic: {},
    image: {},
};

export function researches(state = initial, action) {
    switch (action.type) {
        case myResearchesActions.GET_MY_RESEARCHES_FULLFILLED: {
            return {
                ...state,
                data: action.payload,
            };
        }

        case myResearchesActions.GET_MY_PRINT_RESEARCHES_FULLFILLED: {
            return {
                ...state,
                printData: action.payload,
            };
        }

        case myResearchesActions.STATISTIC_FULLFILLED: {
            return {
                ...state,
                myStatistic: action.payload,
            };
        }

        case myResearchesActions.MY_RESEARCHES_ELEMENT_FULLFILLED: {
            return {
                ...state,
                research: action.payload,
            };
        }
        case myResearchesActions.DELETE_RESEARCHES_ELEMENT: {
            return {
                ...state,
                research: {
                    ...state.research,
                    diseaseName: "",
                    diseaseDisplayName: "",
                    diseaseUniqueId: "",
                    diseaseType: "",
                    diseaseCode: "",
                },
            };
        }
        case myResearchesActions.ADD_RESEARCH_ELEMENT: {
            return {
                ...state,
                research: action.payload,
            };
        }
        case myResearchesActions.SHOW_FILE_FULLFILLED: {
            return {
                ...state,
                image: {
                    file: action.payload,
                    ext: action.ext,
                    additional: action.additional,
                },
            };
        }
        case myResearchesActions.CLEAR_FILE: {
            return {
                ...state,
                image: {},
            };
        }

        default:
            return state;
    }
}
