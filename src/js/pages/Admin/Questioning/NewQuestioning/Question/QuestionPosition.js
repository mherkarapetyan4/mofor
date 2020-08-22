import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { FormikFormField } from "wrappers/Formik/FormField";

class QuestionPosition extends PureComponent {
    static propTypes = {
        questionIndex: PropTypes.number.isRequired,
        setFormValues: PropTypes.func.isRequired,
        questionsList: PropTypes.array.isRequired,
    };

    render() {
        const { questionIndex, setFormValues, questionsList } = this.props;
        return (
            <FormikFormField
                name={`questions.${questionIndex}.question.conditionQuestionPosition`}
                component={(props) => (
                    <InlineFormFieldSelect
                        {...props}
                        options={questionsList}
                        disabled={!questionsList.length}
                        label={"Позиция вопроса-условия:"}
                        placeholder={"Выберите позицию вопроса-условия"}
                        onChange={(e) => {
                            props.onChange(e);
                            setFormValues({
                                [`questions.${questionIndex}.question.conditionAnswerPosition`]: null,
                            });
                        }}
                    />
                )}
            />
        );
    }
}

export default QuestionPosition;
