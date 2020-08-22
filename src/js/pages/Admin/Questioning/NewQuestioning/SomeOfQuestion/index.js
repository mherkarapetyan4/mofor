import React, { PureComponent } from "react";
import styled from "styled-components";
import { Button } from "components/Button";
import InlineFormField from "components/InlineFormField";
import PropTypes from "prop-types";
import { FieldArray } from "formik";
import { FormikFormField } from "wrappers/Formik/FormField";

class SomeOfQuestion extends PureComponent {
    /*    componentWillUnmount() {
        const { questionIndex: qIx } = this.props;
        this.props.form.setFieldValue(`questions.${qIx}.answers`, []);
    }*/

    render() {
        const {
            answers,
            questionIndex: qIx,
            touched,
            clearQuestionLink,
            setFieldValue,
        } = this.props;
        return (
            <Wrapper>
                <FieldArray name={`questions.${qIx}.question.answers`}>
                    {() => {
                        return (
                            <>
                                <Content>
                                    {answers.map((aItem, aIx) => {
                                        return (
                                            <Item key={aIx}>
                                                <RadioWrapper>
                                                    <Checkbox />
                                                </RadioWrapper>
                                                <InputWrapper>
                                                    <FormikFormField
                                                        name={`questions.${qIx}.answers.${aIx}.text`}
                                                        component={(props) => (
                                                            <InlineFormField
                                                                {...props}
                                                                meta={{
                                                                    ...props.meta,
                                                                    touched,
                                                                }}
                                                                label={"Ответ:"}
                                                                placeholder={
                                                                    "Введите ответ"
                                                                }
                                                                required
                                                                focusOnLoad={
                                                                    true
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </InputWrapper>
                                                <Action>
                                                    <Button
                                                        label={"Удалить"}
                                                        onClick={() => {
                                                            setFieldValue(
                                                                `questions.${qIx}.answers`,
                                                                answers.filter(
                                                                    (
                                                                        answer,
                                                                        index,
                                                                    ) =>
                                                                        index !==
                                                                        aIx,
                                                                ),
                                                            );
                                                            clearQuestionLink(
                                                                qIx,
                                                            );
                                                        }}
                                                    />
                                                </Action>
                                            </Item>
                                        );
                                    })}
                                </Content>
                                <ActionsWrapper>
                                    <Button
                                        onClick={() => {
                                            setFieldValue(
                                                `questions.${qIx}.answers`,
                                                [
                                                    ...answers,
                                                    {
                                                        text: "",
                                                        position:
                                                            answers.length + 1,
                                                    },
                                                ],
                                            );
                                            clearQuestionLink(qIx);
                                        }}
                                        label={"Добавить ответ"}
                                    />
                                </ActionsWrapper>
                            </>
                        );
                    }}
                </FieldArray>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

const Content = styled.div``;

const Item = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
`;

const RadioWrapper = styled.div`
    margin-right: 16px;
    flex: 0 0 auto;
`;

const InputWrapper = styled.div`
    margin-right: 16px;
    flex: 1 1 auto;
`;

const Action = styled.div`
    flex: 0 0 auto;
`;

const Checkbox = styled.div`
    flex: 0 0 auto;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    line-height: 0;
    width: 19px;
    height: 19px;
`;

SomeOfQuestion.propTypes = {
    answers: PropTypes.array,
    questionIndex: PropTypes.number,
    setFieldValue: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired,
    clearQuestionLink: PropTypes.func.isRequired,
};
export default SomeOfQuestion;
