import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/map";
import Event from "components/CalendarEvents/Event";
import { connect } from "react-redux";
import { Button } from "components/Button";
import Row from "containers/Row";
import Column from "containers/Column";
import { deleteCalendarEvent } from "actions/calendar";
import NoData from "components/NoData";
import isEmpty from "lodash/isEmpty";
import { showPopup, hidePopup } from "actions/popup";
import { LK_MENU_ELEMENTS } from "config/menu";
import { withRouter } from "react-router-dom";

@withRouter
@connect((state) => ({
    settings: state.user.settings,
    calendarEventOfDay: state.calendar.calendarEventOfDay,
}))
class CalendarEvents extends PureComponent {
    changeEditingEvent = (event) => {
        const { settings } = this.props;

        if (event.sourceType === "PILLBOX") {
            this.props.history.push({
                pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/course`,
                state: {
                    drug: event.intake.drug,
                    id: event.intake.courseId,
                    profile: event.profile,
                    sourceType: event.sourceType,
                },
            });
        } else if (event.sourceType === "EMIAS_APPOINTMENT") {
            if (settings.emiasVersion !== 5) {
                window.open("https://emias.info/", "_blank");
            } else {
                this.props.history.push({
                    pathname: `${LK_MENU_ELEMENTS.DOCTOR_PAGE.path}`,
                });
            }
        } else {
            const { onEditEvent, onAddEvent } = this.props;
            onEditEvent(event.settingId);
            onAddEvent("EDIT");
        }
    };

    onDelete = (event) => {
        const { dispatch } = this.props;
        dispatch(
            showPopup(
                "Удалить событие?",
                <Wrapper>
                    <ActionsWrapper>
                        <Button
                            label={"Отмена"}
                            onClick={() => dispatch(hidePopup())}
                        />
                        <Button
                            label={"Удалить"}
                            onClick={() => {
                                dispatch(deleteCalendarEvent(event.settingId));
                                dispatch(hidePopup());
                            }}
                        />
                    </ActionsWrapper>
                </Wrapper>,
            ),
        );
    };

    render() {
        const { calendarEventOfDay } = this.props;

        if (calendarEventOfDay && !isEmpty(calendarEventOfDay.content)) {
            return (
                <>
                    <EventsWrapper>
                        {map(calendarEventOfDay.content, (event, i) => (
                            <Event
                                key={i}
                                event={event}
                                onDelete={() => this.onDelete(event)}
                                onEdit={() => this.changeEditingEvent(event)}
                            />
                        ))}
                    </EventsWrapper>
                    <Row>
                        <Column paddings={0}>
                            <Button
                                label={"Добавить событие"}
                                onClick={() => this.changeEditingEvent({})}
                            />
                        </Column>
                    </Row>
                </>
            );
        } else {
            return (
                <Row>
                    <Column paddings={0}>
                        <NoData
                            title={"Нет событий"}
                            message={"На выбранную дату нет событий"}
                        />
                        <Button
                            label={"Добавить событие"}
                            onClick={() => this.changeEditingEvent({})}
                        />
                    </Column>
                </Row>
            );
        }
    }
}

const Wrapper = styled.div`
    padding: 0 16px;
`;

const ActionsWrapper = styled.div`
    display: flex;

    > div {
        margin-right: 16px;

        :last-child {
            margin-right: 0;
        }
    }
`;

const EventsWrapper = styled.div`
    margin-bottom: 16px;
`;

CalendarEvents.propTypes = {
    calendarEventOfDay: PropTypes.object,
    onAddEvent: PropTypes.func,
    onEditEvent: PropTypes.func,
    dispatch: PropTypes.func,
    hidePopup: PropTypes.func,
    showPopup: PropTypes.func,
    history: PropTypes.object,
    settings: PropTypes.object.isRequired,
};

export default CalendarEvents;
