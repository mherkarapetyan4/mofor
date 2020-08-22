/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Row from "containers/Row";
import Column from "containers/Column";
import FlatPopup from "components/FlatPopup";
import InlineFormField from "components/InlineFormField";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import WidgetBlock from "components/WidgetBlock";
import { Radio } from "components/Radio";
import { Checkbox } from "components/Checkbox";
import styled from "styled-components";
import CoursePlanner from "components/CoursePlanner";
import { Button } from "components/Button";
import ScrollBar from "components/ScrollBar";
import { Desktop, Tablet } from "wrappers/responsive";
import { withRouter } from "react-router-dom";
import get from "lodash/get";
import { form } from "wrappers/Formik";
import {
    courseFields,
    validate,
} from "pages/Pillbox/PillboxMedicationCourse/meta";
import { FormikFormField } from "wrappers/Formik/FormField";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import {
    getDrugFormDosingUnit,
    getDosingUnitlist,
    getCourseDetails,
    savePillboxDrug,
} from "actions/pillbox";
import { sendForm } from "utils/sendForm";
import dayjs from "dayjs";
import { CALENDAR, courseConditions } from "config/consts";
import { Calendar } from "components/Calendar";
import { serverFormatDate } from "utils/formatDate";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import CalendarCell from "components/Calendar/CalendarCell";
import MonthSwitch from "components/MonthSwitch";
import { fontStyles } from "styledMixins/mixins";

const conditions = [
    {
        value: "BEFORE_EATING",
        label: "Перед едой",
    },
    {
        value: "WHILE_EATING",
        label: "Во время еды",
    },
    {
        value: "AFTER_EATING",
        label: "После еды",
    },
    {
        value: "NOT_MATTER",
        label: "Не важно",
    },
];

const NOT_MATTER = conditions[3].value;
const sheduleValue = courseConditions[2].value;

