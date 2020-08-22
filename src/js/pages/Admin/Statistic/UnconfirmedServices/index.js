import React, { PureComponent } from "react";
import { getStatisticUnconfirmedServices } from "actions/admin";
import { FetchingList } from "components/FetchingList";
import styled from "styled-components";
import {
    RESPONSIVE,
    ADMIN_STATISTIC_UNCONFIRMED_SERVICE_SECTION as OPTION,
} from "config/consts";
import isEmpty from "lodash/isEmpty";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import IconPlate from "components/IconPlate";
import { fontStyles } from "styledMixins/mixins";
import ListData from "components/List/ListData";
import StatisticsIcon from "icons/StatisticsIcon";
import Filter from "modules/Filter";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

const params = {
    profile: OPTION[0].value,
    fromDate: serverFormatDate(fromDate),
    toDate: serverFormatDate(toDate),
};

class UnconfirmedServices extends PureComponent {
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
                        label: "Вид:",
                        placeholder: "",
                        options: OPTION,
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

    renderItem = (item, index) => {
        const { moName, count } = item;
        return (
            <ListItemWrapper key={`item-id-${index}`}>
                <InfoWrapper>
                    <ItemIcon>
                        <IconPlate title={<StatisticsIcon color={"#fff"} />} />
                    </ItemIcon>
                    <Body>
                        <Header>{moName}</Header>
                        <ItemBody>
                            <ListData label={"Количество:"} data={count} />
                        </ItemBody>
                    </Body>
                </InfoWrapper>
            </ListItemWrapper>
        );
    };

    render() {
        const { params } = this.state;
        return (
            <Wrapper>
                <TabsWrapper>{this.renderFilters()}</TabsWrapper>
                {!isEmpty(params) && (
                    <FetchingList
                        rigid
                        params={params}
                        action={getStatisticUnconfirmedServices}
                        reducerName={"admin"}
                        objectName={"statisticsUnconfirmedServices"}
                        renderItem={this.renderItem}
                    />
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    margin-bottom: 16px;
    width: 100%;
`;

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
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    display: inline-flex;
    align-items: center;
    padding: 5px 0;
`;

const Body = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
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

export default UnconfirmedServices;
