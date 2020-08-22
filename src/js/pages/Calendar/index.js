import React, { Fragment, PureComponent } from "react";
import CalendarList from "pages/Calendar/List";
import PageHeading from "components/PageHeading";
import Heading from "containers/Heading";
import Column from "containers/Column";
import Row from "containers/Row";
import WidgetBlock from "components/WidgetBlock";
import CalendarEvents from "components/CalendarEvents";
import styled from "styled-components";
import { Calendar } from "components/Calendar";
import CalendarCell from "components/Calendar/CalendarCell";
// import {Checkbox} from "components/Checkbox";
import ScrollBar from "components/ScrollBar";
import { LK_MENU_ELEMENTS } from "config/menu";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import MonthSwitch from "components/MonthSwitch";
import { Desktop, Tablet } from "wrappers/responsive";
import { RESPONSIVE } from "config/consts";
import dayjs from "dayjs";
import { getMonth } from "../../utils/handleDate";
import { getCalendarList, getCalendarListOfDay } from "actions/calendar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CalendarEventForm from "pages/Calendar/CalendarEventForm";
import { calendarElements } from "config/consts";
import Week from "pages/Calendar/Week";
import { capitalize } from "lodash";
import { fontStyles } from "styledMixins/mixins";
import { formatDate } from "utils/formatDate";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Button } from "components/Button";

dayjs.extend(weekOfYear);
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

