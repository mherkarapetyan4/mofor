import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import WidgetBlock from "components/WidgetBlock";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import InlineFormField from "components/InlineFormField";
import { Button } from "components/Button";
import { sendSmoMessage } from "actions/user";
import { connect } from "react-redux";
import { sendForm } from "utils/sendForm";
import { sendSmoFields } from "components/SMORequest/meta";
import { form } from "wrappers/Formik";
import { FormikFormField } from "wrappers/Formik/FormField";
import { showPopup } from "actions/popup";
import { getCurrentUserInfo } from "actions/myData";
import get from "lodash/get";

const requestsList = [
    {
        value: "QUESTION",
        label: "Вопрос",
    },
    {
        value: "REVIEW",
        label: "Отзыв",
    },
    {
        value: "COMPLAINT",
        label: "Жалоба",
    },
];

@connect((state) => ({
    myData: state.myData.myData,
    contacts: state.myData.myData.contacts,
    // phoneIsRequired: state.user.phoneIsRequired,
}))
@form({
    fields: sendSmoFields,
    validate: (values, { contacts }) => {
        const errors = {};
        // if (props.phoneIsRequired && !values.phone) {
        if (!values.phone && !contacts.phone) {
            errors["phone"] = "Поле телефон обязательное для заполнения";
        }
        return errors;
    },
})
class SMORequest extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        hideModal: PropTypes.func,
        changeInitialValues: PropTypes.func.isRequired,
        myData: PropTypes.object,
        contacts: PropTypes.object,
        phoneIsRequired: PropTypes.bool.isRequired,
        resetForm: PropTypes.func.isRequired,
    };

    static defaultProps = {
        hideModal: () => {},
    };

    sendMessage = () => {
        const { dispatch, hideModal, resetForm } = this.props;

        sendForm(this.props, sendSmoFields).then((response) => {
            dispatch(
                sendSmoMessage({ ...response }, () => {
                    dispatch(showPopup("Сообщение успешно отправлено"));

                    const initial = {
                        type: "",
                        text: "",
                        phone: "",
                    };
                    this.props.changeInitialValues(initial);
                    dispatch(hideModal());
                    resetForm();
                    dispatch(getCurrentUserInfo());
                }),
            );
        });
    };

    render() {
        const { contacts } = this.props;
        return (
            <Wrapper>
                <WidgetBlock title={"Отправьте обращение"}>
                    <FieldWrapper>
                        <FormikFormField
                            name={"type"}
                            component={(props) => (
                                <InlineFormFieldSelect
                                    required
                                    {...props}
                                    label={"Тип обращения:"}
                                    options={requestsList}
                                    placeholder={"Выберите тип"}
                                />
                            )}
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <FormikFormField
                            name={"text"}
                            component={(props) => (
                                <InlineFormFieldTextarea
                                    {...props}
                                    required={true}
                                    label={"Текст обращения:"}
                                    placeholder={"Введите текст обращения"}
                                />
                            )}
                        />
                    </FieldWrapper>
                    {!get(contacts, "phone") && (
                        <FieldWrapper>
                            <FormikFormField
                                name={"phone"}
                                component={(props) => (
                                    <InlineFormField
                                        {...props}
                                        type={"phone"}
                                        required={true}
                                        label={"Телефон заявителя: +7"}
                                        placeholder={"Телефон заявителя"}
                                    />
                                )}
                            />
                        </FieldWrapper>
                    )}
                    <ButtonWrapper>
                        <Button
                            label={"Отправить обращение"}
                            onClick={this.sendMessage}
                        />
                    </ButtonWrapper>
                </WidgetBlock>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const FieldWrapper = styled.div`
    margin-bottom: ${(props) => props.theme.paddings.normal};
`;

const ButtonWrapper = styled.div`
    display: inline-block;
`;

export default SMORequest;
