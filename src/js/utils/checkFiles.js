import some from "lodash/some";
import {
    MAX_FILE_NAME,
    MAX_FILE_SIZE,
    MAX_RESEARCH_FILE_SIZE,
} from "config/consts";

export const getExt = (fileName) => {
    const arrFile = fileName.split(".");
    return arrFile[arrFile.length - 1].toLowerCase();
};

export const checkExt = (fileName) => {
    const ext = getExt(fileName);

    return ext === "pdf" || ext === "jpeg" || ext === "jpg";
};

export const checkFile = (
    item,
    maxFileSize = MAX_FILE_SIZE,
    maxFileName = MAX_FILE_NAME,
) => {
    return (
        item.size > maxFileSize ||
        item.name.length > maxFileName ||
        !checkExt(item.name)
    );
};

export const checkResearchFile = (
    item,
    maxFileSize = MAX_RESEARCH_FILE_SIZE,
    maxFileName = MAX_FILE_NAME,
) => {
    return (
        item.size > maxFileSize ||
        item.name.length > maxFileName ||
        !checkExt(item.name)
    );
};

export const checkInvalidFiles = (
    files,
    maxFileSize = MAX_FILE_SIZE,
    maxFileName = MAX_FILE_NAME,
) => {
    return some(files, (item) => checkFile(item, maxFileSize, maxFileName));
};

export const checkInvalidResearchFiles = (
    files,
    maxFileSize = MAX_RESEARCH_FILE_SIZE,
    maxFileName = MAX_FILE_NAME,
) => {
    return some(files, (item) =>
        checkResearchFile(item, maxFileSize, maxFileName),
    );
};
