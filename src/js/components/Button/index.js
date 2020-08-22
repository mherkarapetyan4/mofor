import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { invert } from "polished";
import { fontStyles } from "styledMixins/mixins";

@withTheme
class Button extends PureComponent {
    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.element,
        ]).isRequired,
        onClick: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        textColor: PropTypes.string,
        borderColor: PropTypes.string,
        background: PropTypes.string,
        theme: PropTypes.object,
        active: PropTypes.bool,
        primary: PropTypes.bool,
        alert: PropTypes.bool,
        white: PropTypes.bool,
    };

    static defaultProps = {
        disabled: false,
    };

    render() {
        const {
            label,
            onClick,
            textColor,
            borderColor,
            background,
            disabled,
            active,
            primary,
            alert,
            white,
        } = this.props;

        return (
            <Btn
                onClick={disabled ? null : onClick}
                textColor={textColor}
                borderColor={borderColor}
                background={background}
                disabled={disabled}
                active={active}
                primary={primary}
                alert={alert}
                white={white}
            >
                {label}
            </Btn>
        );
    }
}

const renderColor = (props) => {
    if (props.disabled) return props.theme.colors.borderColor;
    if (props.active) return props.theme.colors.text.colorWhite;
    if (props.primary) return props.theme.userTheme.color;
    if (props.alert) return props.theme.colors.text.colorAlert;
    if (props.white) return props.theme.colors.text.colorWhite;
    return props.textColor || props.theme.colors.text.colorBlack;
};

const renderBorderColor = (props) => {
    if (props.disabled) return props.theme.colors.borderColor;
    if (props.primary) return props.theme.userTheme.color;
    if (props.alert) return props.theme.colors.text.colorAlert;
    if (props.white) return props.theme.colors.text.colorWhite;
    return props.borderColor || props.theme.userTheme.color;
};

const Btn = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.small,
        })};
    min-width: 100px;
    border-radius: 5px;
    border: 1px solid ${(props) => renderBorderColor(props)};
    color: ${(props) => renderColor(props)};
    text-align: center;
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-right: 16px;
    padding: 12px 20px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background: ${(props) =>
        props.active ? props.theme.userTheme.color : "transparent"};
    transition: background, border, color,
        ${(props) => props.theme.animations.transition};

    &:hover {
        background: ${(props) =>
            props.disabled ? "transparent" : renderBorderColor(props)};
        border: 1px solid
            ${(props) =>
                props.disabled
                    ? props.theme.colors.borderColor
                    : "transparent"};
        color: ${(props) =>
            props.disabled
                ? props.theme.colors.borderColor
                : invert(renderColor(props))};
    }

    &:last-child {
        margin-right: 0;
    }
`;

export { Button };
