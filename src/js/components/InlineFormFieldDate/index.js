import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import DateIcon from "icons/DateIcon";
import DatePicker from "components/DatePicker";
import FloatWrapper from "containers/FloatWrapper";
import { formatDate } from "utils/formatDate";
import Required from "components/Required";
import { hasError } from "modules/hasError";
import { CALENDAR } from "config/consts";

@hasError
class InlineFormFieldDate extends PureComponent {
    state = {
        focus: false,
        isOpened: false,
    };

    toggleOpen = () => {
        this.setState((state) => ({
            isOpened: !state.isOpened,
            focus: !state.focus,
        }));
    };

    onClose = () => {
        this.setState({
            focus: false,
            isOpened: false,
        });
    };

    onChange = (value) => {
        this.props.onChange(value);
        this.toggleOpen();
    };

    render() {
        const {
            label,
            disabled,
            placeholder,
            value: propValue,
            required,
            popupPosition,
            minDate,
            maxDate,
        } = this.props;

        const { focus, isOpened } = this.state;
        return (
            <Wrapper focus={focus} disabled={disabled}>
                <LabelWrapper onClick={disabled ? () => {} : this.toggleOpen}>
                    <Label>
                        {required && <Required />}
                        {label}
                    </Label>
                    <Field>
                        <FieldValue>
                            {propValue && (
                                <Value>{formatDate(propValue)} г.</Value>
                            )}
                            {placeholder && !propValue && (
                                <Placeholder>{placeholder}</Placeholder>
                            )}
                        </FieldValue>
                        <FieldIcon disabled={disabled}>
                            <DateIcon opacity={0.5} />
                        </FieldIcon>
                    </Field>
                </LabelWrapper>
                <FloatWrapper
                    isOpened={isOpened}
                    autoHeight
                    height={"auto"}
                    globalPosition={popupPosition}
                >
                    <DatePicker
                        onChange={this.onChange}
                        open={isOpened}
                        onClose={this.onClose}
                        value={propValue}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </FloatWrapper>
            </Wrapper>
        );
    }
}

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
    cursor: ${(props) => (props.disabled ? "initial" : "pointer")};

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

const LabelWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 11px 12px;
`;

const FieldIcon = styled.div`
    width: 16px;
    height: 16px;
    display: ${(props) => (props.disabled ? "none" : "block")};

    svg {
        width: 100%;
        height: 100%;
    }
`;

const Placeholder = styled.div`
    flex: 1;
`;

const Value = styled.div`
    flex: 1;
`;

InlineFormFieldDate.propTypes = {
    value: PropTypes.any,
    label: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    popupPosition: PropTypes.oneOf(["top", "bottom"]),
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
};

InlineFormFieldDate.defaultProps = {
    value: "",
    disabled: false,
    placeholder: "",
    required: false,
    popupPosition: "bottom",
    maxDate: CALENDAR.maxDate,
    minDate: CALENDAR.minDate,
};

export default InlineFormFieldDate;
