import { directoryActions } from "config/actionsKeys";

const initial = {
    researchesTypes: [],
    researchesTypesExisting: [],
};

export function directory(state = initial, action) {
    switch (action.type) {
        case directoryActions.FILL_RESEARCHES_TYPES: {
            return {
                ...state,
                researchesTypes: action.payload,
            };
        }

        case directoryActions.FILL_RESEARCHES_TYPES_EXISTING: {
            return {
                ...state,
                researchesTypesExisting: action.payload,
            };
        }

        default:
            return state;
    }
}
