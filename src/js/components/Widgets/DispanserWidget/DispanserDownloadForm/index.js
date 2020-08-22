import React, { PureComponent } from "react";
import { Button } from "components/Button";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { showPopup } from "actions/popup";
import { dispanserPath } from "config/paths";
import { BASE_URL } from "config/consts";

@connect((state) => ({
    data: state.widgets.dispanserWidget.state,
}))
class DispanserDownloadForm extends PureComponent {
    downloadPdf = () => {
        const { questionary } = this.props.data;
        window.open(
            `${BASE_URL}${dispanserPath.DOWNLOAD_DISPANSER_FORM}?id=${questionary.questionary.id}`,
        );
    };

    render() {
        const { data, dispatch } = this.props;
        const { events } = data;

        return (
            <>
                <Info>
                    Перед посещением врача рекомендуем Вам распечатать
                    заполненную анкету.
                </Info>
                <Action>
                    <Button
                        label={"Скачать"}
                        onClick={() => this.downloadPdf()}
                    />
                </Action>
                <Info>
                    В рамках диспансеризации Вам, как минимум, будут оказаны
                    медицинские услуги, приведенные ниже. После прохождения
                    диспансеризации не забудьте, пожалуйста, подтвердить
                    оказанную услугу в личном кабинете и ознакомится с
                    результатами диспансеризации.
                </Info>
                {events && (
                    <Action>
                        <Button
                            label={
                                "Перечень медицинских услуг, предусмотренных при диспансеризации"
                            }
                            onClick={() => {
                                dispatch(
                                    showPopup(
                                        "Перечень медицинских услуг, предусмотренных при диспансеризации",
                                        <Wrapper>
                                            <UlWrapper>
                                                {events.map((item, i) => {
                                                    return (
                                                        <EventItem key={i}>
                                                            {item.title}
                                                        </EventItem>
                                                    );
                                                })}
                                            </UlWrapper>
                                        </Wrapper>,
                                    ),
                                );
                            }}
                        />
                    </Action>
                )}
            </>
        );
    }
}

DispanserDownloadForm.propTypes = {
    data: PropTypes.array,
    dispatch: PropTypes.func,
};

const EventItem = styled.li`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-bottom: 10px;
`;

const Info = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-bottom: 10px;
`;

const Action = styled.div`
    display: inline-flex;
    margin-bottom: 10px;
`;

const Wrapper = styled.div`
    padding: 16px;
`;

const UlWrapper = styled.ul`
    padding-left: 10px;
    margin: 0;
`;

export default DispanserDownloadForm;
