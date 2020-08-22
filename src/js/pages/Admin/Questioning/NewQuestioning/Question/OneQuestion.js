import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import YesNoQuestion from "pages/Admin/Questioning/NewQuestioning/YesNoQuestion";
import OneOfQuestion from "pages/Admin/Questioning/NewQuestioning/OneOfQuestion";
import SomeOfQuestion from "pages/Admin/Questioning/NewQuestioning/SomeOfQuestion";
import RatingQuestion from "pages/Admin/Questioning/NewQuestioning/RatingQuestion";

class OneQuestion extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        touched: PropTypes.bool.isRequired,
        questionIndex: PropTypes.number.isRequired,
        clearQuestionLink: PropTypes.func.isRequired,
        setFieldValue: PropTypes.func.isRequired,
    };

    render() {
        const {
            type,
            data,
            touched,
            questionIndex,
            clearQuestionLink,
            setFieldValue,
        } = this.props;
        return (
            <>
                {type === "YESNO" && (
                    <YesNoQuestion
                        questionIndex={questionIndex}
                        setFieldValue={setFieldValue}
                    />
                )}
                {type === "SINGLE" && (
                    <OneOfQuestion
                        questionIndex={questionIndex}
                        answers={data.answers}
                        setFieldValue={setFieldValue}
                        touched={touched}
                        clearQuestionLink={clearQuestionLink}
                    />
                )}
                {type === "MULTIPLE" && (
                    <SomeOfQuestion
                        questionIndex={questionIndex}
                        answers={data.answers}
                        setFieldValue={setFieldValue}
                        touched={touched}
                        clearQuestionLink={clearQuestionLink}
                    />
                )}
                {/*{type === "COMMENT" && (*/}
                {/*    <CommentsQuestion*/}
                {/*        questionIndex={questionIndex}*/}
                {/*        form={form}*/}
                {/*    />*/}
                {/*)}*/}
                {type === "RATING" && (
                    <RatingQuestion
                        questionIndex={questionIndex}
                        setFieldValue={setFieldValue}
                    />
                )}
            </>
        );
    }
}

export default OneQuestion;
