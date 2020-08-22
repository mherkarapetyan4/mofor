import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "components/Button";
import ListData from "components/List/ListData";
import { isValidEmailValue } from "utils/validators";

class ConfirmEmail extends PureComponent {
    static propTypes = {
        check: PropTypes.object.isRequired,
        mail: PropTypes.string,
        onSendEmail: PropTypes.func.isRequired,
        onCheckEmail: PropTypes.func.isRequired,
    };

    static defaultProps = {
        mail: "",
    };

    render() {
        const { check, mail, onCheckEmail, onSendEmail } = this.props;
        return (
            <Wrapper>
                <StatusWrapper>
                    <ListData
                        label={"Статус:"}
                        data={
                            mail && check.confirmed ? (
                                <Status confirmed>Подтвержден</Status>
                            ) : !check.codeDate ? (
                                <Status notConfirmed>Не отправлено</Status>
                            ) : (
                                <Status notConfirmed>Не подтверждена</Status>
                            )
                        }
                    />
                </StatusWrapper>

                <ButtonWrapper>
                    <Button
                        type={"text"}
                        onClick={onCheckEmail}
                        label={"Обновить"}
                        disabled={!check.codeDate || check.confirmed || !mail}
                    />
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button
                        type={"text"}
                        onClick={onSendEmail}
                        label={"Отправить письмо"}
                        disabled={
                            !mail ||
                            !isValidEmailValue(mail) ||
                            !!check.confirmed
                        }
                    />
                </ButtonWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
`;

const ButtonWrapper = styled.div`
    flex: 0 0 auto;
    margin: 3px 16px 3px 0;

    :last-child {
        margin-right: 0;
    }
`;

function renderStatus(props) {
    if (props.notConfirmed) {
        return props.theme.colors.notifications.alert;
    } else if (props.confirmed) {
        return props.theme.colors.notifications.success;
    }
}

const Status = styled.div`
    color: ${(props) => renderStatus(props)};
    margin-right: 16px;
`;

const StatusWrapper = styled.div`
    display: flex;
    flex: 1 0 auto;
    align-items: center;
`;

export default ConfirmEmail;
