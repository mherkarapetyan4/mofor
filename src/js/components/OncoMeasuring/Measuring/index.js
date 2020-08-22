import React, { PureComponent } from "react";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import { List } from "components/List";
import MeasureData from "./MeasureData";
import AlertIcon from "icons/AlertIcon";
import { fontStyles } from "styledMixins/mixins";
import isEmpty from "lodash/isEmpty";

@withTheme
class Measuring extends PureComponent {
    render() {
        const { title, action } = this.props;

        return (
            <Wrapper>
                <Header>
                    <Title>{title}</Title>
                    <Action>
                        <Button label={"Добавить измерение"} onClick={action} />
                    </Action>
                </Header>
                <Measures>{this.renderData()}</Measures>
            </Wrapper>
        );
    }

    renderOverdue = () => {
        return (
            <OverdueWrapper>
                <OverdueIconWrapper>
                    <AlertIcon color={"#EB5757"} />
                </OverdueIconWrapper>
                <Text>Добавьте первое показание</Text>
            </OverdueWrapper>
        );
    };

    renderData = () => {
        const { data, theme, overdue } = this.props;
        if (overdue) {
            return (
                <Notification>
                    <Icon>
                        <AlertIcon color={theme.colors.notifications.alert} />
                    </Icon>
                    <Text>Добавьте показания</Text>
                </Notification>
            );
        }
        if (!overdue && isEmpty(data)) {
            return (
                <Notification>
                    <Icon>
                        <AlertIcon color={theme.colors.notifications.alert} />
                    </Icon>
                    <Text>Показаний нет</Text>
                </Notification>
            );
        }

        return (
            <List
                data={data}
                renderItem={(item, i) => <MeasureData key={i} data={item} />}
                rigid
            />
        );
    };
}

const OverdueWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const OverdueIconWrapper = styled.div`
    margin-right: 10px;
    font-size: 0;
`;

const Wrapper = styled.div`
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const Measures = styled.div``;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
`;

const Action = styled.div``;

const Notification = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    margin-right: 12px;
    line-height: 0;
`;

const Text = styled.div`
    ${(props) => fontStyles(props)};
`;

Measuring.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    data: PropTypes.array,
    theme: PropTypes.object,
    overdue: PropTypes.bool,
};

MeasureData.defaultProps = {
    data: [],
};

export default Measuring;
