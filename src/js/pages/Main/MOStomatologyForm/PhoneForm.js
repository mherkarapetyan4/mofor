import React, { PureComponent } from "react";
import PropTypes from "prop-types";
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
    phone: {
        rules: [validateRules.required, validateRules.phone],
        name: "контактный телефон",
        type: "string",
    },
};

@connect(null, { hidePopup })
@form({
    fields,
})
class PhoneForm extends PureComponent {
    onClick = () => {
        sendForm(this.props, fields).then((response) => {
            const { onSend, hidePopup } = this.props;
            onSend(response);
            hidePopup();
        });
    };

    render() {
        const { hidePopup } = this.props;

        return (
            <Wrapper>
                <InputWrapper>
                    <FormikFormField
                        name={"phone"}
                        component={(props) => (
                            <InlineFormField
                                {...props}
                                required={true}
                                placeholder={"Контактный телефон:"}
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

PhoneForm.propTypes = {
    hidePopup: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
};

export default PhoneForm;
