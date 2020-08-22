import React, { PureComponent } from "react";
import styled from "styled-components";
import FormField from "components/FormField";
import { Button } from "components/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from "lodash/get";
import { RESPONSIVE } from "config/consts";
import { fontStyles } from "styledMixins/mixins";
import { showPopup } from "actions/popup";
import Inaccuracy from "pages/Main/MOStomatologyForm/Inaccuracy";
import { setMoDataConfirmation } from "actions/myData";
import { checkAllowConfirmationForPhone, checkEmail } from "actions/user";
import { attachmentTypes } from "config/consts";
import { formatDate } from "utils/formatDate";

@connect((state) => ({
    mo: state.myData.myData.mo,
    confirmations: state.myData.myData.confirmations.moData,
    phoneIsRequired: state.user.phoneIsRequired,
    attachment: state.myData.myData.attachment,
}))
class MOGeneralForm extends PureComponent {
    state = {
        modalIsOpen: false,
        modalFieldValue: "",
    };

    static propTypes = {
        mo: PropTypes.object,
        modalIsOpen: PropTypes.bool,
        confirmations: PropTypes.bool,
        dispatch: PropTypes.func,
        phoneIsRequired: PropTypes.bool.isRequired,
        attachment: PropTypes.object,
    };

    static defaultProps = {
        attachments: {},
    };

    render() {
        const { mo, confirmations, attachment } = this.props;
        return (
            <>
                <FormWrapper>
                    <Item>
                        <FormField
                            disabled
                            label={"Название МО"}
                            value={get(mo, "name", "Нет данных")}
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Бюджет МО на текущий год"}
                            value={
                                get(mo, "budget")
                                    ? `${get(mo, "budget")}₽`
                                    : "Нет данных"
                            }
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Адрес МО"}
                            value={get(mo, "address", "Нет данных")}
                            type={"textarea"}
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Контактные данные МО"}
                            value={get(mo, "phone", "Нет данных")}
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Дата прикрепления"}
                            value={formatDate(attachment?.date) || "Нет данных"}
                        />
                    </Item>
                    <Item>
                        <FormField
                            disabled
                            label={"Тип прикрепления"}
                            value={
                                attachment?.type
                                    ? attachmentTypes[attachment.type]
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
                                        this.confirmMoDataConfirmation()
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
        const { dispatch, phoneIsRequired } = this.props;
        dispatch(checkEmail()).then(() => {
            dispatch(checkAllowConfirmationForPhone(false));
            dispatch(
                showPopup(
                    "Опишите неточности в информации",
                    <Inaccuracy
                        onSend={this.rejectMoDataConfirmation}
                        needPhone={phoneIsRequired}
                    />,
                ),
            );
        });
    };

    confirmMoDataConfirmation = () => {
        const { dispatch } = this.props;
        dispatch(checkEmail()).then(() => {
            dispatch(
                setMoDataConfirmation({
                    confirmed: true,
                    comment: "",
                }),
            );
        });
    };

    rejectMoDataConfirmation = (response) => {
        const { dispatch } = this.props;

        dispatch(
            setMoDataConfirmation({
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

export default MOGeneralForm;
