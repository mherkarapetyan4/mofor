import get from "lodash/get";

export const getSeverityColor = (severity) => {
    return getSeverityLevel(severity);
};

const getSeverityLevel = (severity) => {
    const severityCode = parseInt(get(severity, "code"), 10);

    switch (severityCode) {
        // Contraindication SeverityLevel
        case 23468:
            return 1;
        case 23467:
            return 2;
        case 23466:
            return 3;
        case 23465:
            return 4;
        case 23464:
            return 5;

        // Interactions SeverityLevel
        case 1:
            return 1;
        case 2:
            return 3;
        case 3:
            return 5;

        default:
            return 0;
    }
};
