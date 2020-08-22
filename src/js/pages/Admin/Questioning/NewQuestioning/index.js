import React, { PureComponent } from "react";
import Row from "containers/Row";
import Column from "containers/Column";
import FlatPopup from "components/FlatPopup";
import WidgetBlock from "components/WidgetBlock";
import InlineFormField from "components/InlineFormField";
import { Button } from "components/Button";
import styled from "styled-components";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import InfoIcon from "icons/InfoIcon";
import { show } from "actions/anchorPopup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserInfo from "pages/Admin/Questioning/NewQuestioning/UserInfo";
import NoData from "components/NoData";
import isEmpty from "lodash/isEmpty";
import Question from "pages/Admin/Questioning/NewQuestioning/Question";
import ScrollBar from "components/ScrollBar";
import { Desktop, Tablet } from "wrappers/responsive";
import {
    createQuestioning,
    getQuestioningFull,
    saveFullQuestioning,
    getQuestioningList,
} from "actions/admin";
import { serverFormatDate } from "utils/formatDate";
import { withRouter } from "react-router-dom";
import { form } from "wrappers/Formik";
import { questioningFields } from "pages/Admin/Questioning/NewQuestioning/meta";
import { FormikFormField } from "wrappers/Formik/FormField";
import { adminPaths } from "config/paths";
import { validate } from "./validate";
import dayjs from "dayjs";
import { sendForm } from "utils/sendForm";
import { FieldArray } from "formik";
import omit from "lodash/omit";
import { hasHistoryState } from "modules/hasHistoryState";
import { ADMIN_ELEMENTS } from "config/menu";

@withRouter
@connect(null, {
    show,
    createQuestioning,
    saveFullQuestioning,
    getQuestioningList,
    getQuestioningFull,
})
@form({
    fields: questioningFields,
    validate,
})
@hasHistoryState(ADMIN_ELEMENTS.QUESTIONING.path)
class NewQuestioning extends PureComponent {
    userInfo = [
        {
            icon: <InfoIcon opacity={0.5} />,
            tooltip: "Информация о пользователе",
            action: (position) =>
                this.props.show({
                    position,
                    component: <UserInfo data={""} />,
                    size: {
                        w: 190,
                        h: 50,
                    },
                }),
        },
    ];

    async componentDidMount() {
        const {
            state: { id = false },
        } = this.props.location;
        if (id) {
            const initialValues = await this.props.getQuestioningFull(id);
            const initial = {
                ...initialValues,
                questions: initialValues.questions.map((item) => {
                    return {
                        ...item,
                        answers: item.answers || [],
                    };
                }),
            };
            this.props.changeInitialValues(initial);
        }
    }

