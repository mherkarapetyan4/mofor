import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "components/Button";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import { form } from "wrappers/Formik";
import { FormikFormField } from "wrappers/Formik/FormField";
import { connect } from "react-redux";
import { hidePopup } from "actions/popup";
import { sendMessage } from "actions/pregnancy";
import { sendForm } from "utils/sendForm";
import { showSuccessMessage } from "actions/app";

const fields = {
    comment: {
        name: "причина закрытия",
        rules: [],
        type: "string",
    },
};

@form({
    fields,
})
@connect()
class PregnancyClose extends PureComponent {
    onClick = () => {
        sendForm(this.props, fields).then((response) => {
            const { dispatch } = this.props;
            dispatch(
                sendMessage(
                    `Прошу закрыть канал консультирования по беременности. Причина закрытия: ${response.comment ||
                        "не указана"}`,
                ),
            );
            dispatch(hidePopup());
            dispatch(
                showSuccessMessage(
                    'Сообщение о необходимости закрытия канала консультирования отправлено Вашему врачу. Связаться с врачом можно в разделе "Спросить врача."',
                ),
            );
        });
    };

    render() {
        return (
            <Wrapper>
                <Field>
                    <FormikFormField
                        component={(props) => (
                            <InlineFormFieldTextarea
                                {...props}
                                label={"Причина закрытия:"}
                                placeholder={
                                    "Пожалуйста, напишите причину закрытия раздела"
                                }
                            />
                        )}
                        name={"comment"}
                    />
                </Field>
                <Actions>
                    <Button
                        label={"Закрыть беременность"}
                        onClick={this.onClick}
                    />
                    <Button
                        label={"Отмена"}
                        onClick={() => this.props.dispatch(hidePopup())}
                    />
                </Actions>
            </Wrapper>
        );
    }
}

PregnancyClose.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
    padding: 0 16px;
`;

const Field = styled.div`
    margin-bottom: 16px;
`;

const Actions = styled.div`
    display: flex;

    > div {
        margin-right: 16px;

        :last-child {
            margin-right: 0;
        }
    }
`;

export default PregnancyClose;
