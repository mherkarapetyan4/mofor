import { createStore, applyMiddleware, compose } from "redux";
import { appReducer } from "reducers";
import thunk from "redux-thunk";
import {
    axiosMiddlewareResponse,
    axiosMiddlewareRequest,
} from "middleware/axios";

const store = createStore(
    appReducer,
    compose(
        applyMiddleware(thunk, axiosMiddlewareRequest, axiosMiddlewareResponse),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f,
    ),
);

export default store;
