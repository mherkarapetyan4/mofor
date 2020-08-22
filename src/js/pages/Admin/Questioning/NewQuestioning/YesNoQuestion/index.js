import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FieldArray } from "formik";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class YesNoQuestion extends PureComponent {
    answers = [
        { text: "Да", position: 1 },
        { text: "Нет", position: 2 },
    ];

    componentDidMount() {
        const { questionIndex: qIx, setFieldValue } = this.props;
        setFieldValue(`questions.${qIx}.answers`, this.answers);
    }

    render() {
        const { questionIndex: qIx } = this.props;
        return (
            <Wrapper>
                <FieldArray name={`questions.${qIx}.question.answers`}>
                    {() => {
                        return (
                            <Content>
                                {this.answers.map((answerItem, ix) => (
                                    <Item key={ix}>
                                        <RadioWrapper>
                                            <Radio />
                                        </RadioWrapper>
                                        <InputWrapper>
                                            {answerItem.text}
                                        </InputWrapper>
                                    </Item>
                                ))}
                            </Content>
                        );
                    }}
                </FieldArray>
            </Wrapper>
        );
    }
}

YesNoQuestion.propTypes = {
    questionIndex: PropTypes.number.isRequired,
    setFieldValue: PropTypes.object.isRequired,
};

const Item = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const RadioWrapper = styled.div`
    margin-right: 16px;
    flex: 0 0 auto;
`;

const InputWrapper = styled.div`
    margin-right: 16px;
    flex: 1 1 auto;
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
        })};
`;
const Radio = styled.div`
    flex: 0 0 auto;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    background-color: ${(props) => props.theme.colors.background.white};
    position: relative;
    cursor: pointer;
`;
const Content = styled.div``;
export default YesNoQuestion;
