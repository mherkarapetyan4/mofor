import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";
import { connect } from "react-redux";
import { formatDate } from "utils/formatDate";
import { showPopup } from "actions/popup";
import Description from "pages/Pregnancy/Description";

@connect(null, { showPopup })
class ListItem extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func,
        item: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
    };

    archiveDetailHandler = () => {
        const { showPopup, item } = this.props;
        showPopup("Подробнее о беременности", <Description item={item} />);
    };

    render() {
        const { index, item } = this.props;
        const { pregnancy, result } = item;
        const { estimatedEndDate, lastMenstruationDate } = pregnancy;
        const { title } = result;
        return (
            <ListItemWrapper
                key={`item-id-${index}`}
                onClick={this.archiveDetailHandler}
            >
                <InfoWrapper>
                    <ItemInfo>
                        <ItemDate>
                            {formatDate(lastMenstruationDate)}-
                            {formatDate(estimatedEndDate)}
                        </ItemDate>
                        <ItemName>{title}</ItemName>
                    </ItemInfo>
                </InfoWrapper>
            </ListItemWrapper>
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

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        align-items: flex-start;
    }
`;

const ItemDate = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 8px;
`;

const ItemName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
            color: props.theme.colors.text.colorBlack,
        })};
`;

const ItemInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
`;

export default ListItem;
