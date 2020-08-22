import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// import Title from "components/Title";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import isEmpty from "lodash/isEmpty";
// import ServiceExtendedInformation from "pages/Services/Item/Components/ServiceExtendedInformation";
// import ServiceFact from "pages/Services/Item/Components/ServiceFact";
// import Expertise from "pages/Services/Item/Components/Expertise";
import NotConfirm from "pages/Services/Item/Components/NotConfirm";
import Row from "containers/Row";
import Column from "containers/Column";
import WidgetBlock from "components/WidgetBlock";
import ScrollBar from "components/ScrollBar";
import FormField from "components/FormField";
import TextBlock from "components/TextBlock";
import { Button } from "components/Button";
import styled from "styled-components";
// import StarBar from "components/StarBar";
import FlatPopup from "components/FlatPopup";
import Actions from "containers/Header/Actions";
import InfoIcon from "icons/InfoIcon";
import { show } from "actions/anchorPopup";
import NotConfirmedInfoBlock from "pages/Services/NotConfirmedInfoBlock";
import ServiceExtendedInformation from "pages/Services/Item/Components/ServiceExtendedInformation";
import { getData } from "decorators/getData";
import { connect } from "react-redux";
import { factOfConfirmationService, getServices } from "actions/services";
import Review from "pages/Services/Item/Components/Review";
import { Desktop, Tablet } from "wrappers/responsive";
import { checkAllowConfirmationForPhone, checkEmail } from "actions/user";

@getData(null, ["myData"])
@hasHistoryState(LK_MENU_ELEMENTS.SERVICES_PAGE.path)
@connect(
    (state, props) => ({
        serviceItem: state.services[props.location.state.tab],
    }),
    {
        getServices,
        factOfConfirmationService,
        show,
        checkAllowConfirmationForPhone,
    },
)
@connect()
class ServicesSinglePage extends PureComponent {
    componentDidMount() {
        const { getServices, checkAllowConfirmationForPhone } = this.props;
        const { item, tab } = this.props.location.state;
        getServices(item.id, tab);
        checkAllowConfirmationForPhone(false);
    }

    state = {
        serviceNotConfirmedisOpened: false,
    };

