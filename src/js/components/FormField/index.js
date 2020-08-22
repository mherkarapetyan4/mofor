import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { Select } from "components/Select";
import { hasError } from "modules/hasError";
import { maskChar, phoneMask } from "config/consts";
import InputMask from "react-input-mask";

@hasError
class FormField extends PureComponent {
    state = {
        textareaHeight: 0,
    };

    componentDidMount() {
        if (this.textareaRef) {
            this.setState({
                textareaHeight: this.textareaRef.scrollHeight + 2,
            });
        }
        if (this.textareaRef && this.props.focusOnLoad) {
            this.textareaRef.focus();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.textareaHeight === 0) {
            if (this.textareaRef) {
                this.setState({
                    textareaHeight: this.textareaRef?.scrollHeight + 2,
                });
            }
        }
    }

    render() {
        const { label, type, required, inline, disabled } = this.props;

        return (
            <Wrapper inline={inline}>
                <Label disabled={disabled} inline={inline} required={required}>
                    {label}
                </Label>
                {this.renderFieldType(type)}
            </Wrapper>
        );
    }

    renderFieldType = (type) => {
        const {
            value,
            disabled,
            onChange,
            onBlur,
            placeholder,
            options,
        } = this.props;
        const { textareaHeight } = this.state;

        switch (type) {
            case "textarea":
                return (
                    <TextArea
                        height={textareaHeight}
                        onChange={onChange}
                        onKeyDown={this.handleHeightUpdate}
                        ref={(e) => (this.textareaRef = e)}
                        disabled={disabled}
                        type={type}
                        value={value}
                        onBlur={() => onBlur(true)}
                    />
                );
            case "input":
                return (
                    <Field
                        disabled={disabled}
                        type={type}
                        value={value}
                        onChange={onChange}
                    />
                );
            case "select":
                return (
                    <Select
                        type={type}
                        elements={options}
                        value={value}
                        name={"form_select"}
                        onChange={onChange}
                        disabled={disabled}
                    />
                );
            case "element":
                return value;
            case "text":
                return <Text>{value}</Text>;
            case "phone":
                return (
                    <InputMask
                        mask={phoneMask}
                        maskChar={maskChar}
                        disabled={disabled}
                        value={value}
                        onChange={onChange}
                    >
                        {(inputProps) => (
                            <Field
                                {...inputProps}
                                disabled={disabled}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    </InputMask>
                );
            default:
                return (
                    <Field
                        placeholder={placeholder}
                        disabled={disabled}
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={() => onBlur(true)}
                    />
                );
        }
    };

    handleHeightUpdate = () => {
        this.setState({
            textareaHeight: this.textareaRef.scrollHeight + 2,
        });
    };
}

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: ${(props) => (props.inline ? "row" : "column")};
    align-items: ${(props) => (props.inline ? "center" : "flex-start")};

    &:last-child {
        margin-bottom: 0;
    }
`;

const Label = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: ${(props) => (props.inline ? "0" : "7px")};
    padding-left: ${(props) => (props.disabled ? "0" : "13px")};
    ${(props) =>
        props.required &&
        `&:before {
            content: '*';
            color: #B63737;
            display: inline;
        }`}
`;

const Field = styled.input`
    width: 100%;
    outline: none;
    ${(props) =>
        fontStyles(props, {
            color: props.disabled
                ? props.theme.colors.text.colorBlack
                : props.theme.colors.text.colorBlack,
        })};
    padding: ${(props) => (props.disabled ? "10px 0" : "10px 12px")};
    border-radius: 4px;
    border: ${(props) =>
        props.disabled
            ? "1px solid transparent"
            : `1px solid ${props.theme.colors.borderColor}`};
    background-color: ${(props) => (props.disabled ? "transparent" : "#fff")};
`;

const TextArea = styled.textarea`
    width: 100%;
    outline: none;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    padding: ${(props) => (props.disabled ? "10px 0" : "10px 12px")};
    border-radius: 4px;
    border: ${(props) =>
        props.disabled
            ? "1px solid transparent"
            : `1px solid ${props.theme.colors.borderColor}`};
    background-color: ${(props) => (props.disabled ? "transparent" : "#fff")};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    resize: none;
    height: ${(props) => props.height + "px" || "100px"};
    overflow-y: hidden;
`;

FormField.propTypes = {
    value: PropTypes.any,
    placeholder: PropTypes.string,
    label: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["textarea", "input", "element", "text"]),
    required: PropTypes.bool,
    inline: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func.isRequired,
    options: PropTypes.array,
    focusOnLoad: PropTypes.bool,
};

FormField.defaultProps = {
    value: "",
    disabled: false,
    required: false,
    type: "input",
    inline: false,
    onChange: () => {},
    onBlur: () => {},
};

export default FormField;
