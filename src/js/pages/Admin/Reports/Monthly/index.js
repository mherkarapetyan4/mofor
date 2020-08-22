import React, { PureComponent } from "react";
import { Button } from "components/Button";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { adminPaths } from "config/paths";
import { BASE_URL } from "config/consts";
import styled from "styled-components";
import Row from "containers/Row";
import Column from "containers/Column";

const options = [
    {
        value: 1,
        label: "месяц",
    },
    {
        value: 3,
        label: "квартал",
    },
    {
        value: 6,
        label: "полугодие",
    },
    {
        value: 12,
        label: "год",
    },
];

class Monthly extends PureComponent {
    minYear = 2016;
    getYears = () => {
        const minYear = this.minYear;
        const maxYear = new Date().getFullYear();
        return Array.from({ length: maxYear - minYear + 1 }, (v, k) => ({
            value: k + minYear,
            label: k + minYear,
        }));
    };
    state = {
        year: new Date().getFullYear(),
        periodSize: 1,
    };
    onChangeSelect = (key, val) => {
        this.setState({
            [key]: val,
        });
    };
    onClick = () => {
        const { periodSize, year } = this.state;
        window.open(
            `${BASE_URL}/${adminPaths.GET_MONTHLY_REPORT_XLS}?year=${year}&periodSize=${periodSize}`,
            "_blank",
        );
    };

    render() {
        const { periodSize, year } = this.state;
        return (
            <Wrapper>
                <Row>
                    <Column fraction={6} paddings={0}>
                        <InlineFormFieldSelect
                            label={"Год"}
                            value={year}
                            onChange={(val) => this.onChangeSelect("year", val)}
                            options={this.getYears()}
                        />
                    </Column>
                    <Column fraction={6} paddingRight={0}>
                        <InlineFormFieldSelect
                            label={"Период группировки"}
                            value={periodSize}
                            onChange={(val) =>
                                this.onChangeSelect("periodSize", val)
                            }
                            options={options}
                        />
                    </Column>
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
export default Monthly;
