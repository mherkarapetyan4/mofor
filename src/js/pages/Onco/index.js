import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import Column from "containers/Column";
import Row from "containers/Row";
import WidgetBlock from "components/WidgetBlock";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
//import FormField from "components/FormField";
import { Button } from "components/Button";
import ScrollBar from "components/ScrollBar";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Desktop, Tablet } from "wrappers/responsive";
import { showPopup } from "actions/popup";
import isEqual from "lodash/isEqual";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import { formatDate } from "utils/formatDate";
import { CALENDAR, RESPONSIVE } from "config/consts";
import { form } from "wrappers/Formik";
import { primaryValuesFields } from "pages/Onco/meta";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormField from "components/InlineFormField";
import { sendForm } from "utils/sendForm";
import { hasAccessToSection } from "modules/hasAccessToSection";
import { Loader } from "components/Loader";
import OncoActivation from "pages/Onco/OncoActivation";
import { Link } from "react-router-dom";
import { fontStyles } from "styledMixins/mixins";
import {
    checkOncoEmail,
    getCurrentOncoInfo,
    saveInitialValues,
    checkUnreadMessages,
    getMessages,
    checkUnreadMessagesFullFiled,
    sendMessage,
    getEventsList,
    // getAskDoctors,
} from "actions/onco";
import archiveListHandler from "pages/Onco/getArchiveList";
import { FetchingList } from "components/FetchingList";
import { getCurrentNotification } from "actions/onco";
import dayjs from "dayjs";
import OncoMeasuring from "components/OncoMeasuring";
import OncoMeasuringResults from "components/OncoMeasuringResults";
import Share from "./Share";
import Chat from "components/Chat";
import { createWebSocket } from "utils/createWebSocket";
import { oncoPath } from "config/paths";
import OncoEvents from "components/OncoEvents";
import MonthSwitch from "components/MonthSwitch";
import CalendarCell from "components/Calendar/CalendarCell";
import { Calendar } from "components/Calendar";
import TextBlock from "components/TextBlock";
//import OncologyEvents from "components/OncologyEvents";

@withRouter
@connect(
    (state) => ({
        currentInfo: state.onco.currentInfo,
        popup: state.popup,
        messageExist: state.pregnancy.messageExist,
        askDoctors: state.onco.askDoctors,
        chatData: state.onco.chat.messages,
        chatIsFetching: state.onco.chat.isFetching,
    }),
    {
        showPopup,
        getCurrentOncoInfo,
        saveInitialValues,
        checkUnreadMessages,
        // getAskDoctors,
    },
)
@form({
    fields: primaryValuesFields,
})
@hasAccessToSection()
class OncoPage extends PureComponent {
    state = {
        currentDate: dayjs(),
        currentYear: dayjs().get("year"),
        currentMonth: dayjs().get("month"),
        maxDate: dayjs(),
        disabledInput: true,
        currentInfo: {},
        emailChecked: false,
    };

    static propTypes = {
        showPopup: PropTypes.func,
        getCurrentOncoInfo: PropTypes.func,
        messageExist: PropTypes.bool,
        currentInfo: PropTypes.object,
        checkUnreadMessages: PropTypes.func,
        // checkUnreadMessagesFullFiled: PropTypes.func,
        dispatch: PropTypes.func,
        popup: PropTypes.object,
        changeInitialValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        saveInitialValues: PropTypes.func.isRequired,
        askDoctors: PropTypes.object.isRequired,
        // getAskDoctors: PropTypes.func.isRequired,
    };

    emptyText = "Нет информации";

    confirmEmailPopup(showPopup) {
        showPopup(
            "E-mail не подтвержден",
            <EmailText>
                Для использования раздела OnlineDoc необходимо указать и
                подтвердить адрес электронной почты в разделе{" "}
                <Link to={LK_MENU_ELEMENTS.MAIN_PAGE.path}>Мои контакты</Link>
            </EmailText>,
        );
    }

