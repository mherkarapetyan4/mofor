import React, { PureComponent } from "react";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { Button } from "components/Button";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { adminPaths } from "config/paths";
import { ADMIN_STATISTIC_ATTACHMENTS_PROFILE, BASE_URL } from "config/consts";
import styled from "styled-components";
import isEqual from "lodash/isEqual";
import Row from "components/Structure/Row";
import Column from "containers/Column";

const fromDate = dayjs().add(-1, "month");
const toDate = dayjs();

class Attachments extends PureComponent {
    dateNow = dayjs();
    state = {
        fromDate: this.dateNow,
        toDate: this.dateNow,
        profile: ADMIN_STATISTIC_ATTACHMENTS_PROFILE[0].value,
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
        const { fromDate, toDate, profile } = this.state;
        window.open(
            `${BASE_URL}/${
                adminPaths.GET_STATISTIC_ATTACHMENTS_XLS
            }?fromDate=${serverFormatDate(fromDate)}&toDate=${serverFormatDate(
                toDate,
            )}&profile=${profile}`,
            "_blank",
        );
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
            profile,
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
                        value={profile}
                        onChange={(val) => this.onChangeSelect("profile", val)}
                        options={ADMIN_STATISTIC_ATTACHMENTS_PROFILE}
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
export default Attachments;
