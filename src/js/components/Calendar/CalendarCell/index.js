import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { lighten, rgba } from "polished";
import dayjs from "dayjs";

class CalendarCell extends PureComponent {
    static defaultProps = {
        onClick: () => {},
        myCalendarList: {},
        hideEvents: false,
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
        myCalendarList: PropTypes.object,
        onClick: PropTypes.func,
        index: PropTypes.number,
        hideEvents: PropTypes.bool,
    };

    renderEvents = (events) => {
        const { data } = this.props;

        if (events) {
            return events.map((event) => {
                if (dayjs(event.startDate).isBefore(dayjs()))
                    event.background = "gray";
                else if (dayjs(event.startDate).isSame(dayjs()))
                    event.background = "yellow";
                else if (dayjs(event.startDate).isAfter(dayjs()))
                    event.background = "green";

                return (
                    <Dot
                        today={data.today}
                        selected={data.selected}
                        key={event.settingId}
                        background={event.background}
                    />
                );
            });
        }
    };

    render() {
        const { data, onClick, index, hideEvents } = this.props;
        const disabled = data.disabled;

        const col = (index % 7) + 1;
        let row = Math.floor(index / 7) + 1;

        return (
            <CellWrapper
                col={col}
                row={row}
                data={data}
                onClick={() => (disabled ? {} : onClick(data))}
            >
                <Date>{data.day.$D}</Date>
                {!hideEvents && (
                    <EventsWrapper>
                        {this.renderEvents(data.events)}
                    </EventsWrapper>
                )}
            </CellWrapper>
        );
    }
}

function renderColor(props, currentMonth, today, selected) {
    if (today || selected) return props.theme.colors.text.colorWhite;
    switch (currentMonth) {
        case true:
            return props.theme.colors.text.colorBlack;
        case false:
            return rgba(props.theme.colors.text.colorBlack, 0.2);
    }
}

const CellWrapper = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    -ms-grid-column: ${(props) => props.col};
    -ms-grid-row: ${(props) => props.row};
    ${(props) =>
        fontStyles(props, {
            color: renderColor(
                props,
                props.data.currentMonth,
                props.data.today,
                props.data.selected,
            ),
        })};
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: ${(props) =>
        props.data.today || props.data.selected
            ? lighten(0.2, props.theme.userTheme.color)
            : props.data.selected && props.data.currentMonth
            ? props.theme.userTheme.color
            : props.data.selected && !props.data.currentMonth
            ? props.theme.userTheme.color
            : "transparent"};
    transition: border ${(props) => props.theme.animations.transition};

    &:hover {
        border: 1px solid ${(props) => props.theme.colors.borderColor};
    }
`;

const Dot = styled.div`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${(props) =>
        props.selected || props.today ? "#fff" : props.background || "#000"};
    margin-right: 1px;
    margin-bottom: 1px;
    cursor: pointer;

    &:last-child {
        margin-right: 0;
    }
`;

const EventsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 3px;
    flex: 0 0 auto;
`;

const Date = styled.div`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default CalendarCell;
