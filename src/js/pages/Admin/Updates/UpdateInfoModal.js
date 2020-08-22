import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import ListData from "components/List/ListData";
import { formatDate } from "utils/formatDate";

const Wrapper = styled.div`
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
`;

const InfoWrapper = styled.div`
    margin-right: 16px;
    flex: 1 1 auto;
`;

const Item = styled.div`
    margin-bottom: 5px;
    margin-right: 16px;
`;

const AdditionalInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

class UpdateInfoModal extends PureComponent {
    render() {
        const { item } = this.props;
        if (!item) return null;
        return (
            <Wrapper>
                <InfoWrapper>
                    <Title>{item.title}</Title>
                    <AdditionalInfo>
                        {item.creationDate && (
                            <Item>
                                <ListData
                                    label={"Дата создания:"}
                                    data={formatDate(item.creationDate)}
                                />
                            </Item>
                        )}
                        {item.publicationDate && (
                            <Item>
                                <ListData
                                    label={"Дата публикации:"}
                                    data={formatDate(item.publicationDate)}
                                />
                            </Item>
                        )}
                        {item.plannedEndDate && (
                            <Item>
                                <ListData
                                    label={"Планируемая дата завершения:"}
                                    data={formatDate(item.plannedEndDate)}
                                />
                            </Item>
                        )}
                        {item.actualEndDate && (
                            <Item>
                                <ListData
                                    label={"Дата завершения:"}
                                    data={formatDate(item.actualEndDate)}
                                />
                            </Item>
                        )}
                        {item.text && (
                            <Item>
                                <ListData
                                    label={"Описание обновления:"}
                                    data={item.text}
                                />
                            </Item>
                        )}
                        {item.publicationDays && (
                            <Item>
                                <ListData
                                    label={"Количество дней:"}
                                    data={item.publicationDays}
                                />
                            </Item>
                        )}
                    </AdditionalInfo>
                </InfoWrapper>
            </Wrapper>
        );
    }
}

UpdateInfoModal.propTypes = {
    item: PropTypes.object.isRequired,
};

export default UpdateInfoModal;
