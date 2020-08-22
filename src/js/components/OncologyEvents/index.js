import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { Desktop } from "wrappers/responsive";
import Logo from "icons/Logo";
import ListData from "components/List/ListData";
import { formatDate } from "utils/formatDate";
import Actions from "containers/Header/Actions";
import CloseIcon from "icons/CloseIcon";
import CheckIcon from "icons/CheckIcon";
import CalendarIcon from "icons/CalendarIcon";

@withTheme
class OncologyEvents extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        theme: PropTypes.object,
    };

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
            tooltip: "Запланировать событие",
            action: () => this.planningHandler(),
        },
    ];

    render() {
        const { theme } = this.props;
        const {
            name,
            fromDate,
            toDate,
            doctorComment,
            patientComment,
            doctorState,
            planning,
            confirmation,
            unconfirmation,
            rejection,
        } = this.props.data;

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
                    <UserConfirmation>
                        <ListData
                            label={"Подтверждено пациентом:"}
                            data={patientComment}
                        />
                        <ActionsWrapper>
                            {planning.visible && (
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

export default OncologyEvents;
