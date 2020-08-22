import React, { PureComponent } from "react";
import { getStatisticAttachments } from "actions/admin";
import { FetchingList } from "components/FetchingList";
import styled from "styled-components";
import { RESPONSIVE, ADMIN_STATISTIC_ATTACHMENTS_PROFILE } from "config/consts";
import isEmpty from "lodash/isEmpty";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import IconPlate from "components/IconPlate";
import { fontStyles } from "styledMixins/mixins";
import Filter from "modules/Filter";
import StatisticsIcon from "icons/StatisticsIcon";
import ListData from "components/List/ListData";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

const params = {
    profile: ADMIN_STATISTIC_ATTACHMENTS_PROFILE[0].value,
    fromDate: serverFormatDate(fromDate),
    toDate: serverFormatDate(toDate),
};

class Attachments extends PureComponent {
    state = {
        params,
        fromMaxDate: toDate,
        toMinDate: fromDate,
        toMaxDate: toDate,
    };

    onClearMinMax = () => {
        this.setState({
            fromMaxDate: toDate,
            toMinDate: fromDate,
            toMaxDate: toDate,
        });
    };

    renderFilters = () => {
        const { fromMaxDate, toMinDate, toMaxDate } = this.state;

        return (
            <Filter
                fields={[
                    {
                        name: "fromDate",
                        type: "date",
                        label: "Дата с:",
                        placeholder: "Выберите дату",
                        initial: fromDate,
                        onChange: (value) =>
                            this.setState({ toMinDate: value }),
                        maxDate: fromMaxDate,
                    },
                    {
                        name: "toDate",
                        type: "date",
                        label: "Дата по:",
                        placeholder: "Выберите дату",
                        initial: toDate,
                        onChange: (value) =>
                            this.setState({ fromMaxDate: value }),
                        minDate: toMinDate,
                        maxDate: toMaxDate,
                    },
                    {
                        name: "profile",
                        type: "select",
                        label: "Тип:",
                        placeholder: "",
                        options: ADMIN_STATISTIC_ATTACHMENTS_PROFILE,
                        initial: params.profile,
                    },
                ]}
                onSearch={(filters) => {
                    this.setState({
                        params: {
                            profile: filters.profile || params.profile,
                            fromDate:
                                filters.fromDate || serverFormatDate(fromDate),
                            toDate: filters.toDate || serverFormatDate(toDate),
                        },
                    });
                }}
                onClearMinMax={this.onClearMinMax}
            />
        );
    };

    renderItem(item, index) {
        const { moName, confirmedCount, unconfirmedCount } = item;
        return (
            <ListItemWrapper key={`item-id-${index}`}>
                <InfoWrapper>
                    <ItemIcon>
                        <IconPlate title={<StatisticsIcon color={"#fff"} />} />
                    </ItemIcon>
                    <Body>
                        <Header>{moName}</Header>
                        <ItemBody>
                            <Item>
                                <ListData
                                    label={"Потвержденные:"}
                                    data={confirmedCount}
                                />
                            </Item>
                            <Item>
                                <ListData
                                    label={"Неподтверждённые:"}
                                    data={unconfirmedCount}
                                />
                            </Item>
                        </ItemBody>
                    </Body>
                </InfoWrapper>
            </ListItemWrapper>
        );
    }

    render() {
        const { params } = this.state;
        return (
            <>
                <TabsWrapper>{this.renderFilters()}</TabsWrapper>
                {!isEmpty(params) ? (
                    <FetchingList
                        params={params}
                        action={getStatisticAttachments}
                        reducerName={"admin"}
                        objectName={"statisticsAttachments"}
                        renderItem={this.renderItem}
                        rigid
                    />
                ) : (
                    ""
                )}
            </>
        );
    }
}

const TabsWrapper = styled.div`
    margin-bottom: ${(props) => props.theme.paddings.normal};
    width: 100%;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

const ItemIcon = styled.div`
    margin-right: 16px;
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

const ItemBody = styled.div`
    display: flex;
`;
const Header = styled.div`
    padding-bottom: 10px;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;
const Body = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }
`;

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex: 1;
    @media all and (max-width: ${RESPONSIVE.mobile}) {
        align-items: flex-start;
    }
`;

export default Attachments;
