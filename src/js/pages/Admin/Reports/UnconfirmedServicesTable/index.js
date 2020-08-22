import React, { PureComponent } from "react";
import MultiAutoComplete from "components/MultiAutoComplete";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { Button } from "components/Button";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { adminPaths } from "config/paths";
import {
    ADMIN_STATISTIC_UNCONFIRMED_SERVICE_SECTION,
    BASE_URL,
} from "config/consts";
import styled from "styled-components";
import isEqual from "lodash/isEqual";
import Row from "components/Structure/Row";
import Column from "containers/Column";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

class UnconfirmedServicesTable extends PureComponent {
    state = {
        fromDate,
        toDate,
        serviceCodes: [],
        moIds: [],
        section: ADMIN_STATISTIC_UNCONFIRMED_SERVICE_SECTION[0].value,
        fromMaxDate: toDate,
        toMinDate: fromDate,
        toMaxDate: toDate,
    };
    onChangeSelect = (key, val) => {
        this.setState({
            [key]: val,
        });
    };
    onRemoveMultiSelector = (key, items) => {
        this.setState({
            [key]: [...items],
        });
    };
    onClick = async () => {
        const { fromDate, toDate, serviceCodes, moIds, section } = this.state;
        let url =
            BASE_URL + "/" + adminPaths.GET_UNCONFIRMED_SERVICES_TABLE_XLS;
        url += `?fromDate=${serverFormatDate(fromDate)}`;
        url += `&toDate=${serverFormatDate(toDate)}`;
        url += `&section=${section}`;
        serviceCodes.map((item) => (url += `&serviceCodes=${item.code}`));
        moIds.map((item) => (url += `&moIds=${item.moId}`));
        window.open(url, "_target");
    };
    onSelectMultiSelector = (key, item) => {
        let items = [...this.state[key]];
        if (items.filter((i) => isEqual(i, item)).length) {
            return false;
        }
        items.push(item);
        this.setState({
            [key]: items,
        });
    };

    render() {
        const {
            fromDate,
            toDate,
            section,
            serviceCodes,
            moIds,
            fromMaxDate,
            toMinDate,
            toMaxDate,
        } = this.state;
        return (
            <Wrapper>
                <Row>
                    <Column paddings={0} fraction={6}>
                        <InlineFormFieldDate
                            label={"Дата с:"}
                            value={fromDate}
                            placeholder={"Выберите дату"}
                            onChange={(val) => {
                                this.onChangeSelect("fromDate", val);
                                this.setState({ toMinDate: val });
                            }}
                            maxDate={fromMaxDate}
                        />
                    </Column>
                    <Column paddingRight={0} fraction={6}>
                        <InlineFormFieldDate
                            label={"Дата по:"}
                            value={toDate}
                            placeholder={"Выберите дату"}
                            onChange={(val) => {
                                this.onChangeSelect("toDate", val);
                                this.setState({ fromMaxDate: val });
                            }}
                            minDate={toMinDate}
                            maxDate={toMaxDate}
                        />
                    </Column>
                </Row>
                <Row>
                    <MultiAutoComplete
                        path={adminPaths.GET_STATISTIC_UNCONFIRMED_SERVICES}
                        serverValue={"name"}
                        queryParams={{
                            pageNumber: 1,
                            pageSize: 10,
                        }}
                        minCountSymbol={2}
                        elementLabel="moName"
                        elementValue="moId"
                        onSelect={(item) =>
                            this.onSelectMultiSelector("moIds", item)
                        }
                        onRemove={(items) =>
                            this.onRemoveMultiSelector("moIds", items)
                        }
                        items={moIds}
                        placeholder={"Введите мед. организацию"}
                        label={"Мед организация:"}
                    />
                </Row>
                <Row>
                    <MultiAutoComplete
                        path={
                            adminPaths.GET_STATISTIC_UNCONFIRMED_SERVICES_TYPES
                        }
                        serverValue={"name"}
                        queryParams={{
                            pageNumber: 1,
                            pageSize: 10,
                        }}
                        elementLabel="name"
                        elementValue="code"
                        minCountSymbol={2}
                        onSelect={(item) =>
                            this.onSelectMultiSelector("serviceCodes", item)
                        }
                        onRemove={(items) =>
                            this.onRemoveMultiSelector("serviceCodes", items)
                        }
                        items={serviceCodes}
                        placeholder={"Введите услугу"}
                        label={"Коды услуг:"}
                    />
                </Row>
                <Row>
                    <InlineFormFieldSelect
                        label={"Раздел"}
                        value={section}
                        onChange={(val) => this.onChangeSelect("section", val)}
                        options={ADMIN_STATISTIC_UNCONFIRMED_SERVICE_SECTION}
                    />
                </Row>
                <Button onClick={this.onClick} label={"Скачать"} />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

export default UnconfirmedServicesTable;
