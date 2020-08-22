import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { FormikFormField } from "wrappers/Formik/FormField";

class AnswerPosition extends PureComponent {
    static propTypes = {
        questionIndex: PropTypes.number.isRequired,
        answersList: PropTypes.array.isRequired,
    };

    render() {
        const { questionIndex, answersList } = this.props;
        return (
            <FormikFormField
                name={`questions.${questionIndex}.question.conditionAnswerPosition`}
                component={(props) => (
                    <InlineFormFieldSelect
                        {...props}
                        options={answersList}
                        disabled={!answersList.length}
                        label={"Позиция ответа-условия:"}
                        placeholder={"Выберите позицию ответа-условия"}
                    />
                )}
            />
        );
    }
}

export default AnswerPosition;
