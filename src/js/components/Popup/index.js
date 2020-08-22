import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CloseIcon from "icons/CloseIcon";
import { connect } from "react-redux";
import Actions from "containers/Header/Actions";
import ScrollBar from "components/ScrollBar";
import { fontStyles } from "styledMixins/mixins";
import { hidePopup } from "actions/popup";
import { RESPONSIVE } from "config/consts";
import isEmpty from "lodash/isEmpty";

@connect(({ popup }) => ({ popup }), { hidePopup })
class Popup extends PureComponent {
    closeIcon = [
        {
            icon: <CloseIcon opacity={0.5} />,
            action: () => this.props.hidePopup(),
        },
    ];

    render() {
        const {
            title = "",
            component = null,
            data = {},
            show = false,
            options = { scrollable: true },
        } = this.props.popup;

        let Component = component;
        if (!isEmpty(data)) {
            Component = component && React.cloneElement(component, { data });
        }

        return (
            <Wrapper show={show}>
                <Header>
                    {title && <Title>{title}</Title>}
                    <Close>
                        <Actions items={this.closeIcon} />
                    </Close>
                </Header>
                <Content>
                    {options && options.scrollable ? (
                        <ScrollBar noScrollX={true}>{Component}</ScrollBar>
                    ) : (
                        <>{Component}</>
                    )}
                </Content>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: ${(props) => (props.show ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    width: 400px;
    right: 10px;
    bottom: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.shadows.blurred};
    z-index: 1000;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
        right: 0;
        bottom: 0;
    }
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.big,
        })};
    display: inline-block;
    color: ${(props) => props.theme.userTheme.color};
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

const Close = styled.div``;

const Content = styled.div`
    height: 400px;
    overflow-y: hidden;
`;

Popup.propTypes = {
    popup: PropTypes.object,
    hidePopup: PropTypes.func,
};

export default Popup;
