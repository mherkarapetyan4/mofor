/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connectModal } from "redux-modal";
import { Modal } from "components/SuccessModal";
import { modalName } from "config/consts";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

@connectModal({ name: modalName.SUCCESS_MESSAGE })
class SuccessModal extends PureComponent {
    static propTypes = {
        handleHide: PropTypes.func.isRequired,
        successMessage: PropTypes.string.isRequired,
        timeToClose: PropTypes.number.isRequired,
    };

    timer = null;

    componentDidMount() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.handleHide();
        }, this.props.timeToClose);
    }

    onClose = () => {
        const { handleHide } = this.props;
        handleHide();
    };

    render() {
        const { successMessage } = this.props;

        return (
            <Modal title="Ваш запрос отправлен" onClose={this.onClose}>
                <Message>{successMessage}</Message>
            </Modal>
        );
    }
}

const Message = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
`;

export default SuccessModal;
