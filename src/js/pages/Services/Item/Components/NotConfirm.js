import React, { PureComponent } from "react";
import { Button } from "components/Button";
import PropTypes from "prop-types";
import { FormikFormField } from "wrappers/Formik/FormField";

import { form } from "wrappers/Formik";
import { notConfirmFields, validate } from "pages/Services/Item/meta";
import { sendForm } from "utils/sendForm";
import InlineFormField from "components/InlineFormField";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import styled from "styled-components";
import { connect } from "react-redux";
import { factOfConfirmationService } from "actions/services";
import { replacePhoneChar } from "utils/numberHandler";

@connect((state) => ({
    phoneIsRequired: state.user.phoneIsRequired,
}))
@form({
    fields: notConfirmFields,
    validate,
})
class NotConfirm extends PureComponent {
    static propTypes = {
        service: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        tab: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        onCloseForm: PropTypes.func.isRequired,
        phoneIsRequired: PropTypes.bool.isRequired,
    };

    onClick = () => {
        const { tab, service, dispatch, onCloseForm } = this.props;
        sendForm(this.props, notConfirmFields).then((response) => {
            dispatch(
                factOfConfirmationService(
                    {
                        status: "UNCONFIRMED",
                        phone: replacePhoneChar(response.phone),
                        comment: response.comment,
                        serviceId: service.id,
                    },
                    tab,
                    onCloseForm,
                ),
            );
        });
    };

    render() {
        const { phoneIsRequired } = this.props;
        return (
            <>
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
                                {...props}
                                required
                                label={"Комментарий:"}
                                placeholder={"Комментарий"}
                                type={"textarea"}
                            />
                        )}
                    />
                </FieldWrapper>
                <ButtonWrapper>
                    <Button label={"Отправить"} onClick={this.onClick} />
                </ButtonWrapper>
            </>
        );
    }
}

const FieldWrapper = styled.div`
    margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
    display: inline-flex;
`;

export default NotConfirm;
