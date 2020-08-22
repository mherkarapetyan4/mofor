import React, { PureComponent } from "react";
import styled from "styled-components";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import { fontStyles } from "styledMixins/mixins";
import { getCalendarList } from "actions/widgets";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import ArrowIcon from "icons/ArrowIcon";
import Actions from "containers/Header/Actions";
import { connect } from "react-redux";
import { Loader } from "components/Loader";

@connect(
    (state) => ({
        appIsFetching: state.app.isFetching,
        calendar: state.widgets.calendar,
    }),
    { getCalendarList },
)
class CalendarWidget extends PureComponent {
    state = {
        selectedDate: dayjs(),
    };

    componentDidMount() {
        this.setDate(0);
    }

    actionArrows = [
        {
            icon: <ArrowIcon opacity={0.5} rotate={0} />,
            tooltip: "День назад",
            action: () => this.setDate(-1),
        },
        {
            icon: <ArrowIcon opacity={0.5} rotate={180} />,
            tooltip: "День вперед",
            action: () => this.setDate(+1),
        },
    ];

    formattedDate = () => {
        return this.state.selectedDate
            .locale("ru")
            .format("dddd, DD MMMM YYYY");
    };

    render() {
        const { appIsFetching } = this.props;

        return (
            <WidgetWrapper>
                <WidgetToday>
                    <TodayHeading>
                        <TodayDate>Сегодня, {this.formattedDate()}</TodayDate>
                        <ActionsWrapper>
                            <Actions items={this.actionArrows} />
                        </ActionsWrapper>
                    </TodayHeading>
                    <PlannedHeading>События: </PlannedHeading>
                    <PlannedRecords>
                        {appIsFetching ? (
                            <Loader />
                        ) : (
                            <Records
                                eventsList={this.props.calendar.todayEvents}
                            />
                        )}
                    </PlannedRecords>
                </WidgetToday>
                <WidgetPlanned>
                    <PlannedHeading>Ближайшие события:</PlannedHeading>
                    <PlannedRecords>
                        {appIsFetching ? (
                            <Loader />
                        ) : (
                            <Records
                                eventsList={this.props.calendar.upcomingEvents}
                            />
                        )}
                    </PlannedRecords>
                </WidgetPlanned>
                <WidgetButton>
                    <Link to={LK_MENU_ELEMENTS.CALENDAR_PAGE.path}>
                        <Button label={"Подробнее"} onClick={() => {}} />
                    </Link>
                </WidgetButton>
            </WidgetWrapper>
        );
    }

    setDate = (days) => {
        const updatedDate = this.state.selectedDate.clone().add(days, "day");
        this.setState({
            selectedDate: updatedDate,
        });
        ["todayEvents", "upcomingEvents"].map((field, ix) =>
            this.props.getCalendarList(
                {
                    fromDate: updatedDate.add(ix, "day").format("YYYY-MM-DD"),
                    toDate: updatedDate.add(ix, "day").format("YYYY-MM-DD"),
                },
                5,
                1,
                field,
            ),
        );
    };
}

const Records = ({ eventsList }) => {
    return (
        !isEmpty(eventsList) &&
        eventsList.content.map((item, i) => (
            <RecordItem key={i}>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemTime>
                    {dayjs(item.startDate).format("HH:mm ч. DD.MM.YYYY г.")}
                </ItemTime>
            </RecordItem>
        ))
    );
};

const ActionsWrapper = styled.div`
    flex: 0 0 auto;
`;

const TodayDate = styled.div``;

const RecordItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 7px;

    :last-child {
        margin-bottom: 0;
    }
`;

const ItemTitle = styled.div`
    flex: 1;
`;

const ItemTime = styled.div`
    flex: 0 1 auto;
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
        })};
    padding-left: 10px;
`;

const WidgetToday = styled.div`
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const TodayHeading = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const WidgetPlanned = styled.div`
    padding-top: 16px;
    margin-bottom: 16px;
`;

const PlannedHeading = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 7px;
    opacity: 0.8;
`;

const PlannedRecords = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const WidgetWrapper = styled.div`
    padding: 10px;
`;

const WidgetButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

CalendarWidget.propTypes = {
    calendar: PropTypes.object,
    getCalendarList: PropTypes.func,
    appIsFetching: PropTypes.bool,
};

export default CalendarWidget;
