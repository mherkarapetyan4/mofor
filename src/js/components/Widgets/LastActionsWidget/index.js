import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/map";
import { fontStyles } from "styledMixins/mixins";
import { getData } from "decorators/getData";
import { getLastActions } from "actions/user";
import isEmpty from "lodash/isEmpty";
import TextBlock from "components/TextBlock";
import dayjs from "dayjs";

@getData({ getLastActions }, ["widgets"])
class LastActionsWidget extends PureComponent {
    render() {
        const {
            lastActions: { content },
        } = this.props.widgets.lastActionsWidget;

        return (
            <LastActionsWidgetWrapper>
                {isEmpty(content) ? (
                    <TextWrapper>
                        <TextBlock>
                            Пользователем действий совершено не было.
                        </TextBlock>
                    </TextWrapper>
                ) : (
                    map(content, (item, i) => {
                        return (
                            <ActionItem key={i}>
                                <ActionInfo>
                                    <ActionTime>
                                        {dayjs(item.date).format(
                                            "HH:mm ч. DD.MM.YYYY г.",
                                        )}
                                    </ActionTime>
                                    <ActionContent>
                                        {item.message}
                                    </ActionContent>
                                </ActionInfo>
                            </ActionItem>
                        );
                    })
                )}
            </LastActionsWidgetWrapper>
        );
    }
}

const LastActionsWidgetWrapper = styled.div`
    padding: 10px;
`;

const ActionItem = styled.div`
    margin-bottom: 25px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const ActionInfo = styled.div``;

const ActionTime = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 7px;
`;

const ActionContent = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

LastActionsWidget.propTypes = {
    widgets: PropTypes.object,
};

export default LastActionsWidget;
