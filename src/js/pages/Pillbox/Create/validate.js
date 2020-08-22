export const validate = (values, props) => {
    const errors = {};
    let list = [];
    if (values.id) {
        list = props.myPillboxList.filter((e) => e.id !== values.id);
    } else {
        list = props.myPillboxList;
    }
    const lowerName = values.name.toLowerCase();
    if (list.some((e) => e.name.toLowerCase() === lowerName)) {
        errors.name = `Наименование профиля таблетницы не должно совпадать с уже существующими`;
    }
    return errors;
};
