import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import Required from "components/Required";
import { hasError } from "modules/hasError";
import InputMask from "react-input-mask";
import { issuerCode, maskChar, phoneMask, snilsMask } from "config/consts";

@hasError
class InlineFormField extends PureComponent {
    state = {
        focus: false,
    };

    componentDidMount() {
        if (this.fieldRef && this.props.focusOnLoad) {
            this.fieldRef.focus();
        }
    }

    render() {
        const {
            label,
            disabled,
            placeholder,
            value,
            onChange,
            required,
            type,
            error,
            maxLength,
        } = this.props;
        const { focus } = this.state;
        const commonParams = {
            disabled,
            type,
            value,
            onChange: (e) => onChange(e.target.value),
            onFocus: this.focusHandle,
            onBlur: this.blurHandle,
            placeholder,
        };
        if (maxLength) commonParams.maxLength = maxLength;
        return (
            <Wrapper focus={focus} disabled={disabled} error={error}>
                <Label>
                    {required && <Required />}
                    {label}
                </Label>
                {type === "phone" ? (
                    <InputMask
                        mask={phoneMask}
                        maskChar={maskChar}
                        {...commonParams}
                    >
                        {(inputProps) => (
                            <Field {...inputProps} {...commonParams} />
                        )}
                    </InputMask>
                ) : type === "issuerCode" ? (
                    <InputMask
                        mask={issuerCode}
                        maskChar={maskChar}
                        {...commonParams}
                    >
                        {(inputProps) => (
                            <Field {...inputProps} {...commonParams} />
                        )}
                    </InputMask>
                ) : type === "snils" ? (
                    <InputMask
                        mask={snilsMask}
                        maskChar={maskChar}
                        {...commonParams}
                    >
                        {(inputProps) => (
                            <Field {...inputProps} {...commonParams} />
                        )}
                    </InputMask>
                ) : (
                    <Field {...commonParams} ref={(e) => (this.fieldRef = e)} />
                )}
            </Wrapper>
        );
    }

    focusHandle = (e) => {
        this.props.onFocus(e);
        this.setState({
            focus: true,
        });
    };

    blurHandle = (e) => {
        this.props.onBlur(e);
        this.setState({
            focus: false,
        });
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
                : props.error
                ? props.theme.colors.text.colorAlert
                : props.theme.colors.borderColor};
    border-radius: 4px;
    padding: 11px 12px;
    background-color: ${(props) => (props.disabled ? "transparent" : "#fff")};
    transition: border ${(props) => props.theme.animations.transition};

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        border: 1px solid
            ${(props) =>
                props.disabled
                    ? "transparent"
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

const Field = styled.input.attrs((props) => ({
    type: props.type,
}))`
    width: 100%;
    outline: none;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    border: none;
    background-color: ${(props) =>
        props.disabled ? "transparent" : props.theme.colors.background.white};
`;

InlineFormField.propTypes = {
    type: PropTypes.oneOf(["email", "password", "text", "number", "phone"]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.bool,
    name: PropTypes.string,
    maxLength: PropTypes.number,
    focusOnLoad: PropTypes.bool,
};

InlineFormField.defaultProps = {
    type: "text",
    value: "",
    disabled: false,
    placeholder: "",
    required: false,
    onFocus: () => {},
    onBlur: () => {},
    onChange: () => {},
    name: "",
};

export default InlineFormField;
