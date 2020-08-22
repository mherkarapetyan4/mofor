const renderPlainColor = (props, number) => {
    switch (parseInt(number)) {
        case 0:
            return props.theme.colors.text.colorBlack;
        case 1:
            return props.theme.colors.grades.plainColors.levelOne;
        case 2:
            return props.theme.colors.grades.plainColors.levelTwo;
        case 3:
            return props.theme.colors.grades.plainColors.levelThree;
        case 4:
            return props.theme.colors.grades.plainColors.levelFour;
        case 5:
            return props.theme.colors.grades.plainColors.levelFive;
        default:
            return props.theme.colors.text.colorBlack;
    }
};

export default renderPlainColor;
