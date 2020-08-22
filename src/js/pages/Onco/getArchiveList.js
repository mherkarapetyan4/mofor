import { FetchingList } from "components/FetchingList";
import React from "react";
import { getArchiveList } from "actions/onco";
import styled from "styled-components";
import ListItem from "./ListItem";
const archiveListHandler = (showPopup) => {
    const component = (
        <Wrapper>
            <FetchingList
                action={getArchiveList}
                reducerName={"onco"}
                objectName={"archiveList"}
                renderItem={(item, i) => (
                    <ListItem key={i} item={item} index={i} />
                )}
            />
        </Wrapper>
    );
    showPopup("Архив", component);
};

const Wrapper = styled.div`
    padding: 0 16px 16px 16px;
`;

export default archiveListHandler;
