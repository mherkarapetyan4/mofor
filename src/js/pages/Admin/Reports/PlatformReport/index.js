import React, { PureComponent } from "react";
import { Button } from "components/Button";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { adminPaths } from "config/paths";
import { BASE_URL } from "config/consts";
import styled from "styled-components";
import Row from "containers/Row";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { connect } from "react-redux";
const currentYear = dayjs().get("year");
const years = [];
for (let i = 2018; i <= currentYear; i++) {
    years.push({ label: i, value: i });
}
@connect()
class PlatformReport extends PureComponent {
    state = {
        year: currentYear,
    };
    static propTypes = {
        dispatch: PropTypes.func,
        platforms: PropTypes.object,
        isFetching: PropTypes.bool,
    };
    onChangeSelect = (key, val) => {
        this.setState({
            [key]: val,
        });
    };
    onClick = async () => {
        const { year } = this.state;
        const params = {
            year,
        };

        const queryString =
            "?" +
            Object.keys(params)
                .map((k) => {
                    if (params[k]) return `${k}=${params[k]}`;
                })
                .join("&");
        window.open(
            `${BASE_URL}/${adminPaths.DOWNLOAD_PLATFORM_REPORT}${queryString}`,
            "_blank",
        );
    };

    render() {
        const { year } = this.state;
        return (
            <Wrapper>
                <Row>
                    <InlineFormFieldSelect
                        label={"Год:"}
                        value={year}
                        placeholder={"Выберите год"}
                        onChange={(val) => {
                            this.onChangeSelect("year", val);
                        }}
                        options={years}
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

export default PlatformReport;
