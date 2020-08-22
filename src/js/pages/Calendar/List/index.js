import React, { PureComponent } from "react";
import { FetchingList } from "components/FetchingList";
import { deleteCalendarEvent, getCalendarList } from "actions/calendar";
import dayjs from "dayjs";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DeleteIcon from "icons/DeleteIcon";
import Actions from "containers/Header/Actions";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import { fontStyles } from "styledMixins/mixins";
import { Desktop } from "wrappers/responsive";
import WidgetBlock from "components/WidgetBlock";
import { Button } from "components/Button";
import { RESPONSIVE } from "config/consts";
import InlineFormField from "components/InlineFormField";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { hidePopup, showPopup } from "actions/popup";
import { withRouter } from "react-router-dom";
import { LK_MENU_ELEMENTS } from "config/menu";
import { searchFields } from "../meta";
import { form } from "wrappers/Formik";
import { sendForm } from "utils/sendForm";
import { FormikFormField } from "wrappers/Formik/FormField";
import { serverFormatDate } from "utils/formatDate";

const params = {
    fromDate: serverFormatDate(dayjs("01-01-1900")),
    toDate: serverFormatDate(dayjs("01-01-2100")),
};

@withRouter
@connect((state) => ({
    settings: state.user.settings,
}))
@form({
    fields: searchFields,
})
class CalendarList extends PureComponent {
    itemActions = (item) => {
        if (
            item.sourceType === "PILLBOX" ||
            item.sourceType === "EMIAS_APPOINTMENT"
        ) {
            return [];
        } else {
            return [
                {
                    icon: <DeleteIcon opacity={0.5} />,
                    tooltip: "Удалить",
                    action: () => this.onDelete(item),
                },
            ];
        }
    };

    static propTypes = {
        onEditEvent: PropTypes.func.isRequired,
        onAddEvent: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        hidePopup: PropTypes.func.isRequired,
        showPopup: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        setFormValues: PropTypes.func.isRequired,
        settings: PropTypes.object.isRequired,
    };

    state = {
        params,
    };

    onCompleteSearch = () => {
        sendForm(this.props, searchFields).then((response) => {
            const params = {};
            Object.keys(response).map((key) => {
                if (response[key]) params[key] = response[key];
            });
            this.setState({ params });
        });
    };

    clearValues = () => {
        this.setState(
            {
                params,
            },
            () => {
                this.props.setFormValues({
                    fromDate: null,
                    toDate: null,
                    name: "",
                });
            },
        );
    };

    changeEditingEvent = (event) => {
        const { settings } = this.props;

        if (event.sourceType === "PILLBOX") {
            this.props.history.push({
                pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/course`,
                state: {
                    drug: event.intake.drug,
                    id: event.intake.courseId,
                    profile: event.profile,
                },
            });
        } else if (event.sourceType === "EMIAS_APPOINTMENT") {
            if (settings.emiasVersion !== 5) {
                window.open("https://emias.info/", "_blank");
            } else {
                this.props.history.push({
                    pathname: `${LK_MENU_ELEMENTS.DOCTOR_PAGE.path}`,
                });
            }
        } else {
            const { onEditEvent, onAddEvent } = this.props;
            onEditEvent(event.settingId);
            onAddEvent("EDIT");
        }
    };

    onDelete = (event) => {
        const { dispatch } = this.props;
        dispatch(
            showPopup(
                "Удалить событие?",
                <ActionsWrapper>
                    <Button
                        label={"Отмена"}
                        onClick={() => dispatch(hidePopup())}
                    />
                    <Button
                        label={"Удалить"}
                        onClick={() => {
                            dispatch(deleteCalendarEvent(event.settingId));
                            dispatch(hidePopup());
                        }}
                    />
                </ActionsWrapper>,
            ),
        );
    };

    renderItem = (item) => {
        return (
            <EventWrapper
                key={`item-id-${item.settingId}`}
                onClick={() => this.changeEditingEvent(item)}
            >
                <Desktop>
                    <PlateWrapper>
                        <IconPlate title={"НС"} />
                    </PlateWrapper>
                </Desktop>
                <InfoWrapper>
                    <Date>{dayjs(item.startDate).format("DD.MM.YYYY")}</Date>
                    <ItemName>{item.name}</ItemName>
                    <Type>
                        <ListData
                            label={"Тип события:"}
                            data={
                                item.sourceType === "PILLBOX"
                                    ? "Приём лекарств"
                                    : item.sourceType === "EMIAS_APPOINTMENT"
                                    ? "Запись к врачу"
                                    : item.type
                            }
                        />
                    </Type>
                </InfoWrapper>
                <Actions
                    items={
                        item.sourceType === "PILLBOX"
                            ? []
                            : this.itemActions(item)
                    }
                />
            </EventWrapper>
        );
    };

    render() {
        return (
            <div>
                <FetchingList
                    renderItem={this.renderItem}
                    reducerName={"calendar"}
                    objectName={"calendarList"}
                    action={getCalendarList}
                    params={this.state.params}
                />
                <CalendarSearch>
                    <WidgetBlock title={"Поиск по событиям"}>
                        <InputsWrapper>
                            <SearchEvent>
                                <FormikFormField
                                    name={"name"}
                                    component={(props) => (
                                        <InlineFormField
                                            {...props}
                                            label={"Название события:"}
                                            placeholder={
                                                "Поиск по названию события"
                                            }
                                        />
                                    )}
                                />
                            </SearchEvent>
                            <SearchDate>
                                <Item>
                                    <FormikFormField
                                        name={"fromDate"}
                                        component={(props) => (
                                            <InlineFormFieldDate
                                                {...props}
                                                label={"C:"}
                                                placeholder={"Дата с"}
                                                popupPosition={"top"}
                                            />
                                        )}
                                    />
                                </Item>
                                <Item>
                                    <FormikFormField
                                        name={"toDate"}
                                        component={(props) => (
                                            <InlineFormFieldDate
                                                {...props}
                                                label={"По:"}
                                                placeholder={"Дата по"}
                                                popupPosition={"top"}
                                            />
                                        )}
                                    />
                                </Item>
                            </SearchDate>
                        </InputsWrapper>
                        <ActionsWrapper>
                            <Button
                                label={"Поиск"}
                                onClick={this.onCompleteSearch}
                            />
                            <Button
                                label={"Очистить"}
                                onClick={this.clearValues}
                            />
                        </ActionsWrapper>
                    </WidgetBlock>
                </CalendarSearch>
            </div>
        );
    }
}

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    margin-right: 16px;
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
`;

const Date = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 5px;
`;

const ItemName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

const Type = styled.div``;

const EventWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => props.theme.paddings.normal};
    padding: 16px;
    width: 100%;

    &:last-child {
        margin-bottom: 0;
    }
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
`;

const CalendarSearch = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 16px 0;
`;

const SearchEvent = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const SearchDate = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin-right: 16px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        margin-right: 0;
    }
`;

const Item = styled.div`
    margin-bottom: 16px;
    flex: 1 1 auto;

    &:last-child {
        margin-bottom: 0;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        flex: 1 0 auto;
        width: 100%;
        margin-bottom: 10px;
    }
`;

export default CalendarList;
