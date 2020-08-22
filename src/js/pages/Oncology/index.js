import React, { PureComponent } from "react";
import PageHeading from "components/PageHeading";
import { LK_MAP_ELEMENTS } from "config/menu";
import Heading from "containers/Heading";
import Row from "containers/Row";
import Column from "containers/Column";
import WidgetBlock from "components/WidgetBlock";
import FormField from "components/FormField";
import TextBlock from "components/TextBlock";
import styled, { withTheme } from "styled-components";
import { CALENDAR, RESPONSIVE } from "config/consts";
import { Button } from "components/Button";
import { getCurrentNotification } from "actions/onco";
import OncoMeasuringResults from "components/OncoMeasuringResults";
import { FetchingList } from "components/FetchingList";
import dayjs from "dayjs";
import OncoMeasuring from "components/OncoMeasuring";
import { Calendar } from "components/Calendar";
import CalendarCell from "components/Calendar/CalendarCell";
//import MonthSwitch from "components/MonthSwitch";
import { Desktop, Tablet } from "wrappers/responsive";
//import isEmpty from "lodash/isEmpty";
import MonthSwitch from "components/MonthSwitch";
import { getAskDoctors, getEventsList } from "actions/pregnancy";
import ScrollBar from "components/ScrollBar";
import OncologyEvents from "components/OncologyEvents";
import Chat from "components/Chat";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showPopup } from "actions/popup";

//import { FetchingList } from "components/FetchingList";
//import PregnancyMeasuringResults from "components/PregnancyMeasuringResults";
//import PropTypes from "prop-types";

@connect(
    (state) => ({
        popup: state.popup,
        askDoctors: state.pregnancy.askDoctors,
    }),
    {
        showPopup,
        getAskDoctors,
    },
)
@withTheme
class Oncology extends PureComponent {
    state = {
        currentDate: dayjs(),
        currentYear: dayjs().get("year"),
        currentMonth: dayjs().get("month"),
        maxDate: dayjs(),
        disabledInput: true,
        currentInfo: {},
        scrollTop: -1,
    };

    static propsTypes = {
        showPopup: PropTypes.func,
        askDoctors: PropTypes.object.isRequired,
        theme: PropTypes.object,
    };

