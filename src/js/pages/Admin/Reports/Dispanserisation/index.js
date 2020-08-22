import React, { PureComponent } from "react";
import { Button } from "components/Button";
import dayjs from "dayjs";
import { adminPaths } from "config/paths";
import { BASE_URL } from "config/consts";
import styled from "styled-components";
import AutoComplete from "components/AutoComplete";
import Row from "containers/Row";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";

const currentYear = dayjs().get("year");
const years = [];
for (let i = 2016; i <= currentYear; i++) {
    years.push({ label: i, value: i });
}

class Dispanserisation extends PureComponent {
    state = {
        year: currentYear,
        smoObject: {},
    };
    onChangeSelect = (key, val) => {
        this.setState({
            [key]: val,
        });
    };
    onClick = async () => {
        const { year, smoObject } = this.state;
        const params = {
            year,
            smoId: smoObject.id,
        };

        const queryString =
            "?" +
            Object.keys(params)
                .map((k) => {
                    if (params[k]) return `${k}=${params[k]}`;
                })
                .join("&");
        window.open(
            `${BASE_URL}/${adminPaths.GET_STATISTIC_DISPANSERISATION_XLS}${queryString}`,
            "_blank",
        );
    };

    render() {
        const { year } = this.state;
        return (
            <Wrapper>
                <Row>
                    <InlineFormFieldSelect
                        label={"Год отчета:"}
                        value={year}
                        placeholder={"Выберите год"}
                        onChange={(val) => {
                            this.onChangeSelect("year", val);
                        }}
                        options={years}
                    />
                </Row>
                <Row>
                    <AutoComplete
                        label={"СМО:"}
                        serverValue={"name"}
                        path={adminPaths.GET_STATISTIC_SMOS}
                        queryParams={{
                            pageSize: 10,
                            pageNumber: 1,
                        }}
                        elementLabel="name"
                        elementValue="id"
                        placeholder={"Введите название СМО"}
                        onSelect={(item) =>
                            this.onChangeSelect("smoObject", item)
                        }
                        showClearButton={true}
                        onClearCallback={() =>
                            this.onChangeSelect("smoObject", {})
                        }
                        preserveValueAfterSelect={true}
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
export default Dispanserisation;
