import React, { PureComponent } from "react";
import styled from "styled-components";
import LineChart from "components/LineChart";
import FormField from "components/FormField";
import { Button } from "components/Button";
import EditIcon from "icons/EditIcon";
import TableIcon from "icons/TableIcon";
import ChartIcon from "icons/ChartIcon";

const data = [
    {
        name: "Page A",
        uv: 4000,
    },
    {
        name: "Page B",
        uv: 3000,
    },
    {
        name: "Page C",
        uv: 2000,
    },
    {
        name: "Page D",
        uv: 2780,
    },
    {
        name: "Page E",
        uv: 1890,
    },
    {
        name: "Page F",
        uv: 2390,
    },
    {
        name: "Page G",
        uv: 3490,
    },
];

class PressureWidget extends PureComponent {
    render() {
        return (
            <WidgetWrapper>
                <LineChart data={data} />
                <Controls>
                    <TargetValue>
                        <FormField
                            label={"Целевое значение:"}
                            value={"120/80"}
                            disabled
                        />
                        <EditTarget>
                            <EditIcon opacity={0.5} />
                        </EditTarget>
                    </TargetValue>
                    <ViewControls>
                        <TableView>
                            <TableIcon opacity={0.5} />
                        </TableView>
                        <ChartView>
                            <ChartIcon opacity={0.5} />
                        </ChartView>
                        <Button
                            label={"Добавить показание"}
                            onClick={() => {}}
                        />
                    </ViewControls>
                </Controls>
            </WidgetWrapper>
        );
    }
}

const WidgetWrapper = styled.div``;

const Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TargetValue = styled.div`
    display: flex;
    align-items: center;
`;

const EditTarget = styled.div`
    cursor: pointer;
`;

const ViewControls = styled.div`
    display: flex;
    align-items: center;
`;

const TableView = styled.div`
    margin-right: 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
    }
`;

const ChartView = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;

export default PressureWidget;
