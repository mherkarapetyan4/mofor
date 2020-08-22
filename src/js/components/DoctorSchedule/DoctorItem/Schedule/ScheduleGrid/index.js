import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "components/Button";
import { map, isEmpty } from "lodash";
import { fontStyles } from "styledMixins/mixins";
import dayjs from "dayjs";
import NoData from "components/NoData";
import {
    DATE_MORNING,
    DATE_DAY,
    DATE_EVENING,
    DATE_NIGHT,
} from "config/consts";
import { connect } from "react-redux";
import { getNewScheduleFullfilled } from "actions/doctor";
import { serverFormatDate } from "utils/formatDate";

const DaySteps = {
    [DATE_MORNING]: "Утро",
    [DATE_DAY]: "День",
    [DATE_EVENING]: "Вечер",
    [DATE_NIGHT]: "Ночь",
};
@connect((state) => ({
    schedule: state.doctor.speciality.schedule,
}))
class ScheduleGrid extends PureComponent {
    render() {
        const { data, schedule } = this.props;
        if (isEmpty(data))
            return (
                <NoData
                    title={"Нет данных"}
                    message={"Для данного объекта отсутствуют данные"}
                />
            );
        const { date, periods } = data;
        return (
            <Wrapper>
                <ScheduleDate>
                    {dayjs(date).format("D MMMM, dddd")}
                </ScheduleDate>
                <GridRow>
                    {Object.keys(periods).map((key) => {
                        const item = periods[key];
                        return (
                            <TimeWrapper key={key}>
                                <GridTime>
                                    <TimeOfDay>{DaySteps[key]}</TimeOfDay>
                                    <TimeSeparator />
                                </GridTime>
                                <GridData>
                                    {map(item, (itemTimes, i) => {
                                        return (
                                            <Button
                                                disabled={!itemTimes.available}
                                                key={i}
                                                label={dayjs(
                                                    itemTimes.from,
                                                ).format("HH:mm")}
                                                active={
                                                    schedule.startTime ===
                                                        itemTimes.from &&
                                                    itemTimes.to ===
                                                        schedule.endTime
                                                }
                                                onClick={() => {
                                                    const dateParams = {
                                                        startTime: serverFormatDate(
                                                            dayjs(
                                                                itemTimes.from,
                                                            ),
                                                            "YYYY-MM-DD HH:mm:ss",
                                                        ),
                                                        endTime: serverFormatDate(
                                                            dayjs(itemTimes.to),
                                                            "YYYY-MM-DD HH:mm:ss",
                                                        ),
                                                        date: serverFormatDate(
                                                            dayjs(
                                                                itemTimes.from,
                                                            ),
                                                        ),
                                                    };
                                                    this.props.dispatch(
                                                        getNewScheduleFullfilled(
                                                            dateParams,
                                                        ),
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                                </GridData>
                            </TimeWrapper>
                        );
                    })}
                </GridRow>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const ScheduleDate = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-bottom: 20px;
`;

const GridRow = styled.div`
    display: flex;
    flex-direction: column;
`;

const GridTime = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const GridData = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    > div {
        margin-right: 10px;
        margin-bottom: 10px;
    }
`;

const TimeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const TimeOfDay = styled.div`
    ${(props) => fontStyles(props)};
    margin-right: 10px;
    flex: 0 0 auto;
`;

const TimeSeparator = styled.div`
    height: 1px;
    flex: 1 1 auto;
    background-color: ${(props) => props.theme.colors.borderColor};
`;

ScheduleGrid.propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    schedule: PropTypes.object.isRequired,
};

ScheduleGrid.defaultProps = {
    data: {},
};

export default ScheduleGrid;
