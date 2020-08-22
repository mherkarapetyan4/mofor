import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { questionTypes } from "config/consts";
import styled from "styled-components";
import FormField from "components/FormField";

class NameAndType extends PureComponent {
    static propTypes = {
        questionIndex: PropTypes.number.isRequired,
        touched: PropTypes.bool.isRequired,
        clearQuestionLink: PropTypes.func.isRequired,
    };

    render() {
        const { questionIndex, touched, clearQuestionLink } = this.props;
        return (
            <>
                <FormItem>
                    <FormikFormField
                        name={`questions.${questionIndex}.question.text`}
                        component={(props) => (
                            <FormField
                                {...props}
                                meta={{
                                    ...props.meta,
                                    touched: touched,
                                }}
                                onChange={(e) => props.onChange(e.target.value)}
                                type={"textarea"}
                                label={"Вопрос:"}
                                placeholder={"Введите вопрос"}
                                required
                                ref={(el) => (this.questionField = el)}
                                focusOnLoad={true}
                            />
                        )}
                    />
                </FormItem>
                <FormItem>
                    <FormikFormField
                        name={`questions.${questionIndex}.question.additionalData.answerType`}
                        component={(props) => (
                            <InlineFormFieldSelect
                                {...props}
                                meta={{
                                    ...props.meta,
                                    touched: touched,
                                }}
                                options={questionTypes}
                                placeholder={"Выберите тип ответа"}
                                required
                                label={"Тип ответа:"}
                                onChange={(e) => {
                                    props.onChange(e);
                                    clearQuestionLink(questionIndex);
                                }}
                            />
                        )}
                    />
                </FormItem>
            </>
        );
    }
}

const FormItem = styled.div`
    margin-bottom: 16px;
`;

export default NameAndType;
