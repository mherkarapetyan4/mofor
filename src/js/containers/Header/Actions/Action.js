/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { rgba } from "polished";
import Tooltip from "react-tooltip-lite";
import { connect } from "react-redux";

const actionAnimation = keyframes`
  0% {
    transform: scale(.3);
  }
  
  50% {
    transform: scale(1);
    opacity: .7;
  }

  100% {
    transform: scale(1.3);
    opacity: 0;
  }
`;

@connect()
class Action extends PureComponent {
    constructor(props) {
        super(props);
        this.actionRef = React.createRef();
    }

    render() {
        const {
            tooltipTitle,
            icon,
            onClick,
            important,
            active,
            id,
            disabled,
            staticColor,
        } = this.props;

        return (
            <Wrapper>
                <Tooltip
                    content={tooltipTitle || ""}
                    background={tooltipTitle ? "rgba(0,0,0,.8)" : "transparent"}
                >
                    {/*на onClick возвращаем позицию иконки по X и Y*/}
                    <ActionWrapper
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClick({
                                x: this.actionRef.current.getBoundingClientRect()
                                    .left,
                                y: this.actionRef.current.getBoundingClientRect()
                                    .top,
                                id: id,
                            });
                        }}
                        important={important}
                        disabled={disabled}
                        ref={this.actionRef}
                    >
                        <AnimationWrapper
                            important={important}
                            staticColor={staticColor}
                        >
                            <div />
                            <div />
                        </AnimationWrapper>
                        <ActionIcon
                            staticColor={staticColor}
                            important={important}
                            active={active}
                            disabled={disabled}
                        >
                            {icon}
                        </ActionIcon>
                    </ActionWrapper>
                </Tooltip>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    margin-right: 10px;
    &:last-child {
        margin-right: 0;
    }
`;

const ActionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
    border-radius: 5px;
    width: 36px;
    height: 36px;
    transition: background-color ${(props) => props.theme.animations.transition};
    position: relative;

    &:hover {
        background-color: ${(props) =>
            props.disabled ? "transparent" : rgba(0, 0, 0, 0.1)};

        svg {
            fill-opacity: ${(props) => (props.disabled ? 0.3 : 1)};
        }
    }
`;

const ActionIcon = styled.div`
    width: 24px;
    height: 24px;

    svg {
        fill: ${(props) => {
            if (props.disabled) return props.theme.colors.text.colorBlack;
            if (props.staticColor) return "";
            if (props.important || props.active)
                return props.theme.userTheme.color;
        }};
        fill-opacity: ${(props) => {
            if (props.disabled) return 0.3;
            if (props.staticColor) return "";
            if (props.important || props.active) return 1;
        }};
        width: 100%;
        height: 100%;
        transition: fill-opacity ${(props) => props.theme.animations.transition};
    }
`;

const AnimationWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    div {
        position: absolute;
        opacity: ${(props) => (props.important ? 1 : 0)};
        border-radius: 5px;
        width: 100%;
        height: 100%;
        animation: ${(props) => (props.important ? actionAnimation : "none")} 2s
            linear infinite;
        background-color: ${(props) =>
            props.staticColor
                ? rgba(props.theme.colors.text.colorWhite, 0.3)
                : rgba(props.theme.userTheme.color, 0.3)};
        z-index: 0;
        transform: scale(0.3);

        &:last-child {
            animation-delay: 1s;
        }
    }
`;

Action.propTypes = {
    tooltipTitle: PropTypes.string,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
    important: PropTypes.bool,
    active: PropTypes.bool,
    id: PropTypes.number,
    disabled: PropTypes.bool,
    staticColor: PropTypes.bool,
};

export default Action;
