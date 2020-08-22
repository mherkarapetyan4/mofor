import React, { PureComponent } from "react";
import styled, { withTheme } from "styled-components";
import Stroke from "components/Stroke";
import PropTypes from "prop-types";
import { fontStyles } from "styledMixins/mixins";
import CourseItem from "pages/Pillbox/PillboxWeek/CourseItem";
import { connect } from "react-redux";
import { getCalendarDrugsList, changeConfirmDrug } from "actions/pillbox";
import dayjs from "dayjs";
import { get, groupBy } from "lodash";
import { formatDate, serverFormatDate } from "utils/formatDate";
import "dayjs/locale/ru";
import { Loader } from "components/Loader";
import { RESPONSIVE } from "config/consts";
import capitalize from "lodash/capitalize";

dayjs.locale("ru");

@withTheme
@connect(
    (state) => ({
        calendarList: state.pillbox.calendarList,
        currentPillbox: state.pillbox.currentPillbox,
        isFetching: state.app.isFetching,
    }),
    { getCalendarDrugsList, changeConfirmDrug },
)
class PillboxWeek extends PureComponent {
    state = {
        week: [],
    };
    static propTypes = {
        theme: PropTypes.object,
        calendarList: PropTypes.object.isRequired,
        currentPillbox: PropTypes.object.isRequired,
        getCalendarDrugsList: PropTypes.func.isRequired,
        currentDate: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        changeConfirmDrug: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        const { currentDate } = this.props;
        if (
            JSON.stringify(currentDate) !==
            JSON.stringify(prevProps.currentDate)
        ) {
            this.getData();
        }
    }

    getData = () => {
        const {
            currentDate,
            getCalendarDrugsList,
            currentPillbox,
        } = this.props;
        if (get(currentPillbox, "profile.id", "")) {
            getCalendarDrugsList(
                serverFormatDate(dayjs(currentDate).startOf("week")),
                serverFormatDate(dayjs(currentDate).endOf("week")),
                get(currentPillbox, "profile.id", ""),
            );
            this.getWeek();
        }
    };

    getWeek = () => {
        const { currentDate } = this.props;
        let week = [];
        let tempDate = dayjs(currentDate).startOf("week");
        while (formatDate(tempDate) !== formatDate(currentDate.endOf("week"))) {
            week.push(tempDate);
            tempDate = tempDate.add(1, "day");
        }
        week.push(tempDate);
        this.setState({ week });
    };

    changeConfirmDrug = (item, confirmed) => {
        const { changeConfirmDrug, currentDate } = this.props;

        changeConfirmDrug({
            currentDate: currentDate,
            id: item.id,
            courseId: item.courseId,
            date: item.date,
            confirmed,
            profileId: item.profileId,
        });
    };

    render() {
        const { isFetching, calendarList } = this.props;
        const { week } = this.state;
        if (isFetching) return <Loader />;
        if (!calendarList || !calendarList.content) return null;
        const filtered = groupBy(calendarList.content, (e) =>
            formatDate(e.date),
        );

        return (
            <Wrapper>
                {week.map((day, i) => {
                    const drugsList = get(filtered, formatDate(day), []);
                    return (
                        <Item key={[formatDate(day), i].join("_")}>
                            <InformationWrapper>
                                <InformationHeader>
                                    <HeaderData>
                                        <Date>{day.format("D.MM")}</Date>
                                        <Day>
                                            {capitalize(day.format("dddd"))}
                                        </Day>
                                        <Stroke />
                                    </HeaderData>
                                    <CourseWrapper>
                                        <CourseHeader>
                                            <CourseTime>Утро</CourseTime>
                                            <CourseTime>День</CourseTime>
                                            <CourseTime>Вечер</CourseTime>
                                            <CourseTime>Ночь</CourseTime>
                                        </CourseHeader>
                                    </CourseWrapper>
                                </InformationHeader>
                                <List>
                                    {drugsList.length ? (
                                        drugsList.map((elem, index) => (
                                            <CourseItem
                                                key={[elem, index].join("_")}
                                                item={elem}
                                                changeConfirmDrug={(
                                                    item,
                                                    confirmed,
                                                ) =>
                                                    this.changeConfirmDrug(
                                                        item,
                                                        confirmed,
                                                    )
                                                }
                                            />
                                        ))
                                    ) : (
                                        <EmptyDrug>Приемов нет</EmptyDrug>
                                    )}
                                </List>
                            </InformationWrapper>
                        </Item>
                    );
                })}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const Item = styled.div`
    display: flex;
    width: 100%;
    padding: 16px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};

    &:last-child {
        border: none;
    }
`;

const InformationWrapper = styled.div`
    flex: 1 1 auto;
`;

const InformationHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
`;

const Date = styled.div`
    width: 40px;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
        })};
    margin-right: 16px;
`;

const EmptyDrug = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: props.theme.fonts.sizes.normal,
            color: props.theme.colors.text.colorBlack,
        })};
    opacity: 0.5;
`;

const Day = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
            color: props.theme.colors.text.colorBlack,
        })};
    margin-right: 16px;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const CourseWrapper = styled.div`
    flex: 0 0 auto;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        display: none;
    }

    @media print {
        display: none;
    }
`;

const CourseHeader = styled.div`
    display: flex;
    align-items: center;
`;

const CourseTime = styled.div`
    width: 60px;
    text-align: center;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
        })};
`;

const HeaderData = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
`;

export default PillboxWeek;
