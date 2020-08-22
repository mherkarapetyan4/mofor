import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import Required from "components/Required";
import { hasError } from "modules/hasError";

@hasError
class InlineFormFieldTextarea extends PureComponent {
    constructor(props) {
        super(props);
        this.labelRef = React.createRef();
        this.labelWidth = 0;
    }

    state = {
        focus: false,
    };

    componentDidMount() {
        this.labelWidth = this.labelRef.current.getBoundingClientRect().width;
        this.forceUpdate();
    }

    render() {
        const {
            label,
            disabled,
            placeholder,
            value,
            required,
            onBlur,
            onFocus,
            maxLength,
            height,
        } = this.props;
        const { focus } = this.state;

        return (
            <Wrapper focus={focus} disabled={disabled}>
                <Label ref={this.labelRef}>
                    {required && <Required />}
                    {label}
                </Label>
                <Field
                    labelRef={this.labelWidth}
                    onChange={(e) => this.onChange(e.target.value)}
                    disabled={disabled}
                    value={value}
                    onFocus={(e) => {
                        this.isFocused(true);
                        onFocus(e);
                    }}
                    onBlur={(e) => {
                        this.isFocused(false);
                        onBlur(e);
                    }}
                    placeholder={placeholder}
                    height={height}
                />
                {maxLength ? (
                    <Count>Осталось символов: {maxLength - value.length}</Count>
                ) : null}
            </Wrapper>
        );
    }

    isFocused = (type) => {
        this.setState({
            focus: type,
        });
    };

    onChange = (value) => {
        const { onChange } = this.props;
        onChange(value);
    };
}

const Count = styled.div`
    position: absolute;
    right: 3px;
    bottom: 3px;
    ${(props) => fontStyles(props, { size: props.theme.fonts.sizes.small })}
`;

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-start;
    border: 1px solid
        ${(props) =>
            props.disabled
                ? "transparent"
                : props.focus
                ? props.theme.colors.borderColorHover
                : props.theme.colors.borderColor};
    border-radius: 4px;
    padding: 11px 12px 21px 12px;
    transition: border ${(props) => props.theme.animations.transition};
    background-color: ${(props) =>
        props.disabled ? "transparent" : props.theme.colors.background.white};

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        border: ${(props) =>
            props.disabled
                ? "1px solid transparent"
                : `1px solid ${(props) =>
                      props.theme.colors.borderColorHover}`};
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
    position: absolute;
    left: 10px;
    background: #fff;
    padding: 5px;
    top: 7px;
`;

const Field = styled.textarea`
    resize: none;
    width: 100%;
    outline: none;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    border: none;
    background-color: ${(props) =>
        props.disabled ? "transparent" : props.theme.colors.background.white};
    padding: 0;
    height: ${(props) => props.height}px;
    text-indent: ${(props) => props.labelRef + 20 + "px"};
    line-height: ${(props) => props.theme.fonts.lineHeight.big};
    overflow-y: auto;
`;

InlineFormFieldTextarea.propTypes = {
    value: PropTypes.any,
    label: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    maxLength: PropTypes.number,
    height: PropTypes.number,
};

InlineFormFieldTextarea.defaultProps = {
    value: "",
    disabled: false,
    placeholder: "",
    required: false,
    onFocus: () => {},
    onBlur: () => {},
    maxLength: 0,
    height: 100,
};

export default InlineFormFieldTextarea;
