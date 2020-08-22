import { rgba } from "polished";

const fontFamilyGenerator = (props, fontType) => {
    switch (fontType) {
        case "bold":
            return props.theme.fonts.family.gothamBold;
        case "medium":
            return props.theme.fonts.family.gothamMedium;
        case "black":
            return props.theme.fonts.family.gothamBlack;
        case "news":
            return props.theme.fonts.family.newsCondensed;
        default:
            return props.theme.fonts.family.gotham;
    }
};

const colorGenerator = (props, color) => {
    switch (color) {
        case "primary":
            return props.theme.userTheme.color;
        default:
            return color || rgba(props.theme.colors.text.colorBlack, 0.5);
    }
};

const fontStyles = (props, { font, size, color } = {}) => `
    font-family: ${fontFamilyGenerator(props, font)};
    font-size: ${size || props.theme.fonts.sizes.small};
    color: ${colorGenerator(props, color)};
`;

export { fontStyles };
