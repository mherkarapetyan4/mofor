import React, { PureComponent } from "react";
import styled from "styled-components";
import { Button } from "components/Button";
import TableIcon from "icons/TableIcon";
import ChartIcon from "icons/ChartIcon";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    deleteHealthData,
    getHealthData,
    saveHealthData,
} from "actions/health";
import ChartWidget from "components/Widgets/ChartWidget";
import Actions from "containers/Header/Actions";
import { List } from "components/List";
import HealthData from "pages/Health/HealthData";
import { Pagination } from "components/Pagination";
import ScrollBar from "components/ScrollBar";
import { generateEditComponent } from "pages/Health/Edit";
import { generateTargetComponent } from "pages/Health/Widgets/TargetValue";
import NoData from "components/NoData";
import isEmpty from "lodash/isEmpty";

@connect(
    (state) => {
        return {
            data: state.health,
            target: state.health.target,
        };
    },
    { getHealthData, saveHealthData, deleteHealthData },
)
class HealthWidget extends PureComponent {
    state = {
        view: "chart",
        edit: false,
        editTarget: false,
        currentItem: {},
        activeActionsItem: 0,
    };

    viewActions = [
        {
            icon: <ChartIcon opacity={0.5} />,
            tooltip: "Графический вид",
            action: () => this.setState({ view: "chart" }),
            defaultActive: true,
        },
        {
            icon: <TableIcon opacity={0.5} />,
            tooltip: "Табличный вид",
            action: () => this.setState({ view: "table" }),
        },
    ];

    static propTypes = {
        type: PropTypes.string.isRequired,
        target: PropTypes.array,
        data: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        getHealthData: PropTypes.func,
        saveHealthData: PropTypes.func,
        changeInitialValues: PropTypes.func.isRequired,
        setTouched: PropTypes.func.isRequired,
        deleteHealthData: PropTypes.func.isRequired,
    };

    static defaultProps = {
        changeInitialValues: () => {},
        setTouched: () => {},
        values: {},
    };

    componentDidMount() {
        const { type, getHealthData } = this.props;
        getHealthData(type.toUpperCase());
        this.setState({
            activeActionsItem: this.state.view === "table" ? 1 : 0,
        });
    }

    componentDidUpdate(prevState) {
        if (prevState.view !== this.state.view) {
            this.setState({
                activeActionsItem: this.state.view === "table" ? 1 : 0,
            });
        }
    }

    changeEditState = (value) => {
        this.setState({ edit: value });
    };

    changeEditAction = (value) => {
        this.setState({ editTarget: value });
    };

    onChangePageNumber = (pageNumber) => {
        const { data, getHealthData, type } = this.props;
        getHealthData(type, pageNumber, data.pageSize);
    };

    onChangePageSize = (pageSize) => {
        const { getHealthData, type } = this.props;
        getHealthData(type, 1, pageSize);
    };

    render() {
        const { type, data, target } = this.props;
        const { view, edit, currentItem, activeActionsItem } = this.state;

        const Edit = generateEditComponent(type);
        const TargetValue = generateTargetComponent(type);

        return (
            <WidgetWrapper>
                {data[type] && !isEmpty(data[type].content) ? (
                    <>
                        {view === "chart" && !edit && (
                            <ChartWrapper>
                                {type === "PRESSURE" ? (
                                    <ChartWidget height={250} type={type} />
                                ) : (
                                    <ChartWidget height={308} type={type} />
                                )}
                            </ChartWrapper>
                        )}
                        {view === "table" && !edit && (
                            <ListWrapper>
                                <ScrollBar>
                                    <List
                                        data={data[type.toUpperCase()].content}
                                        renderItem={(item, i) => (
                                            <HealthData
                                                key={i}
                                                data={item}
                                                type={type}
                                                onClick={() =>
                                                    this.setState({
                                                        currentItem: item,
                                                        edit: true,
                                                    })
                                                }
                                            />
                                        )}
                                    />
                                    <Pagination
                                        {...data[type.toUpperCase()]}
                                        onChangePageNumber={
                                            this.onChangePageNumber
                                        }
                                        onChangePageSize={this.onChangePageSize}
                                    />
                                </ScrollBar>
                            </ListWrapper>
                        )}
                    </>
                ) : (
                    <>
                        {!edit && (
                            <NoDataWrapper>
                                <NoData
                                    title={"Нет показаний"}
                                    message={"Добавьте новое показание"}
                                />
                            </NoDataWrapper>
                        )}
                    </>
                )}

                {edit && (
                    <EditWrapper>
                        <Edit
                            type={type}
                            renderFormLabel={this.renderFormLabel}
                            changeEditState={this.changeEditState}
                            data={currentItem}
                            renderTargetValue={
                                <TargetValue
                                    edit={this.state.editTarget}
                                    type={type}
                                    target={target}
                                    action={this.changeEditAction}
                                />
                            }
                        />
                    </EditWrapper>
                )}
                {!edit && (
                    <Controls>
                        <TargetValueWrapper>
                            <TargetValue
                                edit={this.state.editTarget}
                                type={type}
                                target={target}
                                action={this.changeEditAction}
                            />
                        </TargetValueWrapper>
                        <ViewControls>
                            <ActionsWrapper>
                                <Actions
                                    items={this.viewActions}
                                    activeActionsItem={activeActionsItem}
                                />
                            </ActionsWrapper>
                            <Button
                                label={"Добавить показание"}
                                onClick={() =>
                                    this.setState({
                                        currentItem: {},
                                        edit: true,
                                    })
                                }
                            />
                        </ViewControls>
                    </Controls>
                )}
            </WidgetWrapper>
        );
    }

    renderFormLabel = () => {
        const { type } = this.props;

        switch (type) {
            case "PRESSURE":
                return;
            case "GLUCOSE":
                return "Глюкоза:";
            case "WEIGHT":
                return "Вес:";
            case "PULSE":
                return "Пульс:";
            case "TEMPERATURE":
                return "Температура:";
            case "CHOLESTEROL":
                return "Холестерин:";
            case "CALORIES":
                return "Калории:";
            default:
                return "Непонятно";
        }
    };
}

const ChartWrapper = styled.div`
    margin-bottom: 16px;
`;

const ListWrapper = styled.div`
    margin-bottom: 16px;
    height: 250px;
`;

const EditWrapper = styled.div``;

const ActionsWrapper = styled.div`
    margin-right: 16px;
`;

const WidgetWrapper = styled.div``;

const Controls = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const TargetValueWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    margin: 10px 10px 10px 0;

    :last-child {
        margin-right: 0;
    }
`;

const ViewControls = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px 0;
`;

const NoDataWrapper = styled.div`
    height: 250px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

export default HealthWidget;
