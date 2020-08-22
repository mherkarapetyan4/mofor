import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { LazyComponent } from "containers/LazyComponent";
import styled from "styled-components";

const Main = React.lazy(() => import("pages/Main"));
const Services = React.lazy(() => import("pages/Services"));
const Researches = React.lazy(() => import("pages/Researches"));
const Health = React.lazy(() => import("pages/Health"));
const Pregnancy = React.lazy(() => import("pages/Pregnancy"));
const Onco = React.lazy(() => import("pages/Onco"));
const Doctor = React.lazy(() => import("pages/Doctor"));
const Polis = React.lazy(() => import("pages/Polis"));
const About = React.lazy(() => import("pages/About"));
const DoctorNewAppointment = React.lazy(() =>
    import("pages/Doctor/NewAppointment"),
);
const Contacts = React.lazy(() => import("pages/Contacts"));
const Questionnaire = React.lazy(() => import("pages/Questionnaire"));
const Settings = React.lazy(() => import("pages/Settings"));
const NewPolis = React.lazy(() => import("pages/NewPolis"));
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));
const Vaccination = React.lazy(() => import("pages/Vaccination"));
const Biometeorology = React.lazy(() => import("pages/Biometeorology"));
const Oncology = React.lazy(() => import("pages/Oncology"));

import { LK_MAP_ELEMENTS, LK_MENU_ELEMENTS } from "config/menu";
import Header from "containers/Header";
import Footer from "containers/Footer";
import Calendar from "pages/Calendar";
import Pillbox from "pages/Pillbox";
import PillboxInstruction from "pages/Pillbox/PillboxInstruction";
import ServicesSinglePage from "pages/Services/Item/ServiceSinglePage";
import ResearchSinglePage from "pages/Researches/ResearchSinglePage";
import PolisSinglePage from "pages/Polis/PolisSinglePage";
import SiteMap from "pages/SiteMap";
// import Personal from "pages/Personal";
import Rules from "pages/Rules";
import Confidential from "pages/Confidential";
import PillboxCreate from "pages/Pillbox/Create";
import PillboxMedicationCourse from "pages/Pillbox/PillboxMedicationCourse";
import VaccinationConfirm from "pages/Vaccination/VaccinationConfirm";
import { connect } from "react-redux";
import DoctorEdit from "pages/Doctor/edit";
import { getUserTheme } from "actions/app";

