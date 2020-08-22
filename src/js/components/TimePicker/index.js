import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClockIcon from "components/Icons/ClockIcon";
import fill from "lodash/fill";
import { fontStyles } from "styledMixins/mixins";
import FloatWrapper from "containers/FloatWrapper";
import ArrowIcon from "icons/ArrowIcon";

const hoursArr = fill(new Array(24), 0).map((item, i) => {
    if (i < 10) {
        return `0${i}`;
    }
    return `${i}`;
});
const minutesArr = fill(new Array(60), 0).map((item, i) => {
    if (i < 10) {
        return `0${i}`;
    }
    return `${i}`;
});

class TimePicker extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            value: props.value,
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside, false);
    }

    static defaultProps = {
        elementsCount: 5,
        name: "",
        disabled: false,
    };

    static propTypes = {
        value: PropTypes.string.isRequired,
        elementsCount: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string,
        theme: PropTypes.object,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    renderItem = (item, type, isCenter) => {
        const key = `${type}-${item}`;
        if (isCenter) {
            return <SelectedItem key={key}>{item}</SelectedItem>;
        }
        return <Item key={key}>{item}</Item>;
    };

    renderList = (value, list) => {
        const { elementsCount } = this.props;
        const type = list.length === 24 ? "hour" : "minute";
        const center = Math.floor(elementsCount / 2);
        const index = list.indexOf(value);
        const offset = (elementsCount - 1) / 2;
        const arr = new Array(elementsCount).fill(0).map((item, i) => {
            const current = index - offset + i;
            if (current < 0) {
                return list[list.length + current];
            } else if (
                (type === "hour" && current > 23) ||
                (type === "minute" && current > 59)
            ) {
                return list[current - list.length];
            }
            return list[current];
        });
        return arr
            .reverse()
            .map((item, i) => this.renderItem(item, type, center === i));
    };

    onChangeHour = (direction, hour, minute) => {
        const index = hoursArr.indexOf(hour);
        let newValue;
        if (direction > 0 && index === 23) {
            newValue = hoursArr[0];
        } else if (direction < 0 && index === 0) {
            newValue = hoursArr[hoursArr.length - 1];
        } else {
            newValue = hoursArr[index + direction];
        }
        const { onChange, name } = this.props;
        const value = `${newValue}:${minute}`;
        this.setState(
            {
                value,
            },
            () => onChange(value, name),
        );
    };

    onChangeMinute = (direction, hour, minute) => {
        const index = minutesArr.indexOf(minute);
        let newValue;
        if (direction > 0 && index === 59) {
            newValue = minutesArr[0];
        } else if (direction < 0 && index === 0) {
            newValue = minutesArr[minutesArr.length - 1];
        } else {
            newValue = minutesArr[index + direction];
        }
        const { onChange, name } = this.props;
        const value = `${hour}:${newValue}`;
        this.setState(
            {
                value,
            },
            () => onChange(value, name),
        );
    };

    onClickOutside = (e) => {
        if (!this.timepicker.contains(e.target)) {
            const { show } = this.state;
            if (show) {
                this.setState({
                    show: false,
                });
            }
        }
    };

    onChange = (e) => {
        const value = e.target.value;
        if (value && value.indexOf("_") === -1) {
            const splitValue = value.split(":");
            let hour = splitValue[0];
            let minute = splitValue[1];
            if (Number(hour) > 23) {
                hour = hoursArr[hoursArr.length - 1];
            }
            if (Number(minute) > 59) {
                minute = minutesArr[minutesArr.length - 1];
            }
            const v = `${hour}:${minute}`;
            const { onChange, name } = this.props;
            this.setState(
                {
                    value: v,
                },
                () => onChange(v, name),
            );
        } else {
            this.setState({ value });
        }
    };

    render() {
        // if (!this.props.value) return null
        const { show } = this.state;
        const { label, disabled, placeholder, value: propValue } = this.props;
        const valueArr = this.props.value.split(":");
        const hour = valueArr[0];
        const minute = valueArr[1];

        return (
            <Wrapper ref={(e) => (this.timepicker = e)} disabled={disabled}>
                <LabelWrapper onClick={() => this.setState({ show: !show })}>
                    <Label>{label}</Label>
                    <Field>
                        {/*<InputMask*/}
                        {/*    value={this.state.value}*/}
                        {/*    onChange={this.onChange}*/}
                        {/*    mask="99:99"*/}
                        {/*    maskChar="_"*/}
                        {/*/>*/}
                        <FieldValue>
                            {propValue && placeholder && (
                                <Value>
                                    {hour}:{minute}
                                </Value>
                            )}
                            {placeholder && !propValue && (
                                <Placeholder>{placeholder}</Placeholder>
                            )}
                        </FieldValue>
                        <FieldIcon>
                            <ClockIcon opacity={0.5} />
                        </FieldIcon>
                    </Field>
                </LabelWrapper>
                <FloatWrapper isOpened={show} autoHeight>
                    <CounterWrapper>
                        <ElementContainer>
                            <Action
                                onClick={() =>
                                    this.onChangeHour(1, hour, minute)
                                }
                            >
                                <ArrowIcon opacity={0.5} rotate={90} />
                            </Action>
                            {this.renderList(hour, hoursArr)}
                            <Action
                                onClick={() =>
                                    this.onChangeHour(-1, hour, minute)
                                }
                            >
                                <ArrowIcon opacity={0.5} rotate={-90} />
                            </Action>
                        </ElementContainer>
                        <ElementContainer>
                            <Action
                                onClick={() =>
                                    this.onChangeMinute(1, hour, minute)
                                }
                            >
                                <ArrowIcon opacity={0.5} rotate={90} />
                            </Action>
                            {this.renderList(minute, minutesArr)}
                            <Action
                                onClick={() =>
                                    this.onChangeMinute(-1, hour, minute)
                                }
                            >
                                <ArrowIcon opacity={0.5} rotate={-90} />
                            </Action>
                        </ElementContainer>
                    </CounterWrapper>
                </FloatWrapper>
            </Wrapper>
        );
    }
}

const LabelWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 11px 12px;
`;

const Label = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    flex-shrink: 0;
    margin-right: 10px;
`;

const Field = styled.div`
    width: 100%;
    outline: none;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    border: none;
    background-color: ${(props) =>
        props.disabled ? "transparent" : props.theme.colors.background.white};
    display: flex;
    align-items: center;
`;

const FieldValue = styled.div`
    flex: 1;
`;

const Placeholder = styled.div`
    flex: 1;
`;

const Value = styled.div`
    flex: 1;
`;

const FieldIcon = styled.div`
    width: 16px;
    height: 16px;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const ElementContainer = styled.div`
    flex-direction: column;
    display: flex;
    padding: 3px;
`;

const Item = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    cursor: initial;
`;

const SelectedItem = styled(Item)`
    background-color: ${(props) => props.theme.colors.borderColor};
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid
        ${(props) =>
            props.disabled
                ? "transparent"
                : props.focus
                ? props.theme.colors.borderColorHover
                : props.theme.colors.borderColor};
    border-radius: 4px;
    transition: border ${(props) => props.theme.animations.transition};
    position: relative;
    background-color: ${(props) =>
        props.disabled ? "transparent" : props.theme.colors.background.white};
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        border: 1px solid
            ${(props) =>
                props.disabled
                    ? " transparent"
                    : props.theme.colors.borderColorHover};
    }
`;

const Action = styled.div`
    width: 60px;
    height: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color ${(props) => props.theme.animations.transition};

    &:hover {
        background-color: ${(props) => props.theme.colors.borderColor};
    }
`;

const CounterWrapper = styled.div`
    display: flex;
`;

export default TimePicker;
