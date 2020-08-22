import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CheckIcon from "icons/CheckIcon";
import { fontStyles } from "styledMixins/mixins";
import { hasError } from "modules/hasError";

@hasError
class Checkbox extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        label: PropTypes.string,
        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        value: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        label: "",
        disabled: false,
        checked: false,
        onChange: () => {},
    };

    onChange = () => {
        const { value, onChange } = this.props;
        onChange(!value);
    };

    render() {
        const { name, label, value, disabled } = this.props;
        return (
            <Wrapper checked={value}>
                <OldCheckbox>
                    {!disabled && (
                        <input
                            type="checkbox"
                            id={name}
                            name={name}
                            onChange={this.onChange}
                            checked={value}
                        />
                    )}
                </OldCheckbox>
                <StyledCheckbox checked={value} onClick={this.onChange}>
                    {value && <CheckIcon color={"#fff"} />}
                </StyledCheckbox>
                <Label htmlFor={name}>{label}</Label>
            </Wrapper>
        );
    }
}

const StyledCheckbox = styled.div`
    flex: 0 0 auto;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid
        ${(props) =>
            props.checked ? "transparent" : props.theme.colors.borderColor};
    line-height: 0;
    width: 19px;
    height: 19px;
    background: ${(props) =>
        props.checked ? props.theme.userTheme.color : "transparent"};
    transition: border, background,
        ${(props) => props.theme.animations.transition};

    svg {
        width: 100%;
        height: 100%;
    }
`;

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        ${StyledCheckbox} {
            border: 1px solid
                ${(props) =>
                    props.checked
                        ? "transparent"
                        : props.theme.colors.borderColorHover};
        }
    }
`;

const OldCheckbox = styled.div`
    position: absolute;
    left: -10000px;
    opacity: 0;
`;

const Label = styled.label`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    cursor: pointer;
    user-select: none;
`;

export { Checkbox };
