import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import IconPlate from "components/IconPlate";
import DoctorIcon from "icons/services/DoctorIcon";
import { formatDate } from "utils/formatDate";
import FullArrowIcon from "icons/FullArrowIcon";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE, ARROW_ANIMATION } from "config/consts";
import ListData from "components/List/ListData";
import get from "lodash/get";
import VaccinationIcon from "icons/VaccinationIcon";
import ServicesIcon from "icons/ServicesIcon";
import ResearchIcon from "components/Icons/ResearchIcon";
import UltrasoundIcon from "icons/UltrasoundIcon";
import MassageIcon from "icons/MassageIcon";
import PoliclinicIcon from "icons/PoliclinicIcon";
import OtherIcon from "icons/OtherIcon";

class ListItem extends PureComponent {
    render() {
        const { selected, index, item, handleMouseOver, onClick } = this.props;

        return (
            <ListItemWrapper
                key={`item-id-${item.id}`}
                onClick={() => onClick(item)}
                onMouseEnter={() => handleMouseOver(index)}
                onMouseLeave={() => handleMouseOver(null)}
            >
                <InfoWrapper>
                    <ItemIcon>
                        <IconPlate
                            title={this.renderIcon(item.group?.id || null)}
                            tooltip={item.group?.name || "Неизвестно"}
                        />
                    </ItemIcon>
                    <ItemInfo>
                        <ItemDate>
                            {formatDate(item.service.startDate)}
                        </ItemDate>
                        <ItemName>
                            {item.service.type?.name || item.diagnosis?.name}
                        </ItemName>
                        <ItemFields>
                            <ItemField>
                                <ListData
                                    label={"Стоимость:"}
                                    data={get(item, "service.cost", "") + " ₽"}
                                />
                            </ItemField>
                            <ItemField>
                                <ListData
                                    label={"Медицинская организация:"}
                                    data={get(item, "serviceMo.name", "")}
                                />
                            </ItemField>
                        </ItemFields>
                    </ItemInfo>
                </InfoWrapper>
                <ItemAction>
                    {this.renderItemStatus()}
                    <ActionIcon mouseOver={selected}>
                        <FullArrowIcon opacity={0.5} />
                    </ActionIcon>
                </ItemAction>
            </ListItemWrapper>
        );
    }

    renderIcon = (id) => {
        switch (id) {
            case 1:
                return <ServicesIcon color={"#fff"} />;
            case 2:
                return <VaccinationIcon color={"#fff"} />;
            case 3:
                return <DoctorIcon color={"#fff"} />;
            case 4:
                return <ResearchIcon color={"#fff"} />;
            case 5:
                return <UltrasoundIcon color={"#fff"} />;
            case 6:
                return <MassageIcon color={"#fff"} />;
            case 7:
                return <PoliclinicIcon color={"#fff"} />;
            case 8:
                return <OtherIcon color={"#fff"} />;
            default:
                return <DoctorIcon color={"#fff"} />;
        }
    };

    renderStatus = (status) => {
        switch (status) {
            case "CONFIRMED":
                return "Услуга оказана";
            case "UNCONFIRMED":
                return "Услуга не оказана";
            default:
                return "Подтвердите оказание услуги";
        }
    };

    renderItemStatus = () => {
        const { item } = this.props;

        if (item.confirmation) {
            return (
                <ItemStatus status={item.confirmation.status}>
                    {this.renderStatus(item.confirmation.status)}
                </ItemStatus>
            );
        }
        return (
            <ItemStatus status={"none"}>{this.renderStatus("none")}</ItemStatus>
        );
    };
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

    @media print {
        display: block;
    }
`;

const ItemDate = styled.div`
    ${(props) => fontStyles(props)};
`;

const ItemName = styled.div`
    ${(props) =>
        fontStyles(props, { font: "bold", size: "14px", color: "black" })};
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

const ItemIcon = styled.div`
    margin-right: 20px;

    @media print {
        display: none;
    }
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const ItemAction = styled.div`
    display: flex;
    align-items: center;
    flex: 0 1 auto;
    text-align: right;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        padding: 5px 0 0 60px;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        padding: 5px 0 0 50px;
    }

    @media print {
        display: none;
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

function renderColor(props) {
    switch (props.status) {
        case "CONFIRMED":
            return props.theme.colors.notifications.success;
        case "UNCONFIRMED":
            return props.theme.colors.notifications.alert;
        default:
            return props.theme.userTheme.color;
    }
}

const ItemStatus = styled.div`
    ${(props) => fontStyles(props, { font: "bold", size: "12px" })};
    margin-right: 20px;
    color: ${(props) => renderColor(props)};
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
    selected: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ListItem;