@connect((state) => ({
    calendarList: state.calendar.calendarList,
}))
class CalendarPage extends PureComponent {
    state = {
        tab: calendarElements[1].value,
        eventTab: "EVENT",
        label: calendarElements[1].value,
        tooltip: calendarElements[1].tooltip,
        currentDate: dayjs(),
        selectedDate: dayjs(),
        editingEvent: null,
    };

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        calendarList: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.getEvents("month");
        this.fetchOneDayData(dayjs());
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.tab !== this.state.tab ||
            prevState.currentDate.toISOString() !==
                this.state.currentDate.toISOString()
        ) {
            this.getEvents(this.state.tab);
        }
    }

    getEvents(type) {
        const { dispatch } = this.props;
        const { currentDate } = this.state;
        let fromDate, toDate;
        if (type === "month" || type === "year" || type === "week") {
            fromDate = currentDate.startOf(type).format("YYYY-MM-DD");
            toDate = currentDate.endOf(type).format("YYYY-MM-DD");
        }
        if (type === "quarter") {
            fromDate = this.calculateQuartal(currentDate.month())[0]
                .startOf("month")
                .format("YYYY-MM-DD");
            toDate = this.calculateQuartal(currentDate.month())[2]
                .endOf("month")
                .format("YYYY-MM-DD");
        }
        if (type === "list") {
            dispatch(
                getCalendarList({
                    params: {
                        fromDate: dayjs("01-01-1900").format("YYYY-MM-DD"),
                        toDate: dayjs("01-01-2100").format("YYYY-MM-DD"),
                    },
                    pageNumber: 1,
                    pageSize: 10,
                }),
            );
        } else {
            dispatch(
                getCalendarList({
                    params: { fromDate, toDate },
                    pageNumber: 1,
                    pageSize: 99999,
                }),
            );
        }
    }

    onChangeType = (element) => {
        const currentType = calendarElements.find(
            (item) => item.value === element,
        );
        this.setState({
            tab: currentType.value,
            label: currentType.label,
            tooltip: currentType.tooltip,
        });
    };

    changeCurrentDate = (type) => {
        const { tab, currentDate } = this.state;
        let newDate = currentDate.clone();
        if (type === "today") {
            newDate = dayjs();
        }
        if (type === "add") {
            if (tab === "month") {
                newDate = newDate.add(1, "month");
            }
            if (tab === "week") {
                newDate = newDate.add(1, "week");
            }
            if (tab === "quarter") {
                newDate = newDate.add(3, "month");
            }
            if (tab === "year") {
                newDate = newDate.add(1, "year");
            }
        }
        if (type === "subtract") {
            if (tab === "month") {
                newDate = newDate.subtract(1, "month");
            }
            if (tab === "week") {
                newDate = newDate.subtract(1, "week");
            }
            if (tab === "quarter") {
                newDate = newDate.subtract(3, "month");
            }
            if (tab === "year") {
                newDate = newDate.subtract(1, "year");
            }
        }
        this.setState({ currentDate: newDate });
    };

    changeEditingEvent = (id) => {
        this.setState({ editingEvent: id });
    };

    changeEventTab = (type) => {
        this.setState({ eventTab: type });
    };

    fetchOneDayData = (day) => {
        const { dispatch } = this.props;
        dispatch(getCalendarListOfDay(day.format("YYYY-MM-DD")));
        this.changeEventTab("EVENT");

        this.setState({
            selectedDate: day,
        });
    };

    render() {
        const { tab, tooltip, currentDate } = this.state;

        const month = getMonth(currentDate);

        return (
            <>
                <Heading>
                    <PageHeading title={LK_MENU_ELEMENTS.CALENDAR_PAGE.name} />
                </Heading>
                <Row fullHeight>
                    <Column>
                        <CalendarControls>
                            <Date>
                                <MonthSwitch
                                    onChange={this.changeCurrentDate}
                                    data={{
                                        month:
                                            tab === "month"
                                                ? capitalize(month)
                                                : tab === "quarter"
                                                ? currentDate.quarter() +
                                                  " квартал"
                                                : tab === "week"
                                                ? capitalize(month) +
                                                  " " +
                                                  (currentDate.week() -
                                                      currentDate
                                                          .startOf("month")
                                                          .week() +
                                                      1) +
                                                  " нед."
                                                : "",
                                        year: currentDate.year(),
                                    }}
                                    tooltip={tooltip}
                                />
                            </Date>
                            <TypeSelect>
                                <InlineFormFieldSelect
                                    onChange={this.onChangeType}
                                    options={calendarElements}
                                    label={"Календарь на:"}
                                    value={tab}
                                />
                            </TypeSelect>
                        </CalendarControls>
                        <Row fullHeight>
                            {tab === "list" && (
                                <>
                                    <Column fraction={5} paddings={0}>
                                        <Desktop>
                                            <ScrollBar>
                                                <WidgetBlock
                                                    title={
                                                        "Список всех событий"
                                                    }
                                                >
                                                    <CalendarList
                                                        onEditEvent={
                                                            this
                                                                .changeEditingEvent
                                                        }
                                                        onAddEvent={
                                                            this.changeEventTab
                                                        }
                                                    />
                                                </WidgetBlock>
                                            </ScrollBar>
                                        </Desktop>
                                        <Tablet>
                                            <WidgetBlock
                                                title={"Список всех событий"}
                                            >
                                                <CalendarList
                                                    onEditEvent={
                                                        this.changeEditingEvent
                                                    }
                                                    onAddEvent={
                                                        this.changeEventTab
                                                    }
                                                />
                                            </WidgetBlock>
                                        </Tablet>
                                    </Column>
                                    <Column
                                        fraction={7}
                                        paddingRight={0}
                                        mobilePaddingLeft={0}
                                    >
                                        <Desktop>
                                            <ScrollBar>
                                                {this.renderRecords()}
                                            </ScrollBar>
                                        </Desktop>
                                        <Tablet>{this.renderRecords()}</Tablet>
                                    </Column>
                                </>
                            )}
                            {tab === "week" && (
                                <Fragment>
                                    <Column fraction={6} paddings={0}>
                                        <Desktop>
                                            <ScrollBar>
                                                {this.renderWeek(currentDate)}
                                            </ScrollBar>
                                        </Desktop>
                                        <Tablet>
                                            {this.renderWeek(currentDate)}
                                        </Tablet>
                                    </Column>
                                    <Column
                                        fraction={6}
                                        paddingRight={0}
                                        mobilePaddingLeft={0}
                                    >
                                        <Desktop>
                                            <ScrollBar>
                                                {this.renderRecords()}
                                            </ScrollBar>
                                        </Desktop>
                                        <Tablet>{this.renderRecords()}</Tablet>
                                    </Column>
                                </Fragment>
                            )}
                            {(tab === "month" ||
                                tab === "quarter" ||
                                tab === "year") && (
                                <>
                                    <Column fixed={360} paddings={0}>
                                        <Desktop>
                                            <ScrollBar>
                                                {this.renderCalendar(tab)}
                                            </ScrollBar>
                                        </Desktop>
                                        <Tablet>
                                            {this.renderCalendar(tab)}
                                        </Tablet>
                                    </Column>
                                    <Column
                                        auto
                                        paddingRight={0}
                                        mobilePaddingLeft={0}
                                    >
                                        <Desktop>
                                            <ScrollBar>
                                                {this.renderRecords()}
                                            </ScrollBar>
                                        </Desktop>
                                        <Tablet>{this.renderRecords()}</Tablet>
                                    </Column>
                                </>
                            )}
                        </Row>
                    </Column>
                </Row>
            </>
        );
    }

    renderCalendar = (type) => {
        const { selectedDate } = this.state;
        return (
            <ContentWrapper>
                <CalendarWrapper>
                    <WidgetBlock title={this.renderHeading(type)}>
                        {type === "month" && this.renderMonth(selectedDate)}
                        {type === "quarter" &&
                            this.renderQuarter(selectedDate.month())}
                        {type === "year" &&
                            this.renderYear(selectedDate.year())}
                        {type === "week" && this.renderWeek(selectedDate)}
                    </WidgetBlock>
                </CalendarWrapper>

                {/*<CalendarFilters>*/}
                {/*    <WidgetBlock title={'Фильтры'}>*/}
                {/*        <CheckboxRow>*/}
                {/*            <CheckboxColumn>*/}
                {/*                <CheckboxWrapper>*/}
                {/*                    <Checkbox name={''} label={'Праздники'} onChange={() => {*/}
                {/*                    }}/>*/}
                {/*                </CheckboxWrapper>*/}
                {/*                <CheckboxWrapper>*/}
                {/*                    <Checkbox name={''} label={'Приемы лекарств'} checked={true} onChange={() => {*/}
                {/*                    }}/>*/}
                {/*                </CheckboxWrapper>*/}
                {/*                <CheckboxWrapper>*/}
                {/*                    <Checkbox name={''} label={'Записи к врачам'} checked={true} onChange={() => {*/}
                {/*                    }}/>*/}
                {/*                </CheckboxWrapper>*/}
                {/*            </CheckboxColumn>*/}
                {/*            <CheckboxColumn>*/}
                {/*                <CheckboxWrapper>*/}
                {/*                    <Checkbox name={''} label={'Напоминания'} checked={true} onChange={() => {*/}
                {/*                    }}/>*/}
                {/*                </CheckboxWrapper>*/}
                {/*                <CheckboxWrapper>*/}
                {/*                    <Checkbox name={''} label={'Диспансеризации'} checked={true} onChange={() => {*/}
                {/*                    }}/>*/}
                {/*                </CheckboxWrapper>*/}
                {/*                <CheckboxWrapper>*/}
                {/*                    <Checkbox name={''} label={'Другое'} checked={true} onChange={() => {*/}
                {/*                    }}/>*/}
                {/*                </CheckboxWrapper>*/}
                {/*            </CheckboxColumn>*/}
                {/*        </CheckboxRow>*/}
                {/*    </WidgetBlock>*/}
                {/*</CalendarFilters>*/}
            </ContentWrapper>
        );
    };

    renderRecords = () => {
        if (this.state.eventTab === "EVENT") {
            if (this.state.tab === "week") {
                return (
                    <>
                        <WidgetBlock title={"Выберите событие из списка"}>
                            <ButtonWrapper>
                                <Button
                                    label={"Добавить событие"}
                                    onClick={() => this.changeEventTab()}
                                />
                            </ButtonWrapper>
                        </WidgetBlock>
                    </>
                );
            } else {
                return (
                    <>
                        <WidgetBlock
                            title={
                                "События на " +
                                formatDate(this.state.selectedDate)
                            }
                        >
                            <CalendarEvents
                                onAddEvent={this.changeEventTab}
                                onEditEvent={this.changeEditingEvent}
                            />
                        </WidgetBlock>
                    </>
                );
            }
        } else {
            return (
                <>
                    <WidgetBlock
                        title={
                            this.state.editingEvent
                                ? "Изменить событие"
                                : "Добавить событие"
                        }
                    >
                        <CalendarEventForm
                            onAddEvent={this.changeEventTab}
                            editingEvent={this.state.editingEvent}
                            currentDate={this.state.currentDate}
                            selectedDate={this.state.selectedDate}
                        />
                    </WidgetBlock>
                </>
            );
        }
    };

    renderMonth = (currentDate) => {
        return (
            <Calendar
                renderItem={(item, i) => (
                    <CalendarCell
                        key={i}
                        index={i}
                        data={item}
                        onClick={(item) => this.fetchOneDayData(item.day)}
                    />
                )}
                currentMonth={currentDate.month()}
                currentYear={currentDate.year()}
                currentDate={dayjs(currentDate)}
            />
        );
    };

    renderYear = (currentYear) => {
        const { currentDate } = this.state;
        let rows = [];
        for (let month = 0; month < 12; month++) {
            rows.push(
                <MonthWrapper>
                    <Month>
                        {capitalize(getMonth(dayjs().set("month", month)))}
                    </Month>
                    <Calendar
                        key={month}
                        renderItem={(item, i) => (
                            <CalendarCell
                                key={i}
                                index={i}
                                data={item}
                                onClick={(item) =>
                                    this.fetchOneDayData(item.day)
                                }
                            />
                        )}
                        currentMonth={month}
                        currentYear={currentYear}
                        currentDate={dayjs(currentDate)}
                    />
                </MonthWrapper>,
            );
        }
        return <>{rows}</>;
    };

    renderWeek = (currentDate) => {
        return (
            <Week
                currentDate={currentDate}
                onEditEvent={this.changeEditingEvent}
                onAddEvent={this.changeEventTab}
                onClick={(item) => this.fetchOneDayData(item.day)}
            />
        );
    };

    renderQuarter = (currentMonth) => {
        const { currentDate } = this.state;
        const quartal = this.calculateQuartal(currentMonth);
        const rows = quartal.map((date, i) => {
            return (
                <MonthWrapper key={i}>
                    <Month>{capitalize(getMonth(date))}</Month>
                    <Calendar
                        key={date.month()}
                        renderItem={(item, i) => (
                            <CalendarCell
                                key={i}
                                index={i}
                                data={item}
                                onClick={(item) =>
                                    this.fetchOneDayData(item.day)
                                }
                            />
                        )}
                        currentMonth={date.month()}
                        currentYear={date.year()}
                        currentDate={dayjs(currentDate)}
                    />
                </MonthWrapper>
            );
        });
        return <>{rows}</>;
    };

    calculateQuartal = (currentMonth) => {
        const quartal = [];
        const { currentDate } = this.state;
        const residue = currentMonth % 3;
        if (residue === 0) {
            quartal.push(currentDate);
            quartal.push(currentDate.clone().add(1, "month"));
            quartal.push(currentDate.clone().add(2, "month"));
        } else if (residue === 1) {
            quartal.push(currentDate.clone().subtract(1, "month"));
            quartal.push(currentDate);
            quartal.push(currentDate.clone().add(1, "month"));
        } else if (residue === 2) {
            quartal.push(currentDate.clone().subtract(2, "month"));
            quartal.push(currentDate.clone().subtract(1, "month"));
            quartal.push(currentDate);
        }
        return quartal;
    };

    renderHeading(type) {
        switch (type) {
            case "month":
                return "Календарь на месяц";
            case "year":
                return "Календарь на год";
            case "quarter":
                return "Календарь на квартал";
            case "week":
                return "Календарь на неделю";
            case "list":
                return "Список всех событий";
            default:
                return "";
        }
    }
}

const MonthWrapper = styled.div`
    margin-bottom: 20px;
`;

const Month = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-bottom: 16px;
`;

const CalendarWrapper = styled.div`
    margin-bottom: 16px;
    width: 100%;
`;

const CalendarControls = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    width: 100%;
`;

const Date = styled.div`
    margin-right: 16px;
`;

const TypeSelect = styled.div`
    width: 250px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    display: flex;
`;

export default CalendarPage;
