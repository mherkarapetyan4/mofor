import axios from "axios";
import { doctorActions } from "config/actionsKeys";
import { doctorPath } from "config/paths";

export const startFetching = () => {
    return {
        type: doctorActions.START_FETCHING,
    };
};
const endFetching = () => {
    return {
        type: doctorActions.END_FETCHING,
    };
};

const getDoctorDataFullfilled = (payload, key) => {
    return {
        type: doctorActions.GET_DOCTOR_DATA_FULLFILLED,
        payload,
        key,
    };
};
export const getDoctorData = ({ params, pageSize = 10, pageNumber = 1 }) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(params.path, { params: { pageSize, pageNumber } })
            .then((response) => {
                dispatch(getDoctorDataFullfilled(response.data, params.key));
                dispatch(endFetching());
            });
    };
};

const getSpecialityDataFullfilled = (payload, key) => {
    return {
        type: doctorActions.GET_SPECIALITY_DATA_FULLFILLED,
        payload,
        key,
    };
};
export const getSpecialityData = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios.get(doctorPath.SPECIALITY_LIST).then((response) => {
            dispatch(getSpecialityDataFullfilled(response.data, "data"));
            dispatch(endFetching());
        });
    };
};

export const getCurrentDoctors = (id) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(doctorPath.GET_CURRENT_DOCTORS, {
                params: {
                    specialityId: id,
                },
            })
            .then((response) => {
                dispatch(getSpecialityDataFullfilled(response.data, "current"));
                dispatch(endFetching());
            });
    };
};

export const getNewScheduleFullfilled = (payload) => {
    return {
        type: doctorActions.GET_NEW_SCHEDULE_INFO,
        payload,
    };
};
