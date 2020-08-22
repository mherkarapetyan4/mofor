import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import Logo from "icons/Logo";
import { fontStyles } from "styledMixins/mixins";
import ListData from "components/List/ListData";
import CheckIcon from "icons/CheckIcon";
import CloseIcon from "icons/CloseIcon";
import CalendarIcon from "icons/CalendarIcon";
// import Actions from "containers/Header/Actions";
import { formatDate, serverFormatDate } from "utils/formatDate";
// import {LK_MENU_ELEMENTS} from "config/menu";
import { withRouter } from "react-router-dom";
// import Popup from "components/Popup";
import { showPopup } from "actions/popup";
import { connect } from "react-redux";
// import { LK_MENU_ELEMENTS } from "config/menu";
import { eventActionHandler } from "actions/onco";
import { oncoPath } from "config/paths";
import Actions from "containers/Header/Actions";
import { Desktop } from "wrappers/responsive";
import CalendarInPopup from "./CalendarInPopup";
import RescheduleCalendarInPopup from "./RescheduleCalendarInPopup";

const eventsActions = {
    planning: {
        id: "planning",
        icon: <CalendarIcon opacity={0.5} />,
        action: () => {},
        tooltip: "Запланировать событие",
        important: true,
    },
    confirmation: {
        id: "confirmation",
        icon: <CheckIcon opacity={0.5} />,
        action: () => {},
        tooltip: "Подтвердить событие",
    },
    unconfirmation: {
        id: "unconfirmation",
        icon: <CloseIcon opacity={0.5} />,
        action: () => {},
        tooltip: "Закрыть событие",
    },
    rejection: {
        id: "rejection",
        icon: <CloseIcon opacity={0.5} key={"reject"} />,
        action: () => {},
        tooltip: "Отклонить событие",
    },
};

@withRouter
@withTheme
@connect()
class OncoEvents extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        theme: PropTypes.object,
        history: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            eventsActions: [
                { ...eventsActions.planning },
                { ...eventsActions.confirmation },
                { ...eventsActions.unconfirmation },
            ],
            rejectActions: [{ ...eventsActions.rejection }],
        };
    }

    rejectionIcon = [
        {
            icon: <CloseIcon opacity={0.5} />,
            tooltip: "Закрыть событие",
            action: () => this.actionHandler("rejection"),
        },
    ];

    unconfirmationIcon = [
        {
            icon: <CloseIcon opacity={0.5} />,
            tooltip: "Закрыть событие",
            action: () => this.actionHandler("unconfirmation"),
        },
    ];

    checkIcon = [
        {
            icon: <CheckIcon opacity={0.5} />,
            tooltip: "Отметить событие",
            action: () => this.confirmationHandler(),
        },
    ];

    calendarIcon = [
        {
            icon: <CalendarIcon opacity={0.5} />,
            tooltip: "Перенести запись",
            action: () => this.planningHandler(),
        },
    ];

    notAllowed = (message) => {
        this.props.dispatch(showPopup(message || "недоступно"));
    };

    planningHandler = () => {
        const { rescheduling } = this.props.data;
        if (rescheduling.allowed) {
            this.props.dispatch(
                showPopup(
                    "Дата",
                    <RescheduleCalendarInPopup
                        data={this.props.data}
                        dispatch={this.props.dispatch}
                    />,
                ),
            );
        } else {
            this.notAllowed(rescheduling.message);
        }
    };

    confirmationHandler = () => {
        const { confirmation } = this.props.data;
        if (confirmation.allowed) {
            this.props.dispatch(
                showPopup(
                    "Дата",
                    <CalendarInPopup
                        data={this.props.data}
                        dispatch={this.props.dispatch}
                    />,
                ),
            );
        } else {
            this.notAllowed(confirmation.message);
        }
    };

    actionHandler = (key) => {
        const { dispatch } = this.props;
        const { id } = this.props.data;
        const action = this.props.data[key];
        if (action.allowed) {
            dispatch(
                eventActionHandler(
                    { id },
                    key === "unconfirmation"
                        ? oncoPath.EVENT_UNCONFIRMATION
                        : oncoPath.EVENT_REJECTION,
                ),
            );
        } else {
            this.notAllowed(action.message);
        }
    };

    render() {
        const { theme } = this.props;
        const {
            name,
            fromDate,
            toDate,
            doctorComment,
            patientComment,
            doctorState,
            rescheduling,
            confirmation,
            unconfirmation,
            rejection,
            scheduledDate,
            rescheduledDate,
        } = this.props.data;
        // const {rejectActions} = this.state
        // planningType, planning, confirmation, unconfirmation, rejection,patientState
        return (
            <Wrapper>
                <Desktop>
                    <ListIcon>
                        <Logo color={theme.userTheme.color} />
                    </ListIcon>
                </Desktop>
                <Content>
                    <Title>{name}</Title>
                    <Time>
                        <ListData
                            label={"Сроки прохождения:"}
                            data={`${formatDate(fromDate)} - ${formatDate(
                                toDate,
                            )}`}
                        />
                    </Time>
                    <Time>
                        <ListData
                            label={"Записано врачом на:"}
                            data={`${serverFormatDate(
                                scheduledDate,
                                "DD.MM.YYYY HH:mm",
                            )}`}
                        />
                    </Time>
                    {rescheduledDate != null && (
                        <Time>
                            <ListData
                                label={"Перенесено пациентом на:"}
                                data={`${serverFormatDate(
                                    rescheduledDate,
                                    "DD.MM.YYYY HH:mm",
                                )}`}
                            />
                        </Time>
                    )}

                    <UserConfirmation>
                        <ListData
                            label={"Подтверждено пациентом:"}
                            data={patientComment}
                        />
                        <ActionsWrapper>
                            {rescheduling && rescheduling.visible && (
                                <Actions items={this.calendarIcon} />
                            )}

                            {confirmation.visible && (
                                <Actions items={this.checkIcon} />
                            )}

                            {unconfirmation.visible && (
                                <Actions items={this.unconfirmationIcon} />
                            )}
                        </ActionsWrapper>
                    </UserConfirmation>
                    <DoctorConfirmation confirmed={doctorState !== "NONE"}>
                        {doctorComment}
                        <ActionsWrapper>
                            {rejection.visible && (
                                <Actions items={this.rejectionIcon} />
                            )}
                        </ActionsWrapper>
                    </DoctorConfirmation>
                </Content>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: ${(props) => props.theme.paddings.normal};
`;

const ListIcon = styled.div`
    margin-right: 20px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
`;

const Time = styled.div`
    margin-top: 7px;
`;

const UserConfirmation = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: 7px;
`;

const DoctorConfirmation = styled.div`
    ${(props) => fontStyles(props, { font: "bold" })};
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top: 7px;
    background: ${(props) =>
        props.confirmed
            ? props.theme.userTheme.backgroundColor
            : props.theme.colors.gradients.gradientFour};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ActionsWrapper = styled.div`
    display: flex;
    flex-shrink: 0;
`;

export default OncoEvents;
