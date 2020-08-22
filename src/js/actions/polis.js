import axios from "axios";
import { fiasPaths, polisPaths } from "config/paths";
import { policyActions, polisActions } from "config/actionsKeys";

const startFetching = () => {
    return {
        type: polisActions.START_FETCHING,
    };
};

const endFetching = () => {
    return {
        type: polisActions.END_FETCHING,
    };
};

const getSmosDataFullfilled = (payload) => {
    return {
        type: polisActions.GET_SMOS_DATA_FULLFILLED,
        payload,
    };
};

export const getSmoOfficesDataFullfilled = (payload) => {
    return {
        type: polisActions.GET_SMO_OFFICES_DATA_FULLFILLED,
        payload,
    };
};

export const getMcOfficesDataFullfilled = (payload) => {
    return {
        type: polisActions.GET_MC_OFFICES_DATA_FULLFILLED,
        payload,
    };
};

const getMoDistrictsDataFullfilled = (payload) => {
    return {
        type: polisActions.GET_MO_DISTRICTS_DATA_FULLFILLED,
        payload,
    };
};

export const getSmos = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(polisPaths.GET_SMOS)
            .then((response) => {
                dispatch(endFetching());
                dispatch(getSmosDataFullfilled(response.data));
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getSmoOffices = (smoId) => {
    return (dispatch) => {
        dispatch(startFetching());

        function getSmoOffices() {
            return axios.get(polisPaths.GET_SMO_OFFICES, {
                params: {
                    smoId,
                },
            });
        }

        function getSmoCoordinates() {
            return axios.get(polisPaths.GET_SMO_COORDINATES, {
                params: {
                    smoId,
                },
            });
        }

        axios
            .all([getSmoOffices(), getSmoCoordinates()])
            .then(
                axios.spread(function(offices, coordinates) {
                    const smoDetails = offices.data;
                    const smoCoordinates = coordinates.data.content;

                    smoDetails.content.map((item) => {
                        item.coordinates = smoCoordinates.find(
                            (coord) => coord.code === item.code,
                        ).coordinates;
                    });

                    dispatch(getSmoOfficesDataFullfilled(smoDetails));
                    dispatch(endFetching());
                }),
            )
            .catch(() => dispatch(endFetching()));
    };
};

export const getMoDistricts = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(polisPaths.GET_MO_DISTRICTS)
            .then((response) => {
                dispatch(endFetching());
                dispatch(getMoDistrictsDataFullfilled(response.data));
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const getMcOffices = (district) => {
    return (dispatch) => {
        dispatch(startFetching());

        function getMcOffices() {
            return axios.get(polisPaths.GET_MC_OFFICES, {
                params: {
                    district,
                },
            });
        }

        function getMcCoordinates() {
            return axios.get(polisPaths.GET_MC_COORDINATES, {
                params: {
                    district,
                },
            });
        }

        axios
            .all([getMcOffices(), getMcCoordinates()])
            .then(
                axios.spread(function(offices, coordinates) {
                    const mcDetails = offices.data;
                    const mcCoordinates = coordinates.data.content;

                    mcDetails.content.map((item) => {
                        item.coordinates = mcCoordinates.find(
                            (coord) => coord.code === item.code,
                        ).coordinates;
                    });

                    dispatch(getMcOfficesDataFullfilled(mcDetails));
                    dispatch(endFetching());
                }),
            )
            .catch(() => dispatch(endFetching()));
    };
};

const fillAreasList = (payload) => ({
    type: policyActions.FILL_AREAS,
    payload,
});

export const getAreasList = () => {
    return (dispatch) => {
        axios
            .get(fiasPaths.REGION_LIST, {
                params: {
                    pageSize: 999,
                    pageNumber: 1,
                },
            })
            .then((response) => {
                dispatch(fillAreasList(response.data.content));
            });
    };
};
