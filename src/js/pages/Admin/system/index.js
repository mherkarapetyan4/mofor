import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import styled from "styled-components";
import { getSystemLists } from "actions/admin";
import { connect } from "react-redux";
import Row from "containers/Row";
import ScrollBar from "components/ScrollBar";
import Column from "containers/Column";
import { FetchingList } from "components/FetchingList";
import { ADMIN_ELEMENTS } from "config/menu";
import ListItem from "pages/Admin/system/ListItem";
import { RESPONSIVE } from "config/consts";
import { Button } from "components/Button";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import Filter from "modules/Filter";
import withRedirectAdmin from "decorators/admin";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

@connect((state) => ({
    data: state.admin.data,
}))
@withRedirectAdmin("SYSTEM")
class System extends PureComponent {
    state = {
        params: {
            fromDate: serverFormatDate(fromDate),
            toDate: serverFormatDate(toDate),
            action: "",
            initiator: "",
            object: "",
        },
        fromMaxDate: toDate,
        toMinDate: fromDate,
        toMaxDate: toDate,
    };

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object,
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
                        placeholder: "Дата",
                        initial: fromDate,
                        onChange: (value) =>
                            this.setState({ toMinDate: value }),
                        maxDate: fromMaxDate,
                    },
                    {
                        name: "toDate",
                        type: "date",
                        label: "Дата по:",
                        placeholder: "Дата",
                        initial: toDate,
                        onChange: (value) =>
                            this.setState({ fromMaxDate: value }),
                        minDate: toMinDate,
                        maxDate: toMaxDate,
                    },
                    {
                        name: "action",
                        type: "input",
                        label: "Операция:",
                        placeholder: "",
                    },
                    {
                        name: "initiator",
                        type: "input",
                        label: "Действующее лицо:",
                        placeholder: "",
                    },
                    {
                        name: "object",
                        type: "input",
                        label: "Объект:",
                        placeholder: "",
                    },
                ]}
                onSearch={(filters) => {
                    this.setState({
                        params: {
                            fromDate:
                                filters.fromDate || serverFormatDate(fromDate),
                            toDate: filters.toDate || serverFormatDate(toDate),
                            action: filters.action || "",
                            initiator: filters.initiator || "",
                            object: filters.object || "",
                        },
                    });
                }}
                onClearMinMax={this.onClearMinMax}
            />
        );
    };

    renderItem(item, index) {
        return <ListItem {...{ item, index }} key={`policy_${index}`} />;
    }

    updateList = () => {
        const { params } = this.state;
        const { dispatch } = this.props;

        dispatch(
            getSystemLists({
                params: params,
            }),
        );
    };

    render() {
        const { params } = this.state;
        return (
            <>
                <Heading>
                    <PageHeading title={ADMIN_ELEMENTS.SYSTEM.name} />
                    <Button
                        label={"Обновить"}
                        onClick={() => this.updateList()}
                    />
                </Heading>
                <Row fullPage>
                    <ScrollBar>
                        <Column>
                            <TabsWrapper>{this.renderFilters()}</TabsWrapper>
                            <FetchingList
                                params={params}
                                action={getSystemLists}
                                reducerName={"admin"}
                                objectName={"data"}
                                renderItem={this.renderItem}
                            />
                        </Column>
                    </ScrollBar>
                </Row>
            </>
        );
    }
}

const TabsWrapper = styled.div`
    margin-bottom: ${(props) => props.theme.paddings.normal};

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

// const TabsItemsWrapper = styled.div`
//     display: flex;

//     > div {
//         margin-right: 10px;
//     }

//     > div:last-child {
//         margin-right: 0;
//     }
// `;

export default System;
