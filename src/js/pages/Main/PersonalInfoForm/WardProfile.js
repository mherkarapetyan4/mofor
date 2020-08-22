import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import RejectedInfoWarning from "./RejectedInfoWarning";
import { Button } from "components/Button";
import { connect } from "react-redux";
import { checkAllowConfirmation } from "actions/user";
import RejectInfoPopup from "./RejectInfoPopup";
import { showPopup } from "actions/popup";
import {
    confirmationPasspordData,
    confirmationWardSnilsData,
} from "actions/user";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

@connect()
class WardProfile extends PureComponent {
    static propTypes = {
        field: PropTypes.string.isRequired,
        confirmations: PropTypes.object.isRequired,
        showButton: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    onRejectClick = () => {
        const { dispatch, field } = this.props;

        dispatch(checkAllowConfirmation(false)).then(() => {
            let type;
            if (field === "passportData") {
                type = "passport";
            } else if (field === "snilsData") {
                type = "snils";
            }
            dispatch(
                showPopup(
                    "Опишите неточности в информации",
                    <RejectInfoPopup type={type} />,
                ),
            );
        });
    };

    onClick = () => {
        const { field, dispatch } = this.props;
        dispatch(checkAllowConfirmation(true)).then(() => {
            const params = {
                confirmed: true,
            };
            if (field === "passportData") {
                dispatch(confirmationPasspordData(params));
            } else if (field === "snilsData") {
                dispatch(confirmationWardSnilsData(params));
            }
        });
    };

    render() {
        const { field, confirmations, showButton } = this.props;
        const fieldData = confirmations[field];
        const notIndicatedYet = fieldData === null;
        return (
            <Wrapper>
                <RejectedInfoWarning
                    data={confirmations}
                    isWard={true}
                    field={field}
                />
                {fieldData === true && <Confirmed>Подтверждено</Confirmed>}
                {(notIndicatedYet || fieldData === true) && (
                    <span>
                        <Button
                            onClick={this.onRejectClick}
                            label={"Данные некорректны"}
                        />
                    </span>
                )}
                {(notIndicatedYet || fieldData === false) && showButton && (
                    <span>
                        <Button
                            onClick={this.onClick}
                            label={"Подтвердить данные"}
                        />
                    </span>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const Confirmed = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.notifications.success,
            font: "bold",
        })};
    margin-bottom: 16px;
`;

export default WardProfile;
