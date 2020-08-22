const renderMark = (number) => {
    switch (number) {
        case 0:
            return "Баллов";
        case 1:
            return "Балл";
        case 2:
            return "Балла";
        case 3:
            return "Балла";
        case 4:
            return "Балла";
        case 5:
            return "Баллов";
        default:
            return null;
    }
};

export default renderMark;
