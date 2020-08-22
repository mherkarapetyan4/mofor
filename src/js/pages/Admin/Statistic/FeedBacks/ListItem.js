import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";
import IconPlate from "components/IconPlate";
import StarBar from "components/StarBar";
import ReportIcon from "icons/ReportIcon";
import ListData from "components/List/ListData";

class ListItem extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        markAverage: PropTypes.number.isRequired,
    };

    state = {
        markAverage: 0,
    };

    componentDidMount() {
        const {
            markOneCount,
            markTwoCount,
            markThreeCount,
            markFourCount,
            markFiveCount,
        } = this.props.item;

        const estimatesSum =
            markOneCount +
            markTwoCount +
            markThreeCount +
            markFourCount +
            markFiveCount;
        const grossEstimate =
            markOneCount +
            markTwoCount * 2 +
            markThreeCount * 3 +
            markFourCount * 4 +
            markFiveCount * 5;

        let markAverage = Math.round((grossEstimate / estimatesSum) * 10) / 10;

        this.setState({ markAverage });
    }

    render() {
        const { index, item } = this.props;
        const { markAverage } = this.state;
        const {
            moName,
            markOneCount,
            markTwoCount,
            markThreeCount,
            markFourCount,
            markFiveCount,
        } = item;

        return (
            <ListItemWrapper key={`item-id-${index}`}>
                <InfoWrapper>
                    <ItemInfo>
                        <ItemIcon>
                            <IconPlate title={<ReportIcon color={"#fff"} />} />
                        </ItemIcon>
                        <ItemReviews>
                            <ItemHeader>{moName}</ItemHeader>
                            <ItemBody>
                                <Item>
                                    <ListData
                                        label={"Средняя оценка:"}
                                        data={markAverage}
                                    />
                                </Item>
                                <Item>
                                    <MarksItem>
                                        <StarBar max={1} value={1} />
                                        {markOneCount}
                                    </MarksItem>
                                    <MarksItem>
                                        <StarBar max={2} value={2} />
                                        {markTwoCount}
                                    </MarksItem>
                                    <MarksItem>
                                        <StarBar max={3} value={3} />
                                        {markThreeCount}
                                    </MarksItem>
                                    <MarksItem>
                                        <StarBar max={4} value={4} />
                                        {markFourCount}
                                    </MarksItem>
                                    <MarksItem>
                                        <StarBar max={5} value={5} />
                                        {markFiveCount}
                                    </MarksItem>
                                </Item>
                            </ItemBody>
                        </ItemReviews>
                    </ItemInfo>
                </InfoWrapper>
            </ListItemWrapper>
        );
    }
}

const ItemIcon = styled.div`
    width: 24px;
    height: 24px;
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

const ItemBody = styled.div`
    display: flex;
`;

const ItemHeader = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 5px 0;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const ItemReviews = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
    margin-left: 15px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
`;

const MarksItem = styled.div`
    display: flex;
    align-items: center;
    ${(props) => fontStyles(props, { color: "black" })};
    margin-right: 40px;
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: row;
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
