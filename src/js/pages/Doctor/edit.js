import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Schedule from "components/DoctorSchedule/DoctorItem/Schedule";
import PropTypes from "prop-types";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import styled from "styled-components";
import axios from "axios";
import { doctorPath } from "config/paths";
import get from "lodash/get";

import { getNewScheduleFullfilled } from "actions/doctor";
import FlatPopup from "components/FlatPopup";
import isEmpty from "lodash/isEmpty";
import { history } from "routes/history";
import { Button } from "components/Button";
import WidgetBlock from "components/WidgetBlock";
import ScrollBar from "components/ScrollBar";
import { Desktop, Tablet } from "wrappers/responsive";

@connect((state) => ({
    schedule: state.doctor.speciality.schedule,
}))
@hasHistoryState(LK_MENU_ELEMENTS.DOCTOR_PAGE.path)
class DoctorEdit extends PureComponent {
    state = {
        schedules: [],
    };

    componentDidMount() {
        this.getDoctorSchedules();
    }

    getDoctorSchedules = () => {
        const { dispatch } = this.props;
        const { item } = this.props.location.state;
        const params = {
            doctorId: item.doctorId,
            doctorComplexId: item.doctorComplexId,
            appointmentId: item.id,
        };
        axios.get(doctorPath.GET_DOCTOR_SCHEDULE, { params }).then((res) => {
            this.setState({
                schedules: get(res, "data.days", []),
            });
        });
        dispatch(
            getNewScheduleFullfilled({
                appointmentId: item.id,
            }),
        );
    };

    render() {
        const { item } = this.props.location.state;
        return (
            <FlatPopup title={item.doctorFullName}>
                <Wrapper>
                    <Desktop>
                        <ScrollBar>{this.renderData()}</ScrollBar>
                    </Desktop>
                    <Tablet>{this.renderData()}</Tablet>
                </Wrapper>
            </FlatPopup>
        );
    }

    renderData = () => {
        const { schedules } = this.state;
        return (
            <WidgetBlock
                title={"Перенос записи"}
                additional={
                    <Button
                        disabled={isEmpty(this.props.schedule)}
                        label={"Перенести"}
                        onClick={() => {
                            const data = this.props.schedule;
                            if (isEmpty(data)) return false;
                            const bodyFormData = new FormData();
                            Object.keys(data).map((key) => {
                                bodyFormData.append(key, data[key]);
                            });
                            axios
                                .post(
                                    doctorPath.SHIFT_APPOINTMENT,
                                    bodyFormData,
                                )
                                .then(() => {
                                    history.goBack();
                                });
                        }}
                    />
                }
            >
                <Schedule data={schedules} />
            </WidgetBlock>
        );
    };
}

const Wrapper = styled.div`
    height: 100%;
`;

DoctorEdit.propTypes = {
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    schedule: PropTypes.object.isRequired,
};

export default DoctorEdit;
