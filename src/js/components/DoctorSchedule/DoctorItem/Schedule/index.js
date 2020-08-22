import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import WidgetBlock from "components/WidgetBlock";
import { Calendar } from "components/Calendar";
import CalendarCell from "components/Calendar/CalendarCell";
import Column from "containers/Column";
import Row from "containers/Row";
import ScheduleGrid from "components/DoctorSchedule/DoctorItem/Schedule/ScheduleGrid";
import dayjs from "dayjs";
import get from "lodash/get";
import { serverFormatDate } from "utils/formatDate";
import {
    DATE_MORNING,
    DATE_DAY,
    DATE_EVENING,
    DATE_NIGHT,
} from "config/consts";

class Schedule extends PureComponent {
    state = {
        currentDay: new Date(),
        currentDate: {},
    };

    getDayStep = (date) => {
        const time = dayjs(date).format("H");
        if (time >= 6 && time < 12) {
            return DATE_MORNING;
        }
        if (time >= 12 && time < 18) {
            return DATE_DAY;
        }
        if (time >= 18 && time <= 23) {
            return DATE_EVENING;
        }
        if (time > 0 && time < 6) {
            return DATE_NIGHT;
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { data } = this.props;
        const { currentDay } = this.state;
        if (
            JSON.stringify(prevProps.data) !== JSON.stringify(data) ||
            JSON.stringify(prevState.currentDay) !== JSON.stringify(currentDay)
        ) {
            let currentDate = data.find(
                ({ date }) =>
                    dayjs(date).diff(serverFormatDate(dayjs(currentDay))) === 0,
            );
            let buffGroupedByTime = [];
            if (currentDate && currentDate.periods) {
                currentDate.periods.map((el) => {
                    const key = this.getDayStep(el.from);
                    if (!get(buffGroupedByTime, key)) {
                        buffGroupedByTime[key] = [];
                    }
                    const currentData = buffGroupedByTime[key];
                    buffGroupedByTime[key] = [...currentData, el];
                });
                currentDate = {
                    ...currentDate,
                    periods: buffGroupedByTime,
                };
            }
            this.setState({
                currentDate: currentDate || {},
            });
        }
    }

    render() {
        const { currentDay, currentDate } = this.state;
        return (
            <Wrapper>
                <WidgetBlock title={"Выберите дату и время"}>
                    <Row>
                        <Column fixed={350} paddings={0}>
                            <Calendar
                                currentDate={currentDay}
                                renderItem={(item, i) => (
                                    <CalendarCell
                                        key={[
                                            i,
                                            "calednarItem",
                                            JSON.stringify(item),
                                        ].join("_")}
                                        onClick={({ day }) => {
                                            this.setState({ currentDay: day });
                                        }}
                                        data={item}
                                    />
                                )}
                            />
                        </Column>
                        <Column auto paddingRight={0}>
                            <ScheduleGrid data={currentDate} />
                        </Column>
                    </Row>
                </WidgetBlock>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: 100%;
`;

Schedule.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Schedule;
