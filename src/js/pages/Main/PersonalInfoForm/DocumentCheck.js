import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { formatDate } from "utils/formatDate";
import { Button } from "components/Button";
import ListData from "components/List/ListData";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { showPopup } from "actions/popup";
import ConfirmDocumentPopup from "pages/Main/PersonalInfoForm/ConfirmDocumentPopup";
import DocumentUpdate from "pages/Main/PersonalInfoForm/DocumentUpdate";
import { connect } from "react-redux";

@connect()
class DocumentCheck extends PureComponent {
    render() {
        const { data, document, authSnils, isWard } = this.props;
        const { sex, firstName, middleName } = data;

        let serialNumber = "";
        if (document?.unmaskedSeries) serialNumber += document.unmaskedSeries;
        if (serialNumber) serialNumber += " - ";
        if (document?.unmaskedNumber) serialNumber += document.unmaskedNumber;

        return (
            <Wrapper>
                <Heading>
                    {sex === "FEMALE" ? "Уважаемая " : "Уважаемый "}
                    {firstName} {middleName}
                </Heading>
                <Text>
                    {isWard ? "Паспортные данные" : "Данные документов"} в Вашем
                    личном кабинете застрахованного лица могут быть обновлены в
                    соответствии с теми, что указаны на портале государственных
                    услуг:
                </Text>
                <ListData
                    label={"Серия и номер паспорта:"}
                    data={serialNumber}
                />
                <ListData
                    label={"Дата выдачи:"}
                    data={formatDate(document?.issueDate)}
                />
                {!isWard && (
                    <ListData
                        label={"СНИЛС:"}
                        data={authSnils || "Нет информации"}
                    />
                )}
                <Text>
                    Корректны ли приведенные выше{" "}
                    {isWard ? "паспортные данные" : "данные ваших документов"}?
                </Text>
                <ActionsWrapper>
                    <Button label={"Нет"} onClick={this.onNoClick} />
                    <Button label={"Да"} onClick={this.onYesClick} />
                </ActionsWrapper>
            </Wrapper>
        );
    }

    onYesClick = () => {
        const { dispatch, data } = this.props;
        const { ward: isWard } = data;
        dispatch(
            showPopup(
                "Обновление данных",
                <ConfirmDocumentPopup isWard={isWard} />,
            ),
        );
    };

    onNoClick = () => {
        const { dispatch, data } = this.props;
        dispatch(
            showPopup("Обновление данных", <DocumentUpdate data={data} />),
        );
    };
}

const Wrapper = styled.div`
    padding: 0 16px;
`;

const Heading = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
            font: "bold",
        })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-bottom: 10px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-bottom: 10px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 16px;

        :last-child {
            margin-right: 0;
        }
    }
`;

DocumentCheck.propTypes = {
    document: PropTypes.object,
    data: PropTypes.object,
    isWard: PropTypes.bool,
    authSnils: PropTypes.object,
    dispatch: PropTypes.func,
};

export default DocumentCheck;
