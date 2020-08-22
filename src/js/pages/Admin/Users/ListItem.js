import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE, ARROW_ANIMATION } from "config/consts";
import IconPlate from "components/IconPlate";
import { formatDate } from "utils/formatDate";
import get from "lodash/get";
import FullArrowIcon from "icons/FullArrowIcon";
import UserIcon from "icons/UserIcon";
import { ADMIN_ROLES } from "config/consts";

class ListItem extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const { index, item, onClick } = this.props;
        const { id, name, email, activeFrom, activeTo, role, blocked } = item;
        return (
            <ListItemWrapper key={`item-id-${index}`} onClick={onClick}>
                <InfoWrapper>
                    <ItemIcon>
                        <IconPlate title={<UserIcon color={"#fff"} />} />
                    </ItemIcon>
                    <ItemInfo>
                        <ItemDate>{email}</ItemDate>
                        <ItemName>{name}</ItemName>
                        <ItemFields>
                            <ItemField>
                                <FieldTitle>Роль:</FieldTitle>
                                <FieldData>
                                    {ADMIN_ROLES[get(role, "name", "")]}
                                </FieldData>
                            </ItemField>
                            <ItemField>
                                <FieldTitle>Дата создания:</FieldTitle>
                                <FieldData>
                                    {formatDate(activeFrom) || "- -"}
                                </FieldData>
                            </ItemField>
                            <ItemField>
                                <FieldTitle>Дата блокировки:</FieldTitle>
                                <FieldData>
                                    {formatDate(activeTo) || "- -"}
                                </FieldData>
                            </ItemField>
                            <ItemField>
                                <FieldTitle>ID:</FieldTitle>
                                <FieldData>{id}</FieldData>
                            </ItemField>
                        </ItemFields>
                    </ItemInfo>
                    <ItemAction>
                        <ItemStatus status={!blocked}>
                            {blocked
                                ? "Запись заблокирована"
                                : "Запись активна"}
                        </ItemStatus>
                        <ActionIcon>
                            <FullArrowIcon opacity={0.5} />
                        </ActionIcon>
                    </ItemAction>
                </InfoWrapper>
            </ListItemWrapper>
        );
    }
}

const ItemIcon = styled.div`
    margin-right: 16px;
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

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        align-items: flex-start;
    }
`;

const ItemFields = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ItemDate = styled.div`
    ${(props) => fontStyles(props)};
`;

const ItemName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin: 8px 0;
`;
const ItemInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
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

const ItemAction = styled.div`
    display: flex;
    align-items: center;
    flex: 0 0 auto;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        padding: 5px 0 0 60px;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        padding: 5px 0 0 50px;
    }
`;

const ItemStatus = styled.div`
    ${(props) => fontStyles(props, { font: "bold", size: "12px" })};
    margin-right: 20px;
    background: ${(props) =>
        props.status
            ? props.theme.colors.gradients.gradientSix
            : props.theme.colors.gradients.gradientFour};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
const ActionIcon = styled.div`
    margin-right: 20px;
    animation: ${(props) => (props.mouseOver ? ARROW_ANIMATION : "none")} 2s
        ease-in-out infinite;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        display: none;
    }
`;

ListItem.propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
};

export default ListItem;
