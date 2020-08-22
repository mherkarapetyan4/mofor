import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import get from "lodash/get";
import RejectedInfoWarning from "./RejectedInfoWarning";
import { Button } from "components/Button";
import ConfirmInfoButton from "./ConfirmInfoButton";
import { checkEmail } from "actions/user";
import { showPopup } from "actions/popup";
import RejectInfoPopup from "./RejectInfoPopup";
import { checkAllowConfirmationPassportData } from "actions/user";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import DocumentUpdate from "pages/Main/PersonalInfoForm/DocumentUpdate";
import DocumentSend from "pages/Main/PersonalInfoForm/DocumentSend";
import PolicyRenew from "pages/Main/PersonalInfoForm/PolicyRenew";
import DocumentCheck from "pages/Main/PersonalInfoForm/DocumentCheck";

@connect((state) => ({
    data: state.myData.myData,
    settings: state.user.settings,
}))
class MainProfile extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        settings: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    onRejectClick = () => {
        const { settings, dispatch, data } = this.props;
        const { passportDataIncorrectVersion } = settings;
        if (passportDataIncorrectVersion === 1) {
            dispatch(checkEmail()).then(() =>
                dispatch(
                    showPopup(
                        "Опишите неточности в информации",
                        <RejectInfoPopup type={"passportData"} />,
                    ),
                ),
            );
        } else if (passportDataIncorrectVersion === 4) {
            checkAllowConfirmationPassportData().then((code) => {
                if (code === "CONTACTS_MISSED") {
                    dispatch(
                        showPopup(
                            "Обновление данных",
                            <DocumentSend data={data.person} />,
                        ),
                    );
                } else if (code === "AUTH_DOCUMENT_MISSED") {
                    dispatch(
                        showPopup(
                            "Обновление данных",
                            <DocumentUpdate data={data.person} />,
                        ),
                    );
                } else if (code === "POLICY_RENEW_NEED") {
                    dispatch(showPopup("Обновление данных", <PolicyRenew />));
                } else if (code === "OK") {
                    const { ward: isWard, authDocument, authSnils } = data;
                    dispatch(
                        showPopup(
                            "Обновление данных",
                            <DocumentCheck
                                document={authDocument}
                                data={data.person}
                                isWard={isWard}
                                authSnils={authSnils}
                            />,
                        ),
                    );
                }
            });
        }
    };

    render() {
        const { data } = this.props;
        const { pbdDocument, confirmations } = data;
        const { passportData } = confirmations;
        const series = get(pbdDocument, "series");
        const number = get(pbdDocument, "number");
        const notIndicatedYet = passportData === null;
        return (
            <Wrapper>
                <RejectedInfoWarning
                    data={confirmations}
                    field={"passportData"}
                    isWard={false}
                />
                {passportData === true && <Confirmed>Подтверждено</Confirmed>}

                {(notIndicatedYet || passportData === true) && (
                    <Button
                        onClick={this.onRejectClick}
                        label={"Данные некорректны"}
                    />
                )}

                {(notIndicatedYet || passportData === false) &&
                    series &&
                    number && <ConfirmInfoButton />}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Confirmed = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.notifications.success,
            font: "bold",
        })};
    margin-right: 16px;
`;

export default MainProfile;