@connect((state) => ({
    backgroundImage: state.app.userTheme.backgroundImage,
}))
class Routes extends PureComponent {
    static propTypes = {
        backgroundImage: PropTypes.string.isRequired,
        dispatch: PropTypes.func,
    };

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getUserTheme());
    }

    render() {
        return (
            <ContentWrapper>
                <Header />
                <div
                    className={`${this.props.backgroundImage} background_content`}
                >
                    {/*<Content backgroundImage={this.props.backgroundImage}>*/}
                    <Switch>
                        {/*готовые разделы*/}
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.SERVICES_PAGE.path}
                            component={() => (
                                <LazyComponent component={Services} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.SERVICES_PAGE.path}/view`}
                            component={() => (
                                <LazyComponent component={ServicesSinglePage} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.SITE_MAP_PAGE.path}
                            component={() => (
                                <LazyComponent component={SiteMap} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.MAIN_PAGE.path}
                            component={() => <LazyComponent component={Main} />}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.MEDICINES_PAGE.path}
                            component={() => (
                                <LazyComponent component={Pillbox} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/instruction`}
                            component={() => (
                                <LazyComponent component={PillboxInstruction} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/course`}
                            component={() => (
                                <LazyComponent
                                    component={PillboxMedicationCourse}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MAP_ELEMENTS.ABOUT_PAGE.path}
                            component={() => (
                                <LazyComponent component={About} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MAP_ELEMENTS.CONTACTS_PAGE.path}
                            component={() => (
                                <LazyComponent component={Contacts} />
                            )}
                        />
                        {/*   Онкомессенджер (в разработке) */}
                        <Route
                            exact
                            path={`${LK_MAP_ELEMENTS.ONCOLOGY_PAGE.path}`}
                            component={() => (
                                <LazyComponent component={Oncology} />
                            )}
                        />
                        <Route
                            exact
                            path={
                                LK_MENU_ELEMENTS.MEDICINES_PAGE.items
                                    .CREATEORUPDATE.path
                            }
                            component={() => (
                                <LazyComponent component={PillboxCreate} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.RULES_PAGE.path}
                            component={() => (
                                <LazyComponent component={Rules} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.CONFIDENTIAL_PAGE.path}
                            component={() => (
                                <LazyComponent component={Confidential} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.DIARY_PAGE.path}
                            component={() => (
                                <LazyComponent component={Health} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.PREGNANCY_PAGE.path}
                            component={() => (
                                <LazyComponent component={Pregnancy} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.ONCO_PAGE.path}
                            component={() => <LazyComponent component={Onco} />}
                        />
                        <Route
                            exact
                            path={LK_MAP_ELEMENTS.SETTINGS_PAGE.path}
                            component={() => (
                                <LazyComponent component={Settings} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.BIOMETEOROLOGY_PAGE.path}`}
                            component={() => (
                                <LazyComponent component={Biometeorology} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.DOCTOR_PAGE.path}
                            component={() => (
                                <LazyComponent component={Doctor} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.DOCTOR_PAGE.path}/edit`}
                            component={() => (
                                <LazyComponent component={DoctorEdit} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.DOCTOR_PAGE.path}/new`}
                            component={() => (
                                <LazyComponent
                                    component={DoctorNewAppointment}
                                />
                            )}
                        />
                        {/*готовые разделы*/}
                        {/*в разработке*/}
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.TREATMENT_PAGE.path}
                            component={() => (
                                <LazyComponent component={Researches} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.TREATMENT_PAGE.path}/view`}
                            component={() => (
                                <LazyComponent component={ResearchSinglePage} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.TREATMENT_PAGE.path}/new`}
                            component={() => (
                                <LazyComponent component={ResearchSinglePage} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.CALENDAR_PAGE.path}
                            component={() => (
                                <LazyComponent component={Calendar} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.POLIS_PAGE.path}/new`}
                            component={() => (
                                <LazyComponent component={NewPolis} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.POLIS_PAGE.path}/view`}
                            component={() => (
                                <LazyComponent component={PolisSinglePage} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.POLIS_PAGE.path}
                            component={() => (
                                <LazyComponent component={Polis} />
                            )}
                        />
                        <Route
                            exact
                            path={LK_MAP_ELEMENTS.QUESTIONING_PAGE.path}
                            component={() => (
                                <LazyComponent component={Questionnaire} />
                            )}
                        />

                        <Route
                            exact
                            path={LK_MENU_ELEMENTS.VACCINATION_PAGE.path}
                            component={() => (
                                <LazyComponent component={Vaccination} />
                            )}
                        />
                        <Route
                            exact
                            path={`${LK_MENU_ELEMENTS.VACCINATION_PAGE.path}/confirm`}
                            component={() => (
                                <LazyComponent component={VaccinationConfirm} />
                            )}
                        />
                        {/*<Route*/}
                        {/*    exact*/}
                        {/*    path={"/personal"}*/}
                        {/*    component={() => (*/}
                        {/*        <LazyComponent component={Personal} />*/}
                        {/*    )}*/}
                        {/*/>*/}
                        {/*в разработке*/}
                        <Route
                            component={() => (
                                <LazyComponent component={PageNotFound} />
                            )}
                        />
                    </Switch>
                    {/*</Content>*/}
                </div>
                <Footer />
            </ContentWrapper>
        );
    }
}

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    flex: 1;
    height: 100vh;
    overflow: auto;
`;

// const Content = styled.div`
//     flex: 1;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     background: ${(props) =>
//     props.theme.backgrounds[props.backgroundImage]
//         ? props.theme.backgrounds[props.backgroundImage]
//         : "none"};
//     background-size: auto 100%;
//     background-repeat: no-repeat;
//     background-position: 100% 0;
//
//     @media all and (max-width: ${RESPONSIVE.tablet}) {
//         overflow-y: auto;
//         overflow-x: hidden;
//     }
// `;

export default Routes;
