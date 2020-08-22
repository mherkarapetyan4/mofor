import React, { PureComponent } from "react";
import { Button } from "components/Button";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { connect } from "react-redux";
import get from "lodash/get";
import PropTypes from "prop-types";
import { sendForm } from "utils/sendForm";
import { contactsFields } from "pages/Main/ContactsForm/meta";
import { form } from "wrappers/Formik";
import { FormikFormField } from "wrappers/Formik/FormField";
import { checkEmailMyData, saveContacts, sendEmailCode } from "actions/myData";
import ConfirmEmail from "components/ConfirmEmail";
import FormField from "components/FormField";

@form({
    fields: contactsFields,
})
@connect(
    (state) => ({
        contacts: state.myData.myData.contacts,
        checkEmail: state.myData.checkEmail,
    }),
    { checkEmailMyData, saveContacts, sendEmailCode },
)
class ContactsForm extends PureComponent {
    componentDidMount() {
        const { contacts } = this.props;
        const email = get(contacts, "email", "");
        const initialValues = {
            phone: get(contacts, "phone", ""),
            address: get(contacts, "address", ""),
            email,
        };
        this.props.changeInitialValues(initialValues);
        this.props.checkEmailMyData(email);
    }

    static propTypes = {
        contacts: PropTypes.object,
        checkEmail: PropTypes.object,
        changeInitialValues: PropTypes.func,
        dispatch: PropTypes.func,
        checkEmailMyData: PropTypes.func,
        saveContacts: PropTypes.func,
        sendEmailCode: PropTypes.func,
    };

    static defaultProps = {
        contacts: {},
    };

    state = {
        disabled: true,
    };

    onSubmit = (withSave = true) => {
        const { contacts } = this.props;
        sendForm(this.props, contactsFields).then((formData) => {
            if (withSave)
                this.props.saveContacts(formData, get(contacts, "email", ""));
            this.setState({
                disabled: !this.state.disabled,
            });
        });
    };

    onCancel = () => {
        const { contacts } = this.props;

        const initialValuesObj = {
            phone: get(contacts, "phone", ""),
            address: get(contacts, "address", ""),
            email: get(contacts, "email", ""),
        };
        this.props.changeInitialValues(initialValuesObj);

        this.setState({
            disabled: !this.state.disabled,
        });
    };

    render() {
        const { disabled } = this.state;
        const { contacts, checkEmail } = this.props;
        const email = get(contacts, "email", null);
        return (
            <FormWrapper>
                <Item>
                    <FormikFormField
                        name={"phone"}
                        component={(props) => (
                            <FormField
                                label={"Контактный телефон: +7"}
                                type={"phone"}
                                {...props}
                                onChange={(e) => props.onChange(e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>

                <Item>
                    <FormikFormField
                        name={"email"}
                        component={(props) => (
                            <FormField
                                label={"Электронная почта:"}
                                placeholder={"Электронная почта"}
                                type={"textarea"}
                                {...props}
                                onChange={(e) => props.onChange(e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    />
                    <ConfirmEmailWrapper>
                        <ConfirmEmail
                            check={checkEmail}
                            mail={email}
                            onCheckEmail={() =>
                                this.props.checkEmailMyData(email)
                            }
                            onSendEmail={() => this.props.sendEmailCode(email)}
                        />
                    </ConfirmEmailWrapper>
                </Item>

                <Item>
                    <FormikFormField
                        name={"address"}
                        component={(props) => {
                            return (
                                <FormField
                                    label={"Почтовый адрес:"}
                                    placeholder={"Почтовый адрес"}
                                    type={"textarea"}
                                    {...props}
                                    onChange={(e) =>
                                        props.onChange(e.target.value)
                                    }
                                    disabled={disabled}
                                />
                            );
                        }}
                    />
                </Item>
                <Actions>
                    {disabled && (
                        <ActionItem>
                            <Button
                                label={"Редактировать"}
                                onClick={() =>
                                    this.setState({
                                        disabled: !this.state.disabled,
                                    })
                                }
                            />
                        </ActionItem>
                    )}
                    {!disabled && (
                        <ActionItem>
                            <Button
                                label={"Сохранить"}
                                onClick={() => {
                                    this.onSubmit();
                                }}
                            />

                            <Button
                                label={"Отмена"}
                                onClick={() => this.onCancel()}
                            />
                        </ActionItem>
                    )}
                    <ActionItem>
                        <Status type={"success"}>
                            {/*Статус почты: Подтверждена*/}
                        </Status>
                    </ActionItem>
                </Actions>
            </FormWrapper>
        );
    }
}

const ActionItem = styled.div`
    margin-right: 16px;
    display: flex;
    align-items: center;

    &:last-child {
        margin-right: 0;
    }
`;

const Item = styled.div`
    margin-bottom: 16px;
`;

const FormWrapper = styled.div`
    padding: 20px 20px 20px 50px;
`;

const ConfirmEmailWrapper = styled.div``;

const Actions = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
`;

const Status = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: renderTypeColor(props, props.type),
        })};
    padding: 10px 0;
`;

const renderTypeColor = (props, type) => {
    switch (type) {
        case "success":
            return props.theme.colors.notifications.success;
        case "alert":
            return props.theme.colors.notifications.alert;
        case "warning":
            return props.theme.colors.notifications.warning;
        case "normal":
            return props.theme.colors.notifications.regular;
        default:
            return null;
    }
};

export default ContactsForm;
