import axios from "axios";
import { subscriptionsPaths } from "config/paths";
import { subscriptionsActions } from "config/actionsKeys";

const startFetching = () => {
    return {
        type: subscriptionsActions.START_FETCHING,
    };
};

const endFetching = () => {
    return {
        type: subscriptionsActions.END_FETCHING,
    };
};

const getSubscriptionsDataFullfilled = (payload) => {
    return {
        type: subscriptionsActions.GET_SUBSCRIPTIONS_DATA_FULLFILLED,
        payload,
    };
};

export const getSubscriptions = () => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .get(subscriptionsPaths.SUBSCRIPTIONS_GET)
            .then((response) => {
                dispatch(endFetching());
                dispatch(getSubscriptionsDataFullfilled(response.data));
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const setSubscription = (params) => {
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(subscriptionsPaths.SUBSCRIPTIONS_SAVE, params)
            .then((response) => {
                dispatch(endFetching());
                dispatch(getSubscriptionsDataFullfilled(response.data));
            })
            .catch(() => dispatch(endFetching()));
    };
};

export const sendEmailCode = (email) => {
    const bodyFormData = new FormData();
    bodyFormData.append("address", email);
    return (dispatch) => {
        dispatch(startFetching());
        axios
            .post(
                subscriptionsPaths.SUBSCRIPTIONS_SEND_CODE_EMAIL,
                bodyFormData,
            )
            .then(() => {
                dispatch(getSubscriptions());
                dispatch(endFetching());
            })
            .catch(() => dispatch(endFetching()));
    };
};
