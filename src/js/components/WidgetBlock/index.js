import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import ArrowIcon from "icons/ArrowIcon";
import Actions from "containers/Header/Actions";
import { rgba } from "polished";
import { RESPONSIVE } from "config/consts";

class WidgetBlock extends PureComponent {
    state = {
        opened: this.props.isOpen,
    };

    render() {
        const {
            title,
            children,
            additional,
            fullHeight,
            accordeon,
            actions,
        } = this.props;
        const { opened } = this.state;

        return (
            <WidgetBlockWrapper fullHeight={fullHeight}>
                <Header
                    accordeon={accordeon}
                    onClick={accordeon ? () => this.toggleBlock() : () => {}}
                    opened={opened}
                >
                    {title && <Title>{title}</Title>}
                    {actions && <Actions items={actions} />}
                    {additional && <Additional>{additional}</Additional>}
                    {accordeon && (
                        <Accordeon>
                            <ArrowIcon
                                opacity={0.5}
                                rotate={opened ? 90 : -90}
                            />
                        </Accordeon>
                    )}
                </Header>
                <Content
                    fullHeight={fullHeight}
                    accordeon={accordeon}
                    opened={opened}
                >
                    {children}
                </Content>
            </WidgetBlockWrapper>
        );
    }

    toggleBlock = () => {
        this.setState({
            opened: !this.state.opened,
        });
    };
}

const Accordeon = styled.div``;

const WidgetBlockWrapper = styled.div`
    width: 100%;
    height: ${(props) => (props.fullHeight ? "100%" : "auto")};
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, { font: "bold", size: props.theme.fonts.sizes.big })};
    display: flex;
    align-items: center;
    flex: 1 1 0%;
    margin-right: 16px;
`;

const Content = styled.div`
    height: ${(props) => (props.fullHeight ? "100%" : "auto")};
    max-height: ${(props) =>
        props.accordeon ? (props.opened ? "10000px" : "0") : "auto"};
    overflow: ${(props) => (props.accordeon ? "hidden" : "visible")};
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: ${(props) =>
        props.opened ? props.theme.paddings.normal : 0};
    cursor: ${(props) => (props.accordeon ? "pointer" : "initial")};
    border-radius: 4px;
    transition: background-color ${(props) => props.theme.animations.transition};

    :hover {
        background-color: ${(props) =>
            props.accordeon ? rgba(0, 0, 0, 0.1) : "transparent"};
    }
`;

const Additional = styled.div`
    @media all and (max-width: ${RESPONSIVE.mobile}) {
        padding: 10px 0;
    }
`;

WidgetBlock.defaultProps = {
    actions: [],
    isOpen: true,
};
WidgetBlock.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    additional: PropTypes.any,
    fullHeight: PropTypes.bool,
    accordeon: PropTypes.bool,
    actions: PropTypes.array,
    isOpen: PropTypes.bool,
};

export default WidgetBlock;