    renderContent = () => {
        const params = {};
        if (this.state.scrollTop !== -1) {
            params.scrollTop = this.state.scrollTop;
        }

        return (
            <>
                <Heading>
                    <PageHeading title={LK_MAP_ELEMENTS.ONCOLOGY_PAGE.name} />
                </Heading>
                <Row fullHeight>
                    <Column fraction={7}>
                        <Desktop>
                            <ScrollBar>{this.renderLeft()}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderLeft()}</Tablet>
                    </Column>
                    <Column fraction={5}>
                        <Desktop>
                            <ScrollBar>{this.renderRight()}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderRight()}</Tablet>
                    </Column>
                </Row>
            </>
        );
    };

    renderLeft = () => {
        return (
            <LeftWrapper>
                <Row>
                    <Column fraction={6} paddingLeft={0}>
                        <Row>
                            <WidgetBlock title={"Диагноз"}>
                                <Row>
                                    <TextBlock>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Vestibulum quis sem
                                        justo. Aenean ac velit magna. Proin at
                                        ex pulvinar, tincidunt tortor finibus,
                                        varius orci. Nulla a nisl hendrerit,
                                        scelerisque nulla id, vehicula arcu.
                                        Duis malesuada eros quam. Vivamus
                                        condimentum tellus nunc, a porta ex
                                        posuere at. Nullam cursus nec nulla eu
                                        lacinia. Pellentesque habitant morbi
                                        tristique
                                    </TextBlock>
                                </Row>
                            </WidgetBlock>
                        </Row>
                    </Column>
                    <Column fraction={6} paddings={0}>
                        <WidgetBlock title={"Показатели"}>
                            <Row>
                                <FormField
                                    label={"Рост"}
                                    value={"160 см"}
                                    disabled
                                />
                            </Row>
                            <Row>
                                <FormField
                                    label={"Обычное давление"}
                                    value={"120/80 мм рт. ст."}
                                    disabled
                                />
                            </Row>
                            <Row>
                                <FormField
                                    label={"Начальный вес"}
                                    value={"55 кг"}
                                    disabled
                                />
                            </Row>
                        </WidgetBlock>
                    </Column>
                </Row>
                <Row>
                    <Column fraction={6} paddingLeft={0}>
                        <ButtonItem>
                            <Button
                                label={"Закрыть раздел"}
                                onClick={() => {}}
                            />
                        </ButtonItem>
                    </Column>
                    <Column fraction={6} paddings={0}>
                        <Button
                            label={"Изменить показатели"}
                            onClick={() => {}}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddingLeft={0}>
                        <Actions>
                            <ButtonItem>
                                <NotificationNumber>
                                    <TextBlock
                                        font={{
                                            color: "#fff",
                                            family: "bold",
                                            size: "12px",
                                        }}
                                    >
                                        99
                                    </TextBlock>
                                </NotificationNumber>
                                <Button
                                    label={"Чат с врачом"}
                                    onClick={() => {
                                        showPopup(
                                            "Чат с вашим врачом",
                                            <Chat askDoctors={{}} />,
                                            null,
                                            { scrollable: false },
                                        );
                                    }}
                                />
                            </ButtonItem>
                            <ButtonItem>
                                <Button label={"Архив"} onClick={() => {}} />
                            </ButtonItem>
                            <ButtonItem>
                                <Button
                                    label={"Поделиться"}
                                    onClick={() => {}}
                                />
                            </ButtonItem>
                        </Actions>
                    </Column>
                </Row>
                <Row>
                    <WidgetBlock title={"Измерения"} accordeon>
                        <FetchingList
                            rigid
                            action={getCurrentNotification}
                            reducerName={"onco"}
                            objectName={"notifications"}
                            hidePagination={true}
                            renderItem={(item, i) => (
                                <OncoMeasuringResults
                                    key={i}
                                    data={item}
                                    onClickCallback={() => {
                                        this.setState(
                                            {
                                                disabledInput: false,
                                                scrollTop: 0,
                                            },
                                            () => {
                                                this.setState({
                                                    scrollTop: -1,
                                                });
                                            },
                                        );
                                    }}
                                />
                            )}
                        />
                    </WidgetBlock>
                </Row>
                <Row>
                    <WidgetBlock
                        title={"Мои измерения"}
                        accordeon={this.isEmpty}
                    >
                        <OncoMeasuring currentDate={this.state.currentDate} />
                    </WidgetBlock>
                </Row>
            </LeftWrapper>
        );
    };

    renderRight = () => {
        // const { popup, showPopup, messageExist } = this.props;
        const {
            //    currentDate,
            currentInfo,
            maxDate,
            currentMonth,
            currentYear,
        } = this.state;
        //if (isEmpty(currentInfo)) return null;
        const { lastMenstruationDate } = currentInfo;
        // const disableLeftArrow = dayjs()
        //     .set("month", currentMonth)
        //     .set("year", currentYear)
        //     .subtract(1, "month")
        //     .endOf("month")
        //     .isBefore(dayjs(lastMenstruationDate), "day");
        // const disableRightArrow = dayjs()
        //     .set("month", currentMonth)
        //     .set("year", currentYear)
        //     .add(1, "month")
        //     .startOf("month")
        //     .isAfter(dayjs(maxDate).add(1, "day"), "day");
        return (
            <RightWrapper>
                <Row>
                    <WidgetBlock title={"Календарь"} accordeon>
                        <Column fixed={400}>
                            <CalendarWrapper>
                                <MonthSwitch
                                    hideToday
                                    disabledLeft={false}
                                    disabledRight={false}
                                    onChange={(direction) =>
                                        this.onClickArrow(direction)
                                    }
                                    tooltip={"месяц"}
                                    data={{
                                        month: CALENDAR.months.find(
                                            (e) => e.value === currentMonth,
                                        ).name,
                                        year: currentYear,
                                    }}
                                />
                                <Calendar
                                    currentDate={this.state.currentDate}
                                    currentMonth={this.state.currentMonth}
                                    currentYear={this.state.currentYear}
                                    minDate={dayjs(
                                        lastMenstruationDate,
                                    ).subtract(1, "day")}
                                    maxDate={maxDate}
                                    renderItem={(item) => (
                                        <CalendarCell
                                            hideEvents={true}
                                            key={`calendar-cell-${item.row}-${item.weekday}`}
                                            data={item}
                                            onClick={({ day }) => {
                                                this.clickDate(day);
                                            }}
                                        />
                                    )}
                                />
                            </CalendarWrapper>
                        </Column>
                    </WidgetBlock>
                </Row>
                <Row fullHeight>
                    <WidgetBlock title={"События"} accordeon>
                        <EventsWrapper>
                            <FetchingList
                                rigid
                                action={getEventsList}
                                reducerName={"pregnancy"}
                                objectName={"events"}
                                renderItem={(item, i) => (
                                    <OncologyEvents key={i} data={item} />
                                )}
                            />
                        </EventsWrapper>
                    </WidgetBlock>
                </Row>
            </RightWrapper>
        );
    };

    render() {
        return <>{this.renderContent()}</>;
    }
}

const Actions = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-bottom: 16px;
    }
`;

const ButtonItem = styled.div`
    margin-right: 16px;
    margin-bottom: 16px;
    position: relative;

    &:last-child {
        margin-right: 0;
    }
`;

const NotificationNumber = styled.div`
    position: absolute;
    right: -10px;
    top: -10px;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    background: ${(props) => props.theme.colors.gradients.gradientOne};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CalendarWrapper = styled.div`
    margin-bottom: 16px;
`;

const LeftWrapper = styled.div`
    margin-bottom: 16px;
`;

const RightWrapper = styled.div`
    margin-bottom: 16px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

const EventsWrapper = styled.div`
   // height: 450px;
   //
   //  @media all and (max-width: ${RESPONSIVE.tablet}) {
   //      height: 250px;
   //  }
`;

export default Oncology;
