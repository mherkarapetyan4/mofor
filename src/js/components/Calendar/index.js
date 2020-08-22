import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { startOfMonth, endOfMonth } from "utils/handleDate";
import { CALENDAR, RESPONSIVE } from "config/consts";
import styled from "styled-components";
import isBetween from "dayjs/plugin/isBetween";
import { connect } from "react-redux";

dayjs.extend(isBetween);

const d = dayjs();

@connect((state) => ({
    myCalendarList: state.calendar.calendarList,
}))
class Calendar extends PureComponent {
    static defaultProps = {
        currentDate: d,
        currentMonth: d.month(),
        currentYear: d.year(),
        itemsInRow: 7,
        maxDate: CALENDAR.maxDate,
        minDate: CALENDAR.minDate,
    };

    static propTypes = {
        currentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        currentMonth: PropTypes.number,
        currentYear: PropTypes.number,
        renderItem: PropTypes.func.isRequired,
        itemsInRow: PropTypes.number,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        myCalendarList: PropTypes.object.isRequired,
    };

    fillValues = () => {
        const {
            currentMonth,
            currentYear,
            currentDate,
            renderItem,
            maxDate,
            minDate,
            itemsInRow,
            myCalendarList,
        } = this.props;

        let events = {};
        if (myCalendarList && myCalendarList.content) {
            myCalendarList.content.forEach((event) => {
                const key = dayjs(event.startDate).format("YYYY-MM-DD");
                if (events[key]) {
                    events[key].push(event);
                } else {
                    events[key] = [event];
                }
            });
        }

        const abstractCurrentDate = dayjs()
            .set("date", 1)
            .set("month", currentMonth)
            .set("year", currentYear);

        const first = startOfMonth(abstractCurrentDate);
        const last = endOfMonth(abstractCurrentDate);

        const days = [];
        let current = first.clone();

        while (last.isAfter(current)) {
            const day = current.clone();
            const element = {
                day,
                weekday: day.day(),
                selected: day.isSame(currentDate, "day"),
                currentMonth: day.clone().month() === currentMonth,
                row: Math.floor(days.length / 7),
                disabled: !day.isBetween(minDate, maxDate),
                today: day.isSame(dayjs(), "day"),
                events: events[day.format("YYYY-MM-DD")],
            };
            days.push(element);
            current = current.add(1, "day");
        }
        const rows = 6 - days.length / itemsInRow;
        if (rows > 0) {
            const additionalLastDate = last.clone().add(7 * rows, "day");
            while (additionalLastDate.isAfter(current)) {
                const day = current.clone();
                const element = {
                    day,
                    weekday: day.day(),
                    selected: day.isSame(currentDate, "day"),
                    currentMonth: day.clone().month() === currentMonth,
                    row: Math.floor(days.length / 7),
                    disabled: !day.isBetween(minDate, maxDate),
                    today: day.isSame(dayjs(), "day"),
                    events: events[day.format("YYYY-MM-DD")],
                };
                days.push(element);
                current = current.add(1, "day");
            }
        }

        return days.map((item, ix) => renderItem(item, ix));
    };

    render() {
        return <CalendarWrapper>{this.fillValues()}</CalendarWrapper>;
    }
}

const CalendarWrapper = styled.div`
    width: 100%;
    //height: 100%;
    display: -ms-grid;
    display: grid;
    -ms-grid-rows: 40px 40px 40px 40px 40px 40px 40px;
    -ms-grid-columns: 40px 40px 40px 40px 40px 40px 40px;
    grid-template-columns: repeat(7, 40px);
    grid-gap: 10px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        column-gap: 0;
        row-gap: 0;
    }
`;

export { Calendar };
