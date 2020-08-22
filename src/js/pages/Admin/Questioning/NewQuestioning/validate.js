import set from "lodash/set";

export const validate = (values) => {
    const errors = {};
    const { questions } = values;
    const requiredErrMsg = (fieldName) =>
        `Поле ${fieldName} обязательно для заполнения`;
    const maxErrMsg = (fieldName) =>
        `Длина поля ${fieldName} не может быть больше 256`;
    questions.map((questionItem, qIx) => {
        if (!questionItem.question.text) {
            set(
                errors,
                `questions.${qIx}.question.text`,
                requiredErrMsg("вопрос"),
            );
        }

        if (
            questionItem.question.text &&
            questionItem.question.text.length > 256
        ) {
            set(errors, `questions.${qIx}.question.text`, maxErrMsg("вопрос"));
        }

        const {
            answers,
            question: {
                additionalData: { answerType },
            },
        } = questionItem;

        if (!answerType) {
            set(
                errors,
                `questions.${qIx}.question.additionalData.answerType`,
                requiredErrMsg("тип ответа"),
            );
        }
        if (
            (answerType === "SINGLE" || answerType === "MULTIPLE") &&
            answers.length <= 1
        ) {
            set(
                errors,
                `questions.${qIx}.question.additionalData.answerType`,
                "Необходимо заполнить не менее 2 ответов",
            );
        } else {
            answers.map((answerItem, aIx) => {
                if (
                    ["COMMENT", "SINGLE", "MULTIPLE"].includes(answerType) &&
                    !answerItem.text &&
                    answerItem.text !== 0
                ) {
                    set(
                        errors,
                        `questions.${qIx}.answers.${aIx}.text`,
                        requiredErrMsg("ответ"),
                    );
                }
                if (
                    ["COMMENT", "SINGLE", "MULTIPLE"].includes(answerType) &&
                    answerItem.text &&
                    answerItem.text !== 0 &&
                    answerItem.text.length > 256
                ) {
                    set(
                        errors,
                        `questions.${qIx}.answers.${aIx}.text`,
                        maxErrMsg("ответ"),
                    );
                }
            });
        }
    });

    return errors;
};
