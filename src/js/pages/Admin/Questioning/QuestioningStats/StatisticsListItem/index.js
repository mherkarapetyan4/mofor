import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import { fontStyles } from "styledMixins/mixins";

class StatisticsListItem extends PureComponent {
    render() {
        const labels = {
            MALE: {
                short: "М",
                full: "Мужчины",
            },
            FEMALE: {
                short: "Ж",
                full: "Женщины",
            },
        };

        const { byAgeAndSexItems, bySexItems } = this.props;
        const sexItem = bySexItems.find(
            (sI) => sI.sex === byAgeAndSexItems[0].sex,
        );

        return (
            <Wrapper>
                <PlateWrapper>
                    <IconPlate title={labels[byAgeAndSexItems[0].sex]?.short} />
                </PlateWrapper>
                <ContentWrapper>
                    <Name>
                        {labels[byAgeAndSexItems[0].sex]?.full}{" "}
                        {`(${sexItem.percent * 100}%)`}
                    </Name>
                    <InfoWrapper>
                        {byAgeAndSexItems.map((item) => (
                            <Item key={item.sex + item.fromAge}>
                                <ListData
                                    label={`От ${item.fromAge}  ${
                                        item.toAge ? "  до " + item.toAge : ""
                                    } лет:`}
                                    data={`${item.count} чел. (${item.percent *
                                        100}%)`}
                                />
                            </Item>
                        ))}
                        <Item>
                            <ListData
                                label={"Все:"}
                                data={`${sexItem.count} чел.`}
                            />
                        </Item>
                        {/* <Item>
              <ListData label={"От 18 до 23 лет:"} data={"100 чел. (33.3%)"} />
            </Item>
            <Item>
              <ListData label={"От 24 до 60 лет:"} data={"100 чел. (33.3%)"} />
            </Item>
            <Item>
              <ListData label={"От 61 года:"} data={"100 чел. (33.3%)"} />
            </Item>
            <Item>
              <ListData label={"Все:"} data={"300 чел."} />
            </Item> */}
                    </InfoWrapper>
                </ContentWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 16px;
    display: flex;
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-bottom: 5px;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.div`
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }
`;

StatisticsListItem.propTypes = {
    byAgeAndSexItems: PropTypes.array,
    bySexItems: PropTypes.array,
};

export default StatisticsListItem;
