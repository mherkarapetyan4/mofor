import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class DispanserWardResults extends PureComponent {
    render() {
        const { item } = this.props;

        return (
            <Wrapper>
                <ResultsWrapper>
                    <Heading>Результаты прохождения диспансеризации:</Heading>
                    <ResultsText>{get(item.result, "text", "")}</ResultsText>
                </ResultsWrapper>
                <IllnessesWrapper>
                    <Heading>Выявленные заболевания:</Heading>
                    <IllnessesList>
                        <Heading>Основной диагноз: </Heading>
                        <ListItem>
                            {get(item.result, "mainDiagnosis.title", "")} (
                            {get(item.result, "mainDiagnosis.code", "")})
                        </ListItem>
                    </IllnessesList>
                </IllnessesWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 0 16px;
`;

const ResultsWrapper = styled.div`
    margin-bottom: 10px;
`;

const Heading = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

const IllnessesWrapper = styled.div`
    margin-bottom: 10px;
`;

const IllnessesList = styled.div``;

const ResultsText = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const ListItem = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;

    :last-child {
        margin-bottom: 0;
    }
`;

DispanserWardResults.propTypes = {
    item: PropTypes.object,
};

export default DispanserWardResults;
