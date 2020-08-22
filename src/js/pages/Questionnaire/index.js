import React, { PureComponent } from "react";
import styled from "styled-components";
import { formatDate } from "utils/formatDate";
import StarBar from "components/StarBar";
import { Checkbox } from "components/Checkbox";
import { Radio } from "components/Radio";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import { Button } from "components/Button";
import { fontStyles } from "styledMixins/mixins";
import PropTypes from "prop-types";
import NoData from "components/NoData";
import { connect } from "react-redux";
import { form } from "wrappers/Formik";
import { questioningClientFields } from "pages/Questionnaire/meta";
import { FieldArray } from "formik";
import { FormikFormField } from "wrappers/Formik/FormField";
import { validate } from "./validate";
import isEmpty from "lodash/isEmpty";
import { hide } from "actions/anchorPopup";
import { sendForm } from "utils/sendForm";
import { saveQuestionary } from "actions/user";
import get from "lodash/get";

@connect((state) => ({
    questionary: state.user.questionary,
}))
@form({
    fields: questioningClientFields,
    validate,
})
class Questionnaire extends PureComponent {
    componentDidMount() {
        const { questionary } = this.props;
        if (!isEmpty(questionary)) this.fillForm(questionary);
    }

    componentDidUpdate(prevProps) {
        const { questionary } = this.props;
        if (isEmpty(prevProps.questionary) && !isEmpty(questionary)) {
            this.fillForm(questionary);
        }
    }

    fillForm = (questionary) => {
        const { questions } = questionary;
        const questionaryModel = questions.map((item) => {
            return {
                ...item,
                comment: "",
                answers:
                    item.answers.map((element) => ({
                        ...element,
                        value: false,
                    })) || [],
            };
        });
        this.props.changeInitialValues({
            id: questionary.id,
            questions: questionaryModel,
        });
    };

    renderComment = (qIx) => {
        return (
            <FormikFormField
                name={`questions.${qIx}.comment`}
                component={(props) => (
                    <InlineFormFieldTextarea {...props} label={"Комментарий"} />
                )}
            />
        );
    };

    renderRating = (questionItem, qIx, touched) => {
        const { commentEnabled, answers } = questionItem;
        const selected = answers.findIndex((item) => item.value) || 0;
        return (
            <>
                <FormikFormField
                    name={`questions.${qIx}.answers.0.value`}
                    component={(props) => (
                        <StarBar
                            {...props}
                            value={selected + 1}
                            onChange={(e) => {
                                const obj = {};
                                for (let i = 0; i < 10; i++) {
                                    if (i === e - 1) {
                                        obj[
                                            `questions.${qIx}.answers.${e -
                                                1}.value`
                                        ] = true;
                                    } else {
                                        obj[
                                            `questions.${qIx}.answers.${i}.value`
                                        ] = false;
                                    }
                                }
                                this.props.setFormValues(obj);
                            }}
                            max={10}
                            editable={true}
                            meta={{
                                ...props.meta,
                                touched: touched.questions,
                            }}
                        />
                    )}
                />
                {commentEnabled && this.renderComment(qIx)}
            </>
        );
    };

