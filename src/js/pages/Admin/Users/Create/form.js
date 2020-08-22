import React, { PureComponent } from "react";
import styled from "styled-components";
import { saveUser } from "actions/admin";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { form } from "wrappers/Formik";
import { crateUserFields } from "./meta";
import { sendForm } from "utils/sendForm";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormField from "components/InlineFormField";
import { Button } from "components/Button";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Checkbox } from "components/Checkbox";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import WidgetBlock from "components/WidgetBlock";
import { withRouter } from "react-router-dom";
import { validate } from "pages/Admin/Users/Create/validate";
import { ADMIN_ROLES } from "config/consts";

@withRouter
@form({
    fields: crateUserFields,
    validate,
})
@connect((state) => ({
    rules: get(state.admin.rules, "content", []),
}))
class UserForm extends PureComponent {
    static propTypes = {
        rules: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
        changeInitialValues: PropTypes.func,
        location: PropTypes.object.isRequired,
        history: PropTypes.object,
    };
    state = {
        options: [],
    };

    componentDidMount() {
        if (this.props.location.state.user) {
            const { user } = this.props.location.state;

            const initial = {
                id: user.id,
                name: user.name,
                email: user.email,
                blocked: user.blocked,
                role: user.role.id,
            };
            this.props.changeInitialValues(initial);
        }
    }

    componentDidUpdate() {
        const { options } = this.state;
        const { rules } = this.props;
        if (!isEmpty(options) || isEmpty(rules)) {
            return false;
        }
        this.setState({
            options: rules.map(({ id, name }) => {
                return { value: id, label: ADMIN_ROLES[name] || name };
            }),
        });
    }

    redirect = () => {
        const { history } = this.props;
        history.push("/users");
    };

    submit = async () => {
        const { dispatch } = this.props;
        sendForm(this.props, crateUserFields).then((response) => {
            dispatch(saveUser(response, this.redirect));
        });
    };

    render() {
        const { options } = this.state;

        return (
            <WidgetBlock title={"Данные пользователя"}>
                <FieldWrapper>
                    <FormikFormField
                        name={"name"}
                        component={(props) => (
                            <InlineFormField
                                required
                                {...props}
                                label={"Имя:"}
                                placeholder={"ФИО пользователя"}
                            />
                        )}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <FormikFormField
                        name={"email"}
                        component={(props) => (
                            <InlineFormField
                                required
                                {...props}
                                label={"E-mail:"}
                                placeholder={"Адрес почты пользователя"}
                                type={"email"}
                            />
                        )}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <FormikFormField
                        name={"password"}
                        component={(props) => (
                            <InlineFormField
                                required
                                {...props}
                                label={"Пароль"}
                                placeholder={"Введите пароль"}
                                type={"password"}
                            />
                        )}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <FormikFormField
                        name={"confirm_password"}
                        component={(props) => (
                            <InlineFormField
                                required
                                {...props}
                                placeholder={"Повторите пароль"}
                                label={"Повторение пароля:"}
                                type={"password"}
                            />
                        )}
                    />
                </FieldWrapper>

                <FieldWrapper>
                    <FormikFormField
                        name={"role"}
                        component={(props) => (
                            <InlineFormFieldSelect
                                options={options}
                                {...props}
                                label={"Роль:"}
                                placeholder={"Выберите роль пользователя"}
                            />
                        )}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <FormikFormField
                        name={"blocked"}
                        component={(props) => (
                            <Checkbox {...props} label={"Блокирован"} />
                        )}
                    />
                </FieldWrapper>
                <ButtonWrapper>
                    <Button
                        label={
                            !this.props.location.state.user
                                ? "Создать"
                                : "Сохранить"
                        }
                        onClick={this.submit}
                    />
                </ButtonWrapper>
            </WidgetBlock>
        );
    }
}

const FieldWrapper = styled.div`
    margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
    display: inline-flex;
`;

export default UserForm;
