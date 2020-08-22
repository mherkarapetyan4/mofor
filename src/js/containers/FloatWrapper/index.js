import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RESPONSIVE } from "config/consts";
import ScrollBars from "components/ScrollBars";
import ScrollBarMobile from "components/ScrollBarsMobile";
import { Desktop, Tablet } from "wrappers/responsive";

class FloatWrapper extends PureComponent {
    render() {
        const {
            isOpened,
            children,
            position,
            width,
            height,
            autoHeight,
            globalPosition,
            yearsPicker,
            items,
            currentValue,
            el,
        } = this.props;

        return (
            <Wrapper
                isOpened={isOpened}
                position={position}
                width={width}
                height={height}
                autoHeight={autoHeight}
                globalPosition={globalPosition}
            >
                <Desktop>
                    <ScrollBars
                        maxHeight={height}
                        isOpened={isOpened}
                        yearsPicker={yearsPicker}
                        items={items}
                        currentValue={currentValue}
                        el={el}
                    >
                        {children}
                    </ScrollBars>
                </Desktop>
                <Tablet>
                    <ScrollBarMobile
                        isOpened={isOpened}
                        yearsPicker={yearsPicker}
                        items={items}
                        currentValue={currentValue}
                        el={el}
                        autoHeight={autoHeight}
                        height={height}
                    >
                        {children}
                    </ScrollBarMobile>
                </Tablet>
            </Wrapper>
        );
    }
}

function renderPosition(props) {
    switch (props.globalPosition) {
        case "top":
            return {
                bottom: props.position.y + "px",
                left: props.position.x + "px",
            };
        case "bottom":
            return {
                top: props.position.y + "px",
                left: props.position.x + "px",
            };
        default:
            return {
                top: props.position.y + "px",
                left: props.position.x + "px",
            };
    }
}

const Wrapper = styled.div`
    display: ${(props) => (props.isOpened ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    ${(props) => renderPosition(props)};
    z-index: 1000;
    background-color: ${(props) => props.theme.colors.background.white};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.shadows.blurred};
    padding: 2px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    max-height: ${(props) => (props.autoHeight ? "auto" : props.height)};
    overflow-y: ${(props) => (props.autoHeight ? "visible" : "auto")};
    overflow-x: hidden;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

FloatWrapper.propTypes = {
    isOpened: PropTypes.bool,
    children: PropTypes.any.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    width: PropTypes.number,
    height: PropTypes.string,
    autoHeight: PropTypes.bool,
    globalPosition: PropTypes.oneOf(["top", "bottom"]),
    yearsPicker: PropTypes.bool,
    currentValue: PropTypes.any,
    items: PropTypes.array,
    el: PropTypes.object,
};

FloatWrapper.defaultProps = {
    isOpened: false,
    position: {
        x: 0,
        y: 40,
    },
    height: "220px",
    autoHeight: false,
    globalPosition: "bottom",
};

export default FloatWrapper;
