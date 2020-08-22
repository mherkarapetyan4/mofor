import React, { PureComponent } from "react";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import Row from "containers/Row";
import Column from "containers/Column";
import { Link, withRouter } from "react-router-dom";
import { Tabs } from "components/Tabs";
import { Button } from "components/Button";
import styled from "styled-components";
import EmiasLogo from "icons/emias/EmiasLogo";
import { fontStyles } from "styledMixins/mixins";
import NoData from "components/NoData";
import { LK_MENU_ELEMENTS } from "config/menu";
import PropTypes from "prop-types";
import { Desktop, Tablet } from "wrappers/responsive";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { RESPONSIVE } from "config/consts";
import RecordListItem from "pages/Doctor/RecordListItem";
import CourseListItem from "pages/Doctor/CourseListItem";
import RecipeListItem from "pages/Doctor/RecipeListItem";
import Policlinic from "pages/Doctor/Policlinic";
import { get } from "lodash";
import { FetchingList } from "components/FetchingList";
import { doctorPath } from "config/paths";
import { getDoctorData } from "actions/doctor";
import { connect } from "react-redux";
import { hasAccessToSection } from "modules/hasAccessToSection";

@connect((state) => ({
    records: state.doctor.records,
}))
@withRouter
@hasAccessToSection("https://emias.info/")
class Doctor extends PureComponent {
    state = {
        tabElements: [
            {
                value: "Record",
                label: "Записи",
                noDataMessage:
                    "У вас отсутствуют записи к врачу. Создайте новую запись, чтобы увидеть список предстоящих посещений",
                path: doctorPath.APPOINTMENT_LIST,
                key: "appointment",
                count: get(
                    this.props.records,
                    "appointment.elementsTotalCount",
                    0,
                ),
            },
            {
                value: "Course",
                label: "Направления",
                noDataMessage: "У вас отсутствуют направления.",
                path: doctorPath.REFERRAL_LIST,
                key: "referral",
                count: get(
                    this.props.records,
                    "referral.elementsTotalCount",
                    0,
                ),
            },
            {
                value: "Recipe",
                label: "Рецепты",
                noDataMessage: "У вас отсутствуют рецепты.",
                path: doctorPath.PRESCRIPTION_LIST,
                key: "prescription",
                count: get(
                    this.props.records,
                    "prescription.elementsTotalCount",
                    0,
                ),
            },
            {
                value: "policlinic",
                label: "Поликлиника",
            },
        ],
        tab: null,
        mobileSelectValue: null,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        this.setState({
            tab: this.state.tabElements[0].value,
            mobileSelectValue: this.state.tabElements[0].label,
        });
        dispatch(
            getDoctorData({
                params: {
                    path: doctorPath.APPOINTMENT_LIST,
                    key: "appointment",
                },
            }),
        );
        dispatch(
            getDoctorData({
                params: { path: doctorPath.REFERRAL_LIST, key: "referral" },
            }),
        );
        dispatch(
            getDoctorData({
                params: {
                    path: doctorPath.PRESCRIPTION_LIST,
                    key: "prescription",
                },
            }),
        );
    }

    tabCountHandler = () => {
        const buffElements = [...this.state.tabElements].map((item) => {
            if (item.count !== undefined) {
                item.count = get(
                    this.props.records,
                    `${item.key}.elementsTotalCount`,
                    0,
                );
            }
            return item;
        });
        this.setState({
            tabElements: buffElements,
        });
    };

    componentDidUpdate(prevProps) {
        if (
            JSON.stringify(prevProps.records) !==
            JSON.stringify(this.props.records)
        ) {
            this.tabCountHandler();
        }
    }

