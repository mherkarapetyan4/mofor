import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import Required from "components/Required";
import ContextList from "components/ContextList";
import ArrowIcon from "icons/ArrowIcon";
import { hasError } from "modules/hasError";
import get from "lodash/get";

@hasError
class InlineFormFieldSelect extends PureComponent {
    state = {
        value: "",
        focus: false,
        isOpened: false,
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside, false);
    }

    render() {
        const {
            label,
            disabled,
            options,
            placeholder,
            value,
            onChange,
            required,
            defaultValue,
            yearsPicker,
        } = this.props;
        const { focus, isOpened } = this.state;

        const valueLabel = get(
            options.find((item) => item.value === value),
            "label",
            defaultValue,
        );

        const isValidValue = value || value === 0;

        return (
            <Wrapper
                focus={focus}
                disabled={disabled}
                onClick={!disabled ? this.toggleOpen : () => {}}
                ref={(e) => (this.input = e)}
            >
                {label && (
                    <Label>
                        {required && <Required />}
                        {label}
                    </Label>
                )}
                <Field disabled={disabled}>
                    <FieldValue>
                        {placeholder && !disabled && !isValidValue && (
                            <Placeholder>{placeholder}</Placeholder>
                        )}
                        {isValidValue && <Value>{valueLabel}</Value>}
                    </FieldValue>
                    <FieldIcon disabled={disabled}>
                        <ArrowIcon opacity={0.5} rotate={-90} />
                    </FieldIcon>
                </Field>
                <ContextList
                    onChange={(value, label) => {
                        this.toggleOpen();
                        onChange(value, label);
                    }}
                    isOpened={isOpened}
                    items={options}
                    yearsPicker={yearsPicker}
                    currentValue={value}
                />
            </Wrapper>
        );
    }

    toggleOpen = () => {
        this.setState({
            isOpened: !this.state.isOpened,
            focus: !this.state.focus,
        });
    };

    onClickOutside = (e) => {
        if (!this.input.contains(e.target)) {
            const { isOpened } = this.state;
            if (isOpened) {
                this.setState({
                    isOpened: false,
                });
            }
        }
    };
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
    padding: 11px 12px;
    transition: border ${(props) => props.theme.animations.transition};
    position: relative;
    background-color: ${(props) => (props.disabled ? "transparent" : "#fff")};
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

InlineFormFieldSelect.propTypes = {
    value: PropTypes.any,
    label: PropTypes.any,
    disabled: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.element,
                PropTypes.string,
            ]).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
                .isRequired,
        }),
    ).isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    defaultValue: PropTypes.string,
    yearsPicker: PropTypes.bool,
};

InlineFormFieldSelect.defaultProps = {
    value: "",
    disabled: false,
    placeholder: "",
    label: "",
    required: false,
    defaultValue: "",
};

export default InlineFormFieldSelect;
