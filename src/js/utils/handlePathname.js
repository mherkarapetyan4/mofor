import { LK_AUTH_ELEMENTS, LK_MAIN_PAGE } from "config/menu";
import { history } from "routes/history";

export const isAuthPage = (pathname = history.location.pathname) => {
    return !!LK_AUTH_ELEMENTS.find((e) => e.path === pathname);
};

export const isMainPage = (pathname = history.location.pathname) =>
    pathname === LK_MAIN_PAGE.path;

export const isSelectedPage = (path, pathname = history.location.pathname) => {
    const isMain = isMainPage(path);
    return (
        (isMain && path === pathname) ||
        (!isMain && pathname.indexOf(path) === 0)
    );
};
