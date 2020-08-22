import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import Column from "containers/Column";
import Row from "containers/Row";
import WidgetBlock from "components/WidgetBlock";
import styled from "styled-components";
import CalendarEvent from "components/CalendarEvent";
import { List } from "components/List";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import PregnancyScreening from "components/PregnancyScreening";
import PregnancyEvents from "components/PregnancyEvents";
import PregnancyMeasuringResults from "components/PregnancyMeasuringResults";
import PregnancyMeasuring from "components/PregnancyMeasuring";
import UsefulInfo from "components/UsefulInfo";
import FormField from "components/FormField";
import { Button } from "components/Button";
import ScrollBar from "components/ScrollBar";
import { Calendar } from "components/Calendar";
import CalendarCell from "components/Calendar/CalendarCell";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Desktop, Tablet } from "wrappers/responsive";
import Chat from "components/Chat";
import { showPopup } from "actions/popup";
import isEqual from "lodash/isEqual";
import {
    checkUnreadMessages,
    getCurrentNotification,
    getCurrentPregnancyInfo,
    getEventsList,
    getHolidayList,
    saveInitialValues,
    getCurrentScreening,
    getMessages,
    getAskDoctors,
    checkUnreadMessagesFullFiled,
    sendMessage,
} from "actions/pregnancy";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PregnancyComplications from "pages/Pregnancy/PregnancyComplications";
import {
    formatDate,
    serverFormatDate,
    formatDateWithDayNames,
} from "utils/formatDate";
import archiveListHandler from "pages/Pregnancy/getArchiveList";
import Share from "pages/Pregnancy/Share";
import dayjs from "dayjs";
import { FetchingList } from "components/FetchingList";
import InfoIcon from "icons/InfoIcon";
import { CALENDAR, RESPONSIVE } from "config/consts";
import { form } from "wrappers/Formik";
import { primaryValuesFields } from "pages/Pregnancy/meta";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormField from "components/InlineFormField";
import { sendForm } from "utils/sendForm";
import NoData from "components/NoData";
import MonthSwitch from "components/MonthSwitch";
import { hasAccessToSection } from "modules/hasAccessToSection";
import PregnancyClose from "pages/Pregnancy/PregnancyClose";
import { Loader } from "components/Loader";
import PregnancyActivation from "pages/Pregnancy/PregnancyActivation";
import { checkPregnancyEmail } from "actions/pregnancy";
import { Link } from "react-router-dom";
import { fontStyles } from "styledMixins/mixins";
import { createWebSocket } from "utils/createWebSocket";
import { pregnancyPath } from "config/paths";
@withRouter
@connect(
    (state) => ({
        currentInfo: state.pregnancy.currentInfo,
        messageExist: state.pregnancy.messageExist,
        currentScreening: state.pregnancy.currentScreening,
        popup: state.popup,
        askDoctors: state.pregnancy.askDoctors,
        tabsThatIsNotEmpty: state.pregnancy.usefulArticle.tabsThatIsNotEmpty,
    }),
    {
        showPopup,
        getCurrentPregnancyInfo,
        getHolidayList,
        checkUnreadMessages,
        saveInitialValues,
        getCurrentScreening,
        getAskDoctors,
    },
)
@form({
    fields: primaryValuesFields,
})
@hasAccessToSection()
class PregnancyPage extends PureComponent {
    state = {
        currentDate: dayjs(),
        currentYear: dayjs().get("year"),
        currentMonth: dayjs().get("month"),
        maxDate: dayjs(),
        disabledInput: true,
        currentInfo: {},
        emailChecked: false,
        scrollTop: -1,
    };

    static propTypes = {
        showPopup: PropTypes.func,
        getCurrentPregnancyInfo: PropTypes.func,
        getHolidayList: PropTypes.func,
        checkUnreadMessages: PropTypes.func,
        messageExist: PropTypes.bool,
        currentInfo: PropTypes.object,
        dispatch: PropTypes.func,
        popup: PropTypes.object,
        changeInitialValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        saveInitialValues: PropTypes.func.isRequired,
        getCurrentScreening: PropTypes.func.isRequired,
        currentScreening: PropTypes.object.isRequired,
        getAskDoctors: PropTypes.func.isRequired,
        askDoctors: PropTypes.object.isRequired,
        tabsThatIsNotEmpty: PropTypes.array,
        chatData: PropTypes.array.isRequired,
        chatIsFetching: PropTypes.bool.isRequired,
    };

