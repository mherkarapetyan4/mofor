import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "components/Button";
import { logIn } from "actions/admin";
import { form } from "wrappers/Formik";
import { FormikFormField } from "wrappers/Formik/FormField";
import { adminAuthFields } from "./meta";
import InlineFormField from "components/InlineFormField";
import { sendForm } from "utils/sendForm";
@form({
    fields: adminAuthFields,
})
@connect((state) => ({
    myDataFetching: state.myData.myDataFetching,
    isAuthLoading: state.user.isAuthLoading,
}))
class AdminAuthForm extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        myDataFetching: PropTypes.bool.isRequired,
        isAuthLoading: PropTypes.bool.isRequired,
    };

    onLogin = () => {
        const { dispatch } = this.props;
        sendForm(this.props, adminAuthFields).then((response) => {
            let login = response.login;
            if (!/@\w+\.\w+/.test(login)) {
                login = `${response.login}@mgfoms.ru`;
            }
            dispatch(logIn(login, response.password));
        });
    };

    render() {
        //const {myDataFetching, isAuthLoading} = this.props;
        return (
            <Wrapper>
                <FieldWrapper>
                    <FormikFormField
                        name={"login"}
                        component={(props) => (
                            <InlineFormField
                                required
                                {...props}
                                label={"Логин:"}
                                placeholder={"Логин"}
                            />
                        )}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <FormikFormField
                        name={"password"}
                        component={(props) => (
                            <InlineFormField
                                type="password"
                                required
                                {...props}
                                label={"Пароль:"}
                                placeholder={"Пароль"}
                            />
                        )}
                    />
                </FieldWrapper>

                <Button label={"Авторизоваться"} white onClick={this.onLogin} />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const FieldWrapper = styled.div`
    margin-bottom: 16px;
`;

export default AdminAuthForm;
