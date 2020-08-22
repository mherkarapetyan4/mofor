import React, { PureComponent } from "react";
import StarBar from "components/StarBar";
import PropTypes from "prop-types";
import { FieldArray } from "formik";

class RatingQuestion extends PureComponent {
    answers = [
        { text: "1", position: 1 },
        { text: "2", position: 2 },
        { text: "3", position: 3 },
        { text: "4", position: 4 },
        { text: "5", position: 5 },
        { text: "6", position: 6 },
        { text: "7", position: 7 },
        { text: "8", position: 8 },
        { text: "9", position: 9 },
        { text: "10", position: 10 },
    ];

    componentDidMount() {
        const { questionIndex: qIx, setFieldValue } = this.props;
        setFieldValue(`questions.${qIx}.answers`, this.answers);
    }
    render() {
        const { questionIndex: qIx } = this.props;
        return (
            <FieldArray name={`questions.${qIx}.question.answers`}>
                {() => {
                    return <StarBar />;
                }}
            </FieldArray>
        );
    }
}

RatingQuestion.propTypes = {
    questionIndex: PropTypes.number,
    setFieldValue: PropTypes.func.isRequired,
};

export default RatingQuestion;
