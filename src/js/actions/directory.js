import { directoryActions } from "config/actionsKeys";
import { directoryPaths } from "config/paths";
import axios from "axios";

const fillResearchesTypes = (payload) => {
    return {
        type: directoryActions.FILL_RESEARCHES_TYPES,
        payload,
    };
};

export const getResearchesTypes = () => {
    return (dispatch) => {
        axios.get(directoryPaths.GET_RESEARCHES_TYPES).then((response) => {
            dispatch(
                fillResearchesTypes(
                    response.data.content.map((item) => ({
                        value: item.id,
                        label: item.title,
                        vaccineNameEditable: item.vaccineNameEditable,
                        vaccineNameVisible: item.vaccineNameVisible,
                    })),
                ),
            );
        });
    };
};

const fillResearchesTypesExisting = (payload) => {
    return {
        type: directoryActions.FILL_RESEARCHES_TYPES_EXISTING,
        payload,
    };
};

export const getResearchesTypesExisting = () => {
    return (dispatch) => {
        axios
            .get(directoryPaths.GET_RESEARCHES_TYPES_EXISTING)
            .then((response) => {
                dispatch(
                    fillResearchesTypesExisting(
                        response.data.content.map((item) => ({
                            value: item.id,
                            label: item.title,
                        })),
                    ),
                );
            });
    };
};