    render() {
        const {
            values: { questions },
        } = this.props;
        const questionItem = {
            question: {
                position: 1,
                text: "",
                commentEnabled: false,
                commentRequired: false,
                minAnswersCount: 0,
                maxAnswersCount: 1,
                conditionQuestionPosition: null,
                conditionAnswerPosition: null,
                additionalData: {
                    answerType: "",
                    required: false,
                },
            },
            answers: [],
        };

        const {
            state: { id },
        } = this.props.location;

        return (
            <FlatPopup
                title={id ? "Редактирование анкеты" : "Новая анкета"}
                additional={false}
            >
                <Row fullHeight>
                    <Column paddings={0} fraction={4}>
                        <WidgetWrapper>
                            <WidgetBlock title={"Информация об анкете"}>
                                <FormWrapper>
                                    <FormikFormField
                                        name={"title"}
                                        component={(props) => (
                                            <FormItem>
                                                <InlineFormField
                                                    {...props}
                                                    label={"Название анкеты:"}
                                                    placeholder={
                                                        "Название анкеты"
                                                    }
                                                    required
                                                />
                                            </FormItem>
                                        )}
                                    />

                                    <FormikFormField
                                        name={"description"}
                                        component={(props) => (
                                            <FormItem>
                                                <InlineFormFieldTextarea
                                                    {...props}
                                                    label={"Описание анкеты:"}
                                                    placeholder={
                                                        "Описание анкеты"
                                                    }
                                                    required
                                                    maxLength={512}
                                                />
                                            </FormItem>
                                        )}
                                    />

                                    <FormikFormField
                                        name={"plannedEndDate"}
                                        component={(props) => (
                                            <FormItem>
                                                <InlineFormFieldDate
                                                    {...props}
                                                    label={"Дата окончания:"}
                                                    placeholder={
                                                        "Дата окончания"
                                                    }
                                                    required
                                                    minDate={dayjs().add(
                                                        -1,
                                                        "day",
                                                    )}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                </FormWrapper>
                            </WidgetBlock>
                        </WidgetWrapper>
                    </Column>
                    <FieldArray
                        name={"questions"}
                        render={(arrayHelpers) => {
                            return (
                                <Column paddingRight={0} fraction={8}>
                                    <WidgetBlock
                                        title={"Вопросы"}
                                        additional={
                                            <Button
                                                label={"Добавить вопрос"}
                                                onClick={() => {
                                                    arrayHelpers.push({
                                                        ...questionItem,
                                                        question: {
                                                            ...questionItem.question,
                                                            position:
                                                                questions.length +
                                                                1,
                                                        },
                                                    });
                                                }}
                                            />
                                        }
                                        fullHeight
                                    >
                                        <Desktop>
                                            <ScrollBar>
                                                {this.renderQuestions(
                                                    arrayHelpers,
                                                )}
                                                <Action>
                                                    <Button
                                                        label={
                                                            "Сохранить анкету"
                                                        }
                                                        onClick={this.onSubmit}
                                                    />
                                                </Action>
                                            </ScrollBar>
                                        </Desktop>
                                        <Tablet>
                                            {this.renderQuestions(arrayHelpers)}
                                        </Tablet>
                                    </WidgetBlock>
                                </Column>
                            );
                        }}
                    />
                </Row>
            </FlatPopup>
        );
    }

    onSubmit = () => {
        sendForm(this.props, questioningFields).then((response) => {
            const {
                createQuestioning,
                saveFullQuestioning,
                values,
            } = this.props;
            const { id, questions } = response;
            if (!questions.length) {
                const params = {
                    ...omit(response, ["questions"]),
                    // plannedEndDate: serverFormatDate(values.plannedEndDate),
                };
                createQuestioning(
                    params,
                    id
                        ? `/${adminPaths.EDIT_QUESTIONING}`
                        : `/${adminPaths.CREATE_QUESTIONING}`,
                );
            } else {
                const params = {
                    questionary: {
                        ...omit(response, ["questions"]),
                        plannedEndDate: id
                            ? serverFormatDate(dayjs(values.plannedEndDate))
                            : serverFormatDate(values.plannedEndDate),
                    },
                    questions: questions.map((item) => {
                        const required = item.question.additionalData.required;
                        const answerType =
                            item.question.additionalData.answerType;
                        if (
                            required &&
                            (answerType === "YESNO" ||
                                answerType === "SINGLE" ||
                                answerType === "RATING")
                        ) {
                            return {
                                ...item,
                                question: {
                                    ...item.question,
                                    minAnswersCount: 1,
                                    maxAnswersCount: 1,
                                },
                            };
                        } else if (answerType === "MULTIPLE") {
                            return {
                                ...item,
                                question: {
                                    ...item.question,
                                    minAnswersCount: required ? 1 : 0,
                                    maxAnswersCount: item.answers.length,
                                },
                            };
                        } else if (answerType === "COMMENT") {
                            return {
                                ...item,
                                question: {
                                    ...item.question,
                                    commentEnabled: true,
                                    commentRequired: required,
                                },
                            };
                        }
                        return {
                            ...item,
                        };
                    }),
                };
                saveFullQuestioning(params, [
                    { states: ["DRAFT"], action: "draft" },
                    {
                        states: ["PUBLISHED", "ENDED"],
                        action: "pub_end",
                    },
                ]);
            }
        });
    };

    fillQuestionsList = (questionPosition) => {
        if (questionPosition === 0) return [];

        const arr = [];
        const { questions } = this.props.values;
        for (let i = 0; i < questionPosition; i++) {
            const item = questions[i];
            if (item.question.additionalData.answerType !== "COMMENT") {
                if (arr.length === 0)
                    arr.push({ label: "Не выбрано", value: null });
                arr.push({ label: `Вопрос №${i + 1}`, value: i + 1 });
            }
        }
        return arr;
    };

    fillAnswersList = (conditionQuestionPosition) => {
        if (conditionQuestionPosition === null) return [];
        const { questions } = this.props.values;
        const answers = questions[conditionQuestionPosition - 1].answers;
        return answers.map(({ text }, index) => ({
            label: `Ответ №${index + 1} (${text})`,
            value: index + 1,
        }));
    };

    clearingFields = (questionPosition) => {
        const { setFormValues, values } = this.props;
        const { questions } = values;
        const cleanedFields = {};
        questions.map((item, index) => {
            if (index > questionPosition) {
                const {
                    conditionQuestionPosition,
                    conditionAnswerPosition,
                } = item.question;
                if (conditionQuestionPosition !== null)
                    cleanedFields[
                        `questions.${index}.question.conditionQuestionPosition`
                    ] = null;
                if (conditionAnswerPosition !== null)
                    cleanedFields[
                        `questions.${index}.question.conditionAnswerPosition`
                    ] = null;
            }
        });
        if (!isEmpty(cleanedFields)) setFormValues(cleanedFields);
    };

    clearQuestionLink = (questionPosition) => {
        const { setFormValues, values } = this.props;
        const { questions } = values;
        const cleanedFields = {};
        questions.map((item, index) => {
            if (index > questionPosition) {
                const { conditionQuestionPosition } = item.question;
                if (questionPosition === conditionQuestionPosition) {
                    cleanedFields[
                        `questions.${index}.question.conditionQuestionPosition`
                    ] = null;
                    cleanedFields[
                        `questions.${index}.question.conditionAnswerPosition`
                    ] = null;
                }
            }
        });
        if (!isEmpty(cleanedFields)) setFormValues(cleanedFields);
    };

    renderQuestions = (arrayHelpers) => {
        const { values, touched, setFormValues } = this.props;
        return !isEmpty(values.questions) ? (
            <>
                {values.questions.map((item, i) => (
                    <Question
                        data={item}
                        key={i}
                        questionIndex={i}
                        onDelete={() => {
                            this.clearingFields(i);
                            arrayHelpers.remove(i);
                        }}
                        form={arrayHelpers.form}
                        touched={touched.questions}
                        answersList={this.fillAnswersList(
                            item.question.conditionQuestionPosition,
                        )}
                        questionsList={this.fillQuestionsList(i)}
                        clearQuestionLink={this.clearQuestionLink}
                        setFormValues={setFormValues}
                    />
                ))}
            </>
        ) : (
            <NoData
                title={"Список вопросов пуст"}
                message={
                    "Добавьте первый вопрос, нажав на кнопку “Добавить вопрос” выше"
                }
            />
        );
    };
}

const WidgetWrapper = styled.div`
    margin-top: 13px;
    width: 100%;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const FormItem = styled.div`
    width: 100%;
    margin-bottom: 16px;
`;

const Action = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

NewQuestioning.propTypes = {
    show: PropTypes.func,
    createQuestioning: PropTypes.func,
    saveFullQuestioning: PropTypes.func,
    getQuestioningFull: PropTypes.func,
    location: PropTypes.object,
    changeInitialValues: PropTypes.func,
    values: PropTypes.object.isRequired,
    getQuestioningList: PropTypes.func,
    touched: PropTypes.object,
    setFormValues: PropTypes.func.isRequired,
};

export default NewQuestioning;
