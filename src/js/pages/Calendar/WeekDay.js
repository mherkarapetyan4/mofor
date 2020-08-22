import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { fontStyles } from "styledMixins/mixins";
import { getDay } from "utils/handleDate";
import isEmpty from "lodash/isEmpty";
import capitalize from "lodash/capitalize";
import { rgba } from "polished";
import Actions from "containers/Header/Actions";
import Label from "components/Label";
import { plainColorPicker } from "utils/colorPicker";
import Stroke from "components/Stroke";
import EditIcon from "icons/EditIcon";
import DeleteIcon from "icons/DeleteIcon";
import { Desktop } from "wrappers/responsive";
import { hidePopup, showPopup } from "actions/popup";
import { Button } from "components/Button";
import { deleteCalendarEvent } from "actions/calendar";
import { LK_MENU_ELEMENTS } from "config/menu";
import { withRouter } from "react-router-dom";

@connect((state) => ({
    settings: state.user.settings,
    myCalendarList: state.calendar.calendarList,
}))
@withTheme
@withRouter
class WeekDay extends PureComponent {
    constructor(props) {
        super(props);

        this.strokeColor = plainColorPicker(props);
    }

    static propTypes = {
        myCalendarList: PropTypes.object,
        onClick: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        hidePopup: PropTypes.func.isRequired,
        showPopup: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        onEditEvent: PropTypes.func.isRequired,
        onAddEvent: PropTypes.func.isRequired,
        settings: PropTypes.object.isRequired,
    };

    eventActions = (item) => {
        if (item.sourceType === "PILLBOX") {
            if (item?.intake?.courseId) {
                return [
                    {
                        icon: <EditIcon opacity={0.5} />,
                        action: () => this.onEdit(item),
                        tooltip: "Редактировать",
                    },
                ];
            } else {
                return [];
            }
        } else if (item.sourceType === "EMIAS_APPOINTMENT") {
            return [
                {
                    icon: <EditIcon opacity={0.5} />,
                    action: () => this.onEdit(item),
                    tooltip: "Редактировать",
                },
            ];
        } else {
            return [
                {
                    icon: <EditIcon opacity={0.5} />,
                    action: () => this.onEdit(item),
                    tooltip: "Редактировать",
                    inactive: true,
                },
                {
                    icon: <DeleteIcon opacity={0.5} />,
                    action: () => this.onDelete(item),
                    tooltip: "Удалить",
                    inactive: true,
                },
            ];
        }
    };

    onEdit = (event) => {
        const { settings } = this.props;

        if (event.sourceType === "PILLBOX") {
            this.props.history.push({
                pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/course`,
                state: {
                    drug: event.intake.drug,
                    id: event.intake.courseId,
                    profile: event.profile,
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
                </ActionsWrapper>,
            ),
        );
    };

    render() {
        const { myCalendarList, item } = this.props;

        let events = [];

        if (myCalendarList && myCalendarList.content) {
            events = myCalendarList.content.filter(
                (day) =>
                    dayjs(day.startDate).format("YYYY-MM-DD") ===
                    item.day.format("YYYY-MM-DD"),
            );
        }

        return (
            <Wrapper>
                <Header>
                    <Date>{item.day.format("DD.MM")}</Date>
                    <Title>{capitalize(getDay(item.day))}</Title>
                    <Stroke color={this.strokeColor} />
                </Header>
                <List>
                    {!isEmpty(events) ? (
                        this.renderEvents(events)
                    ) : (
                        <EmptyList>Нет событий</EmptyList>
                    )}
                </List>
            </Wrapper>
        );
    }

    renderEvents = (events) => {
        return events.map((event) => {
            if (dayjs(event.startDate).isBefore(dayjs()))
                event.background = "gray";
            else if (dayjs(event.startDate).isSame(dayjs()))
                event.background = "yellow";
            else if (dayjs(event.startDate).isAfter(dayjs()))
                event.background = "green";

            return (
                <EventWrapper key={event.settingId}>
                    <EventTime>
                        {dayjs(event.startDate).format("HH:mm")}
                    </EventTime>
                    <EventName>{event.name}</EventName>
                    <Desktop>
                        <EventType>
                            <Label
                                label={
                                    event.sourceType === "PILLBOX"
                                        ? "Прием лекарственных средств"
                                        : event.sourceType ===
                                          "EMIAS_APPOINTMENT"
                                        ? "Запись к врачу"
                                        : event.type
                                }
                                color={""}
                            />
                        </EventType>
                    </Desktop>
                    <EventAction>
                        <Actions items={this.eventActions(event)} />
                    </EventAction>
                </EventWrapper>
            );
        });
    };
}

const ActionsWrapper = styled.div`
    padding: 0 16px;
    display: flex;
    align-items: center;
`;

const EmptyList = styled.div`
    ${(props) => fontStyles(props)};
    padding: 16px;
`;

const Header = styled.div`
    display: flex;
    padding: 16px;
    align-items: center;
`;

const Date = styled.div`
    margin-right: 16px;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
        })};
    width: 40px;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-right: 16px;
`;

const List = styled.div``;

const Wrapper = styled.div`
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    width: 100%;
    margin-bottom: 20px;
    background-color: ${(props) =>
        rgba(props.theme.colors.background.white, 0.9)};
    transition: border ${(props) => props.theme.animations.transition};

    &:hover {
        border: 1px solid ${(props) => props.theme.colors.borderColorHover};
    }
`;

const EventWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const EventTime = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-right: 16px;
    width: 40px;
    flex: 0 0 auto;
`;

const EventType = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-right: 16px;
    flex: 0 0 auto;
`;

const EventName = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    flex: 1;
    margin-right: 16px;
    word-break: break-all;
`;

const EventAction = styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

export default WeekDay;