    emptyText = "Нет информации";

    componentDidMount() {
        checkPregnancyEmail()
            .then(() => {
                const { currentInfo } = this.props;
                this.setState(
                    {
                        emailChecked: true,
                    },
                    () => {
                        if (!isEmpty(currentInfo)) {
                            this.fillEmptyCurrentInfo(currentInfo);
                        } else {
                            this.clickDate(this.state.currentDate);
                        }
                    },
                );
            })
            .catch(() => {
                const { showPopup } = this.props;
                showPopup(
                    "E-mail не подтвержден",
                    <EmailText>
                        Для использования раздела Ведения беременности
                        необходимо указать и подтвердить адрес электронной почты
                        в разделе{" "}
                        <Link to={LK_MENU_ELEMENTS.MAIN_PAGE.path}>
                            Мои контакты
                        </Link>
                    </EmailText>,
                );
            });
    }

    componentDidUpdate(prevProps) {
        const { currentInfo } = this.props;

        if (isEmpty(prevProps.currentInfo) && !isEmpty(currentInfo)) {
            this.fillEmptyCurrentInfo(currentInfo);
        } else if (!isEqual(prevProps.currentInfo, currentInfo)) {
            this.setState({
                currentInfo,
            });
        }
    }

    fillEmptyCurrentInfo = (currentInfo) => {
        const {
            changeInitialValues,
            checkUnreadMessages,
            getCurrentScreening,
            getAskDoctors,
        } = this.props;
        const maxDate = dayjs(currentInfo.estimatedEndDate).add(42, "days");
        let currentDate = dayjs();
        const maxBeforeToday = maxDate.isBefore(currentDate);
        if (maxBeforeToday) currentDate = maxDate;
        this.setState(
            {
                maxDate,
                currentInfo,
                currentDate,
                currentMonth: currentDate.get("month"),
                currentYear: currentDate.get("year"),
            },
            () => {
                changeInitialValues({
                    id: currentInfo.id,
                    height: currentInfo.height,
                    initialWeight: currentInfo.initialWeight,
                    normalSystolicPressure: currentInfo.normalSystolicPressure,
                    normalDiastolicPressure:
                        currentInfo.normalDiastolicPressure,
                });
                if (maxBeforeToday) this.clickDate(currentDate);

                getCurrentScreening();
                checkUnreadMessages();
                getAskDoctors();
                createWebSocket.call(this, "pregnancy", getMessages);
                // this.createWebSocket();
            },
        );
    };

    onUpdate = () => {
        sendForm(this.props, primaryValuesFields).then((response) => {
            const { saveInitialValues } = this.props;
            const { disabledInput } = this.state;
            this.setState({ disabledInput: !disabledInput });
            saveInitialValues(response);
        });
    };

    clickDate = (currentDate = dayjs()) => {
        this.setState({
            currentDate,
        });
        const serverDate = serverFormatDate(currentDate);

        const { getCurrentPregnancyInfo } = this.props;
        getCurrentPregnancyInfo(serverDate);
    };

    // createWebSocket = () => {
    //     let root;
    //     if (location.hostname === "localhost") {
    //         root = BASE_URL.replace("https://", "wss://");
    //     } else if (location.origin.indexOf("https://") !== -1) {
    //         root = location.origin.replace("https://", "wss://") + "/sizl/";
    //     } else {
    //         root = location.origin.replace("http://", "ws://") + "/sizl/";
    //     }

    //     const endpoint = `${root}/stomp`;
    //     // const mgfoms_sessionid = cookie.load('mgfoms_sessionid')

    //     const socket = new WebSocket(
    //         endpoint +
    //             "?mgfoms_sessionid=" +
    //             localStorage.getItem("mgfoms_sessionid"),
    //     );
    //     const client = webstomp.over(socket, { debug: false });
    //     client.connect({}, () => {
    //         client.subscribe("/user/topic/pregnancy/unread", (frame) => {
    //             const unreadMessage = JSON.parse(frame.body).exist;
    //             const { dispatch } = this.props;

