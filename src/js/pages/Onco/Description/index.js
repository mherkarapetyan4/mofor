import React, { PureComponent } from "react";
import { showPopup } from "actions/popup";
import archiveListHandler from "../getArchiveList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { formatDate } from "utils/formatDate";
import styled from "styled-components";
import axios from "axios";
import FormField from "components/FormField";
import { Button } from "components/Button";
import { BASE_URL } from "config/consts";
import { fontStyles } from "styledMixins/mixins";

@connect(null, { showPopup })
class Description extends PureComponent {
    state = {
        emailIsSent: false,
    };

    static propTypes = {
        showPopup: PropTypes.func,
        item: PropTypes.object.isRequired,
    };

    clickBack() {
        const { showPopup } = this.props;
        archiveListHandler(showPopup);
    }

    showEmailIsSent = () => {
        this.setState({
            emailIsSent: true,
        });
    };

    downloadOrSend = async (action) => {
        const { id } = this.props.item;
        if (action === "send") {
            await axios.get(`/onco/closed/report/${action}?id=${id}`);
            this.showEmailIsSent();
            // this.clickBack()
        } else {
            window.open(BASE_URL + `/onco/closed/report/${action}?id=${id}`);
            // this.clickBack()
        }
    };

    render() {
        const { id, closingReason } = this.props.item;

        return (
            <ListItemWrapper key={`item-id-${id}`}>
                <InfoWrapper>
                    <ItemInfo>
                        <FormField
                            label={"Причина закрытия раздела:"}
                            value={closingReason}
                            disabled
                        />
                    </ItemInfo>
                </InfoWrapper>
                {this.state.emailIsSent && (
                    <Confirmation>Отчет отправлен на email.</Confirmation>
                )}
                <ButtonsWrapper>
                    <Item>
                        <Button
                            label={"Отправить на эл. почту"}
                            onClick={() => this.downloadOrSend("send")}
                        />
                    </Item>
                    <Item>
                        <Button
                            label={"Скачать отчет"}
                            onClick={() => this.downloadOrSend("pdf")}
                        />
                    </Item>
                    <Item>
                        <Button
                            label={"Назад"}
                            onClick={() => this.clickBack()}
                        />
                    </Item>
                </ButtonsWrapper>
            </ListItemWrapper>
        );
    }
}

const Item = styled.div`
    margin-right: 16px;
    margin-bottom: 10px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const ListItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: ${(props) => props.theme.paddings.normal};
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ItemInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
`;

const Confirmation = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: props.theme.fonts.sizes.small,
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

export default Description;
