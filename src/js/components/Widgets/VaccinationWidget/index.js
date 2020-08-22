import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { Button } from "components/Button";
import NoData from "components/NoData";
import isEmpty from "lodash/isEmpty";
import BoyIcon from "icons/persons/BoyIcon";
import { rgba } from "polished";
import { LK_MENU_ELEMENTS } from "config/menu";
import { history } from "routes/history";
import { connect } from "react-redux";
import { getVaccinationWidgetInfo } from "actions/widgets";
import GirlIcon from "icons/persons/GirlIcon";

@connect((state) => ({
    widgetInfo: state.vaccinations.widgetInfo,
    myData: state.myData.myData,
}))
class VaccinationWidget extends PureComponent {
    static propTypes = {
        widgetInfo: PropTypes.object.isRequired,
        myData: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getVaccinationWidgetInfo());
    }

    render() {
        const { widgetInfo, myData } = this.props;
        let vaccinesList = [];
        if (widgetInfo.content) {
            vaccinesList = widgetInfo.content;
        }
        return (
            <Wrapper>
                {!isEmpty(vaccinesList) ? (
                    vaccinesList.map((item, i) => (
                        <ContentWrapper key={i}>
                            <UserInfo>
                                <Icon>
                                    {myData.person.sex === "MALE" ? (
                                        <BoyIcon />
                                    ) : (
                                        <GirlIcon />
                                    )}
                                </Icon>
                                <Age>{item.title}</Age>
                            </UserInfo>
                            <VaccinesList>
                                <>
                                    <Disclaimer>
                                        В вашем возрасте рекомендуется сделать
                                        следующие прививки:
                                    </Disclaimer>
                                    <List>
                                        {item.events.map((element, k) => (
                                            <Item key={k}>
                                                — {element.event.title}
                                            </Item>
                                        ))}
                                    </List>
                                </>
                            </VaccinesList>
                        </ContentWrapper>
                    ))
                ) : (
                    <ContentWrapper>
                        <UserInfo>
                            <Icon>
                                {myData.person.sex === "MALE" ? (
                                    <BoyIcon />
                                ) : (
                                    <GirlIcon />
                                )}
                            </Icon>
                        </UserInfo>
                        <VaccinesList>
                            <NoData
                                title={"Нет рекомендуемых прививок"}
                                message={
                                    "Для вашего возраста нет рекомендуемых прививок"
                                }
                            />
                        </VaccinesList>
                    </ContentWrapper>
                )}
                <WidgetButton>
                    <Item>
                        {
                            'Приказ № 125н "Об утверждении национального календаря профилактических прививок"'
                        }
                    </Item>
                    <Button label={"Подробнее"} onClick={this.handleClick} />
                </WidgetButton>
            </Wrapper>
        );
    }

    handleClick = () => {
        history.push(LK_MENU_ELEMENTS.VACCINATION_PAGE.path);
    };
}

const Wrapper = styled.div`
    padding: 10px;
`;

const ContentWrapper = styled.div`
    display: flex;
`;

const UserInfo = styled.div`
    margin-right: 16px;
`;

const Icon = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    padding: 10px;
    background-color: ${() => rgba(0, 0, 0, 0.05)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    svg {
        height: 100%;
    }
`;

const Age = styled.div`
    width: 100%;
    text-align: center;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
`;

const VaccinesList = styled.div``;

const Disclaimer = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

const List = styled.div``;

const Item = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    padding: 8px 0;
    flex: 1 1 0;
`;

const WidgetButton = styled.div`
    display: flex;
    // flex-direction: row-reverse;
`;

export default VaccinationWidget;
