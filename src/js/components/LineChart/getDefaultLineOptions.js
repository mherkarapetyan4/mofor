import omit from "lodash/omit";
import keys from "lodash/keys";

export const getDefaultLineOptions = (item) => {
    const obj = {};
    const keysArr = keys(omit(item, ["name"]));
    keysArr.map((element) => {
        obj[element] = {};
    });
    return obj;
};
