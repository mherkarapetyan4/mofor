/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connectModal } from "redux-modal";
import { Modal } from "components/Modal";
import { modalName } from "config/consts";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

@connectModal({ name: modalName.SYSTEM_MESSAGE })
class ErrorModal extends PureComponent {
    static propTypes = {
        handleHide: PropTypes.func.isRequired,
        systemMessage: PropTypes.string.isRequired,
    };

    onClose = () => {
        const { handleHide } = this.props;
        handleHide();
    };

    render() {
        const { systemMessage } = this.props;
        return (
            <Modal title="Ошибка" onClose={this.onClose}>
                <Message>{systemMessage}</Message>
            </Modal>
        );
    }
}

const Message = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorWhite,
        })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
`;

export default ErrorModal;
