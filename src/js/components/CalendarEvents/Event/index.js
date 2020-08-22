import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import dayjs from "dayjs";
import CloseIcon from "icons/CloseIcon";
import Label from "components/Label";
import Actions from "containers/Header/Actions";
import EditIcon from "icons/EditIcon";
import { Desktop } from "wrappers/responsive";
import { RESPONSIVE } from "config/consts";

class Event extends PureComponent {
    eventActions = () => {
        const { event } = this.props;
        if (event.sourceType === "PILLBOX") {
            if (event?.intake?.courseId) {
                return [
                    {
                        icon: <EditIcon opacity={0.5} />,
                        action: () => this.props.onEdit(),
                        tooltip: "Редактировать",
                    },
                ];
            } else {
                return [];
            }
        } else if (event.sourceType === "EMIAS_APPOINTMENT") {
            return [
                {
                    icon: <EditIcon opacity={0.5} />,
                    action: () => this.props.onEdit(),
                    tooltip: "Редактировать",
                },
            ];
        } else {
            return [
                {
                    icon: <EditIcon opacity={0.5} />,
                    action: () => this.props.onEdit(),
                    tooltip: "Редактировать",
                },
                {
                    icon: <CloseIcon opacity={0.5} />,
                    action: () => this.props.onDelete(),
                    tooltip: "Удалить",
                },
            ];
        }
    };

    render() {
        const { event } = this.props;

        return (
            <EventWrapper>
                <EventTime>{dayjs(event.startDate).format("HH:mm")}</EventTime>
                <EventName>{event.name}</EventName>
                <Desktop>
                    <EventType>
                        <Label
                            label={
                                event.sourceType === "PILLBOX"
                                    ? "Прием лекарственных средств"
                                    : event.sourceType === "EMIAS_APPOINTMENT"
                                    ? "Запись к врачу"
                                    : event.type
                            }
                            color={""}
                        />
                    </EventType>
                </Desktop>
                <ActionsWrapper>
                    <Actions items={this.eventActions()} />
                </ActionsWrapper>
            </EventWrapper>
        );
    }
}

const ActionsWrapper = styled.div`
    flex: 0 0 auto;
`;

const EventWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => props.theme.paddings.normal};

    &:last-child {
        margin-bottom: 0;
    }
`;

const EventTime = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: props.theme.fonts.sizes.small,
            color: props.theme.colors.text.colorBlack,
        })};
    margin-right: 16px;
    width: 40px;
    flex: 0 0 auto;
`;

const EventType = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: props.theme.fonts.sizes.small,
            color: props.theme.colors.text.colorBlack,
        })};
    margin-right: 16px;
    flex: 0 0 auto;
`;

const EventName = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: props.theme.fonts.sizes.small,
            color: props.theme.colors.text.colorBlack,
        })};
    flex: 1 1 auto;
    margin-right: 16px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        word-break: break-all;
    }
`;

Event.propTypes = {
    event: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Event;
