import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormikFormField } from "wrappers/Formik/FormField";
import { Checkbox } from "components/Checkbox";
import { Button } from "components/Button";

class RequiredAndButton extends PureComponent {
    static propTypes = {
        questionIndex: PropTypes.number.isRequired,
        onDelete: PropTypes.func.isRequired,
    };

    render() {
        const { questionIndex, onDelete } = this.props;
        return (
            <>
                <FormItem>
                    <FormikFormField
                        name={`questions.${questionIndex}.question.additionalData.required`}
                        component={(props) => (
                            <Checkbox
                                {...props}
                                label={"Обязательный вопрос"}
                            />
                        )}
                    />
                </FormItem>

                <ActionWrapper>
                    <Button
                        label={"Удалить"}
                        onClick={() => {
                            onDelete(questionIndex);
                        }}
                    />
                </ActionWrapper>
            </>
        );
    }
}

const FormItem = styled.div`
    margin-bottom: 16px;
`;

const ActionWrapper = styled.div`
    display: flex;
`;

export default RequiredAndButton;
