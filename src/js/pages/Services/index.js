import React, { PureComponent } from "react";
import { Tabs } from "components/Tabs";
import { getServicesList, getPrintServicesList } from "actions/services";
import { FetchingList } from "components/FetchingList";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { LK_MENU_ELEMENTS } from "config/menu";
import PageHeading from "components/PageHeading";
import Heading from "containers/Heading";
import InfoIcon from "icons/InfoIcon";
import styled from "styled-components";
import Row from "containers/Row";
import Column from "containers/Column";
import ListItem from "pages/Services/ListItem";
import ScrollBar from "components/ScrollBar";
import { show } from "actions/anchorPopup";
import TextBlock from "components/TextBlock";
import { connect } from "react-redux";
import Actions from "containers/Header/Actions";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { RESPONSIVE } from "config/consts";
import { Desktop, Tablet } from "wrappers/responsive";
import Filter from "modules/Filter";
import PrintHeader from "components/PrintHeader";
import ReactPrint from "components/ReactToPrint";
import { CALENDAR } from "config/consts";

const tabElements = [
    {
        value: "services",
        label: "Оказанные услуги",
    },
    {
        value: "service/emergency",
        label: "Услуги скорой помощи",
    },
    {
        value: "service/region",
        label: "Услуги в других регионах",
    },
];

const filters = {
    // мои услуги и услуги скорой помощи
    fromDate: "",
    toDate: "",
    serviceTypeName: "",
    // moName: '',
    // услуги в других регионах
    fromStartDate: "",
    toStartDate: "",
    fromEndDate: "",
    toEndDate: "",
    regionName: "",
    diagnosisName: "",
    moName: "",
};

@connect((state) => ({
    ward: state.myData.myData.ward,
}))
@withRouter
class Services extends PureComponent {
    constructor(props) {
        super(props);
        this.printRef = React.createRef();
    }

    state = {
        fromMaxDate: CALENDAR.maxDate,
        toMinDate: CALENDAR.minDate,
        fromStartMaxDate: CALENDAR.maxDate,
        toStartMinDate: CALENDAR.minDate,
        toStartMaxDate: CALENDAR.maxDate,
        fromEndMinDate: CALENDAR.minDate,
        fromEndMaxDate: CALENDAR.maxDate,
        toEndMinDate: CALENDAR.minDate,
        tab: tabElements[0].value,
        mouseOver: null,
        filters,
    };

    infoIcon = [
        {
            icon: <InfoIcon opacity={0.5} />,
            action: (position) =>
                this.props.dispatch(
                    show({
                        position,
                        component: (
                            <TextBlock>
                                Перечень услуг обновляется, начиная с 10 числа
                                каждого месяца. Отображаются сведения об
                                услугах, оказанных начиная с 1 января 2015 года
                            </TextBlock>
                        ),
                        place: "left",
                        title: "Информация",
                        size: {
                            w: 240,
                            h: 100,
                        },
                    }),
                ),
            important: true,
            tooltip: "Информация",
        },
    ];

