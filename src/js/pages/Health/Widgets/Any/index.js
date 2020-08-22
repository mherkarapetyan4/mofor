import React, { PureComponent } from "react";
import styled from "styled-components";
import LineChart from "components/LineChart";
import FormField from "components/FormField";
import { Button } from "components/Button";
import EditIcon from "icons/EditIcon";
import TableIcon from "icons/TableIcon";
import ChartIcon from "icons/ChartIcon";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { getHealthData, saveTargetHealthData } from "actions/health";
import get from "lodash/get";

@connect((state, ownProps) => {
    return {
        target: state.health.target,
        data: state.health[ownProps.type],
    };
})
class HealthWidget extends PureComponent {
    state = {
        notEditInput: true,
        currentValue: null,
        targetValues: {},
    };
    static propTypes = {
        type: PropTypes.string.isRequired,
        target: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
    };
    componentDidMount() {
        const { dispatch, type, target } = this.props;
        dispatch(getHealthData(type));
        if (isEmpty(target)) return false;
        this.setState({
            targetValues: target.find((item) => item.type === type),
        });
    }
    onClickEdit() {
        this.setState({
            notEditInput: false,
        });
    }
    onBlurEdit(value) {
        if (!value) {
            return false;
        }
        const { dispatch, type } = this.props;
        const { currentValue, targetValues } = this.state;
        this.setState({
            notEditInput: true,
        });
        if (type === "PRESSURE") {
            const valData = currentValue.split("/");
            targetValues.systolic = get(valData, 0, 0);
            targetValues.diastolic = get(valData, 1, 0);
        } else {
            targetValues.value = currentValue;
        }
        dispatch(saveTargetHealthData(targetValues));
    }
    onChange(value) {
        const { notEditInput } = this.state;
        if (notEditInput) {
            return false;
        }
        const { type } = this.props;

        if (type === "PRESSURE") {
            if (value.indexOf("/") < 0) {
                value += "/";
            }
            const valData = value.split("/");

            if (
                isNaN(+valData[0]) ||
                valData[0] < 0 ||
                isNaN(+valData[1]) ||
                valData[1] < 0
            ) {
                return false;
            }
            value = valData.join("/");
        } else if (isNaN(+value) || value < 0) {
            return false;
        }

        this.setState({
            currentValue: value,
        });
    }

    render() {
        const { type, data } = this.props;
        const { notEditInput, currentValue, targetValues } = this.state;

        let inputValue = get(targetValues, "value", 0);
        if (type === "PRESSURE" && get(targetValues, "systolic")) {
            inputValue = `${get(targetValues, "systolic", 0)}/ ${get(
                targetValues,
                "diastolic",
                0,
            ) || ""}`;
        }

        return (
            <WidgetWrapper>
                <LineChart
                    data={get(data, "content", []).map((item) => ({
                        name: item.date,
                        value: item.value,
                    }))}
                />
                <Controls>
                    <TargetValue>
                        <FormField
                            required={true}
                            key={type}
                            type={type === "PRESSURE" ? "" : "number"}
                            onChange={(val) => {
                                this.onChange(val);
                            }}
                            onBlur={(val) => {
                                this.onBlurEdit(val);
                            }}
                            label={"Целевое значение:"}
                            value={
                                currentValue === null
                                    ? inputValue || ""
                                    : currentValue
                            }
                            disabled={notEditInput}
                        />

                        <EditTarget
                            onClick={() => {
                                this.onClickEdit();
                            }}
                        >
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

export default HealthWidget;
