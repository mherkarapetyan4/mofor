/* eslint-disable */
import replace from "lodash/replace";

// export const getParameterByName = (name, loc) => {
//     const url = loc ? loc : window.location.href;
//     name = replace(name, /[[\]]/g, "\\$&");
//     const regex = new RegExp("[?&]\\" + name + "(=([^&#]*)|&|#|$)")
//     const results = regex.exec(url);
//     console.log(results)
//     if (!results) return null;
//     if (!results[2]) return null;
//     const res = decodeURIComponent(replace(results[2], /\+/g, " "))
//     if (res[res.length - 1] === '/') {
//         return decodeURIComponent(replace(replace(results[2], /\+/g, " "), '/', ''));
//     }
//     return decodeURIComponent(replace(results[2], /\+/g, " "));
// };

export const getParameterByName = (name, loc) => {
    const url = loc ? loc : window.location.href;
    name = replace(name, /[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    const res = decodeURIComponent(replace(results[2], /\+/g, " "));
    if (res[res.length - 1] === "/") {
        return decodeURIComponent(
            replace(replace(results[2], /\+/g, " ")),
            "/",
            "",
        );
    }
    return decodeURIComponent(replace(results[2], /\+/g, " "));
};

/*

const getParameterByName = (name) => {
    const url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp("[?&]\\" + name + "(=([^&#]*)|&|#|$)")
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    const res = decodeURIComponent(results[2].replace(/\+/g, " "))
    if (res[res.length - 1] === '/') {
        return decodeURIComponent(results[2].replace(/\+/g, " ").replace('/', ''));
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

 */
