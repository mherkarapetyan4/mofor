/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import styled from "styled-components";
import InlineFormField from "components/InlineFormField";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import Row from "containers/Row";
import Column from "containers/Column";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { Checkbox } from "components/Checkbox";
import { Button } from "components/Button";
import { form } from "wrappers/Formik";
import { calendarFields } from "pages/Calendar/meta";
import { validate } from "pages/Calendar/validate";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import { connect } from "react-redux";
import {
    getCalendarEvent,
    saveCalendarEvent,
    getCalendarEventFullfilled,
} from "actions/calendar";
import { sendForm } from "utils/sendForm";
import PropTypes from "prop-types";
import { eventTypes, periodicityType, RESPONSIVE } from "config/consts";
import omit from "lodash/omit";
import TimePicker from "components/TimePicker";
import dayjs from "dayjs";
import { fontStyles } from "styledMixins/mixins";
import { LK_MENU_ELEMENTS } from "config/menu";
import { history } from "routes/history";

@connect((state) => ({
    calendarEvent: state.calendar.calendarEvent,
}))
@form({
    fields: calendarFields,
    validate,
})
class CalendarEventForm extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        calendarEvent: PropTypes.object.isRequired,
        onAddEvent: PropTypes.func.isRequired,
        editingEvent: PropTypes.number.isRequired,
        errors: PropTypes.object,
        submitCount: PropTypes.number,
        currentDate: PropTypes.object,
        selectedDate: PropTypes.object,
    };
    static defaultProps = {
        editingEvent: 0,
    };

    componentDidMount() {
        if (this.props.editingEvent) {
            this.props.dispatch(getCalendarEvent(this.props.editingEvent));
        }
        if (this.props.calendarEvent && this.props.editingEvent) {
            const initial = {
                id: this.props.calendarEvent.id,
                startDate: dayjs(this.props.calendarEvent.startDate),
                startTime: dayjs(this.props.calendarEvent.startDate).format(
                    "HH:mm",
                ),
                endDate: this.props.calendarEvent.endDate
                    ? dayjs(this.props.calendarEvent.endDate)
                    : "",
                endTime: this.props.calendarEvent.endDate
                    ? dayjs(this.props.calendarEvent.endDate).format("HH:mm")
                    : "00:00",
                type: this.props.calendarEvent.type,
                periodicity: this.props.calendarEvent.periodicity,
                name: this.props.calendarEvent.name,
                repetitionsCount: this.props.calendarEvent.repetitionsCount,
                emailNotification: this.props.calendarEvent.emailNotification,
                sunday: this.props.calendarEvent.sunday,
                saturday: this.props.calendarEvent.saturday,
                wednesday: this.props.calendarEvent.wednesday,
                monday: this.props.calendarEvent.monday,
                tuesday: this.props.calendarEvent.tuesday,
                thursday: this.props.calendarEvent.thursday,
                friday: this.props.calendarEvent.friday,
                comment: this.props.calendarEvent.comment,
            };
            this.props.changeInitialValues(initial);
        } else {
            const initial = {
                id: null,
                startDate: dayjs(this.props.selectedDate),
                startTime: "00:00",
                endDate: dayjs(this.props.currentDate),
                endTime: "00:00",
                type: null,
                periodicity: "ONCE",
                name: "",
                repetitionsCount: null,
                emailNotification: false,
                sunday: false,
                saturday: false,
                wednesday: false,
                monday: false,
                tuesday: false,
                thursday: false,
                friday: false,
                comment: "",
            };
            this.props.changeInitialValues(initial);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.values.type === "Прием лекарственных средств") {
            history.push(LK_MENU_ELEMENTS.MEDICINES_PAGE.path);
        } else {
            if (prevProps.editingEvent !== this.props.editingEvent) {
                this.props.dispatch(getCalendarEvent(this.props.editingEvent));
            }

            if (
                (this.props.calendarEvent &&
                    prevProps.calendarEvent &&
                    this.props.calendarEvent.id !==
                        prevProps.calendarEvent.id) ||
                !prevProps.calendarEvent
            ) {
                const initial = {
                    id: this.props.calendarEvent.id,
                    startDate: dayjs(this.props.calendarEvent.startDate),
                    startTime: dayjs(this.props.calendarEvent.startDate).format(
                        "HH:mm",
                    ),
                    endDate: this.props.calendarEvent.endDate
                        ? dayjs(this.props.calendarEvent.endDate)
                        : "",
                    endTime: this.props.calendarEvent.endDate
                        ? dayjs(this.props.calendarEvent.endDate).format(
                              "HH:mm",
                          )
                        : "00:00",
                    type: this.props.calendarEvent.type,
                    periodicity: this.props.calendarEvent.periodicity,
                    name: this.props.calendarEvent.name,
                    repetitionsCount: this.props.calendarEvent.repetitionsCount,
                    emailNotification: this.props.calendarEvent
                        .emailNotification,
                    sunday: this.props.calendarEvent.sunday,
                    saturday: this.props.calendarEvent.saturday,
                    wednesday: this.props.calendarEvent.wednesday,
                    monday: this.props.calendarEvent.monday,
                    tuesday: this.props.calendarEvent.tuesday,
                    thursday: this.props.calendarEvent.thursday,
                    friday: this.props.calendarEvent.friday,
                    comment: this.props.calendarEvent.comment,
                };
                this.props.changeInitialValues(initial);
            }

            if (
                this.props.values.endDate &&
                prevProps.values.endDate !== this.props.values.endDate
            ) {
                this.props.changeInitialValues({
                    ...this.props.values,
                    repetitionsCount: "",
                });
            }

            if (
                this.props.values.repetitionsCount &&
                prevProps.values.repetitionsCount !==
                    this.props.values.repetitionsCount
            ) {
                this.props.changeInitialValues({
                    ...this.props.values,
                    endDate: "",
                });
            }
        }
    }

    onSave = () => {
        const { dispatch, onAddEvent } = this.props;
        sendForm(this.props, calendarFields).then((response) => {
            let params = { ...response };
            if (!params.endDate) {
                params.endDate = null;
            } else {
                params.endDate += " " + params.endTime + ":00";
            }
            params.startDate += " " + params.startTime + ":00";
            params = omit(params, ["startTime", "endTime"]);

            const bodyFormData = new FormData();
            if (params.periodicity !== "ONCE") {
                if (params.endDate)
                    bodyFormData.append("endDate", params.endDate);
                if (params.repetitionsCount)
                    bodyFormData.append(
                        "repetitionsCount",
                        params.repetitionsCount,
                    );
            }
            if (params.id) {
                bodyFormData.append("id", params.id);
            }
            bodyFormData.append("name", params.name);
            bodyFormData.append("startDate", params.startDate);
            bodyFormData.append("comment", params.comment);
            bodyFormData.append("type", params.type);
            bodyFormData.append("periodicity", params.periodicity);
            bodyFormData.append("emailNotification", params.emailNotification);
            bodyFormData.append("sunday", params.sunday);
            bodyFormData.append("saturday", params.saturday);
            bodyFormData.append("wednesday", params.wednesday);
            bodyFormData.append("monday", params.monday);
            bodyFormData.append("tuesday", params.tuesday);
            bodyFormData.append("thursday", params.thursday);
            bodyFormData.append("friday", params.friday);
            dispatch(saveCalendarEvent(bodyFormData));
            onAddEvent("EVENT");
            dispatch(getCalendarEventFullfilled({}));
        });
    };

    onClose = () => {
        const { onAddEvent } = this.props;
        onAddEvent("EVENT");
    };

    render() {
        const { values, errors, submitCount } = this.props;

        return (
            <FormWrapper>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"name"}
                            component={(props) => (
                                <InlineFormField
                                    required
                                    {...props}
                                    label={"Название события:"}
                                    placeholder={"Введите название события"}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column fraction={6} paddings={0}>
                        <MobilePadding>
                            <FormikFormField
                                name={"type"}
                                component={(props) => (
                                    <InlineFormFieldSelect
                                        required
                                        {...props}
                                        label={"Тип события:"}
                                        placeholder={"Выберите тип события"}
                                        options={eventTypes}
                                    />
                                )}
                            />
                        </MobilePadding>
                    </Column>
                    <Column fraction={6} paddingRight={0} mobilePaddingLeft={0}>
                        <FormikFormField
                            name={"periodicity"}
                            component={(props) => (
                                <InlineFormFieldSelect
                                    required
                                    {...props}
                                    label={"Периодичность:"}
                                    placeholder={"Выберите периодичность"}
                                    options={periodicityType}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column fraction={6} paddings={0}>
                        <MobileContainer>
                            <FormikFormField
                                name={"startDate"}
                                component={(props) => (
                                    <InlineFormFieldDate
                                        required
                                        {...props}
                                        label={"Дата начала:"}
                                        placeholder={"Выберите дату"}
                                    />
                                )}
                            />
                        </MobileContainer>
                    </Column>
                    <Column fraction={6} paddingRight={0} mobilePaddingLeft={0}>
                        <MobileContainer>
                            <FormikFormField
                                name={"startTime"}
                                component={(props) => (
                                    <TimePicker
                                        required
                                        {...props}
                                        label={"Время начала:"}
                                        placeholder={"Выберите время"}
                                    />
                                )}
                            />
                        </MobileContainer>
                    </Column>
                </Row>
                {values.periodicity !== "ONCE" && (
                    <>
                        <Row>
                            <Column fraction={6} paddings={0}>
                                <MobileContainer>
                                    <FormikFormField
                                        name={"endDate"}
                                        component={(props) => (
                                            <InlineFormFieldDate
                                                {...props}
                                                label={"Дата окончания:"}
                                                placeholder={"Выберите дату"}
                                                minDate={dayjs(
                                                    values.startDate,
                                                )}
                                            />
                                        )}
                                    />
                                </MobileContainer>
                            </Column>
                            <Column
                                fraction={6}
                                paddingRight={0}
                                mobilePaddingLeft={0}
                            >
                                <FormikFormField
                                    name={"endTime"}
                                    component={(props) => (
                                        <TimePicker
                                            {...props}
                                            label={"Время окончания:"}
                                            placeholder={"Выберите время"}
                                        />
                                    )}
                                />
                            </Column>
                        </Row>
                        <Or>или</Or>
                        <Row paddings={0}>
                            <FormikFormField
                                name={"repetitionsCount"}
                                component={(props) => (
                                    <InlineFormField
                                        {...props}
                                        label={"Количество повторений:"}
                                        placeholder={
                                            "Введите количество повторений"
                                        }
                                        type={"number"}
                                    />
                                )}
                            />
                        </Row>
                    </>
                )}
                {values.periodicity === "DAYS_OF_WEEK" && (
                    <Row>
                        <Column paddings={0}>
                            <Row paddings={0}>
                                <CheckboxItem>
                                    <FormikFormField
                                        name={"monday"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Понедельник"}
                                            />
                                        )}
                                    />
                                </CheckboxItem>
                                <CheckboxItem>
                                    <FormikFormField
                                        name={"tuesday"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Вторник"}
                                            />
                                        )}
                                    />
                                </CheckboxItem>
                                <CheckboxItem>
                                    <FormikFormField
                                        name={"wednesday"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Среда"}
                                            />
                                        )}
                                    />
                                </CheckboxItem>
                                <CheckboxItem>
                                    <FormikFormField
                                        name={"thursday"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Четверг"}
                                            />
                                        )}
                                    />
                                </CheckboxItem>
                                <CheckboxItem>
                                    <FormikFormField
                                        name={"friday"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Пятница"}
                                            />
                                        )}
                                    />
                                </CheckboxItem>
                                <CheckboxItem>
                                    <FormikFormField
                                        name={"saturday"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Суббота"}
                                            />
                                        )}
                                    />
                                </CheckboxItem>
                                <CheckboxItem>
                                    <FormikFormField
                                        name={"sunday"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Воскресенье"}
                                            />
                                        )}
                                    />
                                </CheckboxItem>
                            </Row>
                            {submitCount > 0 && (
                                <DaysOfWeekError>
                                    {errors.daysOfWeek}
                                </DaysOfWeekError>
                            )}
                        </Column>
                    </Row>
                )}
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"emailNotification"}
                            component={(props) => (
                                <Checkbox
                                    {...props}
                                    label={"Напоминание по E-mail"}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"comment"}
                            component={(props) => (
                                <InlineFormFieldTextarea
                                    {...props}
                                    label={"Комментарий:"}
                                    placeholder={"Введите комментарий"}
                                    type={"textarea"}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <Actions>
                            <Button
                                label={
                                    this.props.editingEvent
                                        ? "Сохранить"
                                        : "Добавить событие"
                                }
                                onClick={this.onSave}
                            />
                            <Button label={"Назад"} onClick={this.onClose} />
                        </Actions>
                    </Column>
                </Row>
            </FormWrapper>
        );
    }
}

const MobilePadding = styled.div`
    width: 100%;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-bottom: 16px;
    }
`;

const FormWrapper = styled.div``;

const Actions = styled.div`
    display: flex;
`;

const Or = styled.div`
    padding: 0;
    margin: -5px 0 10px 0;
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
        })};
`;

const CheckboxItem = styled.div`
    margin-right: 32px;

    &:last-child {
        margin-right: 0;
    }
`;

const MobileContainer = styled.div`
    width: 100%;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-bottom: 16px;
    }
`;

const DaysOfWeekError = styled.div`
    text-align: center;
    margin: 0 auto;
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorAlert,
        })};
`;

export default CalendarEventForm;
