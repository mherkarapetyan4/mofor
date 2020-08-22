import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import { Button } from "components/Button";
import styled from "styled-components";
import { connect } from "react-redux";
import { hidePopup } from "actions/popup";
import { form } from "wrappers/Formik";
import { validateRules } from "config/consts";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormField from "components/InlineFormField";
import { sendForm } from "utils/sendForm";

const fields = {
    comment: {
        rules: [validateRules.required],
        name: "комментарий",
        type: "string",
    },
    phone: {
        rules: [],
        name: "контактный телефон",
        type: "string",
    },
};

@connect(
    (state) => ({
        phoneIsRequired: state.user.phoneIsRequired,
    }),
    { hidePopup },
)
@form({
    fields,
    validate: (values, props) => {
        const errors = {};
        if (props.phoneIsRequired && !values.phone)
            errors["phone"] =
                "Поле контактный телефон обязательно для заполнения";
        return errors;
    },
})
class Inaccuracy extends PureComponent {
    onClick = () => {
        sendForm(this.props, fields).then((response) => {
            const { onSend, hidePopup } = this.props;
            onSend(response);
            hidePopup();
        });
    };

    render() {
        const { hidePopup, phoneIsRequired } = this.props;

        return (
            <Wrapper>
                {phoneIsRequired && (
                    <InputWrapper>
                        <FormikFormField
                            name={"phone"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    required={true}
                                    type={"phone"}
                                    label={"Контактный телефон: +7"}
                                    placeholder={"Контактный телефон"}
                                />
                            )}
                        />
                    </InputWrapper>
                )}
                <InputWrapper>
                    <FormikFormField
                        name={"comment"}
                        component={(props) => (
                            <InlineFormFieldTextarea
                                {...props}
                                required={true}
                                label={"Опишите неточности в информации:"}
                            />
                        )}
                    />
                </InputWrapper>
                <Actions>
                    <Button label={"Отправить"} onClick={this.onClick} />
                    <Button label={"Отмена"} onClick={() => hidePopup()} />
                </Actions>
            </Wrapper>
        );
    }
}

const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const InputWrapper = styled.div`
    margin-bottom: 16px;
    flex: 1 1 auto;
`;

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

Inaccuracy.propTypes = {
    hidePopup: PropTypes.func,
    onSend: PropTypes.func,
    phoneIsRequired: PropTypes.bool,
};

Inaccuracy.defaultProps = {
    phoneIsRequired: false,
};

export default Inaccuracy;
