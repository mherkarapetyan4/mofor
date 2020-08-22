import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Radio } from "components/Radio";
import get from "lodash/get";
import { Button } from "components/Button";
import { connect } from "react-redux";
import { hidePopup } from "actions/popup";
import { correntFromAuthPassportData } from "actions/user";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import ListData from "components/List/ListData";

@connect((state) => ({
    contacts: state.myData.myData.contacts,
}))
class ConfirmDocumentPopup extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            reason: null,
        };
    }

    static propTypes = {
        isWard: PropTypes.bool.isRequired,
        contacts: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { dispatch } = this.props;
        dispatch(correntFromAuthPassportData(this.state.reason, this.onClose));
    };

    onClose = () => this.props.dispatch(hidePopup());

    render() {
        const { isWard, contacts } = this.props;
        const { reason } = this.state;
        return (
            <Wrapper>
                <Text>
                    {isWard
                        ? "Вы можете выполнить запрос на обновление ваших паспортных данных."
                        : "Вы можете выполнить запрос на обновление данных документов."}
                </Text>
                <Text>
                    <Radio
                        elements={[
                            {
                                label: "Получил новый паспорт",
                                value: "NEW",
                            },
                            {
                                label: isWard
                                    ? "Нашел ошибку (опечатку, неточность) в текущих паспортных данных"
                                    : "Нашел ошибку (опечатку, неточность) в текущих данных документов",
                                value: "ERROR",
                            },
                        ]}
                        name={"reason"}
                        value={reason}
                        onChange={(reason) => this.setState({ reason })}
                    />
                </Text>
                <Text>
                    К данному запросу будут приложены контактные данные,
                    указанные Вами в личном кабинете застрахованного
                </Text>
                <DataWrapper>
                    <ListData
                        label={"Электронная почта:"}
                        data={get(contacts, "email", "Нет данных")}
                    />
                </DataWrapper>
                <DataWrapper>
                    <ListData
                        label={"Телефон:"}
                        data={
                            get(contacts, "phone")
                                ? `+7 ${contacts.phone}`
                                : "Нет данных"
                        }
                    />
                </DataWrapper>
                <ActionsWrapper>
                    <Button label={"Отмена"} onClick={this.onClose} />
                    <Button
                        label={"Отправить запрос"}
                        disabled={!reason}
                        onClick={this.onClick}
                    />
                </ActionsWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 0 10px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;
`;

const DataWrapper = styled.div`
    margin-bottom: 10px;
`;

const ActionsWrapper = styled.div`
    display: flex;

    > div {
        margin-right: 16px;
        :last-child {
            margin-right: 0;
        }
    }
`;

export default ConfirmDocumentPopup;
