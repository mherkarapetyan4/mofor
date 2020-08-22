import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "components/Button";
import { Loader } from "components/Loader";
import map from "lodash/map";
import { fontStyles } from "styledMixins/mixins";
import ArrowIcon from "icons/ArrowIcon";
import { darken } from "polished";
import NoData from "components/NoData";
import { history } from "routes/history";
import { LK_MENU_ELEMENTS } from "config/menu";
import { connect } from "react-redux";
import { getWidgetsPillboxDrugsList } from "actions/widgets";
import { getPillboxList } from "actions/pillbox";
import dayjs from "dayjs";
import { serverFormatDate, formatDateWithDayNames } from "utils/formatDate";

@connect((state) => ({
    data: state.widgets.pillboxWidget,
    userId: state.pillbox.defaultProfileId,
}))
class PillboxWidget extends PureComponent {
    state = {
        currentDate: dayjs(),
    };

    componentDidMount() {
        const { currentDate } = this.state;
        const { dispatch, userId } = this.props;

        if (userId) {
            dispatch(
                getWidgetsPillboxDrugsList({
                    fromDate: serverFormatDate(currentDate),
                    toDate: serverFormatDate(currentDate),
                    profileId: userId,
                }),
            );
        } else {
            dispatch(getPillboxList());
        }
    }

    componentDidUpdate(prevProps) {
        const { currentDate } = this.state;
        const { dispatch, userId } = this.props;

        if (prevProps.userId !== userId) {
            dispatch(
                getWidgetsPillboxDrugsList({
                    fromDate: serverFormatDate(currentDate),
                    toDate: serverFormatDate(currentDate),
                    profileId: userId,
                }),
            );
        }
    }

    changeCurrentDate = (type) => {
        const { currentDate } = this.state;
        const { dispatch, userId } = this.props;

        let newDate = currentDate.clone();
        if (type === "add") {
            newDate = newDate.add(1, "day");
        }
        if (type === "subtract") {
            newDate = newDate.subtract(1, "day");
        }
        this.setState({ currentDate: newDate });
        dispatch(
            getWidgetsPillboxDrugsList({
                fromDate: serverFormatDate(dayjs(newDate)),
                toDate: serverFormatDate(dayjs(newDate)),
                profileId: userId,
            }),
        );
    };

    render() {
        const { data } = this.props;

        return (
            <WidgetWrapper>
                <WidgetHeader>
                    <WidgetDate>
                        {formatDateWithDayNames(this.state.currentDate)}
                    </WidgetDate>
                    <WidgetControls>
                        <Prev
                            onClick={() => this.changeCurrentDate("subtract")}
                        >
                            <ArrowIcon opacity={0.5} />
                        </Prev>
                        <Next onClick={() => this.changeCurrentDate("add")}>
                            <ArrowIcon opacity={0.5} rotate={180} />
                        </Next>
                    </WidgetControls>
                </WidgetHeader>
                <WidgetContent>
                    {data.isFetching ? (
                        <Loader />
                    ) : data.drugsList.length ? (
                        map(data.drugsList, (item, i) => {
                            return (
                                <Item key={i}>
                                    {/* <ItemIcon>{item.icon}</ItemIcon> */}
                                    <ItemName>{item.drug.displayName}</ItemName>
                                    <ItemTime>
                                        {dayjs(item.date).format("HH:mm")}
                                    </ItemTime>
                                </Item>
                            );
                        })
                    ) : (
                        <NoData
                            title={"Нет приемов"}
                            message={
                                "На текущую дату нет запланированных приемов лекарственных средств"
                            }
                        />
                    )}
                </WidgetContent>
                <WidgetButton>
                    <Button
                        label={"Подробнее"}
                        onClick={() => {
                            history.push(LK_MENU_ELEMENTS.MEDICINES_PAGE.path);
                        }}
                    />
                </WidgetButton>
            </WidgetWrapper>
        );
    }
}

const Prev = styled.div`
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color ${(props) => props.theme.animations.transition};

    svg {
        width: 100%;
        height: 100%;
    }

    &:hover {
        background-color: ${(props) =>
            darken(0.1, props.theme.colors.background.white)};
    }
`;

const Next = styled.div`
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color ${(props) => props.theme.animations.transition};

    svg {
        width: 100%;
        height: 100%;
    }

    &:hover {
        background-color: ${(props) =>
            darken(0.1, props.theme.colors.background.white)};
    }
`;

const WidgetHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.paddings.normal};
`;

const WidgetControls = styled.div`
    display: flex;
`;

const WidgetWrapper = styled.div`
    padding: 10px;
`;

const WidgetButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const WidgetDate = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const WidgetContent = styled.div``;

const Item = styled.div`
    display: flex;
    margin-bottom: ${(props) => props.theme.paddings.normal};
`;

// const ItemIcon = styled.div`
//     width: 24px;
//     height: 24px;
//     margin-right: 15px;

//     svg {
//         width: 100%;
//         height: 100%;
//     }
// `;

const ItemName = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    flex: 1;
    margin-right: 15px;
`;

const ItemTime = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

PillboxWidget.propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    userId: PropTypes.number,
};

export default PillboxWidget;
