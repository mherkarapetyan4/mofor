import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Button } from "components/Button";
import { Link } from "react-router-dom";
import RoundChart from "components/RoundChart";
import { fontStyles } from "styledMixins/mixins";
import forecaLogo from "images/logos/foreca.png";
import { getData } from "decorators/getData";
import { getMeteo } from "actions/widgets";
import dayjs from "dayjs";
import ScrollBar from "components/ScrollBar";
import isEmpty from "lodash/isEmpty";
import TextBlock from "components/TextBlock";

@getData({ getMeteo: () => getMeteo("full") }, ["widgets"])
class BiometWidget extends PureComponent {
    render() {
        const { forecast } = this.props.widgets.meteoWidget.meteo;

        return (
            <BiometWidgetWrapper>
                <WidgetInfo>
                    Прогноз уровня метеорологической опасности на{" "}
                    {dayjs(
                        forecast
                            ? forecast.date
                            : `${new Date().getFullYear()}-${new Date().getMonth() +
                                  1}-${new Date().getDate()}`,
                    ).format("DD.MM.YYYY")}
                    г. для г.Москва
                </WidgetInfo>
                <WidgetData>{this.renderWidget()}</WidgetData>
                <ButtonWrapper>
                    <Link to={LK_MENU_ELEMENTS.BIOMETEOROLOGY_PAGE.path}>
                        <Button label={"Подробнее"} onClick={() => {}} />
                    </Link>
                </ButtonWrapper>
                <SponsorLogo>
                    <img src={forecaLogo} alt="foreca" />
                </SponsorLogo>
            </BiometWidgetWrapper>
        );
    }

    renderWidget = () => {
        let { forecast, items } = this.props.widgets.meteoWidget.meteo;

        if (forecast) {
            return (
                <>
                    {forecast.totalScore === 0 && isEmpty(items) ? (
                        <TextBlock>
                            На текущую дату рисков по уровню метеорологической
                            опасности нет.
                        </TextBlock>
                    ) : isEmpty(items) && forecast.totalScore > 0 ? (
                        <>
                            <RoundChart
                                number={forecast.totalScore}
                                id={"biomet"}
                            />
                            <Results>
                                <ScrollBar>
                                    <DataExtended>
                                        <Common>
                                            {" "}
                                            — {forecast.data.common.state}
                                        </Common>
                                        <Comment>
                                            {forecast.data.common.comments}
                                        </Comment>
                                        <Sensitive>
                                            {" "}
                                            — {forecast.data.sensitive.state}
                                        </Sensitive>
                                        <Comment>
                                            {forecast.data.sensitive.comments}
                                        </Comment>
                                        <Dependent>
                                            {" "}
                                            — {forecast.data.dependent.state}
                                        </Dependent>
                                        <Comment>
                                            {forecast.data.dependent.comments}
                                        </Comment>
                                    </DataExtended>
                                </ScrollBar>
                            </Results>
                        </>
                    ) : (
                        <>
                            {forecast.totalScore >= 0 && (
                                <RoundChart
                                    number={forecast.totalScore}
                                    id={"biomet"}
                                />
                            )}
                            <Results>
                                <ScrollBar>
                                    {items &&
                                        items.map((item, index) => (
                                            <Fragment key={`biomet-${index}`}>
                                                <DataResult>
                                                    {item.title}
                                                </DataResult>
                                                <DataExtended>
                                                    <Common>
                                                        {" "}
                                                        —{" "}
                                                        {item.data.common.state}
                                                    </Common>
                                                    <Comment>
                                                        {
                                                            item.data.common
                                                                .comments
                                                        }
                                                    </Comment>
                                                    <Sensitive>
                                                        {" "}
                                                        —{" "}
                                                        {
                                                            item.data.sensitive
                                                                .state
                                                        }
                                                    </Sensitive>
                                                    <Comment>
                                                        {
                                                            item.data.sensitive
                                                                .comments
                                                        }
                                                    </Comment>
                                                    <Dependent>
                                                        {" "}
                                                        —{" "}
                                                        {
                                                            item.data.dependent
                                                                .state
                                                        }
                                                    </Dependent>
                                                    <Comment>
                                                        {
                                                            item.data.dependent
                                                                .comments
                                                        }
                                                    </Comment>
                                                </DataExtended>
                                            </Fragment>
                                        ))}
                                </ScrollBar>
                            </Results>
                        </>
                    )}
                </>
            );
        } else {
            return (
                <TextBlock>
                    На текущую дату данных по уровню метеорологической опасности
                    нет.
                </TextBlock>
            );
        }
    };
}

const Results = styled.div`
    display: flex;
    flex-direction: column;
    height: 150px;
    overflow-y: auto;
    flex: 1 1 auto;
    width: 100%;
    margin-left: 10px;
    margin-top: 20px;
`;

const Common = styled.div`
    margin-bottom: 10px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Sensitive = styled.div`
    margin-bottom: 10px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Dependent = styled.div`
    margin-bottom: 10px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const DataExtended = styled.div`
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const SponsorLogo = styled.div`
    position: absolute;
    left: 10px;
    bottom: 10px;
    height: 17px;
    width: 73px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const DataResult = styled.div`
    margin-bottom: 10px;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const BiometWidgetWrapper = styled.div`
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
    align-items: flex-start;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Comment = styled.div`
    margin-left: 10px;
    ${(props) => fontStyles(props)};
`;

BiometWidget.propTypes = {
    widgets: PropTypes.object,
};

export default BiometWidget;
