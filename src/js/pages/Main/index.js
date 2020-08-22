import React, { PureComponent } from "react";
import PageHeading from "components/PageHeading";
import Heading from "containers/Heading";
import Row from "containers/Row";
import Column from "containers/Column";
import WidgetBlock from "components/WidgetBlock";
import Widget from "containers/Widget";
import Accordeon from "components/Accordeon";
import styled from "styled-components";
import { getServicesList } from "actions/services";
import { FetchingList } from "components/FetchingList";
import ListItem from "pages/Services/ListItem";
import { LK_MENU_ELEMENTS } from "config/menu";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ScrollBar from "components/ScrollBar";
import { showPopup } from "actions/popup";
import { connect } from "react-redux";
import widgetList from "pages/Main/widgetsList";
import myDataList from "pages/Main/myDataList";
import { Desktop, Tablet } from "wrappers/responsive";
import get from "lodash/get";
import { checkAllowConfirmationForPhone } from "actions/user";

@withRouter
@connect(
    (state) => ({
        isWard: get(state.myData, "myData.ward", false),
        myData: state.myData.myData,
        dispanserWidget: state.widgets.dispanserWidget,
    }),
    { showPopup, checkAllowConfirmationForPhone },
)
class Main extends PureComponent {
    static propTypes = {
        history: PropTypes.object,
        showPopup: PropTypes.func,
        checkAllowConfirmationForPhone: PropTypes.func.isRequired,
        widgets: PropTypes.object,
        saveWidgets: PropTypes.func,
        isWard: PropTypes.bool.isRequired,
        myData: PropTypes.object,
        dispanserWidget: PropTypes.object,
    };

    state = {
        mouseOver: null,
        opened: this.props.dispanserWidget.state.title || "Диспансеризация",
        marginTop: -1,
    };

    componentDidMount() {
        const { checkAllowConfirmationForPhone } = this.props;
        checkAllowConfirmationForPhone(false);
    }

    render() {
        const params = {};
        if (this.state.marginTop !== -1) {
            params.scrollTop = this.state.marginTop;
        }
        return (
            <>
                <Heading>
                    <PageHeading title={LK_MENU_ELEMENTS.MAIN_PAGE.name} />
                </Heading>
                <Row fullHeight>
                    <Column auto>
                        <DataRow>
                            <Desktop>
                                <ScrollBar {...params}>
                                    {this.renderData()}
                                </ScrollBar>
                            </Desktop>
                            <Tablet>{this.renderData()}</Tablet>
                        </DataRow>
                    </Column>
                    <Column fixed={500}>
                        <Desktop>
                            <ScrollBar>{this.renderWidgets()}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderWidgets()}</Tablet>
                    </Column>
                </Row>
            </>
        );
    }

    renderWidgets = () => {
        const { opened } = this.state;
        const { myData, dispanserWidget } = this.props;

        let filteredWidgets = [...widgetList];

        if (dispanserWidget.state.title) {
            filteredWidgets.find((item) => item.id === "Dispensary")["title"] =
                dispanserWidget.state.title;
        }

        if (!myData.ward) {
            filteredWidgets = filteredWidgets.filter(
                (item) => item.id !== "Vaccination",
            );
        }

        return (
            <WidgetWrapper
                data-step={4}
                data-description={`
                Узнайте о необходимости пройти диспансеризацию, возможных рисках,
                связанных с изменениями окружающей среды, следите за динамикой
                показателей здоровья, событиями календаря и др. с главной страницы сайта.
            `}
            >
                <WidgetBlock title={"Виджеты"}>
                    {filteredWidgets.map((widget, i) => (
                        <Widget
                            widget={widget.widget}
                            icon={widget.icon}
                            title={widget.title}
                            opened={opened === widget.title}
                            onToggle={(title) =>
                                this.setState({ opened: title })
                            }
                            key={`widget-${i}`}
                        />
                    ))}
                </WidgetBlock>
            </WidgetWrapper>
        );
    };

    renderData = () => {
        const { mouseOver } = this.state;
        const { isWard } = this.props;

        return (
            <>
                <WidgetWrapper
                    data-step={2}
                    data-description={`
                            Здесь Вы можете:
                            проверить актуальность паспортных данных – персональная информация
                            просмотреть данные Вашего полиса ОМС и сведения о страховой компании,
                            в которой Вы застрахованы. – данные полиса ОМС
                            Проверить достоверность сведений о прикреплении к поликлинике – МО
                            прикрепления (общий)
                            Проверить достоверность сведений о прикреплении к стоматологической
                            поликлинике - МО прикрепления (стоматология)
                            Указать Ваши контактные данные. – Мои контакты
                            Если Вы заполните раздел «Расскажи о себе врачу», эти данные будут
                            доступны бригаде скорой помощи. – Расскажи о себе врачу
                        `}
                >
                    <WidgetBlock
                        title={isWard ? "Данные подопечного" : "Мои данные"}
                    >
                        <Accordeon
                            elements={myDataList}
                            scrollViewOnOpen={(marginTop) =>
                                this.scrollViewOnOpen(marginTop)
                            }
                        />
                    </WidgetBlock>
                </WidgetWrapper>
                <WidgetWrapper
                    data-step={3}
                    data-description={`
                            Страховые медицинские организации один раз в месяц присылают нам
                            информацию об оказанных Вам медицинских услугах. Мы предлагаем Вам
                            доступ к:
                             своим услугам, полученным в городе Москве или в другом субъекте РФ
                             оказанной скорой медицинской помощи
                            Оцените качество и доступность услуги. Если какая-либо отображаемая
                            услуга Вам не была оказана – направьте нам обращение.
                `}
                >
                    <WidgetBlock title={"Последние услуги"}>
                        <FetchingList
                            hidePagination
                            params={{ type: "services" }}
                            action={getServicesList}
                            defaultPageSize={5}
                            alwaysDidMountFetch={true}
                            reducerName={`services.services`}
                            renderItem={(item, i) =>
                                this.renderItem(item, i, mouseOver)
                            }
                        />
                    </WidgetBlock>
                </WidgetWrapper>
            </>
        );
    };

    onClick = (item) => {
        const { history } = this.props;

        history.push({
            pathname: `${LK_MENU_ELEMENTS.SERVICES_PAGE.path}/view`,
            state: { item, tab: "services" },
        });
    };

    renderItem = (item, i, mouseOver) => {
        return (
            <ListItem
                onClick={this.onClick}
                key={i}
                item={item}
                index={i}
                selected={mouseOver === i}
                handleMouseOver={this.handleMouseOver}
            />
        );
    };

    handleMouseOver = (type) => {
        this.setState({
            mouseOver: type,
        });
    };

    scrollViewOnOpen = (marginTop) => {
        this.setState(
            {
                marginTop,
            },
            () => {
                this.setState({
                    marginTop: -1,
                });
            },
        );
    };
}

const WidgetWrapper = styled.div``;

const DataRow = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: ${(props) => props.theme.paddings.normal};
`;

export default Main;
