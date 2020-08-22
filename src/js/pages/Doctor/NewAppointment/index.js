import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import Row from "containers/Row";
import Column from "containers/Column";
import ScrollBar from "components/ScrollBar";
import FlatPopup from "components/FlatPopup";
import WidgetBlock from "components/WidgetBlock";
import Accordeon from "components/Accordeon";
import { Button } from "components/Button";
import IconPlate from "components/IconPlate";
import MarkedMapIcon from "icons/MarkedMapIcon";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { darken } from "polished";
import DoctorSchedule from "components/DoctorSchedule";
import Map from "components/Map";
import { Desktop, Tablet } from "wrappers/responsive";
import { RESPONSIVE } from "config/consts";
import { getCurrentDoctors, getSpecialityData } from "actions/doctor";
import { connect } from "react-redux";
import axios from "axios";
import { doctorPath } from "config/paths";
import isEmpty from "lodash/isEmpty";
import { history } from "routes/history";
import UrologistIcon from "icons/UrologistIcon";
import DoctorIcon from "icons/services/DoctorIcon";
import OtolaryngologistIcon from "icons/OtolaryngologistIcon";
import SurgeonIcon from "icons/SurgeonIcon";
import OphthalmologistIcon from "icons/OphthalmologistIcon";
import PoliclinicIcon from "icons/PoliclinicIcon";
import PregnancyIcon from "icons/PregnancyIcon";
import LoaderWrapper from "components/Loader/LoaderWrapper";

@connect((state) => ({
    isFetching: state.doctor.isFetching,
    specialityData: state.doctor.speciality,
    schedule: state.doctor.speciality.schedule,
}))
@hasHistoryState(LK_MENU_ELEMENTS.DOCTOR_PAGE.path)
class DoctorNewAppointment extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            speciality: [],
            currentDoctors: [],
        };
    }

    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        specialityData: PropTypes.object.isRequired,
        schedule: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        schedule: {},
    };

    policlinics = () => {
        if (!this.props.specialityData.current.content) return [];
        return [...this.props.specialityData.current.content].map((el) => ({
            icon: <IconPlate title={<MarkedMapIcon color={"#fff"} />} />,
            id: el.id,
            title: el.name,
            subtitle: <Subtitle>{el.address}</Subtitle>,
            value: <DoctorSchedule data={el.doctors} />,
            subvalue: (
                <MapWrapper key={el.id + el.address + "docschedule"}>
                    <Map address={el.address} key={el.id + el.address} />
                </MapWrapper>
            ),
        }));
    };

    componentDidMount() {
        this.props.dispatch(getSpecialityData());
        if (!isEmpty(this.props.specialityData.data)) {
            this.setSpecialityList();
        }
    }
    componentDidUpdate(prevProps) {
        if (
            JSON.stringify(prevProps.specialityData.data) !==
            JSON.stringify(this.props.specialityData.data)
        ) {
            this.setSpecialityList();
        }
    }

    setSpecialityList = () => {
        const speciality = [...this.props.specialityData.data.content].map(
            (i) => ({
                id: i.id,
                title: i.name,
                action: () => this.onClickSpeciality(i.id),
            }),
        );
        this.setState({
            speciality,
        });
    };

    onClickSpeciality = (id) => {
        const { dispatch } = this.props;
        dispatch(getCurrentDoctors(id));
    };

    render() {
        const { isFetching } = this.props;
        const { speciality } = this.state;
        return (
            <FlatPopup title={"Новая запись"}>
                <Row fullPage>
                    <Column fixed={400} paddings={0}>
                        <Desktop>
                            <ScrollBar>
                                {isFetching && !speciality.length ? (
                                    <LoaderWrapper />
                                ) : (
                                    this.renderDoctorsList()
                                )}
                            </ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderDoctorsList()}</Tablet>
                    </Column>
                    <Column auto paddingRight={0} mobilePaddingLeft={0}>
                        <Desktop>
                            <ScrollBar>
                                {this.renderAppointmentsList()}
                            </ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderAppointmentsList()}</Tablet>
                    </Column>
                </Row>
            </FlatPopup>
        );
    }

    renderDoctorsList = () => {
        const { speciality } = this.state;
        return (
            <WidgetBlock title={"Специальность врача"}>
                <Accordeon
                    elements={speciality}
                    renderHeader={(item) => this.renderItem(item)}
                />
            </WidgetBlock>
        );
    };

    renderItem = (item) => {
        return (
            <Wrapper>
                <IconWrapper>
                    <IconPlate title={this.renderIcon(item.id)} />
                </IconWrapper>
                <DoctorSpecialty>{item.title}</DoctorSpecialty>
            </Wrapper>
        );
    };

    renderIcon = (id) => {
        switch (id) {
            case 2:
                return <UrologistIcon color={"#fff"} />;
            case 200:
                return <DoctorIcon color={"#fff"} />;
            case 3:
                return <SurgeonIcon color={"#fff"} />;
            case 4:
                return <PregnancyIcon color={"#fff"} />;
            case 6:
                return <OphthalmologistIcon color={"#fff"} />;
            case 107:
                return <DoctorIcon color={"#fff"} />;
            case 2004:
                return <PoliclinicIcon color={"#fff"} />;
            case 70:
                return <DoctorIcon color={"#fff"} />;
            case 603:
                return <OtolaryngologistIcon color={"#fff"} />;
            default:
                return null;
        }
    };

    renderAppointmentsList = () => {
        const { isFetching } = this.props;

        if (isFetching) return <LoaderWrapper />;
        return (
            <WidgetBlock
                title={"Выбор поликлиники и специалиста"}
                additional={
                    <Button
                        disabled={isEmpty(this.props.schedule)}
                        label={"Записаться"}
                        onClick={() => {
                            const data = this.props.schedule;
                            if (isEmpty(data)) return false;
                            const bodyFormData = new FormData();
                            Object.keys(data).map((key) => {
                                bodyFormData.append(key, data[key]);
                            });
                            axios
                                .post(
                                    doctorPath.CREATE_APPOINTMENT,
                                    bodyFormData,
                                )
                                .then(() => {
                                    history.goBack();
                                });
                        }}
                    />
                }
            >
                <Accordeon elements={this.policlinics()} />
            </WidgetBlock>
        );
    };
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const IconWrapper = styled.div`
    margin-right: 16px;
`;

const DoctorSpecialty = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const Subtitle = styled.div`
    ${(props) => fontStyles(props, { color: props.theme.userTheme.color })};
    transition: color ${(props) => props.theme.animations.transition};
    display: inline-block;

    &:hover {
        color: ${(props) => darken(0.2, props.theme.userTheme.color)};
    }
`;

const MapWrapper = styled.div`
    height: 200px;
    padding: 10px 20px 10px 50px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        padding: 10px 0 10px 40px;
    }
`;

export default DoctorNewAppointment;
