import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { formatDate } from "utils/formatDate";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";
import { darken } from "polished";

class ListItem extends PureComponent {
    state = {
        objectIsOpened: false,
    };
    render() {
        const { index, item } = this.props;
        const { objectIsOpened } = this.state;
        const { date, action, initiator, technical, object } = item;

        return (
            <ListItemWrapper key={`item-id-${index}`}>
                <InfoWrapper>
                    <ItemInfo>
                        <ItemDate>{formatDate(date)}</ItemDate>
                        <ItemName>
                            <ItemHeader
                                onClick={() => {
                                    this.setState({
                                        objectIsOpened: !objectIsOpened,
                                    });
                                }}
                            >
                                {action}
                            </ItemHeader>
                            {objectIsOpened && (
                                <ItemContent>{object}</ItemContent>
                            )}
                        </ItemName>
                        <ItemFields>
                            <ItemField>
                                <FieldTitle>Действующее лицо:</FieldTitle>
                                <FieldData>{initiator}</FieldData>
                            </ItemField>
                            <ItemField>
                                <FieldTitle>Техническое:</FieldTitle>
                                <FieldData>
                                    {technical ? "Да" : "Нет"}
                                </FieldData>
                            </ItemField>
                        </ItemFields>
                    </ItemInfo>
                </InfoWrapper>
            </ListItemWrapper>
        );
    }
}

const ItemHeader = styled.div`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    background-color: ${(props) =>
        props.open
            ? darken(0.05, props.theme.colors.background.white)
            : "transparent"};
    border-radius: 10px;
    padding: 10px;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
            color: props.theme.colors.text.colorBlack,
        })};
    transition: background-color ${(props) => props.theme.animations.transition};

    &:hover {
        background-color: ${(props) =>
            darken(0.05, props.theme.colors.background.white)};
    }
`;
const ItemContent = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;
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

const ItemDate = styled.div`
    ${(props) => fontStyles(props)};
`;

const ItemName = styled.div`
    margin: 8px 0;
`;

const ItemFields = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ItemField = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
`;

const FieldTitle = styled.div`
    ${(props) => fontStyles(props)};
`;

const FieldData = styled.div`
    ${(props) => fontStyles(props, { color: "black" })};
    margin-left: 10px;
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        align-items: flex-start;
    }
`;

ListItem.propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
};

export default ListItem;
