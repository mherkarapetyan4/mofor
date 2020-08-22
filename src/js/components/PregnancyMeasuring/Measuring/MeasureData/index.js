import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ListData from "components/List/ListData";
import { formatDate } from "utils/formatDate";

class MeasureData extends PureComponent {
    onClick = () => {
        const { data, onClick } = this.props;
        onClick(data);
    };

    render() {
        const { data } = this.props;
        const date = data.time || data.date;
        return (
            <DataWrapper onClick={this.onClick}>
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
    cursor: pointer;
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
    onClick: PropTypes.func,
};

MeasureData.defaultProps = {
    onClick: () => {},
};

export default MeasureData;
