import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import { form } from "wrappers/Formik";
import { validateRules } from "config/consts";
import { connect } from "react-redux";
import { hidePopup } from "actions/popup";
import { Button } from "components/Button";
import { sendForm } from "utils/sendForm";
import {
    confirmationPasspordData,
    confirmationWardSnilsData,
} from "actions/user";
import styled from "styled-components";
import InlineFormField from "components/InlineFormField";
import { replacePhoneChar } from "utils/numberHandler";

const fields = {
    comment: {
        rules: [validateRules.required, `${validateRules.max}:2000`],
        name: "комментарий",
        type: "string",
    },
    phone: {
        rules: [validateRules.phone],
        name: "контактный телефон",
        type: "string",
    },
};

@connect((state) => ({
    phoneIsRequired: state.user.phoneIsRequired,
}))
@form({
    fields,
    validate: (values, props) => {
        const errors = {};
        if (props.phoneIsRequired && !values.phone) {
            errors["phone"] = "Поле телефон обязательное для заполнения";
        }
        return errors;
    },
})
class RejectInfoPopup extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        phoneIsRequired: PropTypes.bool.isRequired,
    };

    onClick = () => {
        sendForm(this.props, fields).then((response) => {
            const { dispatch, type } = this.props;
            const params = {
                confirmed: false,
                comment: response.comment,
                phone: replacePhoneChar(response.phone),
            };
            if (type === "passport") {
                dispatch(confirmationPasspordData(params, this.onClose));
            } else if (type === "snils") {
                dispatch(confirmationWardSnilsData(params, this.onClose));
            }
        });
    };

    onClose = () => this.props.dispatch(hidePopup());

    render() {
        const { phoneIsRequired } = this.props;
        return (
            <Wrapper>
                {phoneIsRequired && (
                    <FieldWrapper>
                        <FormikFormField
                            name={"phone"}
                            component={(props) => (
                                <InlineFormField
                                    required
                                    {...props}
                                    type={"phone"}
                                    label={"Контактный телефон: +7"}
                                    placeholder={"Ваш контактный телефон"}
                                />
                            )}
                        />
                    </FieldWrapper>
                )}
                <FieldWrapper>
                    <FormikFormField
                        name={"comment"}
                        component={(props) => (
                            <InlineFormFieldTextarea
                                label={"Комментарий:"}
                                required={true}
                                {...props}
                            />
                        )}
                    />
                </FieldWrapper>
                <ActionsWrapper>
                    <Button label={"Отправить"} onClick={this.onClick} />
                    <Button label={"Отмена"} onClick={this.onClose} />
                </ActionsWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 0 16px;
`;

const FieldWrapper = styled.div`
    margin-bottom: 10px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 16px;

        :last-child {
            margin-right: 0;
        }
    }
`;

export default RejectInfoPopup;
