import React, { PureComponent } from "react";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import { LK_MENU_ELEMENTS } from "config/menu";
import Row from "containers/Row";
import Column from "containers/Column";
import TableIcon from "icons/TableIcon";
import ChartIcon from "icons/ChartIcon";
import VaccinationVisual from "pages/Vaccination/VaccinationVisual";
import WidgetBlock from "components/WidgetBlock";
import { Button } from "components/Button";
import styled, { withTheme } from "styled-components";
import ScrollBar from "components/ScrollBar";
import { List } from "components/List";
import ListData from "components/List/ListData";
import Actions from "containers/Header/Actions";
import { Desktop, Tablet } from "wrappers/responsive";
import IconPlate from "components/IconPlate";
import { fontStyles } from "styledMixins/mixins";
import DeleteIcon from "icons/DeleteIcon";
import { RESPONSIVE } from "config/consts";
import {
    getVaccinationsCalendarPlain,
    getEpidemicList,
    deleteConfirmation,
    deleteEpidemicConfirmation,
} from "actions/vaccinations";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";
import { formatDate } from "utils/formatDate";
import { showPopup, hidePopup } from "actions/popup";
import { withRouter } from "react-router-dom";
import VaccinationDelete from "pages/Vaccination/VaccinationDelete";
import { hasAccessToSection } from "modules/hasAccessToSection";
import { vaccinationsPath } from "config/paths";
import { BASE_URL } from "config/consts";

@withTheme
@connect(
    (state) => ({
        confirmationEpidemicList: state.vaccinations.confirmationEpidemicList,
        vaccinationsCalendarPlain: state.vaccinations.vaccinationsCalendarPlain,
    }),
    {
        getVaccinationsCalendarPlain,
        getEpidemicList,
        deleteConfirmation,
        showPopup,
        hidePopup,
        deleteEpidemicConfirmation,
    },
)
@withRouter
@hasAccessToSection()
class Vaccination extends PureComponent {
    state = {
        view: this.props.location?.state?.viewIsTable ? "table" : "visual",
    };

    static propTypes = {
        getEpidemicList: PropTypes.func.isRequired,
        getVaccinationsCalendarPlain: PropTypes.func.isRequired,
        deleteConfirmation: PropTypes.func.isRequired,
        confirmationEpidemicList: PropTypes.object.isRequired,
        vaccinationsCalendarPlain: PropTypes.object.isRequired,
        showPopup: PropTypes.func.isRequired,
        hidePopup: PropTypes.func.isRequired,
        deleteEpidemicConfirmation: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    deleteItems = (item) => {
        return [
            {
                icon: <DeleteIcon opacity={0.5} />,
                tooltip: "Удалить",
                action: () => this.showPopup(item.confirmation.id),
            },
        ];
    };

    viewChange = [
        {
            icon: <ChartIcon opacity={0.5} />,
            tooltip: "Графический вид",
            action: () => this.setState({ view: "visual" }),
            defaultActive: this.state.view === "visual",
        },
        {
            icon: <TableIcon opacity={0.5} />,
            tooltip: "Табличный вид",
            action: () => this.setState({ view: "table" }),
            defaultActive: this.state.view === "table",
        },
    ];

    componentDidMount() {
        this.props.getVaccinationsCalendarPlain();
        this.props.getEpidemicList();
    }

    showPopup = (id) => {
        const { showPopup, deleteEpidemicConfirmation } = this.props;

        showPopup(
            "Вы уверены что хотите удалить запись?",
            <VaccinationDelete id={id} onDelete={deleteEpidemicConfirmation} />,
        );
    };

    render() {
        return (
            <>
                <Heading>
                    <PageHeading
                        title={LK_MENU_ELEMENTS.VACCINATION_PAGE.name}
                    />
                    <Actions items={this.viewChange} />
                </Heading>
                <Row fullHeight>
                    <Column fraction={12}>
                        <Desktop>
                            <ScrollBar>{this.renderContent()}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderContent()}</Tablet>
                    </Column>
                </Row>
            </>
        );
    }

