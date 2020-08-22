import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import PillIcon from "icons/medicine/PillIcon";
import { Desktop } from "wrappers/responsive";
import { RESPONSIVE } from "config/consts";

class RecipeListItem extends PureComponent {
    render() {
        const { item } = this.props;

        return (
            <Wrapper>
                <Desktop>
                    <PlateWrapper>
                        <IconPlate title={<PillIcon color={"#fff"} />} />
                    </PlateWrapper>
                </Desktop>
                <InfoWrapper>
                    <Type>
                        <ItemType>Лекарственное средство</ItemType>
                        <ItemName>{item.rp}</ItemName>
                    </Type>
                    <AdditionalInfoWrapper>
                        <Item>
                            <ListData
                                label={"Количество препарата:"}
                                data={item.amount}
                            />
                        </Item>
                        <Item>
                            <ListData label={"Дозировка:"} data={item.dose} />
                        </Item>
                    </AdditionalInfoWrapper>
                </InfoWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    padding: 16px;
`;

const Type = styled.div`
    width: 50%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

const Item = styled.div`
    margin-bottom: 8px;
    width: 100%;
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
    flex: 0 0 auto;
`;

const InfoWrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
`;

const ItemType = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 5px;
`;

const ItemName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

const AdditionalInfoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 50%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

RecipeListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default RecipeListItem;
