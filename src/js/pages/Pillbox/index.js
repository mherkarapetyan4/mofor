import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Tabs } from "components/Tabs";
import PillboxList from "pages/Pillbox/List";
import PageHeading from "components/PageHeading";
import Heading from "containers/Heading";
import PillboxData from "pages/Pillbox/PillboxData";
import Column from "containers/Column";
import Row from "containers/Row";
import ScrollBar from "components/ScrollBar";
import styled from "styled-components";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Desktop, Tablet } from "wrappers/responsive";
import PillboxWeek from "pages/Pillbox/PillboxWeek";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import MonthSwitch from "components/MonthSwitch";
import dayjs from "dayjs";
import { formatDate } from "utils/formatDate";
import ReactPrint from "components/ReactToPrint";
import PrintHeader from "components/PrintHeader";
import get from "lodash/get";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RESPONSIVE } from "config/consts";

const tabElements = [
    {
        value: "myData",
        label: "Мои данные",
    },
    {
        value: "myDrugs",
        label: "Мои лекарства",
    },
    {
        value: "weekPillbox",
        label: "Таблетница на неделю",
    },
];

@withRouter
@connect((state) => ({
    ward: state.myData.myData.ward,
}))
class Pillbox extends PureComponent {
    constructor(props) {
        super(props);
        const tab = get(props, "location.state.tab", tabElements[0].value);
        this.state = {
            tab,
            currentDate: dayjs(),
            isDesktop: true,
        };
    }

    static propTypes = {
        location: PropTypes.object.isRequired,
        ward: PropTypes.bool.isRequired,
    };

    setIsDesktop = () => {
        const width = window.screen.width;
        this.setState({ isDesktop: width > RESPONSIVE.tablet });
    };

    componentDidMount() {
        this.setIsDesktop();
        window.addEventListener("resize", this.setIsDesktop, false);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setIsDesktop, false);
    }

    onChange = (tab) => {
        this.setState({ tab: tab.value });
    };

    onChangeSelect = (tab) => {
        this.setState({
            tab,
        });
    };

    changeCurrentDate = (type) => {
        const { currentDate } = this.state;
        let newDate = currentDate.clone();
        if (type === "today") {
            newDate = dayjs();
        }
        if (type === "add") {
            newDate = newDate.add(1, "week");
        }
        if (type === "subtract") {
            newDate = newDate.subtract(1, "week");
        }
        this.setState({ currentDate: newDate });
    };

    render() {
        const { ward } = this.props;

        return (
            <>
                <Heading>
                    <PageHeading
                        title={
                            ward
                                ? LK_MENU_ELEMENTS.MEDICINES_PAGE.wardName
                                : LK_MENU_ELEMENTS.MEDICINES_PAGE.name
                        }
                    />
                </Heading>
                <Row fullHeight>
                    <Column>
                        <Desktop>
                            <ScrollBar>{this.renderData("desktop")}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderData("mobile")}</Tablet>
                    </Column>
                    {this.state.isDesktop && (
                        <PrintContent ref={(e) => (this.weekRef = e)}>
                            <PrintHeader title={"Таблетница на неделю"} />
                            {this.state.tab === "weekPillbox" && (
                                <PillboxWeek
                                    currentDate={this.state.currentDate}
                                />
                            )}
                        </PrintContent>
                    )}
                </Row>
            </>
        );
    }

    renderData = (type) => {
        const { tab, currentDate } = this.state;

        return (
            <>
                {type === "desktop" && (
                    <TabsWrapper>
                        <Tabs
                            onChange={this.onChange}
                            tab={tab}
                            elements={tabElements}
                            name={"tab"}
                            rigid
                        />
                        {tab === "weekPillbox" && (
                            <SwitchWrapper>
                                <MonthSwitch
                                    tooltip={""}
                                    onChange={this.changeCurrentDate}
                                    data={{
                                        month: currentDate.month(),
                                        year: currentDate.year(),
                                    }}
                                    customTitle={
                                        formatDate(
                                            currentDate.startOf("week"),
                                        ) +
                                        " г. - " +
                                        formatDate(currentDate.endOf("week")) +
                                        " г."
                                    }
                                    width={"auto"}
                                />
                                <Desktop>
                                    <PrintWrapper>
                                        <ReactPrint content={this.weekRef} />
                                    </PrintWrapper>
                                </Desktop>
                            </SwitchWrapper>
                        )}
                    </TabsWrapper>
                )}
                {type === "mobile" && (
                    <TabsWrapper>
                        <InlineFormFieldSelect
                            onChange={this.onChangeSelect}
                            options={tabElements}
                            label={"Разделы:"}
                            value={tab}
                        />
                    </TabsWrapper>
                )}
                <Data>
                    {tab === "myData" && <PillboxData />}
                    {tab === "myDrugs" && <PillboxList />}
                    {tab === "weekPillbox" && (
                        <PillboxWeek currentDate={currentDate} />
                    )}
                </Data>
            </>
        );
    };
}

const PrintWrapper = styled.div`
    margin-left: 16px;
`;

const PrintContent = styled.div`
    width: 100%;
`;

const Data = styled.div`
    width: 100%;
`;

const TabsWrapper = styled.div`
    width: 100%;
    margin-bottom: ${(props) => props.theme.paddings.normal};
    display: flex;
`;

const SwitchWrapper = styled.div`
    display: flex;
    margin-left: 16px;
`;

Pillbox.propTypes = {};

export default Pillbox;
