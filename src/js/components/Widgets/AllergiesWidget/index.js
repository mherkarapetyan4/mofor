import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import RoundChart from "components/RoundChart";
import { fontStyles } from "styledMixins/mixins";
import pollenLogo from "images/logos/pollen.png";
import map from "lodash/map";
import renderPlainColor from "utils/renderPlainColor";
import { darken } from "polished";
import { getAllergies } from "actions/widgets";
import { getData } from "decorators/getData";
import dayjs from "dayjs";
import ScrollBar from "components/ScrollBar";

@getData({ getAllergies }, ["widgets"])
class AllergiesWidget extends PureComponent {
    render() {
        const {
            allergies: { forecast, items },
        } = this.props.widgets.allergyWidget;

        const totalScore = forecast?.totalScore;
        const date = forecast?.date;

        return (
            <WidgetWrapper>
                <WidgetInfo>
                    Прогноз уровня метеорологической опасности на{" "}
                    {dayjs(date).format("DD.MM.YYYY")}г. для г.Москва
                </WidgetInfo>
                <WidgetData>
                    {totalScore ? (
                        <>
                            <RoundChart
                                number={totalScore}
                                title={"Уровень риска"}
                                id={"allergies"}
                            />
                            <DataResult>
                                <ScrollBar>
                                    {map(items, (item, i) => {
                                        return (
                                            <Item key={i}>
                                                <ItemName>
                                                    {item.title}
                                                </ItemName>
                                                <ItemScore score={item.score}>
                                                    {item.score} из{" "}
                                                    {item.maxScore}
                                                </ItemScore>
                                            </Item>
                                        );
                                    })}
                                </ScrollBar>
                            </DataResult>
                        </>
                    ) : (
                        <ClearResult>
                            На сегодня рисков по аллергиям нет
                        </ClearResult>
                    )}
                </WidgetData>
                {/*<ButtonWrapper>*/}
                {/*    <Link to={"/"}>*/}
                {/*        <Button label={"Подробнее"} onClick={() => {}} />*/}
                {/*    </Link>*/}
                {/*</ButtonWrapper>*/}
                <SponsorLogo>
                    <img src={pollenLogo} alt="pollen" />
                </SponsorLogo>
            </WidgetWrapper>
        );
    }
}

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ItemName = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const ItemScore = styled.div`
    margin-left: 20px;
    ${(props) => fontStyles(props, { font: "bold" })};
    color: ${(props) => darken(0.2, renderPlainColor(props, props.score))};
`;

const SponsorLogo = styled.div`
    position: absolute;
    left: 10px;
    bottom: 10px;
    height: 38px;
    width: 32px;

    img {
        width: 100%;
        height: 100%;
    }
`;

// const ButtonWrapper = styled.div`
//     display: flex;
//     justify-content: flex-end;
// `;

const DataResult = styled.div`
    margin-left: 10px;
    width: 100%;
    height: 65px;
    overflow-y: auto;
`;

const ClearResult = styled.div`
    width: 100%;
    text-align: center;
`;

const WidgetWrapper = styled.div`
    position: relative;
    padding: 10px;
`;

const WidgetInfo = styled.div`
    ${(props) => fontStyles(props)};
`;

const WidgetData = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

AllergiesWidget.propTypes = {
    getAllergies: PropTypes.func,
    widgets: PropTypes.object,
};

export default AllergiesWidget;
