/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import WidgetBlock from "components/WidgetBlock";
import NameAndType from "pages/Admin/Questioning/NewQuestioning/Question/NameAndType";
import QuestionPosition from "pages/Admin/Questioning/NewQuestioning/Question/QuestionPosition";
import AnswerPosition from "pages/Admin/Questioning/NewQuestioning/Question/AnswerPosition";
import OneQuestion from "pages/Admin/Questioning/NewQuestioning/Question/OneQuestion";
import Comment from "pages/Admin/Questioning/NewQuestioning/Question/Comment";
import RequiredAndButton from "pages/Admin/Questioning/NewQuestioning/Question/RequiredAndButton";

class Question extends PureComponent {
    componentWillReceiveProps(nextProps) {
        if (
            this.props.data.question.additionalData.answerType !==
            nextProps.data.question.additionalData.answerType
        ) {
            const { questionIndex: qIx } = nextProps;
            nextProps.form.setFieldValue(`questions.${qIx}.answers`, []);
        }
    }

    render() {
        const {
            onDelete,
            questionIndex,
            data,
            form,
            touched,
            questionsList,
            answersList,
            clearQuestionLink,
            setFormValues,
        } = this.props;
        const type = data.question.additionalData.answerType;

        return (
            <Wrapper>
                <WidgetBlock title={`Вопрос ${questionIndex + 1}`} actions={[]}>
                    <FormWrapper>
                        <NameAndType
                            questionIndex={questionIndex}
                            touched={touched}
                            clearQuestionLink={clearQuestionLink}
                        />
                        <FormItem>
                            <QuestionPosition
                                questionIndex={questionIndex}
                                setFormValues={setFormValues}
                                questionsList={questionsList}
                            />
                        </FormItem>
                        <FormItem>
                            <AnswerPosition
                                questionIndex={questionIndex}
                                answersList={answersList}
                            />
                        </FormItem>
                        <FormItem>
                            <OneQuestion
                                type={type}
                                data={data}
                                touched={touched}
                                questionIndex={questionIndex}
                                clearQuestionLink={clearQuestionLink}
                                setFieldValue={form.setFieldValue}
                            />
                        </FormItem>
                        {type !== "COMMENT" && (
                            <FormItem>
                                <Comment questionIndex={questionIndex} />
                            </FormItem>
                        )}
                        <RequiredAndButton
                            questionIndex={questionIndex}
                            onDelete={onDelete}
                        />
                    </FormWrapper>
                </WidgetBlock>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    margin-bottom: 16px;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormItem = styled.div`
    margin-bottom: 16px;
`;

Question.propTypes = {
    data: PropTypes.object.isRequired,
    isRender: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    questionIndex: PropTypes.number.isRequired,
    form: PropTypes.object,
    touched: PropTypes.bool,
    questionsList: PropTypes.array,
    answersList: PropTypes.array,
    clearQuestionLink: PropTypes.func,
    setFormValues: PropTypes.func.isRequired,
};

Question.defaultProps = {
    questionsList: [],
    answersList: [],
    touched: false,
};

export default Question;
