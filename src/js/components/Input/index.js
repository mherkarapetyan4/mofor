import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { fontStyles } from "styledMixins/mixins";
import styled from "styled-components";
const Field = styled.input`
    width: 100%;
    outline: none;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    border: none;
    background-color: ${(props) => props.theme.colors.background.white};
`;
class Input extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(["password", "submit", "text", "textarea"]),
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        onChange: PropTypes.func.isRequired,

        onFocus: PropTypes.func,
        onKeyDown: PropTypes.func,
        onBlur: PropTypes.func,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
    };

    static defaultProps = {
        type: "text",
        placeholder: "",
        onFocus: () => {},
        onBlur: () => {},
        disabled: false,
        readOnly: false,
    };

    onChange = (e) => {
        const { onChange } = this.props;
        onChange(e.target.value);
    };
    onKeyDown = (e) => {
        const { onKeyDown } = this.props;
        onKeyDown(e);
    };

    render() {
        const {
            type,
            name,
            placeholder,
            value,
            disabled,
            onBlur,
            onFocus,
            readOnly,
            onKeyDown,
        } = this.props;

        const params = {
            id: name,
            name,
            value,
            onKeyDown,
            placeholder,
            disabled,
            onFocus,
            onBlur,
            onChange: this.onChange,
            readOnly,
        };

        return (
            <>
                {type === "textarea" ? (
                    <textarea {...params} />
                ) : (
                    <Field {...params} type={type} />
                )}
            </>
        );
    }
}

export { Input };
