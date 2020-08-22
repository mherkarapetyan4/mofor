export const validate = ({ id: userId, password, confirm_password }) => {
    const errors = {};
    if (!userId && !password) {
        errors.password = "Поле Пароль обязательно для заполнения";
    }
    if (confirm_password !== password) {
        errors.confirm_password = "Оба пароля должны быть одинаковыми";
    }
    return errors;
};
