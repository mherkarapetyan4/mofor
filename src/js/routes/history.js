import { createHashHistory } from "history";
import ReactGA from "react-ga";

export const history = createHashHistory();

history.listen((location) => {
    ReactGA.pageview(location.pathname);
});
