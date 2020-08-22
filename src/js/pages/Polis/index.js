import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import Row from "containers/Row";
import Column from "containers/Column";
import WidgetBlock from "components/WidgetBlock";
import { FetchingList } from "components/FetchingList";
import PolisReports from "pages/Polis/PolisReports";
import PolisReportInfo from "pages/Polis/PolisReportInfo";
import ScrollBar from "components/ScrollBar";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Button } from "components/Button";
import PropTypes from "prop-types";
import { getCurrentPolicy, getPolicyList } from "actions/policy";
import { connect } from "react-redux";
import { Desktop, Tablet } from "wrappers/responsive";
import { hasAccessToSection } from "modules/hasAccessToSection";
import { showPopup } from "actions/popup";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

@withRouter
@connect((state) => ({
    content: state.policy.data.content,
}))
@hasAccessToSection()
class Polis extends PureComponent {
    onClickItem = (id) => {
        const { dispatch } = this.props;
        dispatch(getCurrentPolicy(id));
    };

    onMobileClickItem = (id) => {
        this.props.history.push({
            pathname: `${LK_MENU_ELEMENTS.POLIS_PAGE.path}/view`,
            state: { id },
        });
    };

    renderItem = (item, index) => {
        return (
            <>
                <Desktop>
                    <PolisReports
                        key={`policy_${index}`}
                        data={item}
                        onClick={(id) => this.onClickItem(id)}
                    />
                </Desktop>
                <Tablet>
                    <PolisReports
                        key={`policy_${index}`}
                        data={item}
                        onClick={(id) => this.onMobileClickItem(id)}
                    />
                </Tablet>
            </>
        );
    };

    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={LK_MENU_ELEMENTS.POLIS_PAGE.name} />
                </Heading>
                <Row fullHeight>
                    <Column fraction={4}>
                        <Desktop>
                            <ScrollBar>{this.renderList()}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderList()}</Tablet>
                    </Column>
                    <Column fraction={8}>
                        <Desktop>
                            <ScrollBar>{this.renderInfo()}</ScrollBar>
                        </Desktop>
                    </Column>
                </Row>
            </>
        );
    }

    checkIsDisable = () => {
        const { content } = this.props;
        return (
            content.length > 0 &&
            content[0].internalStatus.toLowerCase() !== "finished"
        );
    };

    renderList = () => {
        return (
            <WidgetWrapper>
                <WidgetBlock
                    title={"Заявления"}
                    additional={
                        <Button
                            label={"Новое заявление"}
                            onClick={this.newPolis}
                        />
                    }
                >
                    <FetchingList
                        action={getPolicyList}
                        reducerName={"policy"}
                        renderItem={this.renderItem}
                        alwaysDidMountFetch={true}
                    />
                </WidgetBlock>
            </WidgetWrapper>
        );
    };

    renderInfo = () => {
        return (
            <WidgetWrapper>
                <WidgetBlock title={"Сводная информация о заявлении"}>
                    <PolisReportInfo />
                </WidgetBlock>
            </WidgetWrapper>
        );
    };

    newPolis = () => {
        if (this.checkIsDisable()) {
            const { dispatch } = this.props;
            dispatch(
                showPopup(
                    "Заявление",
                    <Wrapper>
                        <Text>
                            Существует незавершенное заявление, невозможно
                            отправить еще одно.
                        </Text>
                    </Wrapper>,
                ),
            );
        } else {
            const { history } = this.props;
            history.push({
                pathname: `${LK_MENU_ELEMENTS.POLIS_PAGE.path}/new`,
                state: {},
            });
        }
    };
}

const Wrapper = styled.div`
    padding: 0 16px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
`;

const WidgetWrapper = styled.div`
    margin-bottom: 16px;
`;

Polis.propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func,
    content: PropTypes.array,
};

Polis.defaultProps = {
    content: [],
};

export default Polis;
