import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import Actions from "containers/Header/Actions";
import PublicIcon from "icons/PublicIcon";
import DeleteIcon from "icons/DeleteIcon";

class QuestioningDraft extends PureComponent {
    draftActions = [
        {
            icon: <PublicIcon opacity={0.5} />,
            tooltip: "Опубликовать",
            action: () => {},
        },
        {
            icon: <DeleteIcon opacity={0.5} />,
            tooltip: "Удалить",
            action: () => {},
        },
    ];

    render() {
        const { item } = this.props;

        return (
            <Wrapper>
                <PlateWrapper>
                    <IconPlate title={"Ч"} />
                </PlateWrapper>
                <InfoWrapper>
                    <Title>{item.title}</Title>
                    <AdditionalInfo>
                        {item.creationDate && (
                            <Item>
                                <ListData
                                    label={"Дата создания:"}
                                    data={item.creationDate}
                                />
                            </Item>
                        )}
                    </AdditionalInfo>
                </InfoWrapper>
                <ActionsWrapper>
                    <Actions items={this.draftActions} />
                </ActionsWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 16px;
    display: flex;
    align-items: flex-start;
    width: 100%;
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
`;

const InfoWrapper = styled.div`
    margin-right: 16px;
    flex: 1 1 auto;
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

const ActionsWrapper = styled.div`
    flex: 0 0 auto;
`;

QuestioningDraft.propTypes = {
    item: PropTypes.object.isRequired,
};

export default QuestioningDraft;
