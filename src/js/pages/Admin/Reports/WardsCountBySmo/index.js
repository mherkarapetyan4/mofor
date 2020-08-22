import React, { PureComponent } from "react";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { Button } from "components/Button";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import { adminPaths } from "config/paths";
import { RESPONSIVE, BASE_URL } from "config/consts";
import styled from "styled-components";
import Row from "containers/Row";
import Column from "containers/Column";
import { FetchingList } from "components/FetchingList";
import { getWardsCountBySmo } from "actions/admin";
import { fontStyles } from "styledMixins/mixins";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

class WardsCountBySmo extends PureComponent {
    state = {
        params: {
            fromDate: serverFormatDate(fromDate),
            toDate: serverFormatDate(toDate),
        },
        fromDate,
        toDate,
        fromMaxDate: toDate,
        toMinDate: fromDate,
        toMaxDate: toDate,
    };

    onChangeSelect = (key, val) => {
        this.setState({
            [key]: val,
        });
    };

    onClick = async () => {
        const { fromDate, toDate } = this.state;

        window.open(
            `${BASE_URL}/${
                adminPaths.GET_STATISTIC_WARDS_COUNT_SMO_XLS
            }?fromDate=${serverFormatDate(fromDate)}&toDate=${serverFormatDate(
                toDate,
            )}`,
            "_blank",
        );
    };

    render() {
        const {
            params,
            fromDate,
            toDate,
            fromMaxDate,
            toMinDate,
            toMaxDate,
        } = this.state;

        return (
            <Wrapper>
                <Row>
                    <Column fraction={6} paddings={0}>
                        <InlineFormFieldDate
                            label={"Дата с:"}
                            value={fromDate}
                            placeholder={"Выберите дату"}
                            onChange={(val) => {
                                this.onChangeSelect("fromDate", val);
                                this.setState({ toMinDate: val });
                                this.setState({
                                    params: {
                                        ...params,
                                        fromDate: serverFormatDate(val),
                                    },
                                });
                            }}
                            maxDate={fromMaxDate}
                        />
                    </Column>
                    <Column fraction={6} paddingRight={0}>
                        <InlineFormFieldDate
                            label={"Дата по:"}
                            value={toDate}
                            placeholder={"Выберите дату"}
                            onChange={(val) => {
                                this.onChangeSelect("toDate", val);
                                this.setState({ fromMaxDate: val });
                                this.setState({
                                    params: {
                                        ...params,
                                        toDate: serverFormatDate(val),
                                    },
                                });
                            }}
                            minDate={toMinDate}
                            maxDate={toMaxDate}
                        />
                    </Column>
                </Row>
                <FetchingList
                    params={params}
                    action={getWardsCountBySmo}
                    reducerName={"admin"}
                    objectName={"wardsCountBySmo"}
                    renderItem={this.renderItem}
                />
                <Button onClick={() => this.onClick()} label={"Скачать"} />
            </Wrapper>
        );
    }

    renderItem(item, index) {
        const { smoName, count } = item;
        return (
            <ListItemWrapper key={`item-id-${index}`}>
                <InfoWrapper>
                    <ItemInfo>
                        <ItemReviews>
                            <ItemHeader>{smoName}</ItemHeader>
                            <ItemBody>
                                <Item>
                                    <Title>Количество ЛК подопечных: </Title>
                                    <MarksItem>{count || 0}</MarksItem>
                                </Item>
                            </ItemBody>
                        </ItemReviews>
                    </ItemInfo>
                </InfoWrapper>
            </ListItemWrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;
const ListItemWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: ${(props) => props.theme.paddings.normal};

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
const ItemHeader = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 5px 0;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;
const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        align-items: flex-start;
    }
`;
const ItemInfo = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`;
const ItemReviews = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
    margin-left: 15px;
`;
const ItemBody = styled.div`
    display: flex;
`;
const Item = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
`;
const Title = styled.div`
    ${(props) => fontStyles(props)};
`;
const MarksItem = styled.div`
    display: flex;
    align-items: center;
    ${(props) => fontStyles(props, { color: "black" })};
    margin-right: 40px;
`;

export default WardsCountBySmo;