    renderYesNoAndSingle = (questionItem, qIx, touched) => {
        const { commentEnabled, answers } = questionItem;
        const selected = answers.find((item) => item.value);
        return (
            <>
                <FormikFormField
                    name={`questions.${qIx}.answers.0.value`}
                    component={(props) => (
                        <Radio
                            {...props}
                            elements={answers.map(
                                ({ id: value, text: label }) => ({
                                    value,
                                    label,
                                }),
                            )}
                            value={selected ? selected.id : ""}
                            onChange={(id) => {
                                const obj = {};
                                answers.map((item, index) => {
                                    if (item.id === id) {
                                        obj[
                                            `questions.${qIx}.answers.${index}.value`
                                        ] = true;
                                    } else {
                                        obj[
                                            `questions.${qIx}.answers.${index}.value`
                                        ] = false;
                                    }
                                });
                                this.props.setFormValues(obj);
                            }}
                            meta={{
                                ...props.meta,
                                touched: touched.questions,
                            }}
                        />
                    )}
                />
                {commentEnabled && this.renderComment(qIx)}
            </>
        );
    };
    renderQuestions(questions, touched) {
        let counter = 0;

        return questions.map((questionItem, qIx) => {
            const {
                additionalData: { answerType, required: answerRequired },
                text,
                answers,
                commentEnabled,
                conditionQuestionPosition,
                conditionAnswerPosition,
            } = questionItem;

            let show = true;
            if (
                conditionQuestionPosition !== null &&
                conditionAnswerPosition !== null
            ) {
                show = get(
                    questions[conditionQuestionPosition - 1],
                    `answers[${conditionAnswerPosition - 1}].value`,
                    false,
                );
            }
            if (!show) return null;

            counter += 1;

            return (
                <ItemWrapper key={`question_${qIx}`}>
                    <Label inline={true} required={answerRequired}>
                        {counter}. {text}
                    </Label>
                    {answerType === "COMMENT" && (
                        <FormikFormField
                            name={`questions.${qIx}.comment`}
                            component={(props) => (
                                <InlineFormFieldTextarea
                                    {...props}
                                    meta={{
                                        ...props.meta,
                                        touched: touched.questions,
                                    }}
                                    required={answerRequired}
                                    label={"Комментарий"}
                                />
                            )}
                        />
                    )}
                    {answerType === "MULTIPLE" && (
                        <FormikFormField
                            component={() => {
                                return (
                                    <CheckBoxWrapper>
                                        {answers.map(({ id, text }, aIx) => {
                                            return (
                                                <FormikFormField
                                                    key={`multiple_${id}_${aIx}`}
                                                    name={`questions.${qIx}.answers.${aIx}.value`}
                                                    component={(props) => (
                                                        <Checkbox
                                                            {...props}
                                                            label={text}
                                                            meta={{
                                                                ...props.meta,
                                                                touched:
                                                                    touched.questions,
                                                            }}
                                                        />
                                                    )}
                                                />
                                            );
                                        })}
                                        {commentEnabled &&
                                            this.renderComment(qIx)}
                                    </CheckBoxWrapper>
                                );
                            }}
                            name={"answers"}
                            type={"array"}
                        />
                    )}
                    {answerType === "RATING" &&
                        this.renderRating(questionItem, qIx, touched)}
                    {["SINGLE", "YESNO"].includes(answerType) &&
                        this.renderYesNoAndSingle(questionItem, qIx, touched)}
                </ItemWrapper>
            );
        });
    }

    onSend = () => {
        sendForm(this.props, questioningClientFields).then((response) => {
            const checkedAnswers = [];
            const questionComments = [];
            response.questions.map((item) => {
                const {
                    conditionQuestionPosition,
                    conditionAnswerPosition,
                } = item;
                let show = true;
                if (
                    conditionQuestionPosition !== null &&
                    conditionAnswerPosition !== null
                ) {
                    show = get(
                        response.questions[conditionQuestionPosition - 1],
                        `answers[${conditionAnswerPosition - 1}].value`,
                        false,
                    );
                }
                if (show) {
                    const answerType = item.additionalData.answerType;
                    if (item.comment) {
                        questionComments.push({
                            id: item.id,
                            text: item.comment,
                        });
                    }
                    if (answerType !== "COMMENT") {
                        item.answers.map((element) => {
                            if (element.value)
                                checkedAnswers.push({ id: element.id });
                        });
                    }
                }
            });
            const params = {
                id: response.id,
                checkedAnswers,
                questionComments,
            };
            this.props.dispatch(saveQuestionary(params));
        });
    };

    render() {
        const { questionary, values, touched, dispatch } = this.props;
        if (isEmpty(questionary)) {
            return (
                <NoData
                    title={"Нет данных"}
                    message={"Для данного объекта отсутствуют данные"}
                />
            );
        }

        const { publicationDate, plannedEndDate } = questionary;

        return (
            <Wrapper>
                <Title>
                    Срок проведения анкетирования с{" "}
                    {formatDate(publicationDate) + " г."} по{" "}
                    {formatDate(plannedEndDate) + " г."}
                </Title>
                <FieldArray name={"questions"}>
                    {() => this.renderQuestions(values.questions, touched)}
                </FieldArray>

                <ButtonWrapper>
                    <Button label={"Сохранить"} onClick={this.onSend} />
                    <Button
                        label={"Отменить"}
                        borderColor={"red"}
                        onClick={() => dispatch(hide())}
                    />
                </ButtonWrapper>
            </Wrapper>
        );
    }
}

Questionnaire.propTypes = {
    questionary: PropTypes.object,
    changeInitialValues: PropTypes.func,
    setFormValues: PropTypes.func,
    values: PropTypes.object,
    touched: PropTypes.object,
    dispatch: PropTypes.func,
};

const Title = styled.div`
    ${(props) =>
        fontStyles(props, { font: "bold", size: props.theme.fonts.sizes.big })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
`;

const Wrapper = styled.div``;

const ItemWrapper = styled.div`
    margin-bottom: ${(props) => props.theme.paddings.normal};
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const CheckBoxWrapper = styled.div`
    > div {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
    }
`;

const Label = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: ${(props) => (props.inline ? "0" : "7px")};
    font-size: 16px;
    padding: 10px 0;
    ${(props) =>
        props.required &&
        `&:after {
            content: '*';
            color: #B63737;
            display: inline;
        }`}
`;

export default Questionnaire;
