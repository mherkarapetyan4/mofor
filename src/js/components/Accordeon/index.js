/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { darken } from "polished";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";

class Accordeon extends PureComponent {
    static propTypes = {
        elements: PropTypes.array.isRequired,
        multiple: PropTypes.bool,
        isOpenKey: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        renderHeader: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
        scrollViewOnOpen: PropTypes.func,
    };

    static defaultProps = {
        multiple: false,
        isOpenKey: false,
        renderHeader: null,
    };

    state = {
        openElements: [],
        subvalueIsOpened: false,
        itemClicked: [],
        currentKey: null,
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.elements.findIndex((item) => item.isOpen) === -1 &&
            nextProps.elements.findIndex((item) => item.isOpen) !== -1
        ) {
            this.headerClick(
                nextProps.elements.findIndex((item) => item.isOpen),
            );
        }
    }

    headerClick = (key) => {
        let openElements = [...this.state.openElements];
        if (!this.props.multiple) {
            openElements = [];
        }
        openElements[key] = !this.state.openElements[key];
        this.setState({ openElements, itemClicked: key });
    };

    onClick = (item, key) => {
        if (this.props.scrollViewOnOpen) {
            const marginTop =
                item.id === 1
                    ? item.id * this.itemHeaderRef.clientHeight + 35
                    : item.id * this.itemHeaderRef.clientHeight - 25;
            this.props.scrollViewOnOpen(marginTop);
        }

        if (item.action) {
            item.action();
            this.headerClick(key);
        } else {
            this.headerClick(key);
        }
    };

    componentDidUpdate(prevProps) {
        const { isOpenKey } = this.props;
        if (prevProps.isOpenKey !== isOpenKey) {
            this.headerClick(isOpenKey);
        }
    }

    render() {
        const { elements, renderHeader } = this.props;
        const {
            openElements,
            subvalueIsOpened,
            itemClicked,
            currentKey,
        } = this.state;

        return (
            <AccordeonWrapper>
                {!renderHeader && <AccordeonSeparator />}
                {elements.map((item, key) => (
                    <Item key={`accordeon-item-${key}`}>
                        {renderHeader ? (
                            <CustomItemHeader>
                                <ItemHeader
                                    open={openElements[key]}
                                    onClick={() => this.onClick(item, key)}
                                    ref={(el) => (this.itemHeaderRef = el)}
                                >
                                    {renderHeader(item, {
                                        key,
                                        itemClicked,
                                        openElements,
                                    })}
                                </ItemHeader>
                            </CustomItemHeader>
                        ) : (
                            <ItemHeader
                                onClick={() => this.onClick(item, key)}
                                open={openElements[key]}
                                ref={(el) => (this.itemHeaderRef = el)}
                            >
                                {item.icon && (
                                    <HeaderIcon>{item.icon}</HeaderIcon>
                                )}
                                <HeaderInfoWrapper>
                                    <HeaderTitle>{item.title}</HeaderTitle>
                                    {item.subtitle && (
                                        <HeaderSubtitle
                                            onClick={(e) => {
                                                if (!item.subvalue)
                                                    return false;
                                                this.toggleSubvalue(e, key);
                                            }}
                                        >
                                            {item.subtitle}
                                        </HeaderSubtitle>
                                    )}
                                </HeaderInfoWrapper>
                            </ItemHeader>
                        )}
                        {subvalueIsOpened && currentKey === key && (
                            <ItemSubcontent>{item.subvalue}</ItemSubcontent>
                        )}
                        <ItemContent>
                            {openElements[key] && item.value}
                        </ItemContent>
                    </Item>
                ))}
            </AccordeonWrapper>
        );
    }

    toggleSubvalue = (e, key) => {
        e.stopPropagation();
        this.setState({
            subvalueIsOpened:
                key === this.state.currentKey
                    ? !this.state.subvalueIsOpened
                    : true,
            currentKey: key,
        });
    };
}

const ItemSubcontent = styled.div``;

const AccordeonSeparator = styled.div`
    position: absolute;
    left: 30px;
    top: 40px;
    bottom: 40px;
    width: 2px;
    background-color: ${(props) => props.theme.colors.borderColor};
    z-index: 0;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        left: 24px;
    }
`;

const AccordeonWrapper = styled.div`
    position: relative;
`;

const Item = styled.div`
    position: relative;
`;

const ItemHeader = styled.div`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    background-color: ${(props) =>
        props.open
            ? darken(0.05, props.theme.colors.background.white)
            : "transparent"};
    border-radius: 10px;
    padding: 10px;
    transition: background-color ${(props) => props.theme.animations.transition};

    &:hover {
        background-color: ${(props) =>
            darken(0.05, props.theme.colors.background.white)};
    }
`;

const CustomItemHeader = styled.div`
    width: 100%;

    > div {
        width: 100%;
    }
`;

const HeaderIcon = styled.div`
    margin-right: 20px;
`;

const HeaderTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin: 0 10px 0 0;
`;

const ItemContent = styled.div``;

const HeaderSubtitle = styled.div`
    margin-top: 5px;
`;

const HeaderInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Accordeon;
