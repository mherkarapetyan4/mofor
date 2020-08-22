import React, { PureComponent } from "react";
import { getStatisticDispanserResults } from "actions/admin";
import { FetchingList } from "components/FetchingList";
import styled from "styled-components";
import { RESPONSIVE } from "config/consts";
import ListData from "components/List/ListData";

class DispanserResults extends PureComponent {
    renderItem(item, index) {
        const { year, count } = item;
        return (
            <ListItemWrapper key={`item-id-${index}`}>
                <Item>
                    <ListData label={"Год:"} data={year} />
                </Item>
                <Item>
                    <ListData label={"Количество:"} data={count} />
                </Item>
            </ListItemWrapper>
        );
    }

    render() {
        return (
            <FetchingList
                action={getStatisticDispanserResults}
                reducerName={"admin"}
                objectName={"statisticsDispanserResults"}
                renderItem={this.renderItem}
                rigid
            />
        );
    }
}

const ListItemWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: ${(props) => props.theme.paddings.normal};

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
`;

export default DispanserResults;
