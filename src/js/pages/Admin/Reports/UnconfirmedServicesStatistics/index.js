import React, { PureComponent } from "react";
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
import Row from "containers/Row";
import Column from "containers/Column";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

class UnconfirmedServicesStatistics extends PureComponent {
    state = {
        fromDate,
        toDate,
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
    onClick = () => {
        const { fromDate, toDate, section } = this.state;

        window.open(
            `${BASE_URL}/${
                adminPaths.GET_STATISTIC_UNCONFIRMED_SERVICES_STATISTICS_XLS
            }?fromDate=${serverFormatDate(fromDate)}&toDate=${serverFormatDate(
                toDate,
            )}&section=${section}`,
            "_blank",
        );
    };

    render() {
        const {
            fromDate,
            toDate,
            section,
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
                    <InlineFormFieldSelect
                        label={"Раздел"}
                        value={section}
                        onChange={(val) => this.onChangeSelect("section", val)}
                        options={ADMIN_STATISTIC_UNCONFIRMED_SERVICE_SECTION}
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
export default UnconfirmedServicesStatistics;
