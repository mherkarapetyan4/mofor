import React, { PureComponent } from "react";
import { Button } from "components/Button";
import { List } from "components/List";
import dayjs from "dayjs";
import PropTypes from "prop-types";
// import { adminPaths } from "config/paths";
// import { BASE_URL } from "config/consts";
import styled from "styled-components";
import Row from "containers/Row";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { connect } from "react-redux";
import { getPlatformStats } from "actions/admin";
const currentYear = dayjs().get("year");
import { Loader } from "components/Loader";
const years = [];
for (let i = 2018; i <= currentYear; i++) {
    years.push({ label: i, value: i });
}
@connect((state) => ({
    platforms: state.admin.platforms,
    isFetching: state.admin.isFetching,
}))
class Platform extends PureComponent {
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

        this.props.dispatch(getPlatformStats(params));
        // const queryString =
        //     "?" +
        //     Object.keys(params)
        //         .map((k) => {
        //             if (params[k]) return `${k}=${params[k]}`;
        //         })
        //         .join("&");
        // window.open(
        //     `${BASE_URL}/${adminPaths.GET_STATISTIC_DISPANSERISATION_XLS}${queryString}`,
        //     "_blank",
        // );
    };

    render() {
        const { year } = this.state;
        const { platforms, isFetching } = this.props;
        if (isFetching) return <Loader />;
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
                <Row>
                    <List
                        // rigid={rigid}
                        data={platforms.content || []}
                        renderItem={(e, index) => (
                            <ListItem className={index}>
                                <div>Месяц: {e.month}</div>
                                <div>web: {e.web}</div>
                                <div>android: {e.android}</div>
                                <div>ios: {e.ios}</div>
                            </ListItem>
                        )}
                    />
                </Row>
                <Button onClick={this.onClick} label={"Поиск"} />
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

const ListItem = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px;
`;

export default Platform;
