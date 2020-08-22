import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import Actions from "containers/Header/Actions";
import PublicIcon from "icons/PublicIcon";
import DeleteIcon from "icons/DeleteIcon";
import FinishIcon from "icons/FinishIcon";
import { fontStyles } from "styledMixins/mixins";
import { formatDate } from "utils/formatDate";
import { connect } from "react-redux";
import { deleteNews, publishNews, unpublishNews } from "actions/admin";
import EditIcon from "icons/EditIcon";
import { ADMIN_ELEMENTS } from "config/menu";
import { withRouter } from "react-router-dom";
import UpdateServiceIcon from "icons/UpdateServiceIcon";
import { showPopup, hidePopup } from "actions/popup";
import UpdateItemPopup from "pages/Admin/Updates/UpdateItemPopup";

@withTheme
@withRouter
@connect(null, { showPopup, hidePopup, deleteNews, publishNews, unpublishNews })
class UpdateItem extends PureComponent {
    draftActions = [
        {
            icon: <PublicIcon opacity={0.5} />,
            tooltip: "Опубликовать",
            action: () => this.showPublishPopup({ id: this.props.item.id }),
        },
        {
            icon: <EditIcon opacity={0.5} />,
            tooltip: "Редактировать",
            action: () => {
                const { history, item } = this.props;
                history.push({
                    pathname: `${ADMIN_ELEMENTS.UPDATES.path}/edit`,
                    state: { item: { ...item } },
                });
            },
        },
        {
            icon: <DeleteIcon opacity={0.5} />,
            tooltip: "Удалить",
            action: () => this.showDeletePopup({ id: this.props.item.id }),
        },
    ];

    publishedActions = [
        {
            icon: <FinishIcon opacity={0.5} />,
            tooltip: "Снять с публикации",
            action: () => this.showUnpublishPopup({ id: this.props.item.id }),
        },
    ];

    endedActions = [];

    state = {
        published: false,
    };

    render() {
        const { item, onClick } = this.props;

        return (
            <Wrapper onClick={onClick}>
                <PlateWrapper>
                    <IconPlate title={<UpdateServiceIcon color={"#fff"} />} />
                </PlateWrapper>
                <InfoWrapper>
                    <Date>{formatDate(item.creationDate)}</Date>
                    <UpdateTitle>{item.title}</UpdateTitle>
                    <AdditionalInfo>
                        {item.publicationDate && (
                            <ItemWrapper>
                                <ListData
                                    label={"Дата публикации:"}
                                    data={formatDate(item.publicationDate)}
                                />
                            </ItemWrapper>
                        )}
                        {item.plannedEndDate && (
                            <ItemWrapper>
                                <ListData
                                    label={"Дата планируемого окончания:"}
                                    data={formatDate(item.plannedEndDate)}
                                />
                            </ItemWrapper>
                        )}
                        {item.actualEndDate && (
                            <ItemWrapper>
                                <ListData
                                    label={"Дата окончания:"}
                                    data={formatDate(item.actualEndDate)}
                                />
                            </ItemWrapper>
                        )}
                        <ItemWrapper>
                            <ListData
                                label={"Количество дней:"}
                                data={item.publicationDays}
                            />
                        </ItemWrapper>
                    </AdditionalInfo>
                    <UpdateInfo>
                        <ItemWrapper>
                            <ListData
                                label={"Описание обновления:"}
                                data={item.text}
                            />
                        </ItemWrapper>
                    </UpdateInfo>
                </InfoWrapper>
                <ItemStatus status={item.state}>
                    {this.renderStatus()}
                </ItemStatus>
                <ActionsWrapper>{this.renderActions()}</ActionsWrapper>
            </Wrapper>
        );
    }

    showPublishPopup = (params) => {
        const { showPopup, publishNews } = this.props;

        showPopup(
            "Вы уверены что хотите опубликовать запись?",
            <UpdateItemPopup params={params} onClick={publishNews} />,
        );
    };

    showDeletePopup = (params) => {
        const { showPopup, deleteNews } = this.props;

        showPopup(
            "Вы уверены что хотите удалить запись?",
            <UpdateItemPopup params={params} onClick={deleteNews} />,
        );
    };

    showUnpublishPopup = (params) => {
        const { showPopup, unpublishNews } = this.props;

        showPopup(
            "Вы уверены что хотите снять запись с публикации?",
            <UpdateItemPopup params={params} onClick={unpublishNews} />,
        );
    };

    renderStatus = () => {
        const { item } = this.props;
        if (item.state === "DRAFT") {
            return "Черновик";
        } else if (item.state === "PUBLISHED") {
            return "Опубликовано";
        }
        return "Снято с публикации";
    };

    renderActions = () => {
        const { item } = this.props;
        if (item.state === "DRAFT") {
            return <Actions items={this.draftActions} />;
        } else if (item.state === "PUBLISHED") {
            return <Actions items={this.publishedActions} />;
        }
        return <Actions items={this.endedActions} />;
    };
}

const UpdateInfo = styled.div``;

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 16px;
    width: 100%;
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    width: calc(100% - 220px);
`;

const Date = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 5px;
`;

const UpdateTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

const AdditionalInfo = styled.div`
    display: flex;
`;

const ActionsWrapper = styled.div`
    flex: 0 0 auto;
`;

function renderColor(props) {
    switch (props.status) {
        case "DRAFT":
            return props.theme.colors.gradients.gradientFive;
        case "PUBLISHED":
            return props.theme.userTheme.backgroundColor;
        case "FINISHED":
            return props.theme.colors.gradients.gradientFour;
        default:
            return "#000";
    }
}

const ItemStatus = styled.div`
    ${(props) => fontStyles(props, { font: "bold", size: "12px" })};
    margin-right: 20px;
    background: ${(props) => renderColor(props)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ItemWrapper = styled.div`
    margin-bottom: 5px;
    margin-right: 30px;

    &:last-child {
        margin-right: 0;
    }
`;

UpdateItem.propTypes = {
    item: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    showPopup: PropTypes.func.isRequired,
    hidePopup: PropTypes.func.isRequired,
    deleteNews: PropTypes.func.isRequired,
    publishNews: PropTypes.func.isRequired,
    unpublishNews: PropTypes.func.isRequired,
};

export default UpdateItem;
