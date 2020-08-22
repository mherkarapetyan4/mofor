import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LineChart from "components/LineChart";
import NoData from "components/NoData";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { HEALTH_TYPES } from "config/consts";
import { getHealthData } from "actions/health";

@connect(({ health }) => ({ health }), { getHealthData })
class ChartWidget extends PureComponent {
    componentDidMount() {
        const { type, health, getHealthData } = this.props;
        if (!health[type.toUpperCase()]) getHealthData(type.toUpperCase());
    }

    render() {
        const { type, health } = this.props;

        const healthData = health[type.toUpperCase()];

        return (
            <WidgetWrapper>
                {healthData && healthData.content.length > 0 ? (
                    this.renderChart(type)
                ) : (
                    <NoData title={"Нет данных"} message={"Нет данных"} />
                )}
            </WidgetWrapper>
        );
    }

    renderCustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div>
                    <div>Дата: {label}</div>
                    {payload.map((item) => {
                        if (item.dataKey === "systolic") {
                            return (
                                <div key={`item-${item.dataKey}`}>
                                    Систолическое давление: {item.value}
                                </div>
                            );
                        } else if (item.dataKey === "diastolic") {
                            return (
                                <div key={`item-${item.dataKey}`}>
                                    Диастолическое давление: {item.value}
                                </div>
                            );
                        } else if (item.dataKey === "glucose") {
                            return (
                                <div key={`item-${item.dataKey}`}>
                                    Глюкоза: {item.value}
                                </div>
                            );
                        } else if (item.dataKey === "weight") {
                            return (
                                <div key={`item-${item.dataKey}`}>
                                    Вес: {item.value}
                                </div>
                            );
                        } else {
                            const element = HEALTH_TYPES.find(
                                (e) => e.type === item.dataKey,
                            );
                            if (element) {
                                return (
                                    <div key={`item-${item.dataKey}`}>
                                        {element.label}: {item.value}
                                    </div>
                                );
                            }
                            return null;
                        }
                    })}
                </div>
            );
        }

        return null;
    };

    renderChart = (type) => {
        const { health, height } = this.props;
        return (
            <LineChart
                data={this.generateChartData(health[type.toUpperCase()], type)}
                lineOptions={this.generateChartColors(type)}
                height={height}
                customTooltip={this.renderCustomTooltip}
            />
        );
    };

    generateChartData = (data, type) => {
        let chartData = [];

        if (type.toUpperCase() === "PRESSURE") {
            data.content.map((item) =>
                chartData.push({
                    systolic: item.systolic,
                    diastolic: item.diastolic,
                    name: dayjs(item.date).format("DD.MM.YYYY"),
                }),
            );
        } else {
            data.content.map((item) =>
                chartData.push({
                    [type]: item.value,
                    name: dayjs(item.date).format("DD.MM.YYYY"),
                }),
            );
        }
        return chartData;
    };

    generateChartColors = (type) => {
        let chartColors;

        if (type.toUpperCase() === "PRESSURE") {
            chartColors = {
                systolic: {
                    color: this.generateColor(),
                },
                diastolic: {
                    color: this.generateColor(),
                },
            };
        } else {
            chartColors = {
                [type]: {
                    color: this.generateColor(),
                },
            };
        }

        return chartColors;
    };

    generateColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
}

const WidgetWrapper = styled.div``;

ChartWidget.propTypes = {
    type: PropTypes.string.isRequired,
    health: PropTypes.object,
    height: PropTypes.number,
    getHealthData: PropTypes.func,
};

export default ChartWidget;
