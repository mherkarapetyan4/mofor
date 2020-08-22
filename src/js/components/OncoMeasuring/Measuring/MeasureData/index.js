import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ListData from "components/List/ListData";
import { formatDate } from "utils/formatDate";

class MeasureData extends PureComponent {
    render() {
        const { data } = this.props;
        const date = data.time || data.date;
        return (
            <DataWrapper>
                <DataItem>
                    <ListData label={"Дата:"} data={formatDate(date)} />
                </DataItem>
                <DataItem>
                    <ListData
                        label={"Измерение:"}
                        data={data.weight || data.stringValue}
                    />
                </DataItem>
                <DataItem>
                    <ListData
                        label={"Комментарий:"}
                        data={data.comment || data.note}
                    />
                </DataItem>
            </DataWrapper>
        );
    }
}

const DataWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: ${(props) => props.theme.paddings.normal};
`;

const DataItem = styled.div`
    margin-right: 30px;
    overflow: hidden;
    padding: 4px 0;

    &:last-child {
        margin-right: 0;
    }
`;

MeasureData.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MeasureData;
