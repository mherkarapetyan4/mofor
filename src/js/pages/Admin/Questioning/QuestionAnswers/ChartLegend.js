import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

const ChartLegend = ({ payload, type }) => {
    return (
        <LegendWrap>
            {payload.map((entry) => {
                const { dataKey, value, color } = entry;
                const { percentOfTotal } = entry.payload;
                const pieValue = entry.payload.value;
                return (
                    <LegendItem key={dataKey || color + value}>
                        <ItemColor backgroundColor={color} />
                        <ItemValue>
                            {type === "histogram" &&
                                `${value} - ${percentOfTotal}%`}
                            {type === "pie" && `${value} - ${pieValue}%`}
                        </ItemValue>
                    </LegendItem>
                );
            })}
        </LegendWrap>
    );
};

ChartLegend.propTypes = {
    payload: PropTypes.array,
    type: PropTypes.string,
};

const LegendWrap = styled.div`
    margin-top: 20px;
`;

const LegendItem = styled.div`
    display: flex;
`;

const ItemColor = styled.div`
    width: 15px;
    height: 15px;
    background-color: ${({ backgroundColor }) => backgroundColor};
`;

const ItemValue = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "medium",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-left: 10px;
`;

export default ChartLegend;
