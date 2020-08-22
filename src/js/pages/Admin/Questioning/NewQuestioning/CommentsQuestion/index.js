import React, { PureComponent } from "react";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import PropTypes from "prop-types";
import { FormikFormField } from "wrappers/Formik/FormField";
import { FieldArray } from "formik";

class CommentsQuestion extends PureComponent {
    componentDidMount() {
        const { questionIndex: qIx } = this.props;
        this.props.form.setFieldValue(`questions.${qIx}.answers.0.position`, 1);
    }

    render() {
        const { questionIndex } = this.props;
        return (
            <FieldArray
                name={`questions.${questionIndex}.question.answers`}
                render={() => {
                    return (
                        <>
                            <FormikFormField
                                name={`questions.${questionIndex}.answers.0.text`}
                                component={(props) => (
                                    <InlineFormFieldTextarea
                                        {...props}
                                        label={"Ответ:"}
                                        placeholder={"Введите ответ"}
                                        required
                                    />
                                )}
                            />
                        </>
                    );
                }}
            />
        );
    }
}

CommentsQuestion.propTypes = {
    questionIndex: PropTypes.number,
    form: PropTypes.object,
};

export default CommentsQuestion;