    //             if (unreadMessage) {
    //                 dispatch(getMessages());
    //             }
    //         });
    //     });
    // };

    renderContent = () => {
        const { currentInfo } = this.props;
        if (!currentInfo.id || currentInfo.paused) {
            return <PregnancyActivation />;
        }
        const params = {};
        if (this.state.scrollTop !== -1) {
            params.scrollTop = this.state.scrollTop;
        }
        return (
            <>
                <Heading>
                    <PageHeading title={LK_MENU_ELEMENTS.PREGNANCY_PAGE.name} />
                </Heading>
                <Row fullHeight>
                    {/*<PregnancyActivation />*/}
                    <Column fixed={400}>
                        <Desktop>
                            <ScrollBar>{this.renderLeft()}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderLeft()}</Tablet>
                    </Column>
                    <Column auto>
                        <Desktop>
                            <ScrollBar noScrollX {...params}>
                                {this.renderRight()}
                            </ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderRight()}</Tablet>
                    </Column>
                </Row>
            </>
        );
    };

    render() {
        return (
            <>
                {isEmpty(this.props.currentInfo) || !this.state.emailChecked ? (
                    <Loader />
                ) : (
                    this.renderContent()
                )}
            </>
        );
    }

    onClickArrow = (direction) => {
        const { currentMonth, currentYear } = this.state;

        const type = direction === "add" ? 1 : -1;

        const abstactDate = dayjs()
            .set("month", currentMonth)
            .set("year", currentYear)
            .add(type, "month");
        this.setState({
            currentMonth: abstactDate.get("month"),
            currentYear: abstactDate.get("year"),
        });
    };

    renderLeft = () => {
        const { popup, showPopup, messageExist } = this.props;
        const {
            currentDate,
            currentInfo,
            maxDate,
            currentMonth,
            currentYear,
        } = this.state;
        if (isEmpty(currentInfo)) return null;
        const { lastMenstruationDate } = currentInfo;
        const disableLeftArrow = dayjs()
            .set("month", currentMonth)
            .set("year", currentYear)
            .subtract(1, "month")
            .endOf("month")
            .isBefore(dayjs(lastMenstruationDate), "day");
        const disableRightArrow = dayjs()
            .set("month", currentMonth)
            .set("year", currentYear)
            .add(1, "month")
            .startOf("month")
            .isAfter(dayjs(maxDate).add(1, "day"), "day");
        return (
            <LeftWrapper>
                <CalendarWrapper>
                    <MonthSwitch
                        hideToday
                        disabledLeft={disableLeftArrow}
                        disabledRight={disableRightArrow}
                        onChange={(direction) => this.onClickArrow(direction)}
                        tooltip={"месяц"}
                        data={{
                            month: CALENDAR.months.find(
                                (e) => e.value === currentMonth,
                            ).name,
                            year: currentYear,
                        }}
                    />
                    <Calendar
                        currentDate={currentDate}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        minDate={dayjs(lastMenstruationDate).subtract(1, "day")}
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
                <Actions>
                    <ButtonItem>
                        {!popup.show && messageExist && (
                            <InfoWrapper>
                                <InfoIcon color={"#fff"} opacity={0.8} />
                            </InfoWrapper>
                        )}
                        <Button
                            label={"Спросить врача"}
                            onClick={() => {
                                showPopup(
                                    "Чат с вашим врачом",
                                    <Chat
                                        askDoctors={this.props.askDoctors}
                                        checkUnreadMessagesFullFiled={
                                            checkUnreadMessagesFullFiled
                                        }
                                        getMessages={getMessages}
                                        sendMessage={sendMessage}
                                        path={pregnancyPath}
                                        type={"pregnancy"}
                                    />,
                                    null,
                                    { scrollable: false },
                                );
                            }}
                        />
                    </ButtonItem>
                    <ButtonItem>
                        <Button
                            label={"Осложнения"}
                            onClick={() => {
                                showPopup(
                                    "Все осложнения",
                                    <PregnancyComplications />,
                                );
                            }}
                        />
                    </ButtonItem>
                    <ButtonItem>
                        <Button
                            label={"Архив беременностей"}
                            onClick={() => archiveListHandler(showPopup)}
                        />
                    </ButtonItem>
                    <ButtonItem>
                        <Button
                            label={"Поделиться"}
                            onClick={() => {
                                showPopup("Поделиться", <Share />);
                            }}
                        />
                    </ButtonItem>
                </Actions>
                <Row>
                    <WidgetBlock title={"События на выбранный день"}>
                        <FetchingList
                            rigid
                            hidePagination
                            params={{ date: serverFormatDate(currentDate) }}
                            action={getHolidayList}
                            objectName={"holiday"}
                            reducerName={"pregnancy"}
                            renderItem={({ title, image, id }) => (
                                <CalendarEvent
                                    key={`holiday_${id}`}
                                    title={title}
                                    image={image}
                                />
                            )}
                        />
                    </WidgetBlock>
                </Row>
            </LeftWrapper>
        );
    };

    renderRight = () => {
        const {
            values,
            currentScreening,
            tabsThatIsNotEmpty,
            showPopup,
        } = this.props;
        const { disabledInput, currentInfo, currentDate } = this.state;
        const {
            currentWeight,
            estimatedEndDate,
            lastMenstruationDate,
            // actualBirthDate,
        } = currentInfo;
        const screeningData =
            get(currentScreening, "pregnancyContraindications.items") || [];
        return (
            <RightWrapper>
                <Row>
                    <Column fraction={6} paddings={0}>
                        <WidgetWrapper>
                            <WidgetBlock title={"Срок беременности"}>
                                <Row>
                                    <FormField
                                        label={`На ${formatDateWithDayNames(
                                            currentDate,
                                            true,
                                        )}`}
                                        value={`${currentInfo.weeks} недель и ${currentInfo.days} дней - ${currentInfo.trimester}-й триместр`}
                                        disabled
                                    />
                                </Row>
                                <Row>
                                    <FormField
                                        label={
                                            "Первый день последней менструации"
                                        }
                                        value={formatDate(lastMenstruationDate)}
                                        placeholder={this.emptyText}
                                        disabled
                                    />
                                </Row>
                                <Row>
                                    <FormField
                                        label={"Примерная дата родов"}
                                        value={formatDate(estimatedEndDate)}
                                        placeholder={this.emptyText}
                                        disabled
                                    />
                                </Row>
                                <Row>
                                    <Button
                                        label={"Закрыть беременность"}
                                        onClick={() => {
                                            showPopup(
                                                "Закрыть беременность",
                                                <PregnancyClose />,
                                            );
                                        }}
                                    />
                                </Row>
                            </WidgetBlock>
                        </WidgetWrapper>
                    </Column>
                    <Column fraction={6} paddingRight={0} mobilePaddingLeft={0}>
                        <WidgetWrapper>
                            <WidgetBlock title={"Начальные показатели"}>
                                <Row>
                                    <FormikFormField
                                        name={"height"}
                                        component={(props) => (
                                            <InlineFormField
                                                label={"Рост:"}
                                                {...props}
                                                value={
                                                    props.value
                                                        ? `${props.value}${
                                                              disabledInput
                                                                  ? " см"
                                                                  : ""
                                                          }`
                                                        : ""
                                                }
                                                placeholder={this.emptyText}
                                                disabled={disabledInput}
                                                type={
                                                    disabledInput
                                                        ? ""
                                                        : "number"
                                                }
                                            />
                                        )}
                                    />
                                </Row>
                                {disabledInput ? (
                                    <Row>
                                        <InlineFormField
                                            label={"Обычное давление:"}
                                            value={`${values.normalSystolicPressure ||
                                                "--"}/${values.normalDiastolicPressure ||
                                                "--"} мм.рт.ст.`}
                                            disabled={true}
                                        />
                                    </Row>
                                ) : (
                                    <>
                                        <Row>
                                            <FormikFormField
                                                name={"normalSystolicPressure"}
                                                component={(props) => (
                                                    <InlineFormField
                                                        {...props}
                                                        label={
                                                            "Систолического:"
                                                        }
                                                        placeholder={
                                                            this.emptyText
                                                        }
                                                        type={"number"}
                                                    />
                                                )}
                                            />
                                        </Row>
                                        <Row>
                                            <FormikFormField
                                                name={"normalDiastolicPressure"}
                                                component={(props) => (
                                                    <InlineFormField
                                                        {...props}
                                                        label={
                                                            "Диастолического:"
                                                        }
                                                        placeholder={
                                                            this.emptyText
                                                        }
                                                        type={"number"}
                                                    />
                                                )}
                                            />
                                        </Row>
                                    </>
                                )}
                                <Row>
                                    <FormikFormField
                                        name={"initialWeight"}
                                        component={(props) => (
                                            <InlineFormField
                                                {...props}
                                                label={"Начальный вес:"}
                                                placeholder={this.emptyText}
                                                disabled={disabledInput}
                                                type={"number"}
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <InlineFormField
                                        label={"Текущий вес:"}
                                        value={
                                            currentWeight
                                                ? `${currentWeight}${
                                                      disabledInput ? " кг" : ""
                                                  }`
                                                : ""
                                        }
                                        placeholder={this.emptyText}
                                        disabled={true}
                                    />
                                </Row>
                                <ButtonWrapper>
                                    <Button
                                        label={"Изменить начальные показатели"}
                                        onClick={this.onUpdate}
                                    />
                                </ButtonWrapper>
                            </WidgetBlock>
                        </WidgetWrapper>
                    </Column>
                </Row>
                <Row>
                    <WidgetBlock
                        title={"Результаты проверки ваших лекарств"}
                        accordeon={!isEmpty(screeningData)}
                    >
                        {isEmpty(screeningData) ? (
                            <NoData
                                title={"Результат проверки отсутствует"}
                                message={
                                    "Нет результатов проверки ваших лекарств"
                                }
                            />
                        ) : (
                            <List
                                rigid
                                data={screeningData}
                                renderItem={(item, i) => (
                                    <PregnancyScreening key={i} data={item} />
                                )}
                            />
                        )}
                    </WidgetBlock>
                </Row>
                <Row>
                    <WidgetBlock title={"События"} accordeon>
                        <EventsWrapper>
                            <ScrollBar>
                                <FetchingList
                                    rigid
                                    action={getEventsList}
                                    reducerName={"pregnancy"}
                                    objectName={"events"}
                                    renderItem={(item, i) => (
                                        <PregnancyEvents key={i} data={item} />
                                    )}
                                />
                            </ScrollBar>
                        </EventsWrapper>
                    </WidgetBlock>
                </Row>
                <Row>
                    <WidgetBlock title={"Измерения"} accordeon>
                        <FetchingList
                            rigid
                            action={getCurrentNotification}
                            reducerName={"pregnancy"}
                            objectName={"notifications"}
                            hidePagination={true}
                            renderItem={(item, i) => (
                                <PregnancyMeasuringResults
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
                    <WidgetBlock title={"Мои измерения"} accordeon>
                        <PregnancyMeasuring currentDate={currentDate} />
                    </WidgetBlock>
                </Row>
                <Row>
                    <WidgetBlock
                        title={
                            tabsThatIsNotEmpty.length
                                ? "Полезная информация"
                                : ""
                        }
                    >
                        <UsefulInfo />
                    </WidgetBlock>
                </Row>
            </RightWrapper>
        );
    };
}

const WidgetWrapper = styled.div`
    @media all and (max-width: ${RESPONSIVE.tablet}) {
        padding-top: 16px;
    }
`;

const EventsWrapper = styled.div`
    height: 450px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        height: 250px;
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

const InfoWrapper = styled.div`
    position: absolute;
    right: -10px;
    top: -10px;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    background-color: ${(props) => props.theme.userTheme.color};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Actions = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-bottom: 16px;
    }
`;

const CalendarWrapper = styled.div`
    margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const LeftWrapper = styled.div`
    margin-bottom: 16px;
`;

const RightWrapper = styled.div`
    margin-bottom: 16px;
`;

const EmailText = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    padding: 0 16px;
`;

export default PregnancyPage;
