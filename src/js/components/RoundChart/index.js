import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import ChartBorder from "components/RoundChart/ChartBorder";
import { fontStyles } from "styledMixins/mixins";
import renderMark from "utils/renderMark";
import renderColor from "utils/renderColor";

@withTheme
class RoundChart extends PureComponent {
    render() {
        const { number, theme, title, id } = this.props;

        return (
            <ChartWrapper>
                <NumberWrapper>
                    <NumberBackground>
                        <ChartNumber number={number}>{number}</ChartNumber>
                    </NumberBackground>
                    <ChartMark>{title ? title : renderMark(number)}</ChartMark>
                </NumberWrapper>
                <ChartVisual>
                    <Border>
                        <ChartBorder />
                    </Border>
                    <CircleWrapper>
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <linearGradient
                                id={`linear-gradient-${id}`}
                                gradientTransform="rotate(-30)"
                                gradientUnits="userSpaceOnUse"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={this.renderSVGGradient(
                                        "start",
                                        number,
                                        theme,
                                    )}
                                />
                                <stop
                                    offset="100%"
                                    stopColor={this.renderSVGGradient(
                                        "finish",
                                        number,
                                        theme,
                                    )}
                                />
                            </linearGradient>
                            <circle
                                cx="50"
                                cy="50"
                                r="25"
                                fill="none"
                                strokeDasharray="157"
                                strokeDashoffset={this.renderOffset()}
                                stroke={`url(#linear-gradient-${id})`}
                                strokeWidth="40"
                            />
                        </svg>
                    </CircleWrapper>
                </ChartVisual>
            </ChartWrapper>
        );
    }

    renderOffset = () => {
        const { number } = this.props;
        return 157 - number * 31.4;
    };

    renderSVGGradient(direction, number, theme) {
        if (direction === "start") {
            switch (number) {
                case 0:
                    return theme.colors.text.colorBlack;
                case 1:
                    return theme.colors.grades.separate.levelOne.start;
                case 2:
                    return theme.colors.grades.separate.levelTwo.start;
                case 3:
                    return theme.colors.grades.separate.levelThree.start;
                case 4:
                    return theme.colors.grades.separate.levelFour.start;
                case 5:
                    return theme.colors.grades.separate.levelFive.start;
                default:
                    return theme.colors.text.colorBlack;
            }
        }

        switch (number) {
            case 0:
                return theme.colors.text.colorBlack;
            case 1:
                return theme.colors.grades.separate.levelOne.finish;
            case 2:
                return theme.colors.grades.separate.levelTwo.finish;
            case 3:
                return theme.colors.grades.separate.levelThree.finish;
            case 4:
                return theme.colors.grades.separate.levelFour.finish;
            case 5:
                return theme.colors.grades.separate.levelFive.finish;
            default:
                return theme.colors.text.colorBlack;
        }
    }
}

const Border = styled.div`
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
`;

const ChartWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const ChartNumber = styled.div`
    ${(props) => fontStyles(props, { font: "bold", size: "48px" })};
    user-select: none;
    color: ${(props) => renderColor(props, props.number)};
    line-height: 0.9;
`;

const ChartVisual = styled.div`
    width: 100px;
    height: 100px;
`;

const ChartMark = styled.div`
    user-select: none;
    ${(props) => fontStyles(props, { font: "bold", color: "#383838" })};
    flex: 1 0 auto;
`;

const NumberWrapper = styled.div`
    position: absolute;
    display: flex;
    left: 62px;
    top: -5px;
    z-index: 2;
`;

const NumberBackground = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
`;

const CircleWrapper = styled.div`
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    transform: scaleX(-1) rotate(-90deg);
`;

RoundChart.propTypes = {
    number: PropTypes.number.isRequired,
    theme: PropTypes.object,
    title: PropTypes.string,
    id: PropTypes.any.isRequired,
};

RoundChart.defaultProps = {
    number: 0,
};

export default RoundChart;