    render() {
        const { tab, tabElements, mobileSelectValue } = this.state;
        return (
            <>
                <Heading>
                    <PageHeading title={"Запись к врачу"} />
                    <EMIAS>
                        <EMIASLogo>
                            <EmiasLogo />
                        </EMIASLogo>
                        <Desktop>
                            <Text>
                                Запись на прием осуществляется через
                                государственную Единую медицинскую
                                информационно-аналитическую систему города
                                Москвы
                                <Link to={"#"}>emias.mos.ru</Link>
                            </Text>
                        </Desktop>
                    </EMIAS>
                </Heading>
                <Row fullHeight>
                    <Row>
                        <Column fraction={12}>
                            <Tablet>
                                <Text>
                                    Запись на прием осуществляется через
                                    государственную Единую медицинскую
                                    информационно-аналитическую систему города
                                    Москвы
                                    <Link to={"#"}>emias.mos.ru</Link>
                                </Text>
                            </Tablet>
                            <Actions>
                                <Desktop>
                                    <Tabs
                                        elements={tabElements}
                                        tab={tab}
                                        onChange={(tab) =>
                                            this.setState({ tab: tab.value })
                                        }
                                    />
                                </Desktop>
                                <Tablet>
                                    <InlineFormFieldSelect
                                        onChange={(value) => {
                                            this.setState({
                                                tab: value,
                                                mobileSelectValue: tabElements.find(
                                                    (el) => el.value === value,
                                                ).label,
                                            });
                                        }}
                                        options={tabElements}
                                        placeholder={mobileSelectValue}
                                    />
                                </Tablet>
                                <Separator />
                                <ButtonWrapper>
                                    <Button
                                        label={"Новая запись"}
                                        onClick={
                                            this.handleNewDoctorAppointment
                                        }
                                    />
                                </ButtonWrapper>
                            </Actions>
                        </Column>
                    </Row>
                    <Row fullPage>
                        <Column fraction={12}>
                            <ListWrapper>{this.renderData()}</ListWrapper>
                        </Column>
                    </Row>
                </Row>
            </>
        );
    }

    renderData = () => {
        const { tab } = this.state;
        if (!tab) return false;
        const tabItem = this.state.tabElements.filter(
            (e) => e.value === tab,
        )[0];

        if (tab === "policlinic") {
            return <Policlinic />;
        }
        return (
            <FetchingList
                params={{ path: tabItem.path, key: tabItem.key }}
                action={getDoctorData}
                reducerName={"doctor"}
                objectName={`records.${tabItem.key}`}
                renderItem={(item) => this[`render${tab}`](item)}
                emptyMessage={() => (
                    <NoDataWrapper>
                        <NoData
                            title={"Нет записей"}
                            message={tabItem.noDataMessage}
                        />
                    </NoDataWrapper>
                )}
                rigid
            />
        );
    };

    renderRecord = (item) => {
        return <RecordListItem item={item} />;
    };

    renderCourse = (item) => {
        return <CourseListItem item={item} />;
    };

    renderRecipe = (item) => {
        return <RecipeListItem item={item} />;
    };

    handleNewDoctorAppointment = () => {
        this.props.history.push({
            pathname: `${LK_MENU_ELEMENTS.DOCTOR_PAGE.path}/new`,
            state: {},
        });
    };
}

const Actions = styled.div`
    display: flex;
    align-items: center;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
        margin-top: 16px;
    }
`;

const ListWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const Separator = styled.div`
    width: 1px;
    height: 34px;
    background-color: ${(props) => props.theme.colors.borderColor};
    margin: 0 ${(props) => props.theme.paddings.normal};
`;

const EMIAS = styled.div`
    display: flex;
    align-items: center;
`;

const EMIASLogo = styled.div`
    margin-right: 20px;
`;

const Text = styled.div`
    flex: 0 0 auto;
    width: 500px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    a {
        padding-left: 5px;
        color: ${(props) => props.theme.userTheme.color};
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

const ButtonWrapper = styled.div`
    flex: 0 0 auto;
`;

const NoDataWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

Doctor.propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func,
    records: PropTypes.object,
    address: PropTypes.string,
};

export default Doctor;
