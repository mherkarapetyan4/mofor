import React, { PureComponent } from "react";
import Row from "containers/Row";
import Column from "containers/Column";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import WidgetBlock from "components/WidgetBlock";
import styled from "styled-components";
import PropTypes from "prop-types";
import ChartLegend from "./ChartLegend";

import {
    BarChart,
    Bar,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
} from "recharts";
import { QUESTIONING_CHART_COLORS } from "config/consts";
import NoData from "components/NoData";
import { fontStyles } from "styledMixins/mixins";

class QuestionAnswers extends PureComponent {
    static propTypes = {
        question: PropTypes.object,
        answers: PropTypes.array,
        checkedCount: PropTypes.number,
    };

    static defaultProps = {
        question: {},
    };

    state = {
        type: "histogram",
        barChartData: [],
        pieChartData: [],
        totalAnswers: 0,
    };
    componentDidMount() {
        const { answers } = this.props;
        const barChartData = [];
        const pieChartData = [];
        const totalAnswers = answers.reduce(
            (sum, current) => sum + current.checkedCount,
            0,
        );

        this.setState({
            totalAnswers: totalAnswers,
        });
        const percentOfTotal = (value) => {
            return value > 0 ? ((value * 100) / totalAnswers).toFixed(1) : 0;
        };

        answers.map((item, ix) => {
            barChartData.push({
                dataKey: item.answer.id,
                [item.answer.id]: percentOfTotal(item.checkedCount),
                value: item.answer.text,
                percentOfTotal: Number(percentOfTotal(item.checkedCount)),
            });
            pieChartData.push({
                name: item.answer.text,
                value: Number(percentOfTotal(item.checkedCount)),
                fill: QUESTIONING_CHART_COLORS[ix],
            });
        });
        this.setState({ barChartData, pieChartData });
    }
    chartTypes = [
        {
            value: "histogram",
            label: "Гистограмма",
        },
        {
            value: "pie",
            label: "Круговая",
        },
    ];

    render() {
        const { question } = this.props;
        const { barChartData, pieChartData, totalAnswers, type } = this.state;

        const content = (
            <Question>
                <QuestionChartType>
                    <InlineFormFieldSelect
                        onChange={(item) => this.chartType(item)}
                        options={this.chartTypes}
                        value={this.state.type}
                    />
                </QuestionChartType>
                <QuestionChart>
                    {type === "histogram" && (
                        <BarChart width={500} height={300} data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis type="number" domain={[0, 100]} />
                            <Tooltip labelFormatter={() => {}} />
                            <Legend content={<ChartLegend type={type} />} />
                            {barChartData.map(
                                ({ dataKey, value, percentOfTotal }, ix) => {
                                    return (
                                        <Bar
                                            key={dataKey}
                                            dataKey={dataKey}
                                            name={value}
                                            fill={QUESTIONING_CHART_COLORS[ix]}
                                            percentOfTotal={percentOfTotal}
                                        />
                                    );
                                },
                            )}
                        </BarChart>
                    )}
                    {type === "pie" && (
                        <PieChart width={730} height={450}>
                            <Tooltip />
                            <Legend content={<ChartLegend type={type} />} />
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="30%"
                                cy="50%"
                                outerRadius={120}
                            />
                        </PieChart>
                    )}
                </QuestionChart>
            </Question>
        );
        return (
            <WidgetBlock title={question.text}>
                <Row>
                    <Column fraction={6} paddings={0}>
                        {totalAnswers > 0 ? (
                            content
                        ) : (
                            <NoData
                                title={"Пока нет ответов"}
                                message={"На данный вопрос"}
                            />
                        )}
                    </Column>
                </Row>
            </WidgetBlock>
        );
    }

    chartType = (item) => {
        this.setState({
            type: item,
        });
    };
}

const QuestionChartType = styled.div``;

const Question = styled.div`
    width: 100%;
`;

const QuestionChart = styled.div`
    margin-top: 10px;
    margin-bottom: 30px;
    ${(props) => fontStyles(props)};
`;

export default QuestionAnswers;
