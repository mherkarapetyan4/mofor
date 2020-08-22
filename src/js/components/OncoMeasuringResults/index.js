import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { darken } from "polished";
import Actions from "containers/Header/Actions";
import CalendarIcon from "icons/CalendarIcon";
import EditIcon from "icons/EditIcon";
import CloseIcon from "icons/CloseIcon";
import { fontStyles } from "styledMixins/mixins";
import { connect } from "react-redux";
import { notificationActionHandler } from "actions/onco";
import { oncoPath } from "config/paths";
import { history } from "routes/history";
import { LK_MENU_ELEMENTS } from "config/menu";
import MeasurementIcon from "icons/MeasurementIcon";

@connect()
@withTheme
class OncoMeasuringResults extends PureComponent {
    actions = (kind) => {
        let tooltip = "",
            action = () => {},
            icon = <></>;
        if (kind === "INIT_PARAMETER_MISSED") {
            tooltip = "Задать показатели";
            action = () => this.props.onClickCallback();
            icon = <EditIcon opacity={0.5} />;
        } else if (kind === "INDICATOR_THRESHOLD") {
            tooltip = "Запланировать событие";
            action = () => history.push(LK_MENU_ELEMENTS.CALENDAR_PAGE.path);
            icon = <CalendarIcon opacity={0.5} />;
        }
        return [
            {
                id: 0,
                icon,
                action,
                tooltip,
            },
            {
                id: 1,
                icon: <CloseIcon opacity={0.5} />,
                action: () => {
                    const { dispatch, data } = this.props;
                    const { id } = data;
                    dispatch(
                        notificationActionHandler(
                            { id },
                            oncoPath.CURRENT_NOTIFICATION_SUPPRESS,
                        ),
                    );
                },
                tooltip: "Закрыть оповещение",
            },
        ];
    };

    render() {
        const { theme } = this.props;
        const { text, severity, kind } = this.props.data;

        return (
            <Wrapper>
                <Icon>
                    <MeasurementIcon
                        color={darken(0.1, this.renderColor(theme, severity))}
                    />
                </Icon>
                <Text>{text}</Text>
                <ActionsWrapper>
                    <Actions items={this.actions(kind)} />
                </ActionsWrapper>
            </Wrapper>
        );
    }

    renderColor = (theme, number) => {
        switch (number) {
            case 1:
                return theme.colors.grades.plainColors.levelOne;
            case 2:
                return theme.colors.grades.plainColors.levelTwo;
            case 3:
                return theme.colors.grades.plainColors.levelThree;
            case 4:
                return theme.colors.grades.plainColors.levelFour;
            case 5:
                return theme.colors.grades.plainColors.levelFive;
            default:
                return theme.userTheme.color;
        }
    };
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: ${(props) => props.theme.paddings.normal};
`;

const Icon = styled.div`
    margin-right: 20px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    flex: 1;
`;

const ActionsWrapper = styled.div``;

OncoMeasuringResults.propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    theme: PropTypes.object,
    onClickCallback: PropTypes.func.isRequired,
};

export default OncoMeasuringResults;
