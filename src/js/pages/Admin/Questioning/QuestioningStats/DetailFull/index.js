import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ListData from "components/List/ListData";
import { fontStyles } from "styledMixins/mixins";
import { get, isEmpty } from "lodash";
import styled from "styled-components";
import { Radio } from "components/Radio";
import { Checkbox } from "components/Checkbox";
import StarBar from "components/StarBar";

class DetailFull extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
    };
    questionLabels = {
        YESNO: "Да/Нет",
        SINGLE: "Один из списка",
        MULTIPLE: "Несколько из списка",
        COMMENT: "Комментарии",
        RATING: "Рейтинг",
    };
    renderQuestion = (type) => {
        const { answers } = this.props.item;
        switch (type) {
            case "YESNO": {
                let value = "";
                const elements = answers.map((item) => {
                    const { id, text } = item.answer;
                    if (item.checked) {
                        value = id;
                    }
                    return { value: id, label: text };
                });
                return (
                    <Radio value={value} elements={elements} name={"YESNO"} />
                );
            }
            case "SINGLE": {
                let value = "";
                const elements = answers.map((item) => {
                    const { id, text } = item.answer;
                    if (item.checked) {
                        value = id;
                    }
                    return { value: id, label: text };
                });
                return (
                    <Radio value={value} elements={elements} name={"SINGLE"} />
                );
            }
            case "MULTIPLE":
                return answers.map((item) => {
                    const { id, text } = item.answer;

                    return (
                        <CheckboxWrapper key={`MULTIPLE_${id}`}>
                            <Checkbox
                                name={`MULTIPLE_${id}`}
                                value={item.checked}
                                label={text}
                                disabled={true}
                            />
                        </CheckboxWrapper>
                    );
                });
            case "RATING": {
                const currentData = answers.find(({ checked }) => checked);
                let value = 0;
                if (currentData) {
                    value = currentData.answer.position;
                }
                return (
                    <StarBar
                        editable={false}
                        value={value}
                        max={answers.length}
                    />
                );
            }
            default:
                return "";
        }
    };
    render() {
        const { question, comment, answers } = this.props.item;
        const type = get(question, "additionalData.answerType");

        return (
            <Wrapper>
                <ContentWrapper>
                    <Name>{question.text}</Name>
                    <InfoWrapper>
                        {!isEmpty(answers) && type && (
                            <Item>{this.renderQuestion(type)}</Item>
                        )}
                        {question.commentEnabled && (
                            <Item>
                                <ListData
                                    label={"Комментарий:"}
                                    data={comment}
                                />
                            </Item>
                        )}
                    </InfoWrapper>
                </ContentWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-bottom: 10px;
`;

const InfoWrapper = styled.div`
    margin-bottom: 16px;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const CheckboxWrapper = styled.div`
    margin-bottom: 16px;
`;

export default DetailFull;
