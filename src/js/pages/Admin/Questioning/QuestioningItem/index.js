import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import { fontStyles } from "styledMixins/mixins";
import Actions from "containers/Header/Actions";
import DeleteIcon from "icons/DeleteIcon";
import FinishIcon from "icons/FinishIcon";
import { connect } from "react-redux";
import PublicIcon from "icons/PublicIcon";
import { actionWithQuestionary } from "actions/admin";
import { adminPaths } from "config/paths";
import QuestioningIcon from "icons/QuestioningIcon";
import CopyIcon from "icons/CopyIcon";
import dayjs from "dayjs";
import { showPopup } from "actions/popup";
import QuestioningPopup from "pages/Admin/Questioning/QuestioningPopup";

@connect(null, { showPopup, actionWithQuestionary })
class QuestioningItem extends PureComponent {
    draftActions = [
        {
            icon: <CopyIcon opacity={0.5} />,
            tooltip: "Копировать",
            action: () =>
                this.copyQuestionary(
                    adminPaths.COPY_QUESTIONING,
                    { id: this.props.item.id },
                    [{ states: ["DRAFT"], action: "draft" }],
                ),
        },
        {
            icon: <PublicIcon opacity={0.5} />,
            tooltip: "Опубликовать",
            action: () =>
                this.publishQuestionary(
                    adminPaths.PUBLISH_QUESTIONING,
                    { id: this.props.item.id, state: "PUBLISHED" },
                    [
                        { states: ["DRAFT"], action: "draft" },
                        {
                            states: ["PUBLISHED", "ENDED"],
                            action: "pub_end",
                        },
                    ],
                ),
            // this.props.dispatch(publishNews({id: this.props.item.id}))s
        },
        {
            icon: <DeleteIcon opacity={0.5} />,
            tooltip: "Удалить",
            action: () =>
                this.showDeletePopup(
                    adminPaths.DELETE_QUESTIONING,
                    { id: this.props.item.id },
                    [{ states: ["DRAFT"], action: "draft" }],
                ),
        },
    ];

    publishedActions = [
        {
            icon: <FinishIcon opacity={0.5} />,
            tooltip: "Завершить",
            action: () =>
                this.showTerminatePopup(
                    adminPaths.PUBLISH_QUESTIONING,
                    { id: this.props.item.id, state: "ENDED" },
                    [{ states: ["PUBLISHED", "ENDED"], action: "pub_end" }],
                ),
        },
    ];

    render() {
        const { item, onClick } = this.props;
        return (
            <Wrapper onClick={onClick}>
                <PlateWrapper>
                    <IconPlate title={<QuestioningIcon color={"#fff"} />} />
                </PlateWrapper>
                <InfoWrapper>
                    <Title>{item.title}</Title>
                    <AdditionalInfo>
                        {item.creationDate && (
                            <Item>
                                <ListData
                                    label={"Дата создания:"}
                                    data={dayjs(item.creationDate).format(
                                        "HH:mm ч. DD.MM.YYYY г.",
                                    )}
                                />
                            </Item>
                        )}
                        {item.publicationDate && (
                            <Item>
                                <ListData
                                    label={"Дата публикации:"}
                                    data={dayjs(item.publicationDate).format(
                                        "HH:mm ч. DD.MM.YYYY г.",
                                    )}
                                />
                            </Item>
                        )}
                        {item.plannedEndDate && (
                            <Item>
                                <ListData
                                    label={"Планируемая дата завершения:"}
                                    data={dayjs(item.plannedEndDate).format(
                                        "HH:mm ч. DD.MM.YYYY г.",
                                    )}
                                />
                            </Item>
                        )}
                        {item.actualEndDate && (
                            <Item>
                                <ListData
                                    label={"Дата завершения:"}
                                    data={dayjs(item.actualEndDate).format(
                                        "HH:mm ч. DD.MM.YYYY г.",
                                    )}
                                />
                            </Item>
                        )}
                    </AdditionalInfo>
                </InfoWrapper>
                {/*<Status status={item.state}>*/}
                {/*    {this.renderStatus()}*/}
                {/*</Status>*/}
                <ActionsWrapper>{this.renderActions()}</ActionsWrapper>
            </Wrapper>
        );
    }

    // renderStatus = () => {
    //     const {item} = this.props
    //
    //     if (item.state.toLowerCase() === 'draft') {
    //         return 'Черновик'
    //     } else if (item.state.toLowerCase() === 'published') {
    //         return 'Опубликовано'
    //     }
    //
    //     return 'Снято с публикации'
    // }

    copyQuestionary = (path, data, getParams) => {
        const { actionWithQuestionary } = this.props;

        actionWithQuestionary(path, data, getParams);
    };

    publishQuestionary = (path, data, getParams) => {
        const { actionWithQuestionary } = this.props;

        actionWithQuestionary(path, data, getParams);
    };

    showDeletePopup = (path, data, getParams) => {
        const { showPopup, actionWithQuestionary } = this.props;

        showPopup(
            "Вы уверены что хотите удалить анкету?",
            <QuestioningPopup
                path={path}
                data={data}
                getParams={getParams}
                onClick={actionWithQuestionary}
            />,
        );
    };

    showTerminatePopup = (path, data, getParams) => {
        const { showPopup, actionWithQuestionary } = this.props;

        // this.props.dispatch(
        //     actionWithQuestionary(
        //         adminPaths.PUBLISH_QUESTIONING,
        //         { id: this.props.item.id, state: "ENDED" },
        //         [{ states: ["PUBLISHED", "ENDED"], action: "pub_end" }],
        //     ),
        // );

        showPopup(
            "Вы уверены что хотите завершить анкету?",
            <QuestioningPopup
                path={path}
                data={data}
                getParams={getParams}
                onClick={actionWithQuestionary}
            />,
        );
    };

    renderActions = () => {
        const { item } = this.props;
        if (item.state === "DRAFT") {
            return <Actions items={this.draftActions} />;
        } else if (item.state === "PUBLISHED") {
            return <Actions items={this.publishedActions} />;
        }
        // else if (item.state === 'ENDED') {
        //     return <Actions items={this.endedActions} />
        // }
        return null;
    };
}

const Wrapper = styled.div`
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
`;

const InfoWrapper = styled.div`
    margin-right: 16px;
    flex: 1 1 0;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

const AdditionalInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.div`
    margin-bottom: 5px;
    margin-right: 16px;
`;

// function renderColor(props) {
//     switch (props.status) {
//         case 'DRAFT':
//             return props.theme.colors.gradients.gradientFive
//         case 'PUBLISHED':
//             return props.theme.userTheme.backgroundColor
//         case 'FINISHED':
//             return props.theme.colors.gradients.gradientFour
//         default:
//             return '#000'
//     }
// }

// const Status = styled.div`
//     ${(props) => fontStyles(props, {font: 'bold', size: '12px'})};
//     margin-right: 20px;
//     background: ${props => renderColor(props)};
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     flex: 0 0 auto;
// `

const ActionsWrapper = styled.div`
    flex: 0 0 auto;
`;

QuestioningItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    actionWithQuestionary: PropTypes.func,
    showPopup: PropTypes.func,
};

export default QuestioningItem;
