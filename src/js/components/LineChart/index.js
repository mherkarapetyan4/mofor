import React, { PureComponent } from "react";
import {
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    Line,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import isEmpty from "lodash/isEmpty";
import keys from "lodash/keys";
import { getDefaultLineOptions } from "components/LineChart/getDefaultLineOptions";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

const ChartWrapper = styled.div`
    width: 100%;
    height: ${(props) => (props.height ? props.height + "px" : "200px")};
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};

    svg {
        text {
            tspan {
                fill: ${(props) => props.theme.textColor};
            }
        }
        line.recharts-cartesian-axis-line,
        line.recharts-cartesian-axis-tick-line {
            stroke: #d6d6d6;
        }
        path.recharts-line-curve {
            stroke-width: 2;
        }

        .recharts-cartesian-grid-vertical {
            line {
                &:last-child {
                    display: none;
                }
                &:nth-last-child(2) {
                    display: none;
                }
            }
        }
    }

    .recharts-tooltip-wrapper {
        background-color: #eeeeee;
        padding: 8px 15px;
        border-radius: 2px;
    }
`;

class Container extends PureComponent {
    render() {
        const {
            data,
            lineOptions,
            customTooltip,
            isWidget,
            height,
        } = this.props;
        if (isEmpty(data)) {
            return null;
        }
        let lineOpt = lineOptions;
        if (!lineOpt) {
            lineOpt = getDefaultLineOptions(data[0]);
        }
        const lines = keys(lineOpt);
        const tooltipOptions = {};
        if (customTooltip) {
            tooltipOptions.content = customTooltip;
        }
        return (
            <ChartWrapper isWidget={isWidget} height={height}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <XAxis
                            dataKey="name"
                            dx={-5}
                            padding={{ left: 30, right: 30 }}
                        />
                        <YAxis
                            domain={["auto", "auto"]}
                            padding={{ top: 20, bottom: 20 }}
                        />
                        <CartesianGrid
                            horizontal={false}
                            stroke={"#B3B3B3"}
                            strokeDasharray="5 5"
                        />
                        <Tooltip {...tooltipOptions} />
                        {lines.map((item) => {
                            const element = lineOpt[item];
                            const color = element.color || "#000";
                            const type = element.type || "monotone";
                            return (
                                <Line
                                    key={item}
                                    type={type}
                                    dataKey={item}
                                    stroke={color}
                                    activeDot={{
                                        stroke: color,
                                        fill: "#fff",
                                        strokeWidth: 2,
                                        r: 10,
                                    }}
                                />
                            );
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </ChartWrapper>
        );
    }
}

Container.propTypes = {
    data: PropTypes.array.isRequired,
    lineOptions: PropTypes.object,
    customTooltip: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    isWidget: PropTypes.bool,
    height: PropTypes.number,
};

export default Container;
