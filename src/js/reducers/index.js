import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";

import { app } from "./app";
import { user } from "./user";
import { services } from "reducers/services";
import { myData } from "reducers/myData";
import { researches } from "reducers/researches";
import { calendar } from "reducers/calendar";
import { pillbox } from "reducers/pillbox";
import { policy } from "reducers/policy";
import { admin } from "reducers/admin";
import { health } from "reducers/health";
import { anchorPopup } from "reducers/anchorPopup";
import { appKeyActions } from "config/actionsKeys";
import { popup } from "reducers/popup";
import { pregnancy } from "reducers/./pregnancy";
import { onco } from "reducers/./onco";
import { widgets } from "reducers/widgets";
import { directory } from "reducers/directory";
import { vaccinations } from "reducers/vaccinations";
import { doctor } from "reducers/doctor";
import { subscriptions } from "reducers/subscriptions";
import { polis } from "reducers/polis";

const rootReducer = combineReducers({
    modal,
    app,
    user,
    services,
    myData,
    researches,
    calendar,
    pillbox,
    policy,
    pregnancy,
    onco,
    admin,
    health,
    anchorPopup,
    popup,
    widgets,
    directory,
    vaccinations,
    doctor,
    subscriptions,
    polis,
});

const appReducer = (state, action) => {
    if (action.type === appKeyActions.LOGOUT) {
        state = undefined;
    }
    return rootReducer(state, action);
};

export { appReducer };
