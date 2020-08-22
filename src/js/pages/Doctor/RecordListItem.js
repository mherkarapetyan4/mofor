import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import { Button } from "components/Button";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import DoctorIcon from "icons/services/DoctorIcon";
import { Desktop } from "wrappers/responsive";
import { BASE_URL, RESPONSIVE } from "config/consts";
import { doctorPath } from "config/paths";
import axios from "axios";
import { getDoctorData } from "actions/doctor";
import { connect } from "react-redux";
import { LK_MENU_ELEMENTS } from "config/menu";
import { withRouter } from "react-router-dom";
import { formatDate } from "utils/formatDate";
@connect()
@withRouter
class RecordListItem extends PureComponent {
    render() {
        const { item, dispatch } = this.props;
        return (
            <RecordWrapper>
                <Desktop>
                    <PlateWrapper>
                        <IconPlate title={<DoctorIcon color={"#fff"} />} />
                    </PlateWrapper>
                </Desktop>
                <InfoWrapper>
                    <DoctorType>{item.specialityName}</DoctorType>
                    <DoctorName>{item.doctorFullName}</DoctorName>
                    <AdditionalInfoWrapper>
                        <Item>
                            <ListData
                                label={"Дата и время:"}
                                data={formatDate(item.fromDateTime, true)}
                            />
                        </Item>
                        <Item>
                            <ListData label={"Кабинет:"} data={item.room} />
                        </Item>
                        <Item>
                            <ListData
                                label={"Поликлиника:"}
                                data={item.moName}
                            />
                        </Item>
                        <Item>
                            <ListData label={"Адрес:"} data={item.moAddress} />
                        </Item>
                        <Item>
                            <ListData label={"Номер:"} data={item.number} />
                        </Item>
                    </AdditionalInfoWrapper>
                </InfoWrapper>
                <ButtonsWrapper>
                    <Button
                        label={"Перенести"}
                        onClick={() => {
                            const { history } = this.props;
                            return history.push({
                                pathname: `${LK_MENU_ELEMENTS.DOCTOR_PAGE.path}/edit`,
                                state: { item },
                            });
                        }}
                    />
                    <Button
                        disabled={!item.cancellationAllowed}
                        label={"Отменить"}
                        onClick={() => {
                            const bodyFormData = new FormData();
                            bodyFormData.append("appointmentId", item.id);
                            axios
                                .post(
                                    doctorPath.CANCEL_APPOINTMENT,
                                    bodyFormData,
                                )
                                .then(() => {
                                    dispatch(
                                        getDoctorData({
                                            params: {
                                                path:
                                                    doctorPath.APPOINTMENT_LIST,
                                                key: "appointment",
                                            },
                                        }),
                                    );
                                });
                        }}
                    />
                    <Button
                        label={"Распечатать талон"}
                        onClick={() => {
                            window.open(
                                `${BASE_URL}/${doctorPath.DOWNLOAD_TICKET}?appointmentId=${item.id}`,
                                "_blank",
                            );
                        }}
                    />
                </ButtonsWrapper>
            </RecordWrapper>
        );
    }
}

const RecordWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    padding: 16px;
`;

const Item = styled.div`
    margin-bottom: 8px;
    padding-right: 16px;
    width: 50%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
    flex: 0 0 auto;
`;

const InfoWrapper = styled.div`
    flex: 1 1 0%;
`;

const DoctorType = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 5px;
`;

const DoctorName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

const AdditionalInfoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ButtonsWrapper = styled.div`
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    > div {
        margin-bottom: 16px;
    }
`;

RecordListItem.propTypes = {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object,
};

export default RecordListItem;
