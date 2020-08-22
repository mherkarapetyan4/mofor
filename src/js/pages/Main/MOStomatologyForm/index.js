import React, { PureComponent } from "react";
import FormField from "components/FormField";
import { Button } from "components/Button";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from "lodash/get";
import { attachmentTypes, RESPONSIVE } from "config/consts";
import { setDentalMoDataConfirmation } from "actions/myData";
import { fontStyles } from "styledMixins/mixins";
import { showPopup } from "actions/popup";
import Inaccuracy from "pages/Main/MOStomatologyForm/Inaccuracy";
import { checkEmail } from "actions/user";
import { checkAllowConfirmationForPhone } from "actions/user";
import { formatDate } from "utils/formatDate";

@connect((state) => ({
    dentalMo: state.myData.myData.dentalMo,
    confirmations: state.myData.myData.confirmations.dentalMoData,
    dentalAttachment: state.myData.myData.dentalAttachment,
}))
class MOStomatologyForm extends PureComponent {
    state = {};

    static propTypes = {
        dentalMo: PropTypes.object,
        confirmations: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        dentalAttachment: PropTypes.object,
    };

    static detaultProps = {
        dentalAttachment: {},
    };

    render() {
        const { dentalMo, confirmations, dentalAttachment } = this.props;
        return (
            <>
                <FormWrapper>
                    <Item>
                        <FormField
                            disabled
                            label={"Название МО"}
                            value={get(dentalMo, "name", "Нет данных")}
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Адрес МО"}
                            value={get(dentalMo, "address", "Нет данных")}
                            type={"textarea"}
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Контактные данные МО"}
                            value={get(dentalMo, "phone", "Нет данных")}
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Дата прикрепления"}
                            value={
                                formatDate(dentalAttachment?.date) ||
                                "Нет данных"
                            }
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Тип прикрепления"}
                            value={
                                dentalAttachment?.type
                                    ? attachmentTypes[dentalAttachment.type]
                                    : "Нет данных"
                            }
                        />
                    </Item>
                    <Actions>
                        {confirmations ? (
                            <Confirm>
                                Вы подтвердили прикрепление к данной МО
                            </Confirm>
                        ) : null}
                        {confirmations === null || confirmations === true ? (
                            <Action>
                                <Button
                                    label={"Информация неточна"}
                                    onClick={() => {
                                        this.showPopup();
                                    }}
                                />
                            </Action>
                        ) : null}
                        {confirmations === null || confirmations === false ? (
                            <Action>
                                <Button
                                    label={"Подтвердить прикрепление"}
                                    onClick={() =>
                                        this.confirmDentalMoDataConfirmation()
                                    }
                                />
                            </Action>
                        ) : null}
                    </Actions>
                </FormWrapper>
            </>
        );
    }

    showPopup = () => {
        const { dispatch } = this.props;
        dispatch(checkEmail()).then(() => {
            dispatch(checkAllowConfirmationForPhone(false));
            dispatch(
                showPopup(
                    "Опишите неточности в информации",
                    <Inaccuracy onSend={this.rejectDentalMoDataConfirmation} />,
                ),
            );
        });
    };

    confirmDentalMoDataConfirmation = () => {
        const { dispatch } = this.props;
        dispatch(checkEmail()).then(() => {
            dispatch(
                setDentalMoDataConfirmation({
                    confirmed: true,
                    comment: "",
                }),
            );
        });
    };

    rejectDentalMoDataConfirmation = (response) => {
        const { dispatch } = this.props;

        dispatch(
            setDentalMoDataConfirmation({
                confirmed: false,
                comment: response.comment,
                phone: response.phone,
            }),
        );
    };
}

const Confirm = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.notifications.success,
        })};
    margin-right: 16px;
    padding: 10px 0;

    &:last-child {
        margin-right: 0;
    }
`;

const FormWrapper = styled.div`
    padding: 20px 10px 20px 50px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
`;

const Item = styled.div`
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const Action = styled.div`
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-bottom: 10px;
    }
`;

export default MOStomatologyForm;
