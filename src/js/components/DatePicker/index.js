import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";
import { CALENDAR } from "config/consts";
import find from "lodash/find";
import range from "lodash/range";
import isEmpty from "lodash/isEmpty";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { Calendar } from "components/Calendar";
import Actions from "containers/Header/Actions";
import ArrowIcon from "icons/ArrowIcon";
import { fontStyles } from "styledMixins/mixins";
import { formatDate } from "utils/formatDate";

class DatePicker extends PureComponent {
    prev = [
        {
            icon: <ArrowIcon opacity={0.5} rotate={0} />,
            tooltip: "Предыдущий месяц",
            action: () => this.changeMonth(-1),
        },
    ];

    next = [
        {
            icon: <ArrowIcon opacity={0.5} rotate={180} />,
            tooltip: "Следующий месяц",
            action: () => this.changeMonth(1),
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            ...this.fillValues(props),
        };
    }

    fillValues = (props) => {
        if (!isEmpty(props.value)) {
            return {
                value: formatDate(props.value),
                currentMonth: dayjs(props.value).month(),
                currentYear: dayjs(props.value).year(),
            };
        }
        return {
            value: {},
            currentMonth: dayjs().month(),
            currentYear: dayjs().year(),
        };
    };

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (
            (isEmpty(this.props.value) && !isEmpty(nextProps.value)) ||
            (!isEmpty(this.props.value) &&
                !isEmpty(nextProps.value) &&
                !dayjs(this.props.value).isSame(nextProps.value, "day"))
        ) {
            this.setState({
                ...this.fillValues(nextProps),
            });
        } else if (!isEmpty(this.props.value) && isEmpty(nextProps.value)) {
            this.setState({
                ...this.fillValues(nextProps),
            });
        }
        if (this.props.open !== nextProps.open) {
            this.setState({ open: nextProps.open });
        }
    }

    static defaultProps = {
        value: dayjs(),
        maxDate: CALENDAR.maxDate,
        minDate: CALENDAR.minDate,
        disabled: false,
        isError: false,
        touched: false,
        error: "",
        open: false,
        onClose: () => {},
    };

    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        width: PropTypes.number,
        disabled: PropTypes.bool,
        isError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        touched: PropTypes.bool,
        error: PropTypes.string,
        open: PropTypes.bool,
        onClose: PropTypes.func,
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside, false);
    }

    onClickOutside = (e) => {
        if (!this.datepicker.contains(e.target)) {
            const { open } = this.state;
            if (open) {
                this.props.onClose();
            }
        }
    };

    toggle = () => {
        const { disabled } = this.props;
        if (!disabled) {
            this.setState({
                open: !this.state.open,
            });
        }
    };

    onClick = (item, e) => {
        const { onChange } = this.props;
        e.stopPropagation();
        if (!item.disabled) {
            onChange(item.day);
        }
    };

    renderItem = (item, index) => {
        const label = item.day.date();

        const col = (index % 7) + 1;
        let row = Math.floor(index / 7) + 1;

        return (
            <Cell
                key={`datepicker-${item.row}-item-${item.weekday}`}
                onClick={(e) => this.onClick(item, e)}
                isToday={item.day.isSame(dayjs(), "day")}
                isSelected={item.day.isSame(this.props.value, "day")}
                weekDay={item.weekday === 0 ? 7 : item.weekday}
                rowNumber={item.row + 1}
                disabled={item.disabled}
                row={row}
                col={col}
            >
                {label}
            </Cell>
        );
    };

    changeCurrentMonth = (value) => {
        this.setState({
            currentMonth: parseInt(value),
        });
    };

    changeCurrentYear = (value) => {
        this.setState({
            currentYear: parseInt(value),
        });
    };

    changeMonth = (direction) => {
        const { currentMonth, currentYear } = this.state;
        const month = currentMonth + direction;
        let newMonth,
            newYear = currentYear;
        if (month < 0) {
            newMonth = 11;
            newYear = currentYear - 1;
        } else if (month > 11) {
            newMonth = 0;
            newYear = currentYear + 1;
        } else {
            newMonth = month;
        }
        this.setState({
            currentMonth: newMonth,
            currentYear: newYear,
        });
    };

    renderPicker = () => {
        const { value, maxDate, minDate } = this.props;
        const { currentMonth, currentYear } = this.state;

        return (
            <DatePickerWrapper>
                <Calendar
                    height={"200px"}
                    renderContainer={(children) => (
                        <Container>{children}</Container>
                    )}
                    renderItem={(item, i) => this.renderItem(item, i)}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    currentDate={value}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </DatePickerWrapper>
        );
    };

    onChange = (e) => {
        const { onChange, disabled } = this.props;

        if (!disabled) {
            const value = e.target.value;
            if (value && value.indexOf("_") === -1) {
                const { maxDate, minDate } = this.props;
                let current;
                const arr = value.split(".");
                const momentValue = dayjs(new Date(arr[2], arr[1] - 1, arr[0]));
                if (momentValue.isValid()) {
                    if (momentValue.isBetween(minDate, maxDate, null, "[]")) {
                        current = momentValue;
                    } else if (momentValue.isBefore(minDate)) {
                        current = minDate;
                    } else if (momentValue.isAfter(maxDate)) {
                        current = maxDate;
                    } else {
                        current = dayjs();
                    }
                } else {
                    current = dayjs();
                }
                this.setState(
                    {
                        value: formatDate(current),
                    },
                    () => {
                        onChange(current);
                    },
                );
            } else {
                if (!value || value === "__.__.____")
                    this.setState({ value }, () => onChange(""));
                else this.setState({ value });
            }
        }
    };

    render() {
        const { maxDate, minDate } = this.props;
        const { currentMonth, currentYear } = this.state;
        const month = find(CALENDAR.months, { value: currentMonth });
        let selectMonth = CALENDAR.months;
        selectMonth.map((month) => (month.label = month.name));
        let years = range(maxDate.$y, minDate.$y).map((year) => ({
            label: year,
            value: year,
        }));
        years.push({ label: minDate.$y, value: minDate.$y });

        return (
            <Wrapper ref={(e) => (this.datepicker = e)}>
                <Controls>
                    <Prev>
                        <Actions items={this.prev} />
                    </Prev>
                    <Month>
                        <InlineFormFieldSelect
                            onChange={this.changeCurrentMonth}
                            options={selectMonth}
                            value={month}
                            label={month?.label}
                        />
                    </Month>
                    <Year>
                        <InlineFormFieldSelect
                            onChange={this.changeCurrentYear}
                            options={years}
                            value={currentYear}
                            yearsPicker={true}
                        />
                    </Year>
                    <Next>
                        <Actions items={this.next} />
                    </Next>
                </Controls>
                {this.renderPicker()}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    margin-top: 3px;
`;

const Cell = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    -ms-grid-column: ${(props) => props.col};
    -ms-grid-row: ${(props) => props.row};
    ${(props) => fontStyles(props)};
    color: ${(props) =>
        props.disabled
            ? "rgba(0,0,0,.5)"
            : props.isSelected
            ? props.theme.colors.text.colorWhite
            : props.theme.colors.text.colorBlack};
    border: 1px solid transparent;
    background-color: ${(props) =>
        props.isSelected ? props.theme.userTheme.color : "transparent"};
    border-radius: 4px;
    transition: border ${(props) => props.theme.animations.transition};

    &:hover {
        border: ${(props) =>
            props.disabled
                ? "1px solid transparent"
                : `1px solid ${props.theme.colors.borderColor}`};
    }
`;

const DatePickerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
`;

const Next = styled.div`
    flex: 0 0 auto;
`;

const Prev = styled.div`
    flex: 0 0 auto;
    margin-right: 3px;
`;

const Month = styled.div`
    flex: 1 1 auto;
    margin-right: 3px;
`;

const Year = styled.div`
    flex: 1 1 auto;
    margin-right: 3px;
`;

export default DatePicker;
