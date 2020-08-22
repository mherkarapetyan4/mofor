import React, { Fragment, PureComponent } from "react";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import { Desktop, Tablet } from "wrappers/responsive";
import TextBlock from "components/TextBlock";
import Row from "containers/Row";
import Column from "containers/Column";
import ScrollBar from "components/ScrollBar";
import { LK_MENU_ELEMENTS } from "config/menu";
import styled from "styled-components";
import dayjs from "dayjs";
import forecaLogo from "images/logos/foreca.png";
import { fontStyles } from "styledMixins/mixins";
import isEmpty from "lodash/isEmpty";
import RoundChart from "components/RoundChart";
import PropTypes from "prop-types";
import { getData } from "decorators/getData";
import { getMeteo } from "actions/widgets";

@getData({ getMeteo: () => getMeteo("full") }, ["widgets"])
class Biometeorology extends PureComponent {
    static propTypes = {
        widgets: PropTypes.object.isRequired,
    };

    render() {
        const { forecast } = this.props.widgets.meteoWidget.meteo;

        return (
            <>
                <Heading>
                    <PageHeading
                        title={LK_MENU_ELEMENTS.BIOMETEOROLOGY_PAGE.name}
                    />
                </Heading>
                <Row fullHeight>
                    <Desktop>
                        <ScrollBar>
                            <Column>
                                <Info>
                                    Прогноз уровня метеорологической опасности
                                    на{" "}
                                    {dayjs(
                                        forecast
                                            ? forecast.date
                                            : `${new Date().getFullYear()}-${new Date().getMonth() +
                                                  1}-${new Date().getDate()}`,
                                    ).format("DD.MM.YYYY")}
                                    г. для г.Москва
                                </Info>
                                <Data>{this.renderContent()}</Data>
                                <SponsorLogo>
                                    <img src={forecaLogo} alt="foreca" />
                                </SponsorLogo>
                            </Column>
                        </ScrollBar>
                    </Desktop>
                    <Tablet>
                        <Column>
                            <Info>
                                Прогноз уровня метеорологической опасности на{" "}
                                {dayjs(
                                    forecast
                                        ? forecast.date
                                        : `${new Date().getFullYear()}-${new Date().getMonth() +
                                              1}-${new Date().getDate()}`,
                                ).format("DD.MM.YYYY")}
                                г. для г.Москва
                            </Info>
                            <Data>{this.renderContent()}</Data>
                            <SponsorLogo>
                                <img src={forecaLogo} alt="foreca" />
                            </SponsorLogo>
                        </Column>
                    </Tablet>
                </Row>
            </>
        );
    }
    renderContent = () => {
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
                                {items &&
                                    items.map((item, index) => (
                                        <Fragment key={`biomet-${index}`}>
                                            <DataResult>
                                                {item.title}
                                            </DataResult>
                                            <DataExtended>
                                                <Common>
                                                    {" "}
                                                    — {item.data.common.state}
                                                </Common>
                                                <Comment>
                                                    {item.data.common.comments}
                                                </Comment>
                                                <Sensitive>
                                                    {" "}
                                                    —{" "}
                                                    {item.data.sensitive.state}
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
                                                    {item.data.dependent.state}
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

const Info = styled.div`
    ${(props) => fontStyles(props)};
`;

const Data = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
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

const Results = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
    margin-left: 10px;
    margin-top: 20px;
`;

const DataExtended = styled.div`
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
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

const DataResult = styled.div`
    margin-bottom: 10px;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const Comment = styled.div`
    margin-left: 10px;
    ${(props) => fontStyles(props)};
`;

export default Biometeorology;
