import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ListData from "components/List/ListData";
import dayjs from "dayjs";

class HealthData extends PureComponent {
    render() {
        const { note, date, stringValue } = this.props.data;
        const { type, onClick } = this.props;

        return (
            <Wrapper onClick={onClick}>
                <DataWrapper>
                    <ListData
                        label={"Дата:"}
                        data={dayjs(date).format("HH:mm ч. DD.MM.YYYY г.")}
                    />
                </DataWrapper>
                <DataWrapper>
                    <ListData label={"Значение:"} data={stringValue} />
                </DataWrapper>
                {type === "pressure" && (
                    <DataWrapper>
                        <ListData label={"Рука:"} data={this.renderHand()} />
                    </DataWrapper>
                )}
                <DataWrapper>
                    <ListData
                        label={"Примечание:"}
                        data={note || "Нет примечания"}
                    />
                </DataWrapper>
            </Wrapper>
        );
    }

    renderHand = () => {
        const { modifier } = this.props.data;

        switch (modifier) {
            case "RIGHT_HAND":
                return "Правая рука";
            case "LEFT_HAND":
                return "Левая рука";
            default:
                return "Не указана";
        }
    };
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const DataWrapper = styled.div`
    padding: 10px;
`;

HealthData.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default HealthData;
