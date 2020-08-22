import React, { PureComponent } from "react";
import styled from "styled-components";
import { Radio } from "components/Radio";
import { fontStyles } from "styledMixins/mixins";
import { Button } from "components/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveDispanserAnswers } from "actions/widgets";

@connect((state) => ({
    data: state.widgets.dispanserWidget,
}))
class DispanserQuestions extends PureComponent {
    state = {
        answers: [],
        currentAnswerIndex: 1,
        disclaimer: true,
    };

    options = [
        {
            value: "yes",
            label: "Да",
        },
        {
            value: "no",
            label: "Нет",
        },
    ];

    addCurrentAnswerIndex = () => {
        const { currentAnswerIndex } = this.state;

        this.setState({
            currentAnswerIndex: currentAnswerIndex + 1,
        });
    };

    subtractCurrentAnswerIndex = () => {
        const { currentAnswerIndex } = this.state;

        this.setState({
            currentAnswerIndex: currentAnswerIndex - 1,
        });
    };

    changeAnswer = (value, id) => {
        const { answers } = this.state;
        const answersArr = [...answers];
        const answerEl = answersArr.find((el) => el.questionId === id);

        if (answerEl) {
            answerEl.option = value === "yes";
        } else {
            answersArr.push({
                questionId: id,
                option: value === "yes",
            });
        }

        this.setState({ answers: answersArr });
    };

    sendAnswers = () => {
        const { dispatch } = this.props;
        const { answers } = this.state;

        dispatch(saveDispanserAnswers(answers));
    };

    render() {
        const { questions, questionaryMessage } = this.props.data.state;
        const { answers, currentAnswerIndex, disclaimer } = this.state;
        const currentAnswer = answers.find(
            (el) => el.questionId === questions[currentAnswerIndex - 1].id,
        );

        return (
            <Wrapper>
                {disclaimer ? (
                    <DisclaimerText>
                        <p>{questionaryMessage}</p>
                        <p>{`Пожалуйста, заполните анкету, распечатайте и возьмите ее на прием к врачу.`}</p>
                        <Action>
                            <Button
                                label={"Заполнить анкету"}
                                onClick={() =>
                                    this.setState({ disclaimer: false })
                                }
                            />
                        </Action>
                    </DisclaimerText>
                ) : (
                    <>
                        <DispanserDisclaimer>
                            Перед получением перечня диспансерных услуг в
                            соответствии с возрастом и полом необходимо ответить
                            на несколько вопросов:
                        </DispanserDisclaimer>
                        <List>
                            <Item>
                                <Heading>
                                    {currentAnswerIndex}.{" "}
                                    {questions[currentAnswerIndex - 1].text}
                                </Heading>
                                <Answer>
                                    <Radio
                                        elements={this.options}
                                        value={
                                            currentAnswer
                                                ? currentAnswer.option
                                                    ? "yes"
                                                    : "no"
                                                : ""
                                        }
                                        name={`q${
                                            questions[currentAnswerIndex - 1].id
                                        }`}
                                        onChange={(value) =>
                                            this.changeAnswer(
                                                value,
                                                questions[
                                                    currentAnswerIndex - 1
                                                ].id,
                                            )
                                        }
                                    />
                                </Answer>
                            </Item>
                            {/* {questions.map((item, i) => {
                        const currentAnswer = answers.find(
                            (el) => el.questionId === item.id,
                        );

                        return (
                            <Item key={item.id}>
                                <Heading>
                                    {i + 1}. {item.text}
                                </Heading>
                                <Answer>
                                    <Radio
                                        elements={this.options}
                                        value={
                                            currentAnswer
                                                ? currentAnswer.option
                                                    ? "yes"
                                                    : "no"
                                                : ""
                                        }
                                        name={`q${item.id}`}
                                        onChange={(value) =>
                                            this.changeAnswer(value, item.id)
                                        }
                                    />
                                </Answer>
                            </Item>
                        );
                    })} */}
                        </List>
                        <Action>
                            {currentAnswerIndex > 1 ? (
                                <Button
                                    label={"Назад"}
                                    onClick={() =>
                                        this.subtractCurrentAnswerIndex()
                                    }
                                />
                            ) : null}
                            {currentAnswerIndex < questions.length ? (
                                <Button
                                    label={"Далее"}
                                    onClick={() => this.addCurrentAnswerIndex()}
                                />
                            ) : null}
                            {currentAnswerIndex === questions.length ? (
                                <Button
                                    disabled={
                                        questions.length !== answers.length
                                    }
                                    label={"Отправить"}
                                    onClick={() => this.sendAnswers()}
                                />
                            ) : null}
                        </Action>
                    </>
                )}
            </Wrapper>
        );
    }
}

DispanserQuestions.propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
};

const Wrapper = styled.div``;

const DispanserDisclaimer = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
`;

const List = styled.div``;

const Item = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};

    &:last-child {
        border: none;
    }
`;

const Heading = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;
`;

const Answer = styled.div``;

const Action = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const DisclaimerText = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.small,
        })};
`;

export default DispanserQuestions;
