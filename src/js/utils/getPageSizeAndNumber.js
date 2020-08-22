import get from "lodash/get";

export const getPageSizeAndNumber = (
    getState,
    reducerName,
    { pageNumber, pageSize },
) => {
    if (!pageSize || !pageNumber) {
        const store = getState();
        const params = { pageSize, pageNumber };
        if (!pageSize) {
            params.pageSize = get(store, `${reducerName}.data.pageSize`, 10);
        }
        if (!pageNumber) {
            params.pageNumber = get(store, `${reducerName}.data.pageNumber`, 1);
        }
        return params;
    }
    return { pageSize, pageNumber };
};
