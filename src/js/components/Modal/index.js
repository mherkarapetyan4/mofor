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
            icon: <CloseIcon color={"#fff"} opacity={0.5} />,
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
            color: props.theme.colors.text.colorWhite,
        })};
`;

const Content = styled.div``;

const ModalContainer = styled.div`
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: ${(props) => props.theme.colors.notifications.alert};
    padding: 10px;
    border-radius: 4px;
    width: 500px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

export { Modal };
