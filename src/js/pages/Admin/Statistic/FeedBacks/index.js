import React, { PureComponent } from "react";
import { getStatisticFeedBacks } from "actions/admin";
import { FetchingList } from "components/FetchingList";
import ListItem from "pages/Admin/Statistic/FeedBacks/ListItem";
import styled from "styled-components";
import { ADMIN_STATISTIC_FEED_BACKS_TYPES } from "config/consts";
import isEmpty from "lodash/isEmpty";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import Filter from "modules/Filter";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

const params = {
    type: ADMIN_STATISTIC_FEED_BACKS_TYPES[0].value,
    fromDate: serverFormatDate(fromDate),
    toDate: serverFormatDate(toDate),
};

class FeedBacks extends PureComponent {
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
                        name: "type",
                        type: "select",
                        label: "Тип:",
                        placeholder: "",
                        options: ADMIN_STATISTIC_FEED_BACKS_TYPES,
                        initial: params.type,
                    },
                ]}
                onSearch={(filters) => {
                    this.setState({
                        params: {
                            type: filters.type || params.type,
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
        return <ListItem item={item} index={index} />;
    }

    render() {
        const { params } = this.state;
        return (
            <>
                <TabsWrapper>{this.renderFilters()}</TabsWrapper>
                {!isEmpty(params) ? (
                    <FetchingList
                        params={params}
                        action={getStatisticFeedBacks}
                        reducerName={"admin"}
                        objectName={"statisticsFeedBacks"}
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
`;

export default FeedBacks;
