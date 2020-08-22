import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import map from "lodash/map";
import renderMark from "utils/renderMark";
import { fontStyles } from "styledMixins/mixins";
import renderColor from "utils/renderColor";
import { getData } from "decorators/getData";
import { getUserNotifications } from "actions/widgets";
import Logo from "icons/Logo";
import dayjs from "dayjs";

@withTheme
@getData({ getUserNotifications }, ["widgets"])
class NotificationWidget extends PureComponent {
    render() {
        const {
            notifications: { content },
        } = this.props.widgets.notificationsWidget;

        return (
            <NotificationWidgetWrapper>
                {map(content, (item, i) => {
                    return (
                        <NotificationItem key={i}>
                            <NumberWrapper>
                                {this.renderIcon(item.type, item.level)}
                            </NumberWrapper>
                            <NotificationInfo>
                                <InfoHeading>
                                    {this.renderType(item.type)} на{" "}
                                    {dayjs(item.creationDate).format(
                                        "DD.MM.YYYY",
                                    ) + " г."}
                                </InfoHeading>
                                <InfoContent>{item.message}</InfoContent>
                            </NotificationInfo>
                        </NotificationItem>
                    );
                })}
            </NotificationWidgetWrapper>
        );
    }

    renderType = (type) => {
        switch (type) {
            case "METEO":
                return "Аллергологический прогноз";
            case "DISPANSERISATION":
                return "Диспансеризация";
        }
    };

    renderIcon = (type, level) => {
        const { theme } = this.props;

        if (type === "DISPANSERISATION") {
            return <Logo color={theme.userTheme.color} />;
        } else {
            return (
                <>
                    <NotificationSign number={level}>{level}</NotificationSign>
                    <NotificationMark>{renderMark(level)}</NotificationMark>
                </>
            );
        }
    };
}

const NotificationInfo = styled.div`
    margin-left: 30px;
`;

const InfoHeading = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 7px;
`;

const InfoContent = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const NotificationWidgetWrapper = styled.div`
    padding: 10px;
`;

const NotificationItem = styled.div`
    display: flex;
    margin-bottom: 25px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const NumberWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px;
    flex: 0 0 auto;
`;

const NotificationSign = styled.div`
    ${(props) => fontStyles(props, { font: "bold", size: "48px" })};
    background: ${(props) => renderColor(props, props.number)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 0.8;
`;

const NotificationMark = styled.div`
    ${(props) =>
        fontStyles(props, { font: "bold", color: "#383838", size: "10px" })};
`;

NotificationWidget.propTypes = {
    widgets: PropTypes.object,
    theme: PropTypes.object,
};

export default NotificationWidget;