    renderList = (item) => {
        return (
            <Wrapper
                onClick={() =>
                    this.showForm("epidemic", {
                        event: item.event,
                        confirmation: item.confirmation,
                        survey: item.survey,
                    })
                }
            >
                <Content>
                    <DataWrapper>
                        <ListData
                            label={"Прививка:"}
                            data={item.survey?.title || "Неизвестно"}
                        />
                    </DataWrapper>
                    <DateWrapper>
                        <ListData
                            label={"Дата прививания:"}
                            data={formatDate(
                                dayjs(
                                    item.survey?.executionDate || "00.00.0000",
                                ),
                            )}
                        />
                    </DateWrapper>
                </Content>
                <Action>
                    <Actions items={this.deleteItems(item)} />
                </Action>
            </Wrapper>
        );
    };

    renderContent = () => {
        const { view } = this.state;
        const {
            vaccinationsCalendarPlain,
            confirmationEpidemicList,
        } = this.props;
        let tableList = [];
        if (!isEmpty(vaccinationsCalendarPlain.content)) {
            tableList = vaccinationsCalendarPlain.content.reduce(
                (prev, currentValue) => {
                    return [
                        ...prev,
                        ...currentValue.events.map((item) => ({
                            ...item,
                            title: currentValue.title,
                        })),
                    ];
                },
                [],
            );
        }

        return (
            <ContentWrapper>
                {view === "visual" && (
                    <Row>
                        <VaccinationVisual />
                        <WidgetWrapper>
                            <WidgetBlock
                                title={"Другие прививки"}
                                additional={
                                    <Button
                                        label={"Добавить прививку"}
                                        onClick={() =>
                                            this.showForm("epidemic")
                                        }
                                    />
                                }
                            >
                                <List
                                    data={
                                        confirmationEpidemicList &&
                                        confirmationEpidemicList.content
                                            ? confirmationEpidemicList.content
                                            : []
                                    }
                                    renderItem={(item) => this.renderList(item)}
                                />
                            </WidgetBlock>
                        </WidgetWrapper>
                    </Row>
                )}
                {view === "table" && (
                    <Row>
                        <Column fraction={8} paddings={0}>
                            <Alignment>
                                <WidgetBlock title={"Обязательные прививки"}>
                                    <List
                                        data={tableList}
                                        renderItem={(item) =>
                                            this.renderTableItem(item)
                                        }
                                    />
                                </WidgetBlock>
                            </Alignment>
                        </Column>
                        <Column
                            fraction={4}
                            paddingRight={0}
                            mobilePaddingLeft={0}
                        >
                            <WidgetBlock
                                title={"Другие прививки"}
                                additional={
                                    <Button
                                        label={"Добавить прививку"}
                                        onClick={() =>
                                            this.showForm(
                                                "epidemic",
                                                null,
                                                true,
                                            )
                                        }
                                    />
                                }
                            >
                                <List
                                    data={
                                        confirmationEpidemicList
                                            ? confirmationEpidemicList.content
                                            : []
                                    }
                                    renderItem={(item) =>
                                        this.renderTableOtherItem(item)
                                    }
                                />
                            </WidgetBlock>
                        </Column>
                    </Row>
                )}
                <ActionsWrapper>
                    <ActionItem>
                        <Button
                            label={"Скачать паспорт прививок"}
                            onClick={() =>
                                window.open(
                                    `${BASE_URL}${vaccinationsPath.VACCINATION_REPORT_PDF}`,
                                )
                            }
                        />
                    </ActionItem>
                    <ActionItem>
                        <Button
                            label={"Скачать календарь прививок"}
                            onClick={() =>
                                window.open(
                                    `${BASE_URL}${vaccinationsPath.VACCINATION_CALENDAR_PDF}`,
                                )
                            }
                        />
                    </ActionItem>
                </ActionsWrapper>
            </ContentWrapper>
        );
    };

