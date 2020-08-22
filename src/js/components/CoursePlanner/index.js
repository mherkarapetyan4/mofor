/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Actions from "containers/Header/Actions";
import AddWidgetIcon from "icons/AddIcon";
import { fontStyles } from "styledMixins/mixins";
import TimeSelector from "components/CoursePlanner/TimeSelector";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { checkSymbols } from "utils/formatDate";

class CoursePlanner extends PureComponent {
    addTime = (item) => {
        return [
            {
                icon: <AddWidgetIcon opacity={0.5} />,
                action: () => {
                    const usedList = this.state.time[item.value];
                    const unusedElement = this.dayTime
                        .find((e) => e.value === item.value)
                        .times.find(
                            (item) =>
                                !usedList.some((e) => e.value === item.value),
                        );
                    this.setState(
                        {
                            time: {
                                ...this.state.time,
                                [item.value]: [
                                    ...this.state.time[item.value],
                                    unusedElement,
                                ],
                            },
                        },
                        () => this.timeToParent(this.state.time),
                    );
                },
                inactive: true,
                tooltip: "Добавить время",
            },
        ];
    };

    dayTime = [
        {
            id: 1,
            label: "Утро",
            value: "morning",
            times: [
                { value: "06:00", label: "06:00" },
                { value: "07:00", label: "07:00" },
                { value: "08:00", label: "08:00" },
                { value: "09:00", label: "09:00" },
                { value: "10:00", label: "10:00" },
                { value: "11:00", label: "11:00" },
            ],
        },
        {
            id: 2,
            label: "День",
            value: "day",
            times: [
                { value: "12:00", label: "12:00" },
                { value: "13:00", label: "13:00" },
                { value: "14:00", label: "14:00" },
                { value: "15:00", label: "15:00" },
                { value: "16:00", label: "16:00" },
                { value: "17:00", label: "17:00" },
            ],
        },
        {
            id: 3,
            label: "Вечер",
            value: "evening",
            times: [
                { value: "18:00", label: "18:00" },
                { value: "19:00", label: "19:00" },
                { value: "20:00", label: "20:00" },
                { value: "21:00", label: "21:00" },
                { value: "22:00", label: "22:00" },
                { value: "23:00", label: "23:00" },
            ],
        },
        {
            id: 4,
            label: "Ночь",
            value: "night",
            times: [
                { value: "00:00", label: "00:00" },
                { value: "01:00", label: "01:00" },
                { value: "02:00", label: "02:00" },
                { value: "03:00", label: "03:00" },
                { value: "04:00", label: "04:00" },
                { value: "05:00", label: "05:00" },
            ],
        },
    ];

    componentDidUpdate(prevProps) {
        if (isEmpty(prevProps.times) && !isEmpty(this.props.times)) {
            const { times } = this.props;
            let newTimes = {
                morning: [],
                day: [],
                evening: [],
                night: [],
            };
            times.forEach((item) => {
                const value =
                    checkSymbols(Number(item.hour)) +
                    ":" +
                    checkSymbols(Number(item.minute));
                if (parseInt(item.hour) >= 6 && parseInt(item.hour) < 12)
                    newTimes["morning"].push({
                        value,
                        label: value,
                    });
                if (parseInt(item.hour) >= 12 && parseInt(item.hour) < 18)
                    newTimes["day"].push({
                        value,
                        label: value,
                    });
                if (parseInt(item.hour) >= 18 && parseInt(item.hour) < 24)
                    newTimes["evening"].push({
                        value,
                        label: value,
                    });
                if (parseInt(item.hour) >= 0 && parseInt(item.hour) < 6)
                    newTimes["night"].push({
                        value,
                        label: value,
                    });
            });
            this.setState({ time: newTimes });
        }
    }

    state = {
        time: {
            morning: [],
            day: [],
            evening: [],
            night: [],
        },
    };

    static propTypes = {
        times: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    timeToParent = (newTimeArr) => {
        let times = [];
        times = times.concat(
            newTimeArr.morning.map((item) => {
                return {
                    hour: Number(item.label.substring(0, 2)),
                    minute: Number(item.label.substring(3, 5)),
                };
            }),
        );
        times = times.concat(
            newTimeArr.day.map((item) => {
                return {
                    hour: Number(item.label.substring(0, 2)),
                    minute: Number(item.label.substring(3, 5)),
                };
            }),
        );
        times = times.concat(
            newTimeArr.evening.map((item) => {
                return {
                    hour: Number(item.label.substring(0, 2)),
                    minute: Number(item.label.substring(3, 5)),
                };
            }),
        );
        times = times.concat(
            newTimeArr.night.map((item) => {
                return {
                    hour: Number(item.label.substring(0, 2)),
                    minute: Number(item.label.substring(3, 5)),
                };
            }),
        );
        this.props.onChange(times);
    };

    onChange = (position, oldTime, value) => {
        let newTimeArr = { ...this.state.time };
        newTimeArr[position] = newTimeArr[position].filter(
            (item) => item.value !== oldTime.value,
        );
        newTimeArr[position].push({ value: value, label: value });
        this.setState({ time: newTimeArr });
        this.timeToParent(newTimeArr);
    };

    onDelete = (position, oldTime) => {
        let newTimeArr = { ...this.state.time };
        newTimeArr[position] = newTimeArr[position].filter(
            (item) => item.value !== oldTime.value,
        );
        this.setState({ time: newTimeArr });
        this.timeToParent(newTimeArr);
    };

    render() {
        return (
            <Wrapper>
                {this.dayTime.map((item) => {
                    const list = get(this.state.time, item.value, []);
                    const unused = this.dayTime
                        .find((element) => element.value === item.value)
                        .times.filter(
                            (e) => !list.some((it) => it.value === e.value),
                        );
                    return (
                        <Item key={item.id}>
                            <ItemTitle>{item.label}</ItemTitle>
                            <Planner>
                                <PlannedList>
                                    {list.map((time) => (
                                        <PlannedItem key={time}>
                                            <TimeSelector
                                                value={time.label}
                                                onChange={(value) =>
                                                    this.onChange(
                                                        item.value,
                                                        time,
                                                        value,
                                                    )
                                                }
                                                time={unused}
                                                onDelete={() =>
                                                    this.onDelete(
                                                        item.value,
                                                        time,
                                                    )
                                                }
                                            />
                                        </PlannedItem>
                                    ))}
                                </PlannedList>
                                {list.length < 6 && (
                                    <ActionWrapper>
                                        <Actions items={this.addTime(item)} />
                                    </ActionWrapper>
                                )}
                            </Planner>
                        </Item>
                    );
                })}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const Item = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
    display: flex;
    align-items: center;
    padding: 10px 0;
`;

const ItemTitle = styled.div`
    flex: 0 0 auto;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-right: 16px;
    width: 60px;
`;

const Planner = styled.div`
    display: flex;
`;

const ActionWrapper = styled.div`
    margin-top: 6px;
    margin-bottom: 6px;
`;

const PlannedList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const PlannedItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
    padding: 3px 0;
`;

export default CoursePlanner;
