import React, { PureComponent } from "react";
import styled, { withTheme } from "styled-components";
import InlineFormField from "components/InlineFormField";
import SendIcon from "icons/SendIcon";
import IconPlate from "components/IconPlate";
import PropTypes from "prop-types";
import { fontStyles } from "styledMixins/mixins";
import ScrollBar from "components/ScrollBar";
import { RESPONSIVE } from "config/consts";
import { formatDate, serverFormatDate } from "utils/formatDate";
import { connect } from "react-redux";
import { Loader } from "components/Loader";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import dayjs from "dayjs";
import axios from "axios";

import { Button } from "components/Button";

@withTheme
@connect((state, ownProps) => ({
    data: state[ownProps.type].chat.messages,
    isFetching: state[ownProps.type].chat.isFetching,
}))
class Chat extends PureComponent {
    currentDate = "";
    state = {
        message: "",
        askDoctors: [],
    };
    messagesEnd = null;

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        data: PropTypes.array,
        theme: PropTypes.object,
        visible: PropTypes.bool,
        askDoctors: PropTypes.object,
        getMessages: PropTypes.func.isRequired,
        checkUnreadMessagesFullFiled: PropTypes.func,
        path: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
    };

    getMessages() {
        const {
            dispatch,
            getMessages,
            checkUnreadMessagesFullFiled,
        } = this.props;
        dispatch(getMessages());
        dispatch(checkUnreadMessagesFullFiled(false));
    }

    componentDidMount() {
        this.getMessages();
    }

    componentDidUpdate(prevProps) {
        const { data } = this.props;
        if (JSON.stringify(data) !== JSON.stringify(prevProps.data)) {
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    };

    renderItem(data) {
        const {
            id,
            text,
            sendDate,
            fromDoctor,
            author,
            event,
            eventFromDate,
            eventToDate,
        } = data;
        const { theme } = this.props;
        const date = serverFormatDate(dayjs(sendDate));
        let showHeader = false;
        const authorData = author.split(" ");
        const icoVal = fromDoctor
            ? get(authorData, "0.0", "") + get(authorData, "1.0", "")
            : "Я";
        if (date !== this.currentDate) {
            this.currentDate = date;
            showHeader = true;
        }
        const sendDateFormatted = dayjs(sendDate).format("HH:mm");
        return (
            <React.Fragment key={`message_${id}`}>
                {showHeader && (
                    <DateWrapper>
                        <Date>{date}</Date>
                        <DateLine />
                    </DateWrapper>
                )}
                <UserMessage side={fromDoctor ? "left" : "right"}>
                    {fromDoctor && (
                        <UserIcon>
                            <IconPlate title={icoVal} />
                        </UserIcon>
                    )}
                    <MessageWrapper side={fromDoctor ? "right" : "left"}>
                        {fromDoctor && <Author>{author}</Author>}
                        <Message
                            color={theme.userTheme.color}
                            side={fromDoctor ? "left" : "right"}
                        >
                            <div dangerouslySetInnerHTML={{ __html: text }} />
                            {event && (
                                <EventWrapper
                                    side={fromDoctor ? "left" : "right"}
                                >
                                    <strong>{event}</strong>
                                    <strong>{event}</strong>
                                    <p>
                                        Срок: с {formatDate(eventFromDate)} по{" "}
                                        {formatDate(eventToDate)}
                                    </p>
                                </EventWrapper>
                            )}
                        </Message>
                        <MessageTime>{sendDateFormatted}</MessageTime>
                    </MessageWrapper>
                    {!fromDoctor && (
                        <UserIcon>
                            <IconPlate title={icoVal} />
                        </UserIcon>
                    )}
                </UserMessage>
            </React.Fragment>
        );
    }

    UNSAFE_componentWillMount() {
        const { count } = this.props.askDoctors;
        let askDoctorsArray = Array(count).fill(null);
        this.setState({
            askDoctors: askDoctorsArray,
        });
    }

    renderAskDoctors = () => {
        const { askDoctors } = this.state;
        const { count } = this.props.askDoctors;
        if (!count) {
            return false;
        }
        let inputs = askDoctors.map((item, index) => {
            return (
                <InlineFormField
                    label={""}
                    type={"number"}
                    value={item}
                    onChange={(e) => {
                        let newAskDoctors = [...this.state.askDoctors];
                        newAskDoctors[index] = e;
                        this.setState({
                            askDoctors: newAskDoctors,
                        });
                    }}
                    key={index}
                />
            );
        });
        return (
            <form>
                {inputs}
                <Button
                    label={"Send"}
                    onClick={() => {
                        this.sendInputValues();
                    }}
                />
            </form>
        );
    };

    sendInputValues = () => {
        let askDoctors = [...this.state.askDoctors];
        const { count } = this.props.askDoctors;
        askDoctors = askDoctors.map((item, index) => {
            return (askDoctors[index] = { number: item });
        });

        let data = { items: askDoctors };
        axios
            .post(
                `/${this.props.path.SEND_ASK_DOCTORS}`,
                data,
                // ,
                // {headers: {"Content-Type": "application/json"}}
            )
            .then(() => {
                let askDoctorsArray = Array(count).fill(null);
                this.setState({
                    askDoctors: askDoctorsArray,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const { isFetching } = this.props;
        const { data } = this.props;
        const { message } = this.state;
        return (
            <Wrapper>
                <Content>
                    <ChatWindow>
                        <GradientOverlay />
                        <ScrollBar>
                            {isFetching && <Loader />}
                            {!isEmpty(data) &&
                                data.map((message) => {
                                    return this.renderItem(message);
                                })}
                            <div
                                ref={(el) => {
                                    this.messagesEnd = el;
                                }}
                            ></div>
                        </ScrollBar>
                    </ChatWindow>
                    {this.renderAskDoctors()}
                    <form onSubmit={this.sendMessage}>
                        <Input>
                            <Field>
                                <InlineFormField
                                    label={"Сообщение:"}
                                    value={message}
                                    placeholder={"Сообщение для врача"}
                                    onChange={(value) => {
                                        this.setState({
                                            message: value,
                                        });
                                    }}
                                />
                            </Field>
                            <Icon onClick={this.sendMessage}>
                                <SendIcon opacity={0.5} />
                            </Icon>
                        </Input>
                    </form>
                </Content>
            </Wrapper>
        );
    }

    sendMessage = (e) => {
        e.preventDefault();
        const { dispatch, sendMessage } = this.props;
        const { message } = this.state;
        console.log(message, sendMessage);
        dispatch(sendMessage(message));
        this.setState({
            message: "",
        });
    };
}

const Author = styled.div`
    ${(props) => fontStyles(props, { size: props.theme.fonts.sizes.tiny })};
    position: relative;
    background-color: #fff;
    padding: 0 16px;
    margin-bottom: 4px;
    z-index: 1;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 400px;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100%;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`;

const ChatWindow = styled.div`
    flex: 1 1 auto;
    position: relative;
`;

const GradientOverlay = styled.div`
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 4%,
        rgba(255, 255, 255, 0) 96%,
        rgba(255, 255, 255, 1) 100%
    );
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
`;

const Input = styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    margin: 16px;
`;

const Field = styled.div`
    flex: 1 1 auto;
`;

const Icon = styled.div`
    flex: 0 0 auto;
    cursor: pointer;
    padding: 10px;

    svg {
        transition: fill, fill-opacity,
            ${(props) => props.theme.animations.transition};
    }

    &:hover {
        svg {
            fill: ${(props) => props.theme.userTheme.color};
            fill-opacity: 1;
        }
    }
`;

const DateWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px;
`;

const DateLine = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.colors.borderColor};
    top: 4px;
    z-index: 0;
`;

const Date = styled.div`
    ${(props) => fontStyles(props, { size: props.theme.fonts.sizes.tiny })};
    position: relative;
    background-color: #fff;
    padding: 0 5px;
    z-index: 1;
`;

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${(props) =>
        props.side === "left" ? "flex-end" : "flex-start"};
`;

const Message = styled.div`
    padding: 13px 16px;
    background-color: ${(props) => props.color};
    border-radius: ${(props) =>
        props.side === "left" ? "10px 10px 10px 0" : "10px 10px 0 10px"};
    margin: ${(props) => (props.side === "left" ? "0 0 0 16px" : "0 16px 0 0")};
    ${(props) => fontStyles(props)};
    line-height: ${(props) => props.theme.fonts.lineHeight.big};
    color: #fff;
    &:last-child {
        padding: 7px 8px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: ${(props) =>
            props.side === "left" ? "10px 10px 10px 0" : "10px 10px 0 10px"};
    }
`;
const EventWrapper = styled.div`
    padding: 7px 8px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: ${(props) =>
        props.side === "left" ? "10px 10px 10px 0" : "10px 10px 0 10px"};
`;
const UserMessage = styled.div`
    margin: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: ${(props) =>
        props.side === "left" ? "flex-start" : "flex-end"};
`;

const MessageTime = styled.div`
    ${(props) => fontStyles(props, { size: props.theme.fonts.sizes.tiny })};
    margin-top: 4px;
    padding: 0 16px;
`;

const UserIcon = styled.div`
    flex: 0 0 auto;
    margin-bottom: 16px;
`;
export default Chat;
