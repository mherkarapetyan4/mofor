import React, { PureComponent } from "react";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { Button } from "components/Button";
import { serverFormatDate } from "utils/formatDate";
import { map } from "lodash";
import dayjs from "dayjs";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { adminPaths } from "config/paths";
import {
    ADMIN_REPORTS_UNCONFIRMED_SERVICES_SECTION,
    BASE_URL,
} from "config/consts";
import styled from "styled-components";
import AutoComplete from "components/AutoComplete";
import Column from "containers/Column";
import Row from "containers/Row";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

class UnconfirmedServicesList extends PureComponent {
    state = {
        fromDate,
        toDate,
        moObj: {},
        filterType: ADMIN_REPORTS_UNCONFIRMED_SERVICES_SECTION[0].value,
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
        const { fromDate, toDate, filterType, moObj } = this.state;
        const params = {
            fromDate: serverFormatDate(fromDate),
            toDate: serverFormatDate(toDate),
            moId: moObj.moId,
            filterType,
        };

        const queryString =
            "?" +
            map(params, (v, k) => {
                if (v) return `${k}=${v}`;
            })
                .filter((item) => item)
                .join("&");

        window.open(
            `${BASE_URL}/${adminPaths.GET_UNCONFIRMED_SERVICES_LIST_XLS}${queryString}`,
            "_blank",
        );
    };

    render() {
        const {
            fromDate,
            toDate,
            filterType,
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
                            }}
                            minDate={toMinDate}
                            maxDate={toMaxDate}
                        />
                    </Column>
                </Row>
                <Row>
                    <AutoComplete
                        label={"Мед организация:"}
                        serverValue={"name"}
                        path={adminPaths.GET_STATISTIC_UNCONFIRMED_SERVICES}
                        queryParams={{
                            pageSize: 10,
                            pageNumber: 1,
                        }}
                        elementLabel="moName"
                        elementValue="moId"
                        placeholder={"Введите мед организации"}
                        showClearButton={true}
                        onClearCallback={() => {
                            this.onChangeSelect("moObj", {});
                        }}
                        onSelect={(item) => this.onChangeSelect("moObj", item)}
                        preserveValueAfterSelect={true}
                    />
                </Row>
                <Row>
                    <InlineFormFieldSelect
                        label={"Раздел"}
                        value={filterType}
                        onChange={(val) =>
                            this.onChangeSelect("filterType", val)
                        }
                        options={ADMIN_REPORTS_UNCONFIRMED_SERVICES_SECTION}
                    />
                </Row>
                <Button onClick={() => this.onClick()} label={"Скачать"} />
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
export default UnconfirmedServicesList;