    infoIcon = [
        {
            icon: <InfoIcon opacity={0.5} />,
            action: (position) =>
                this.props.show({
                    position,
                    component: <NotConfirmedInfoBlock />,
                    place: "left",
                    title: "Информация",
                    size: {
                        w: 240,
                        h: 280,
                    },
                }),
            important: true,
            tooltip: "Информация",
        },
    ];

    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        dispatch: PropTypes.func,
        item: PropTypes.object,
        myData: PropTypes.object,
        serviceItem: PropTypes.object.isRequired,
        getServices: PropTypes.func,
        factOfConfirmationService: PropTypes.func,
        show: PropTypes.func,
        checkAllowConfirmationForPhone: PropTypes.func.isRequired,
    };

    saveConfirmation = (status, comment, serviceId) => {
        const { factOfConfirmationService } = this.props;
        const { tab } = this.props.location.state;
        factOfConfirmationService(
            {
                status,
                comment,
                serviceId,
            },
            tab,
            () => this.setState({ serviceNotConfirmedisOpened: false }),
        );
    };

    render() {
        const { item, tab, backLocation } = this.props.location.state;

        return (
            <FlatPopup
                locationState={{ tab }}
                backLocation={backLocation}
                title={item.service.type?.name || item.diagnosis?.name}
            >
                <Row fullPage>
                    <Column fraction={6} paddings={0}>
                        <Desktop>
                            <ScrollBar noScrollX>
                                {this.renderServiceInfo()}
                            </ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderServiceInfo()}</Tablet>
                    </Column>
                    <Column fraction={6} paddingRight={0} mobilePaddingLeft={0}>
                        <Desktop>
                            <ScrollBar noScrollX>
                                {this.renderConfirmation()}
                            </ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderConfirmation()}</Tablet>
                    </Column>
                </Row>
            </FlatPopup>
        );
    }

    renderConfirmation = () => {
        const { item, tab } = this.props.location.state;
        const { serviceNotConfirmedisOpened } = this.state;
        const { serviceItem } = this.props;

        if (!serviceItem || !serviceItem.item || isEmpty(serviceItem.item))
            return null;

        return (
            <>
                <WidgetWrapper>
                    <WidgetBlock title={"Факт оказания услуги"}>
                        {serviceItem.item.confirmation &&
                        serviceItem.item.confirmation.status === "CONFIRMED" ? (
                            <TextBlock> Услуга оказана</TextBlock>
                        ) : serviceItem.item.confirmation &&
                          serviceItem.item.confirmation.status ===
                              "UNCONFIRMED" ? (
                            <TextBlock> Услуга не оказана</TextBlock>
                        ) : (
                            <>
                                <TextBlock>
                                    {`Была ли вам оказана медицинская услуга “${item
                                        .service.type?.name ||
                                        item.diagnosis?.name}” ?`}
                                </TextBlock>
                                <Buttons>
                                    <ButtonWrapper>
                                        <Button
                                            label={"Да"}
                                            onClick={() => {
                                                this.saveConfirmation(
                                                    "CONFIRMED",
                                                    "",
                                                    item.id,
                                                );
                                            }}
                                        />
                                    </ButtonWrapper>
                                    <ButtonWrapper>
                                        <Button
                                            label={"Нет"}
                                            onClick={
                                                this
                                                    .toggleServiceConfirmationForm
                                            }
                                        />
                                    </ButtonWrapper>
                                </Buttons>
                            </>
                        )}
                    </WidgetBlock>
                </WidgetWrapper>
                {serviceNotConfirmedisOpened && (
                    <WidgetWrapper>
                        <WidgetBlock
                            title={"Услуга не оказана"}
                            additional={<Actions items={this.infoIcon} />}
                        >
                            <NotConfirm
                                service={item}
                                tab={tab}
                                onCloseForm={() =>
                                    this.setState({
                                        serviceNotConfirmedisOpened: false,
                                    })
                                }
                            />
                        </WidgetBlock>
                    </WidgetWrapper>
                )}
                {item.expertise && (
                    <WidgetWrapper>
                        <WidgetBlock title={"Сведения об экспертизе"}>
                            <FormField
                                label={"Вид нарушения"}
                                type={"textarea"}
                                value={item.expertise.violationName}
                                disabled
                            />
                            <FormField
                                label={"Сумма санкций"}
                                value={`${item.expertise.sanctionsAmount} ₽`}
                                disabled
                            />
                        </WidgetBlock>
                    </WidgetWrapper>
                )}
                {serviceItem.item.confirmation &&
                    serviceItem.item.confirmation.status === "CONFIRMED" && (
                        <Review
                            serviceItem={serviceItem}
                            tab={tab}
                            item={item}
                        />
                    )}
            </>
        );
    };

    renderServiceInfo = () => {
        const {
            myData: {
                entitledPerson: { fullName },
                entitledPolicy: { actualNumber },
            },
        } = this.props.myData;

        const { item } = this.props.location.state;

        return (
            <WidgetBlock title={"Расширенные сведения об услуге"}>
                <ServiceExtendedInformation
                    item={item}
                    person={{ fullName, actualNumber }}
                />
            </WidgetBlock>
        );
    };

    toggleServiceConfirmationForm = () => {
        this.props.dispatch(checkEmail()).then(() => {
            this.props.show({
                component: <NotConfirmedInfoBlock />,
                position: {
                    x: window.innerWidth - 50,
                    y: 250,
                },
                place: "left",
                title: "Информация",
                size: {
                    w: 240,
                    h: 280,
                },
            });
            this.setState({
                serviceNotConfirmedisOpened: true,
            });
        });
    };
}

const WidgetWrapper = styled.div`
    margin-bottom: 16px;
    width: 100%;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const ButtonWrapper = styled.div`
    margin-right: 16px;

    &:last-child {
        margin: 0;
    }
`;

export default ServicesSinglePage;