    async componentDidMount() {
        (await checkOncoEmail())
            ? this.setState(
                  {
                      emailChecked: true,
                  },
                  () => this.props.getCurrentOncoInfo(),
              )
            : this.confirmEmailPopup(this.props.showPopup);
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
            // getAskDoctors,
        } = this.props;
        this.setState(
            {
                currentInfo,
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

                checkUnreadMessages();
                // getAskDoctors();
                createWebSocket.call(this, "onco", getMessages);
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

    renderContent = () => {
        const { currentInfo } = this.props;
        if (!currentInfo.id || currentInfo.paused) {
            return <OncoActivation />;
        }
        return (
            <>
                <Heading>
                    <PageHeading title={LK_MENU_ELEMENTS.ONCO_PAGE.name} />
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

    renderLeft = () => {
        const {
            values,
            showPopup,
            //popup,
            //messageExist,
            // checkUnreadMessagesFullFiled,
            // getMessages,
        } = this.props;

        const { disabledInput, currentInfo } = this.state;

        const { diagnosisName } = currentInfo;

        return (
            <LeftWrapper>
                <Row>
                    <Column fraction={6} paddingLeft={0}>
                        <Row>
                            <WidgetBlock title={"Диагноз"}>
                                <Row>
                                    <TextBlock>{diagnosisName}</TextBlock>
                                </Row>
                            </WidgetBlock>
                        </Row>
                    </Column>
                    <Column fraction={6} paddings={0}>
                        <WidgetBlock title={"Показатели"}>
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
                                            type={disabledInput ? "" : "number"}
                                        />
                                    )}
                                />
                            </Row>
                            <Row>
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
                            </Row>
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
                            onClick={this.onUpdate}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddingLeft={0}>
                        <Actions>
                            <ButtonItem>
                                {/*{!popup.show && messageExist && (*/}
                                <NotificationNumber>
                                    <TextBlock
                                        font={{
                                            color: "#fff",
                                            family: "bold",
                                            size: "12px",
                                        }}
                                    >
                                        {"99"}
                                    </TextBlock>
                                </NotificationNumber>
                                {/*)}*/}
                                <Button
                                    label={"Чат с врачом"}
                                    onClick={() => {
                                        showPopup(
                                            "Чат с вашим врачом",
                                            <Chat
                                                askDoctors={
                                                    this.props.askDoctors
                                                }
                                                checkUnreadMessagesFullFiled={
                                                    checkUnreadMessagesFullFiled
                                                }
                                                getMessages={getMessages}
                                                sendMessage={sendMessage}
                                                path={oncoPath}
                                                type={"onco"}
                                            />,
                                            null,
                                            { scrollable: false },
                                        );
                                    }}
                                />
                            </ButtonItem>
                            <ButtonItem>
                                {/*  working on it */}
                                <Button
                                    label={"Архив"}
                                    onClick={() =>
                                        archiveListHandler(showPopup)
                                    }
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
                    <WidgetBlock title={"Мои измерения"} accordeon>
                        <OncoMeasuring />
                    </WidgetBlock>
                </Row>
            </LeftWrapper>
        );
    };

    renderRight = () => {
        const { currentInfo, currentMonth, currentYear, maxDate } = this.state;
        const { lastMenstruationDate } = currentInfo;

        return (
            <RightWrapper>
                <Row>
                    <WidgetBlock title={"Календарь"} accordeon isOpen={false}>
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
                {/* add here  */}
                <Row fullHeight>
                    <WidgetBlock title={"События"} accordeon>
                        <EventsWrapper>
                            <ScrollBar>
                                <FetchingList
                                    rigid
                                    action={getEventsList}
                                    reducerName={"onco"}
                                    objectName={"events"}
                                    renderItem={(item, i) => (
                                        <OncoEvents key={i} data={item} />
                                    )}
                                />
                            </ScrollBar>
                        </EventsWrapper>
                    </WidgetBlock>
                </Row>
            </RightWrapper>
        );
    };
}

const RightWrapper = styled.div`
    margin-bottom: 16px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
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

const EmailText = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    padding: 0 16px;
`;

const EventsWrapper = styled.div`
    height: 450px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        height: 250px;
    }
`;

const CalendarWrapper = styled.div`
    margin-bottom: 16px;
`;

const LeftWrapper = styled.div`
    margin-bottom: 16px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
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

const Actions = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-bottom: 16px;
    }
`;

export default OncoPage;
