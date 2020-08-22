import { FetchingList } from "components/FetchingList";
import ListItem from "pages/Pregnancy/ListItem";
import React from "react";
import { getArchiveList } from "actions/pregnancy";
import styled from "styled-components";

const archiveListHandler = (showPopup) => {
    const component = (
        <Wrapper>
            <FetchingList
                action={getArchiveList}
                reducerName={"pregnancy"}
                objectName={"archiveList"}
                renderItem={(item, i) => (
                    <ListItem key={i} item={item} index={i} />
                )}
            />
        </Wrapper>
    );
    showPopup("Архив беременностей", component);
};

const Wrapper = styled.div`
    padding: 0 16px 16px 16px;
`;

export default archiveListHandler;
