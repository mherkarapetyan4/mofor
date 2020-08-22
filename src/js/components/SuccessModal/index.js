import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Actions from "containers/Header/Actions";
import CloseIcon from "icons/CloseIcon";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";

class Modal extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.element,
            PropTypes.array,
        ]).isRequired,
        onClose: PropTypes.func.isRequired,
    };

    closeIcon = [
        {
            icon: <CloseIcon color={"#000"} opacity={0.5} />,
            tooltip: "Закрыть",
            action: () => this.props.onClose(),
        },
    ];

    render() {
        const { title, children } = this.props;
        return (
            <ModalContainer>
                <ModalContent>
                    <ModalHeader>
                        <HeaderTitle>{title}</HeaderTitle>
                        <Actions items={this.closeIcon} />
                    </ModalHeader>
                    <Content>{children}</Content>
                </ModalContent>
            </ModalContainer>
        );
    }
}

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const HeaderTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.big,
        })};
    display: inline-block;
    color: #fff;
`;

const Content = styled.div``;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
`;

const ModalContent = styled.div`
    background-color: ${(props) => props.theme.colors.notifications.success};
    padding: 10px;
    width: 400px;
    position: absolute;
    right: 10px;
    bottom: 70px;
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.shadows.blurred};
    z-index: 1000;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 94%;
        right: 0;
        left: 0;
        margin: 0 3%;
    }
`;

export { Modal };
