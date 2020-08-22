import set from "lodash/set";
import get from "lodash/get";

const requiredErrMsg = (fieldName) =>
    `Поле ${fieldName} обязательно для заполнения`;

export const validate = (values) => {
    let errors = {};
    values.questions.map((item, qIx) => {
        const { conditionQuestionPosition, conditionAnswerPosition } = item;
        let show = true;
        if (
            conditionQuestionPosition !== null &&
            conditionAnswerPosition !== null
        ) {
            show = get(
                values.questions[conditionQuestionPosition - 1],
                `answers[${conditionAnswerPosition - 1}].value`,
                false,
            );
        }
        if (show) {
            const answerType = item.additionalData.answerType;
            const required = item.additionalData.required;
            const answers = item.answers;
            if (answerType === "COMMENT" && required && !item.comment) {
                set(
                    errors,
                    `questions.${qIx}.comment`,
                    requiredErrMsg("комментарий"),
                );
            } else if (
                answerType !== "COMMENT" &&
                required &&
                !answers.some((e) => e.value)
            ) {
                set(
                    errors,
                    `questions.${qIx}.answers.0.value`,
                    "Необходим ответ на вопрос",
                );
            }
        }
    });
    return errors;
};
