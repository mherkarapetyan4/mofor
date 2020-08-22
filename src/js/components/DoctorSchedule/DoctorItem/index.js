import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import FullArrowIcon from "icons/FullArrowIcon";
import { fontStyles } from "styledMixins/mixins";
import Schedule from "components/DoctorSchedule/DoctorItem/Schedule";
import { darken, rgba } from "polished";
import { Desktop } from "wrappers/responsive";
import { RESPONSIVE } from "config/consts";
import dayjs from "dayjs";
import { formatDate, serverFormatDate } from "utils/formatDate";
import axios from "axios";
import get from "lodash/get";
import { doctorPath } from "config/paths";
import { connect } from "react-redux";
import { getNewScheduleFullfilled } from "actions/doctor";
@connect()
class DoctorItem extends PureComponent {
    state = {
        isOpened: false,
        schedules: [],
    };

    constructor(props) {
        super(props);
        this.hasAvailabilityDate = !!props.data.availabilityDate === true;
    }

    componentDidMount() {
        if (this.hasAvailabilityDate) this.getDoctorSchedules();
    }

    getDoctorSchedules = () => {
        const { data, dispatch } = this.props;
        const params = {
            doctorId: data.id,
            doctorComplexId: data.complexId,
        };
        axios
            .get(doctorPath.GET_DOCTOR_SCHEDULE, {
                params,
            })
            .then((res) => {
                this.setState({
                    schedules: get(res, "data.days", []),
                });
            });
        dispatch(
            getNewScheduleFullfilled({
                ...params,
                appointmentType: data.appointmentType,
            }),
        );
    };

    render() {
        const { data } = this.props;
        const { isOpened, schedules } = this.state;
        const date = new Date(serverFormatDate(dayjs(data.availabilityDate)));
        const dateDifference = dayjs(date).diff(
            new Date(serverFormatDate(dayjs())),
            "day",
        );
        let dateTitle = formatDate(data.availabilityDate);
        if (dateDifference === 1) {
            dateTitle = "Завтра";
        } else if (dateDifference === 0) {
            dateTitle = "Сегодня";
        }

        return (
            <ItemWrapper>
                <ContentWrapper>
                    <ContentHeader
                        onClick={
                            this.hasAvailabilityDate
                                ? this.toggleItem
                                : () => {}
                        }
                    >
                        <InfoWrapper>
                            <Desktop>
                                <InfoIcon>
                                    <IconPlate title={"НЮ"} />
                                </InfoIcon>
                            </Desktop>
                            <Info>
                                <Name>{data.title}</Name>
                                <ListData
                                    label={
                                        !this.hasAvailabilityDate
                                            ? "запись недоступна"
                                            : "Ближайший прием:"
                                    }
                                    data={formatDate(
                                        data.availabilityDate,
                                        true,
                                    )}
                                />
                            </Info>
                        </InfoWrapper>
                        <ActionsWrapper>
                            <Desktop>
                                <NearestDate>{dateTitle}</NearestDate>
                            </Desktop>
                            <Icon isOpened={isOpened}>
                                <FullArrowIcon opacity={0.5} />
                            </Icon>
                        </ActionsWrapper>
                    </ContentHeader>
                    <ContentBody isOpened={isOpened}>
                        <Schedule data={schedules} />
                    </ContentBody>
                </ContentWrapper>
            </ItemWrapper>
        );
    }

    toggleItem = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    };
}

const ItemWrapper = styled.div`
    padding: 5px 20px 5px 50px;

    &:first-child {
        padding-top: 20px;
    }

    &:last-child {
        padding-bottom: 20px;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        padding: 5px 0 5px 40px;
    }
`;

const ContentWrapper = styled.div`
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    background-color: ${(props) =>
        rgba(props.theme.colors.background.white, 0.9)};
    transition: border ${(props) => props.theme.animations.transition};

    &:hover {
        border: 1px solid ${(props) => props.theme.colors.borderColorHover};
    }
`;

const Info = styled.div``;

const Name = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const NearestDate = styled.div`
    display: inline-block;
    background: ${(props) => props.theme.userTheme.backgroundColor};
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
        })};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const Icon = styled.div`
    line-height: 0;
    margin-left: 20px;
    transform-origin: 50% 50%;
    transform: ${(props) =>
        props.isOpened ? "rotate(270deg)" : "rotate(90deg)"};
    transition: transform ${(props) => props.theme.animations.transition};
`;

const InfoIcon = styled.div`
    margin-right: 20px;
`;

const ContentHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    transition: background-color ${(props) => props.theme.animations.transition};

    &:hover {
        background-color: ${(props) =>
            darken(0.05, props.theme.colors.background.white)};
    }
`;

const ContentBody = styled.div`
    display: ${(props) => (props.isOpened ? "flex" : "none")};
    margin-top: 20px;
    padding: 10px;
`;

DoctorItem.propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default DoctorItem;
