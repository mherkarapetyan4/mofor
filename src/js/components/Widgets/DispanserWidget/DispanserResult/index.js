import React, { PureComponent } from "react";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { Link } from "react-router-dom";
import { LK_MENU_ELEMENTS } from "config/menu";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const indicatorCodes = {
    PRESSURE: {
        value: "Повышенное давление",
        prescription: "повышенным давлением",
    },
    PULSE: {
        value: "Пульс",
        prescription: "пульсом",
    },
    TEMPERATURE: {
        value: "Температура",
        prescription: "температурой",
    },
    WEIGHT: {
        value: "Избыточный вес",
        prescription: "избыточным весом",
    },
    GLUCOSE: {
        value: "Глюкоза",
        prescription: "глюкозой",
    },
    CHOLESTEROL: {
        value: "Холестерин",
        prescription: "холестерином",
    },
    CALORIES: {
        value: "Калории",
        prescription: "калориями",
    },
};

@connect((state) => ({
    data: state.widgets.dispanserWidget.state,
}))
class DispanserResult extends PureComponent {
    renderPrescriptions() {
        const { healthBookIndicators } = this.props.data;

        if (healthBookIndicators.length) {
            return (
                <Prescriptions>
                    Вам рекоммендуется вести{" "}
                    <Link to={LK_MENU_ELEMENTS.DIARY_PAGE.path}>
                        дневник здоровья
                    </Link>{" "}
                    в связи с
                    {healthBookIndicators.map((item, i) => {
                        return i === 0
                            ? ` ${indicatorCodes[item].prescription}`
                            : `, ${indicatorCodes[item].prescription}`;
                    })}
                    .
                </Prescriptions>
            );
        }

        return null;
    }

    render() {
        const { healthBookIndicators } = this.props.data;
        const { text, mainDiagnosis } = this.props.data.serviceResult;

        return (
            <Wrapper>
                <Results>
                    <Title>Вам присвоена группа здоровья:</Title>
                    <Content>{text}</Content>
                </Results>
                <Diseases>
                    <Title>Выявленные заболевания:</Title>
                    <List>
                        <Item>
                            — Основной диагноз: {mainDiagnosis.title} (
                            {mainDiagnosis.code})
                        </Item>
                        {healthBookIndicators.map((item, i) => {
                            return (
                                <Item key={i}>
                                    — {indicatorCodes[item].value}
                                </Item>
                            );
                        })}
                    </List>
                </Diseases>
                {this.renderPrescriptions()}
            </Wrapper>
        );
    }
}

DispanserResult.propTypes = {
    data: PropTypes.array,
};

const Wrapper = styled.div``;

const Results = styled.div`
    margin-bottom: 16px;
`;

const Diseases = styled.div`
    margin-bottom: 16px;
`;

const Prescriptions = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    padding: 5px 10px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.userTheme.color};
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

const Content = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const List = styled.div``;

const Item = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    padding: 0 5px;
`;

export default DispanserResult;