    renderTableItem = (item) => {
        let ageStr = item.title;

        if (ageStr.indexOf(" - ") !== -1) {
            ageStr =
                ageStr.substring(0, ageStr.indexOf(" - ")) +
                "-" +
                ageStr.substring(ageStr.indexOf(" - ") + 3);
        }

        const ageArr = ageStr.split(" ");

        return (
            <VaccinesItem
                onClick={() => {
                    this.showForm(
                        "regular",
                        {
                            event: item.event,
                            confirmation: item.confirmation,
                            survey: item.survey,
                        },
                        true,
                    );
                }}
            >
                <PlateWrapper>
                    <IconPlate
                        title={
                            <Date>
                                <Title>{ageArr[0]}</Title>
                                <Subtitle>
                                    {ageArr[1] === "месяца" ||
                                    ageArr[1] === "месяц" ||
                                    ageArr[1] === "месяцев"
                                        ? "мес."
                                        : ageArr[1]}
                                </Subtitle>
                            </Date>
                        }
                    />
                </PlateWrapper>
                <VaccineContentWrapper>
                    <VaccineTitle>Прививки:</VaccineTitle>
                    <VaccinesList>
                        <Vaccine>
                            <Name>{item.event.title}</Name>
                            <Status confirmed>
                                {this.renderStatus(
                                    item.confirmation &&
                                        item.confirmation.confirmed
                                        ? "CONFIRMED"
                                        : "UNCONFIRMED",
                                )}
                            </Status>
                            {item?.confirmation?.confirmed && (
                                <Action>
                                    <Button
                                        label={"Отменить прививку"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            this.props.deleteConfirmation(
                                                item.confirmation.eventId,
                                                () => {},
                                            );
                                        }}
                                    />
                                </Action>
                            )}
                        </Vaccine>
                    </VaccinesList>
                </VaccineContentWrapper>
            </VaccinesItem>
        );
    };

    renderTableOtherItem = (item) => {
        return (
            <VaccinesItem>
                <VaccineContentWrapper
                    onClick={() =>
                        this.showForm(
                            "epidemic",
                            {
                                event: item.event,
                                confirmation: item.confirmation,
                                survey: item.survey,
                            },
                            true,
                        )
                    }
                >
                    <VaccineTitle>Прививки:</VaccineTitle>
                    <VaccinesList>
                        <Vaccine>
                            <Name>{item.event.title}</Name>
                            <Action>
                                <Button
                                    label={"Удалить"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        this.showPopup(item.confirmation.id);
                                    }}
                                />
                            </Action>
                        </Vaccine>
                    </VaccinesList>
                </VaccineContentWrapper>
            </VaccinesItem>
        );
    };

    renderStatus = (status) => {
        switch (status) {
            case "CONFIRMED":
                return "Выполнена";
            case "UNCONFIRMED":
                return "Не выполнена";
            default:
                return "";
        }
    };

    showForm = (type, params, viewIsTable) => {
        this.props.history.push({
            pathname: `${LK_MENU_ELEMENTS.VACCINATION_PAGE.path}/confirm`,
            state: {
                type: type,
                params: params
                    ? {
                          event: params.event,
                          confirmation: params.confirmation,
                          survey: params.survey,
                      }
                    : {},
                viewIsTable: viewIsTable,
            },
        });
    };
}

const Alignment = styled.div`
    margin-top: 13px;
    width: 100%;
`;

const Date = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 40px;
        height: 40px;
    }
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, { font: "news", size: "26px", color: "#fff" })};
    line-height: 0.8;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        font-size: 20px;
    }
`;

const Subtitle = styled.div`
    ${(props) =>
        fontStyles(props, { font: "news", size: "13px", color: "#fff" })};
    line-height: 1;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        font-size: 10px;
    }
`;

const VaccinesItem = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 16px;
    width: 100%;
`;

const Action = styled.div`
    flex: 0 0 auto;
`;

function renderStatus(props) {
    if (props.notConfirmed) {
        return props.theme.colors.notifications.alert;
    } else if (props.confirmed) {
        return props.theme.colors.notifications.success;
    }
}

const Status = styled.div`
    flex: 0 0 auto;
    margin-right: 16px;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.small,
        })};
    background: ${(props) => renderStatus(props)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 4px 0;
`;

const Name = styled.div`
    flex: 1 1 auto;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.userTheme.color,
        })};
    margin-right: 16px;
    padding: 4px 0;
`;

const Vaccine = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const VaccinesList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const VaccineTitle = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 5px;
`;

const VaccineContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
`;

const DataWrapper = styled.div`
    margin-right: 16px;
    flex: 1 1 auto;
    padding: 4px 0;
`;

const DateWrapper = styled.div`
    margin-right: 16px;
    flex: 0 0 auto;
    padding: 4px 0;
`;

const Wrapper = styled.div`
    padding: 10px 16px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1 1 auto;
`;

const WidgetWrapper = styled.div`
    display: inline-flex;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 16px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ActionItem = styled.div`
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }
`;

export default Vaccination;