@form({
    fields: courseFields,
    validate,
})
@withRouter
@connect(
    (state) => ({
        drugFormDosing: state.pillbox.drugFormDosing,
        dosingUnitList: state.pillbox.dosingUnitList,
        courseDetails: state.pillbox.courseDetails,
        profileId: get(state.pillbox.currentPillbox, "profile.id", 0),
    }),
    {
        getDrugFormDosingUnit,
        getDosingUnitlist,
        getCourseDetails,
        savePillboxDrug,
    },
)
@hasHistoryState(LK_MENU_ELEMENTS.MEDICINES_PAGE.path)
class PillboxMedicationCourse extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        drugFormDosing: PropTypes.object.isRequired,
        dosingUnitList: PropTypes.array.isRequired,
        courseDetails: PropTypes.object.isRequired,
        getDrugFormDosingUnit: PropTypes.func.isRequired,
        getDosingUnitlist: PropTypes.func.isRequired,
        getCourseDetails: PropTypes.func.isRequired,
        savePillboxDrug: PropTypes.func.isRequired,
        isCalendar: PropTypes.bool,
        id: PropTypes.number,
        profileId: PropTypes.number.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFieldValue: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        setFormValues: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
    };

    static defaultProps = {
        isCalendar: false,
        id: null,
    };

    state = {
        currentDate: dayjs(),
        currentYear: dayjs().get("year"),
        currentMonth: dayjs().get("month"),
    };

    componentDidMount() {
        const {
            dosingUnitList,
            getDosingUnitlist,
            location,
            getCourseDetails,
        } = this.props;
        if (isEmpty(dosingUnitList)) {
            getDosingUnitlist();
        }
        const id = get(location, "state.id");
        if (id) {
            getCourseDetails(id);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.values.dates.length !== this.props.values.dates.length) {
            let fromDate = null,
                duration = "",
                formatedDates = [];
            if (this.props.values.dates.length) {
                duration = 0;
                fromDate = this.props.values.dates[0];
                this.props.values.dates.map((date) => {
                    duration += 1;
                    if (dayjs(date).isBefore(fromDate, "date")) fromDate = date;
                    formatedDates.push(dayjs(date));
                });
            }
            this.props.setFormValues({
                duration,
                fromDate,
                daysInterval: this.props.values.daysInterval
                    ? this.props.values.daysInterval
                    : 0,
                dates: formatedDates,
            });
        }
        if (
            isEmpty(prevProps.courseDetails) &&
            !isEmpty(this.props.courseDetails)
        ) {
            const {
                id,
                dose,
                fromDate,
                duration,
                daysInterval,
                intakeCondition,
                dates,
                time,
            } = this.props.courseDetails;
            this.props.changeInitialValues({
                id,
                "dose.size": get(dose, "size", ""),
                "dose.unit.id": get(dose, "unit.id", ""),
                fromDate: fromDate ? dayjs(fromDate) : null,
                duration,
                daysInterval,
                intakeCondition,
                dates,
                time,
            });
        }
        if (
            ((prevProps.values.daysInterval === sheduleValue &&
                this.props.values.daysInterval !== sheduleValue) ||
                (prevProps.values.daysInterval !== sheduleValue &&
                    this.props.values.daysInterval === sheduleValue)) &&
            prevProps.values.daysInterval !== ""
        ) {
            this.props.setFormValues({
                duration: "",
                fromDate: null,
                dates: [],
            });
        }
    }

    onSave = () => {
        sendForm(this.props, courseFields).then((response) => {
            const {
                savePillboxDrug,
                profileId,
                location,
                history,
            } = this.props;
            const drug = get(location, "state.drug");
            savePillboxDrug({
                params: {
                    ...response,
                    dates: response.dates.map((e) => serverFormatDate(e)),
                    profileId,
                    drug,
                },
                handleHide: () =>
                    history.push({
                        pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}`,
                        state: { tab: "myDrugs" },
                    }),
                isCalendar: false,
            });
        });
    };

    render() {
        return (
            <FlatPopup
                title={"Курс приема лекарственного средства"}
                backLocation={
                    this.props?.history?.location?.state?.sourceType
                        ? "/calendar"
                        : "/medicine"
                }
                locationState={{ tab: "myDrugs" }}
            >
                {/* <Row fullPage>
                    <Column fixed={500} paddings={0}>
                        <Desktop>
                            <ScrollBar>{this.renderForm()}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderForm()}</Tablet>
                    </Column>
                    <Column auto paddingRight={0} mobilePaddingLeft={0}>
                        <Desktop>
                            <ScrollBar>
                                <WidgetBlock title={"Время приема"}>
                                    {this.renderPlanner()}
                                </WidgetBlock>
                            </ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderPlanner()}</Tablet>
                    </Column>
                </Row> */}
                <Desktop>
                    <ScrollBar>
                        <Row fullPage>
                            <Column fixed={500} paddings={0}>
                                {this.renderForm()}
                            </Column>
                            <Column
                                basis-0
                                auto
                                paddingRight={0}
                                mobilePaddingLeft={0}
                            >
                                <WidgetBlock title={"Время приема"}>
                                    {this.renderPlanner()}
                                </WidgetBlock>
                            </Column>
                        </Row>
                    </ScrollBar>
                </Desktop>
                <Tablet>
                    <Row fullPage>
                        <Column fixed={500} paddings={0}>
                            {this.renderForm()}
                        </Column>
                        <Column auto paddingRight={0} mobilePaddingLeft={0}>
                            {this.renderPlanner()}
                        </Column>
                    </Row>
                </Tablet>
            </FlatPopup>
        );
    }

    onChangeConditions = (value, field, onChange) => {
        const { intakeCondition } = this.props.values;
        if (value) {
            if (field === NOT_MATTER) {
                onChange([field]);
            } else {
                onChange([
                    field,
                    ...intakeCondition.filter((e) => e !== NOT_MATTER),
                ]);
            }
        } else {
            onChange(intakeCondition.filter((e) => e !== field));
        }
    };

    onChangeDates = (date) => {
        const { setFieldValue, values } = this.props;
        const index = values.dates.findIndex((e) => e.isSame(date, "date"));
        if (index === -1) {
            setFieldValue("dates", [...values.dates, date]);
        } else {
            setFieldValue("dates", [
                ...values.dates.filter((e) => !e.isSame(date, "date")),
            ]);
        }
    };

    renderCalendarItem = (item, i) => {
        const { values } = this.props;
        const isSelected = values.dates.some((e) =>
            dayjs(e).isSame(item.day, "date"),
        );
        const isDisabled = item.disabled;
        return (
            <CalendarCell
                index={i}
                key={i}
                data={{ ...item, selected: isSelected, disabled: isDisabled }}
                onClick={() =>
                    isDisabled || !item.currentMonth
                        ? {}
                        : this.onChangeDates(item.day)
                }
                hideEvents={true}
            />
        );
    };

    renderForm = () => {
        const { location, values, dosingUnitList } = this.props;
        const { currentDate, currentMonth, currentYear } = this.state;

        const isSchedule = values.daysInterval === sheduleValue;

        return (
            <>
                <WidgetBlock
                    title={
                        values.id
                            ? "Редактирование лекарственного курса"
                            : "Новый курс лекарства"
                    }
                >
                    <FieldsWrapper>
                        <FieldGroup>
                            <Field>
                                <InlineFormField
                                    label={"Название:"}
                                    value={get(location, "state.drug.name", "")}
                                    disabled
                                />
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
                            <Field>
                                <FormikFormField
                                    name={"dose.size"}
                                    component={(props) => (
                                        <InlineFormField
                                            {...props}
                                            label={"Разовый прием:"}
                                            placeholder={"Кол-во лекарства"}
                                            type={"number"}
                                        />
                                    )}
                                />
                            </Field>
                            <Field>
                                <FormikFormField
                                    name={"dose.unit.id"}
                                    component={(props) => (
                                        <InlineFormFieldSelect
                                            required
                                            {...props}
                                            options={dosingUnitList}
                                            label={"Единица лек. средства:"}
                                        />
                                    )}
                                />
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
                            <Field>
                                <FormikFormField
                                    name={"fromDate"}
                                    component={(props) => (
                                        <InlineFormFieldDate
                                            required
                                            label={"Дата первого приема:"}
                                            {...props}
                                            disabled={isSchedule}
                                        />
                                    )}
                                />
                            </Field>
                            <Field>
                                <FormikFormField
                                    name={"duration"}
                                    component={(props) => (
                                        <InlineFormField
                                            {...props}
                                            label={"Кол-во дней:"}
                                            placeholder={"Кол-во дней приема"}
                                            disabled={isSchedule}
                                            type={"number"}
                                        />
                                    )}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldsWrapper>
                </WidgetBlock>
                <Row>
                    <Column fraction={6} paddings={0}>
                        <WidgetBlock title={"Дни приема"}>
                            <RadioContainer>
                                <FormikFormField
                                    name={"daysInterval"}
                                    component={(props) => (
                                        <Radio
                                            elements={courseConditions}
                                            name={"daysInterval"}
                                            {...props}
                                        />
                                    )}
                                />
                            </RadioContainer>
                        </WidgetBlock>
                    </Column>
                    <Column fraction={6} paddingRight={0}>
                        <WidgetBlock title={"Условия приема"}>
                            <CheckboxContainer>
                                <CheckboxWrapper>
                                    <FormikFormField
                                        name={"intakeCondition"}
                                        type={"array"}
                                        component={(props) =>
                                            conditions.map(
                                                ({ value, label }) => (
                                                    <CheckboxItem
                                                        key={`checkbox-${value}`}
                                                    >
                                                        <Checkbox
                                                            name={value}
                                                            {...props}
                                                            label={label}
                                                            onChange={(
                                                                checked,
                                                            ) => {
                                                                this.onChangeConditions(
                                                                    checked,
                                                                    value,
                                                                    props.onChange,
                                                                );
                                                            }}
                                                            value={values.intakeCondition.some(
                                                                (item) =>
                                                                    item ===
                                                                    value,
                                                            )}
                                                        />
                                                    </CheckboxItem>
                                                ),
                                            )
                                        }
                                    />
                                </CheckboxWrapper>
                            </CheckboxContainer>
                        </WidgetBlock>
                    </Column>
                </Row>
                {isSchedule && (
                    <Row>
                        <MonthSwitch
                            hideToday
                            onChange={(direction) =>
                                this.onClickArrow(direction)
                            }
                            tooltip={"месяц"}
                            data={{
                                month: CALENDAR.months.find(
                                    (e) => e.value === currentMonth,
                                ).name,
                                year: currentYear,
                            }}
                        />
                        <Calendar
                            currentMonth={currentDate.get("month")}
                            currentYear={currentDate.get("year")}
                            renderItem={(item, i) =>
                                this.renderCalendarItem(item, i)
                            }
                            rerenderKey={values.dates}
                        />
                    </Row>
                )}
                <ButtonWrapper>
                    <Button label={"Сохранить"} onClick={this.onSave} />
                </ButtonWrapper>
            </>
        );
    };

    renderPlanner = () => {
        const { values, setFieldValue, errors } = this.props;
        return (
            <PlannerWrapper>
                <CoursePlanner
                    times={values.time}
                    onChange={(newTimes) => setFieldValue("time", newTimes)}
                />
                <FormikFormField
                    name={"time"}
                    component={(props) => (
                        <Wrapper>
                            {isEmpty(props.value) &&
                                props.meta.touched &&
                                errors.time}
                        </Wrapper>
                    )}
                />
            </PlannerWrapper>
        );
    };

    onClickArrow = (direction) => {
        const { currentMonth, currentYear } = this.state;

        const type = direction === "add" ? 1 : -1;

        const abstactDate = dayjs()
            .set("month", currentMonth)
            .set("year", currentYear)
            .add(type, "month");

        this.setState((state) => ({
            currentDate: state.currentDate.add(
                direction === "add" ? 1 : -1,
                "month",
            ),
            currentMonth: abstactDate.get("month"),
            currentYear: abstactDate.get("year"),
        }));
    };
}

const PlannerWrapper = styled.div`
    width: 100%;
`;

const Wrapper = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorAlert })};
    margin-top: 5px;
`;

const CheckboxItem = styled.div`
    margin-bottom: 10px;
`;

const CheckboxContainer = styled.div``;

const RadioContainer = styled.div``;

const CheckboxWrapper = styled.div`
    margin-bottom: 16px;
    line-height: 0;
`;

const Field = styled.div`
    flex: 1 1 auto;
    width: 100%;
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const FieldsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    display: flex;
    margin-bottom: 16px;
`;

export default PillboxMedicationCourse;
