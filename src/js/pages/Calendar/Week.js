/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styled from "styled-components";
import WeekDay from "pages/Calendar/WeekDay";
import WidgetBlock from "components/WidgetBlock";
// import { Button } from "components/Button";

class Week extends PureComponent {
    state = {
        weekdays: [],
    };

    static defaultProps = {
        currentDate: dayjs(),
    };

    static propTypes = {
        currentDate: PropTypes.object,
        onClick: PropTypes.func.isRequired,
        onEditEvent: PropTypes.func.isRequired,
        onAddEvent: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.fillWeekdays(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.currentDate.isSame(nextProps.currentDate)) {
            this.fillWeekdays(nextProps);
        }
    }

    fillWeekdays = (props) => {
        const { currentDate } = props;
        const start = currentDate.startOf("week");
        const end = currentDate.endOf("week");

        const weekdays = [];
        let current = start.clone();
        while (end.isAfter(current)) {
            const day = current.clone();
            const element = {
                day,
                weekday: day.day(),
                selected: day.isSame(currentDate, "day"),
                today: day.isSame(dayjs(), "day"),
            };
            weekdays.push(element);
            current = current.add(1, "day");
        }
        this.setState({
            weekdays,
        });
    };

    renderDay = (item) => {
        const { onClick, onEditEvent, onAddEvent } = this.props;

        return (
            <WeekDay
                key={item.weekday}
                onClick={() => onClick(item)}
                item={item}
                onEditEvent={onEditEvent}
                onAddEvent={onAddEvent}
            />
        );
    };

    render() {
        const { weekdays } = this.state;
        return (
            <Wrapper>
                <WidgetBlock title={"Календарь на неделю"}>
                    {weekdays.map((item) => this.renderDay(item))}
                </WidgetBlock>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: 100%;
`;

Week.propTypes = {};

export default Week;
