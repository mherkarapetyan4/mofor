import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import ServiceUpdate from "components/ServiceUpdate";
import { Button } from "components/Button";
import TextBlock from "components/TextBlock";
import { isHideHelper } from "actions/app";

@connect((state) => ({
    showHelper: state.app.showHelper,
}))
class Helper extends PureComponent {
    static propTypes = {
        showHelper: PropTypes.bool,
        dispatch: PropTypes.func,
    };

    state = {
        currentIndex: -1,
        items: [],
    };

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {
        const { showHelper, dispatch } = this.props;
        let data = [];

        if (!prevProps.showHelper && showHelper) {
            document
                .querySelectorAll("[data-description][data-step]")
                .forEach((el) => {
                    const type = el.getAttribute("data-description");
                    const step = el.getAttribute("data-step");
                    if (!type.length || isNaN(parseInt(step))) {
                        return true;
                    }

                    data.push({
                        el,
                        type,
                        step,
                        position: {
                            x: el.getBoundingClientRect().x,
                            y: el.getBoundingClientRect().y,
                            offset:
                                el.getBoundingClientRect().x + el.offsetWidth,
                            width: el.getBoundingClientRect().width,
                            height: el.getBoundingClientRect().height,
                        },
                    });
                });
            if (!data.length) {
                dispatch(isHideHelper());
                return false;
            }
            data.sort((a, b) => (a.step > b.step ? 1 : -1));

            this.setState({
                items: data,
                currentIndex: 0,
            });
        } else if (prevProps.showHelper && !showHelper) {
            this.setState({
                currentIndex: -1,
                items: [],
            });
        } else if (prevState.currentIndex !== this.state.currentIndex) {
            const prevItem = this.state.items[prevState.currentIndex];
            if (prevItem) {
                prevItem.el.classList.remove("help-active");
                this.state.items[this.state.currentIndex].el.classList.add(
                    "help-active",
                );
            }

            const helperBox = document.querySelector(
                "[class*=Helper__HelperComponent]",
            );

            if (helperBox) {
                const boxRect = helperBox.getBoundingClientRect();
                const boxProps = {
                    width: boxRect.width,
                    height: boxRect.height,
                    x: boxRect.x,
                    y: boxRect.y,
                };

                this.setState({
                    box: boxProps,
                });
            }
        }
    }

    renderDot = () => {
        const { items, currentIndex } = this.state;
        if (!items.length) {
            return null;
        }
        return (
            <DotWrapper>
                {items.map((el, index) => {
                    return (
                        <Dot
                            key={`dot_${el.step}`}
                            active={index === currentIndex}
                        />
                    );
                })}
            </DotWrapper>
        );
    };
    renderCurrentHelper = () => {
        const { items, currentIndex } = this.state;
        if (!items.length) {
            return null;
        }
        return items.map((el, index) => {
            return (
                <ItemBlock
                    key={`helper_${index}`}
                    active={+index === +currentIndex}
                >
                    <TextBlock>
                        <div dangerouslySetInnerHTML={{ __html: el.type }} />
                    </TextBlock>
                </ItemBlock>
            );
        });
    };

    prev = () => {
        const { currentIndex } = this.state;
        if (currentIndex < 1) {
            return false;
        }
        this.setState({
            currentIndex: currentIndex - 1,
        });
    };
    next = () => {
        const { items, currentIndex } = this.state;
        if (currentIndex > items.length - 2) {
            return false;
        }
        this.setState({
            currentIndex: currentIndex + 1,
        });
    };
    render() {
        const { showHelper, dispatch } = this.props;
        const { items, currentIndex, box } = this.state;

        if (!showHelper || !items.length || currentIndex === -1) {
            return null;
        }

        const currentItem = items[currentIndex];
        return (
            <Wrapper>
                {this.renderBox(currentItem.position)}
                <HelperComponent
                    {...currentItem}
                    sizes={box}
                    ref={(e) => (this.helperBox = e)}
                >
                    {this.renderCurrentHelper()}
                    {this.renderDot()}
                    <ButtonWrapper>
                        <Button
                            label={"Закрыть"}
                            onClick={() => {
                                dispatch(isHideHelper());
                            }}
                        />
                        <Button
                            disabled={!currentIndex}
                            label={"Назад"}
                            onClick={this.prev}
                        />
                        <Button
                            disabled={currentIndex === items.length - 1}
                            label={"Далее"}
                            onClick={this.next}
                        />
                    </ButtonWrapper>
                </HelperComponent>
            </Wrapper>
        );
    }

    renderBox = (position) => {
        return <Box position={position} />;
    };
}

const calculateHorizontalPosition = (props) => {
    const helperWidth = props.sizes?.width || 0;
    const gap = 20;

    if (window.innerWidth < helperWidth + props.position.offset) {
        return props.position.x - helperWidth - gap + "px";
    }
    return props.position.offset + gap + "px";
};

const calculateVerticalPosition = (props) => {
    const helperHeight = props.sizes?.height || 0;
    const gap = 10;

    if (window.innerHeight < helperHeight + props.position.y) {
        return (
            props.position.y -
            helperHeight -
            (props.position.y - window.innerHeight) -
            gap +
            "px"
        );
    }

    return props.position.y + gap + "px";
};

const calculateArrowPosition = (props) => {
    const helperWidth = props.sizes?.width || 0;
    const helperHeight = props.sizes?.height || 0;

    if (window.innerWidth < helperWidth + props.position.offset) {
        return `
            transform: rotate(90deg);
            top: 10px;
            right: -9px;
        `;
    }
    if (window.innerHeight < helperHeight + props.position.y) {
        return `
            transform: rotate(-90deg);
            bottom: 10px;
            left: -9px;
        `;
    }
    return `
        transform: rotate(-90deg);
        top: 10px;
        left: -9px;
    `;
};

const Box = styled.div`
    position: absolute;
    z-index: 9999998;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    left: ${(props) => props.position.x - 10}px;
    top: ${(props) => props.position.y - 10}px;
    width: ${(props) => props.position.width + 20}px;
    height: ${(props) => props.position.height + 20}px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    clip-path: inset(0% 0% round 10px);
    -webkit-clip-path: inset(0% 0% round 10px);
`;

const HelperComponent = styled.div`
    position: absolute;
    z-index: 1001;
    left: ${(props) => calculateHorizontalPosition(props)};
    top: ${(props) => calculateVerticalPosition(props)};
    background-color: #fff;
    padding: 10px;
    width: 100%;
    height: auto;
    max-width: 400px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0 6px 10px rgba(0,0,0,.1);
    
    >*{
        margin-bottom: 10px;
    }
    
    &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1001;
        width: 0;
        height: 0;
        border-style: solid;
        ${(props) => calculateArrowPosition(props)};
        border-width: 0 7.5px 9px 7.5px;
        border-color: transparent transparent #fff transparent;
    }
}
`;

const ItemBlock = styled.div`
    margin-bottom: 15px;
    width: 100%;
    display: ${(props) => (props.active ? "block" : "none")};
`;
const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
`;

const DotWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Dot = styled.span`
    background: ${(props) =>
        props.active
            ? props.theme.userTheme.color
            : props.theme.colors.borderColor};
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;

    &:last-child {
        margin-right: 0;
    }
`;
const ButtonWrapper = styled.div`
    display: flex;
    margin: 0 10px;
    justify-content: space-between;
`;

ServiceUpdate.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Helper;
