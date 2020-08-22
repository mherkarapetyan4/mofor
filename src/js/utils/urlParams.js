import forEach from "lodash/forEach";

export const getQueryString = (filterObj) => {
    let queryString = [];
    forEach(filterObj, (value, key) => {
        if (value) {
            if (typeof value.format === "function") {
                queryString.push(`${key}=${value.format("YYYY-MM-DD")}`);
            } else if (value !== "") {
                queryString.push(`${key}=${value}`);
            }
        }
    });
    return queryString.join("&");
};
