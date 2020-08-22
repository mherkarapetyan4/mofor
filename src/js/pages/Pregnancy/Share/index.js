import React, { PureComponent } from "react";
import styled from "styled-components";
import { PREGNANCY_SHARE_DATE_SELECT, RESPONSIVE } from "config/consts";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from "lodash/get";
import { Button } from "components/Button";
// import { fontStyles } from "styledMixins/mixins";
import { sendPregnancyReportByEmail } from "actions/pregnancy";
import { pregnancyPath } from "config/paths";
import { BASE_URL } from "config/consts";

@connect((state) => ({
    lastMenstruationDate: get(
        state.pregnancy.currentInfo,
        "lastMenstruationDate",
    ),
    estimatedEndDate: get(state.pregnancy.currentInfo, "estimatedEndDate"),
}))
class Share extends PureComponent {
    static propTypes = {
        lastMenstruationDate: PropTypes.string.isRequired,
        estimatedEndDate: PropTypes.string.isRequired,
        dispatch: PropTypes.func,
    };

    state = {
        date: "",
        fromDate: "",
        toDate: "",
    };

    downloadOrSend(action) {
        const { dispatch, estimatedEndDate } = this.props;
        const { fromDate, toDate, date } = this.state;
        let sendFromDate = fromDate ? fromDate : Date.now();
        let sendToDate = toDate ? toDate : Date.now();

        if (date === "pregnancy") {
            const { lastMenstruationDate } = this.props;
            sendFromDate = lastMenstruationDate;
            sendToDate = dayjs(estimatedEndDate).isBefore(dayjs())
                ? dayjs(estimatedEndDate)
                : dayjs();
        }

        if (date.indexOf("_") > -1) {
            let day = parseInt(date.split("_")[1]);
            sendToDate = dayjs(estimatedEndDate).isBefore(dayjs())
                ? dayjs(estimatedEndDate).unix() * 1000
                : dayjs().unix() * 1000;
            if (!isNaN(day)) {
                sendFromDate = sendToDate - day * 24 * 60 * 60 * 1000;
            }
        }

        if (action === "pdf") {
            window.open(
                `${BASE_URL}/${
                    pregnancyPath.GET_PREGNANCY_PDF_REPORT
                }?fromDate=${serverFormatDate(
                    dayjs(sendFromDate),
                )}&toDate=${serverFormatDate(dayjs(sendToDate))}`,
            );
        } else if (action === "send") {
            dispatch(
                sendPregnancyReportByEmail({
                    fromDate: serverFormatDate(dayjs(sendFromDate)),
                    toDate: serverFormatDate(dayjs(sendToDate)),
                }),
            );
        }
    }

    render() {
        const { date, toDate, fromDate } = this.state;
        return (
            <ListItemWrapper>
                <FormItem>
                    <InlineFormFieldSelect
                        placeholder={"Выбрать время"}
                        value={date}
                        onChange={(val) => {
                            this.setState({
                                date: val,
                            });
                        }}
                        options={PREGNANCY_SHARE_DATE_SELECT}
                    />
                </FormItem>
                {date == "outer" && (
                    <CalendarWrapper>
                        <CalendarItem>
                            <InlineFormFieldDate
                                label={"С:"}
                                onChange={(day) => {
                                    this.setState({ fromDate: day });
                                }}
                                value={fromDate}
                                placeholder={"Дата с"}
                                popupPosition={"bottom"}
                            />
                        </CalendarItem>
                        <CalendarItem>
                            <InlineFormFieldDate
                                label={"По:"}
                                onChange={(day) => {
                                    this.setState({ toDate: day });
                                }}
                                value={toDate}
                                placeholder={"Дата по"}
                                popupPosition={"bottom"}
                            />
                        </CalendarItem>
                    </CalendarWrapper>
                )}
                <ButtonsWrapper>
                    <Item>
                        <Button
                            label={"Отправить на эл. почту"}
                            onClick={() => this.downloadOrSend("send")}
                        />
                    </Item>
                    <Item>
                        <Button
                            label={"Скачать отчет"}
                            onClick={() => this.downloadOrSend("pdf")}
                        />
                    </Item>
                </ButtonsWrapper>
            </ListItemWrapper>
        );
    }
}

const FormItem = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

// const Title = styled.div`
//     ${(props) =>
//         fontStyles(props, {
//             font: "bold",
//             size: props.theme.fonts.sizes.normal,
//             color: props.theme.colors.text.colorBlack,
//         })};
//     margin-bottom: 10px;
// `;

const CalendarItem = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const CalendarWrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const Item = styled.div`
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        margin-bottom: 16px;
    }
`;

const ListItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0 16px 16px 16px;
`;
export default Share;