    componentDidMount() {
        this.props.history?.location?.state?.tab
            ? this.setState({
                  tab: this.props.history.location.state.tab,
              })
            : null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tab !== this.state.tab) {
            this.setState(
                {
                    filters,
                },
                this.onSearchStart(),
            );
        }
    }

    onChange = (tab) => {
        this.setState({ tab: tab });
    };

    renderItem = (item, i, mouseOver) => {
        return (
            <ListItem
                onClick={this.onClick}
                key={i}
                item={item}
                index={i}
                selected={mouseOver === i}
                handleMouseOver={this.handleMouseOver}
            />
        );
    };

    onClick = (item) => {
        const { history } = this.props;

        history.push({
            pathname: `${LK_MENU_ELEMENTS.SERVICES_PAGE.path}/view`,
            state: {
                item,
                tab: this.state.tab,
                backLocation: "/services",
            },
        });
    };

    render() {
        const { ward } = this.props;
        const { tab } = this.state;
        return (
            <>
                <Heading>
                    <PageHeading
                        title={
                            ward
                                ? LK_MENU_ELEMENTS.SERVICES_PAGE.wardName
                                : LK_MENU_ELEMENTS.SERVICES_PAGE.name
                        }
                    />
                    <Desktop>
                        <PageInfo>
                            <TextBlock>
                                Перечень услуг обновляется, начиная с 10 числа
                                каждого месяца. Отображаются сведения об
                                услугах, оказанных начиная с 1 января 2015 года
                            </TextBlock>
                        </PageInfo>
                    </Desktop>
                    <Tablet>
                        <PageInfo>
                            <Actions items={this.infoIcon} />
                        </PageInfo>
                    </Tablet>
                </Heading>
                <Row fullHeight>
                    <Desktop>
                        <ScrollBar>
                            <Column>
                                <Controls>
                                    <TabsWrapper>
                                        <Tabs
                                            onChange={(item) =>
                                                this.onChange(item.value)
                                            }
                                            tab={tab}
                                            elements={tabElements}
                                            name={"tab"}
                                        />
                                    </TabsWrapper>
                                    <Desktop>
                                        <PrintWrapper>
                                            <ReactPrint
                                                content={this.printRef.current}
                                            />
                                        </PrintWrapper>
                                    </Desktop>
                                </Controls>
                                {this.renderSearch(tab)}
                                <ListWrapper>{this.renderData()}</ListWrapper>
                                <PrintListWrapper ref={this.printRef}>
                                    <PrintHeader title={"Оказанные услуги"} />
                                    {this.renderPrintData()}
                                </PrintListWrapper>
                            </Column>
                        </ScrollBar>
                    </Desktop>
                    <Tablet>
                        <Column>
                            <MobileTabsWrapper>
                                <InlineFormFieldSelect
                                    onChange={(item) => this.onChange(item)}
                                    options={tabElements}
                                    label={"Вид услуг:"}
                                    value={tab}
                                />
                            </MobileTabsWrapper>
                            {this.renderSearch(tab)}
                            <ListWrapper>{this.renderData()}</ListWrapper>
                        </Column>
                    </Tablet>
                </Row>
            </>
        );
    }

    handleMouseOver = (mouseOver) => {
        this.setState({ mouseOver });
    };

    renderData = () => {
        const { tab, mouseOver, filters } = this.state;
        return (
            <FetchingList
                params={{ type: tab, ...filters }}
                action={getServicesList}
                reducerName={`services.${tab}`}
                alwaysDidMountFetch={tab === "services"}
                renderItem={(item, i) => this.renderItem(item, i, mouseOver)}
            />
        );
    };

    renderPrintData = () => {
        const { tab, mouseOver, filters } = this.state;
        return (
            <FetchingList
                params={{ type: tab, ...filters }}
                defaultPageSize={999}
                action={getPrintServicesList}
                reducerName={"services.printServices"}
                alwaysDidMountFetch={tab === "services"}
                renderItem={(item, i) => this.renderItem(item, i, mouseOver)}
            />
        );
    };

    onSearchStart = (filters) => {
        this.setState({ filters });
    };

    onClearMinMax = () => {
        this.setState({
            fromMaxDate: CALENDAR.maxDate,
            toMinDate: CALENDAR.minDate,
            fromStartMaxDate: CALENDAR.maxDate,
            toStartMinDate: CALENDAR.minDate,
            toStartMaxDate: CALENDAR.maxDate,
            fromEndMinDate: CALENDAR.minDate,
            fromEndMaxDate: CALENDAR.maxDate,
            toEndMinDate: CALENDAR.minDate,
        });
    };

    renderSearch = (tab) => {
        const {
            fromMaxDate,
            toMinDate,
            fromStartMaxDate,
            toStartMinDate,
            toStartMaxDate,
            fromEndMinDate,
            fromEndMaxDate,
            toEndMinDate,
        } = this.state;

        if (tab === "service/region") {
            return (
                <Filter
                    fields={[
                        {
                            name: "diagnosisName",
                            type: "input",
                            label: "Название диагноза:",
                            placeholder: "Поиск по названию диагноза",
                        },
                        {
                            name: "moName",
                            type: "input",
                            label: "Мед. организация:",
                            placeholder: "Поиск по мед. организации",
                        },
                        {
                            name: "regionName",
                            type: "input",
                            label: "Регион:",
                            placeholder: "Поиск по региону",
                        },
                        {
                            name: "fromStartDate",
                            type: "date",
                            label: "С:",
                            placeholder: "Дата с (начало лечения)",
                            onChange: (value) => {
                                this.setState({
                                    toStartMinDate: value,
                                    fromEndMinDate: value,
                                    toEndMinDate:
                                        value > toEndMinDate
                                            ? value
                                            : toEndMinDate,
                                });
                            },
                            maxDate: fromStartMaxDate,
                        },
                        {
                            name: "toStartDate",
                            type: "date",
                            label: "По:",
                            placeholder: "Дата по (начало лечения)",
                            onChange: (value) =>
                                this.setState({ fromStartMaxDate: value }),
                            minDate: toStartMinDate,
                            maxDate: toStartMaxDate,
                        },
                        {
                            name: "fromEndDate",
                            type: "date",
                            label: "С:",
                            placeholder: "Дата с (окончание лечения)",
                            onChange: (value) =>
                                this.setState({ toEndMinDate: value }),
                            minDate: fromEndMinDate,
                            maxDate: fromEndMaxDate,
                        },
                        {
                            name: "toEndDate",
                            type: "date",
                            label: "По:",
                            placeholder: "Дата по (окончание лечения)",
                            onChange: (value) => {
                                this.setState({
                                    fromEndMaxDate: value,
                                    toStartMaxDate: value,
                                    fromStartMaxDate:
                                        value < fromStartMaxDate
                                            ? value
                                            : fromStartMaxDate,
                                });
                            },
                            minDate: toEndMinDate,
                        },
                    ]}
                    onSearch={this.onSearchStart}
                    onClearMinMax={this.onClearMinMax}
                />
            );
        }
        return (
            <Filter
                fields={[
                    {
                        name: "serviceTypeName",
                        type: "input",
                        label: "Название услуги:",
                        placeholder: "Поиск по названию услуги",
                    },
                    {
                        name: "fromDate",
                        type: "date",
                        label: "С:",
                        placeholder: "Дата с",
                        onChange: (value) =>
                            this.setState({ toMinDate: value }),
                        maxDate: fromMaxDate,
                    },
                    {
                        name: "toDate",
                        type: "date",
                        label: "По:",
                        placeholder: "Дата по",
                        onChange: (value) =>
                            this.setState({ fromMaxDate: value }),
                        minDate: toMinDate,
                    },
                    {
                        name: "moName",
                        type: "input",
                        label: "Мед. организация:",
                        placeholder: "Поиск по мед. организации",
                    },
                ]}
                onSearch={this.onSearchStart}
                onClearMinMax={this.onClearMinMax}
            />
        );
    };
}

const Controls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
`;

const PrintWrapper = styled.div``;

const MobileTabsWrapper = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const TabsWrapper = styled.div`
    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

const ListWrapper = styled.div`
    width: 100%;
`;

const PrintListWrapper = styled.div`
    width: 100%;
    opacity: 0;
    visibility: hidden;
    height: 0;
    overflow: hidden;

    @media print {
        opacity: 1;
        visibility: visible;
        height: auto;
        overflow: initial;
    }
`;

const PageInfo = styled.div`
    width: 500px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: auto;
    }
`;

Services.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object.isRequired,
    ward: PropTypes.bool.isRequired,
};

export default Services;
