/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import styled from "styled-components";
import { getData } from "decorators/getData";
import { getVaccinationsCalendar } from "actions/vaccinations";
import PropTypes from "prop-types";
import CheckIcon from "icons/CheckIcon";
import { fontStyles } from "styledMixins/mixins";
import { darken, rgba } from "polished";
import { showPopup } from "actions/popup";
import { connect } from "react-redux";
import VaccinationDescription from "pages/Vaccination/VaccinationDescription";
import { LK_MENU_ELEMENTS } from "config/menu";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import ScrollBar from "components/ScrollBar";

@getData({ getVaccinationsCalendar }, ["vaccinations"])
@connect(null, { showPopup })
@withRouter
class VaccinationVisual extends PureComponent {
    state = {
        events: [],
    };

    componentDidMount() {
        this.fillEvents(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.fillEvents(nextProps);
    }

    fillEvents = (props) => {
        const events = [];
        _.map(props.vaccinations.vaccinationsCalendar.events, (item) => {
            events.push({
                ...item,
                event: {
                    ...item.event,
                    cellCount: item.event.toAgeId - item.event.fromAgeId,
                },
            });
        });
        this.setState({ events });
    };

    render() {
        const { vaccinationsCalendar } = this.props.vaccinations;
        const { showPopup } = this.props;

        return (
            <Wrapper>
                <ScrollBar noScrollY>
                    <ScrollContent>
                        <InfoWrapper>
                            <InfoTitle>Обязательные прививки</InfoTitle>
                            <InfoContent>
                                {vaccinationsCalendar.groups &&
                                    vaccinationsCalendar.groups.map(
                                        (item, i) => (
                                            <InfoItem
                                                key={i}
                                                onClick={() =>
                                                    showPopup(
                                                        item.title,
                                                        <VaccinationDescription />,
                                                        {
                                                            description:
                                                                item.description,
                                                        },
                                                    )
                                                }
                                            >
                                                {item.title}
                                            </InfoItem>
                                        ),
                                    )}
                            </InfoContent>
                        </InfoWrapper>
                        <ContentWrapper>
                            <Header>
                                {vaccinationsCalendar.ages &&
                                    vaccinationsCalendar.ages.map((item, i) =>
                                        this.renderAge(item, i),
                                    )}
                            </Header>
                            <Content>
                                {vaccinationsCalendar.ages &&
                                    vaccinationsCalendar.ages.map(
                                        (age, colId) => (
                                            <Col key={colId}>
                                                {vaccinationsCalendar.groups &&
                                                    vaccinationsCalendar.groups.map(
                                                        (group, rowId) =>
                                                            this.renderCell(
                                                                rowId,
                                                                colId,
                                                            ),
                                                    )}
                                            </Col>
                                        ),
                                    )}
                            </Content>
                        </ContentWrapper>
                    </ScrollContent>
                </ScrollBar>
            </Wrapper>
        );
    }

    renderAge = (item, i) => {
        const ageArr = item.title.split(" ");

        return (
            <Date key={i}>
                <Title>{ageArr[0]}</Title>
                <Subtitle>
                    {ageArr[1] === "месяца" ||
                    ageArr[1] === "месяц" ||
                    ageArr[1] === "месяцев"
                        ? "мес."
                        : ageArr[1]}
                </Subtitle>
            </Date>
        );
    };

    renderCell = (rowId, colId) => {
        const { events } = this.state;
        const cell = _.find(
            events,
            (item) =>
                item.event.fromAgeId === colId + 1 &&
                item.event.groupId === rowId + 1,
        );

        if (cell) {
            if (cell.confirmation) {
                return (
                    <Cell key={rowId + "" + colId}>
                        <Dot
                            active
                            onClick={() =>
                                this.showForm({
                                    event: cell.event,
                                    confirmation: cell.confirmation,
                                    survey: cell.survey,
                                })
                            }
                            double={cell.event.cellCount === 1}
                        >
                            <CheckIcon color={"#fff"} />
                        </Dot>
                    </Cell>
                );
            }
            return (
                <Cell>
                    <Dot
                        onClick={() =>
                            this.showForm({
                                event: cell.event,
                            })
                        }
                        double={cell.event.cellCount === 1}
                    />
                </Cell>
            );
        }
        return <Cell></Cell>;
    };

    showForm = (params) => {
        this.props.history.push({
            pathname: `${LK_MENU_ELEMENTS.VACCINATION_PAGE.path}/confirm`,
            state: {
                type: "regular",
                params: params
                    ? {
                          event: params.event,
                          confirmation: params.confirmation,
                          survey: params.survey,
                      }
                    : {},
            },
        });
    };
}

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    overflow-x: auto;
    height: 410px;
    margin-bottom: 16px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`;

const Content = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const Date = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
        })};
`;

const Subtitle = styled.div`
    ${(props) => fontStyles(props, { size: props.theme.fonts.sizes.normal })};
`;

const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    position: relative;

    &:before {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: ${() => rgba("#000", 0.1)};
        left: 0;
        top: 25px;
    }
`;

const Dot = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => (props.double ? "79px" : "30px")};
    height: 30px;
    background-color: ${(props) =>
        props.active ? props.theme.userTheme.color : "#808080"};
    border-radius: 15px;
    overflow: hidden;
    z-index: 1;
    cursor: pointer;
    transition: background-color ${(props) => props.theme.animations.transition};

    position: absolute;
    left: 10px;
    top: 10px;

    &:hover {
        background-color: ${(props) => props.theme.userTheme.color};
    }
`;

const Col = styled.div`
    position: relative;
    width: 50px;

    &:after {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        height: calc(100% - 50px);
        background-color: ${() => rgba("#000", 0.1)};
        left: 25px;
        top: 25px;
    }
`;

const InfoWrapper = styled.div`
    width: 350px;
    flex: 0 0 auto;
`;

const InfoTitle = styled.div`
    ${(props) =>
        fontStyles(props, { font: "bold", size: props.theme.fonts.sizes.big })};
    height: 50px;
    display: flex;
    align-items: center;
`;

const InfoContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const InfoItem = styled.div`
    height: 50px;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
            color: props.theme.userTheme.color,
        })};
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    transition: color ${(props) => props.theme.animations.transition};

    &:hover {
        color: ${(props) => darken(0.1, props.theme.userTheme.color)};
    }
`;

const ContentWrapper = styled.div``;

const ScrollContent = styled.div`
    display: flex;
`;

VaccinationVisual.propTypes = {
    vaccinations: PropTypes.object,
    showPopup: PropTypes.func,
    history: PropTypes.object.isRequired,
};

export default VaccinationVisual;
