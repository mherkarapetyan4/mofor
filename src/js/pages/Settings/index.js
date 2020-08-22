import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Row from "containers/Row";
import Column from "containers/Column";
import ScrollBar from "components/ScrollBar";
import FlatPopup from "components/FlatPopup";
import { LK_MAP_ELEMENTS } from "config/menu";
import WidgetBlock from "components/WidgetBlock";
import Palette from "components/Palette";
import map from "lodash/map";
import palettes from "./palettes";
import styled from "styled-components";
import gradients from "./gradients";
import { thumbs } from "./backgrounds";
import { Checkbox } from "components/Checkbox";
import TextBlock from "components/TextBlock";
import ConfirmEmail from "components/ConfirmEmail";
import InlineFormField from "components/InlineFormField";
import { Desktop, Tablet } from "wrappers/responsive";
import { RESPONSIVE } from "config/consts";
import { saveUserTheme, changeUserTheme } from "actions/app";
import { connect } from "react-redux";
import {
    getSubscriptions,
    setSubscription,
    sendEmailCode,
} from "actions/subscriptions";

@connect((state) => ({
    data: state.subscriptions.subscriptions,
    emails: [...state.subscriptions.subscriptions.pillboxSettings],
    backgroundImage: state.app.userTheme.backgroundImage,
    userThemeId: state.app.userTheme.id,
    userTheme: state.app.userTheme,
}))
class Settings extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getSubscriptions());
    }

    changeCheckboxHandler = (e, name, value) => {
        const { dispatch } = this.props;

        dispatch(
            setSubscription({
                ...this.props.data,
                [name]: !value,
            }),
        );
    };

    changePillboxCheckboxHandler = (e, id, value) => {
        const { dispatch } = this.props;

        const newPillboxSettings = [...this.props.data.pillboxSettings];
        newPillboxSettings.find((obj) => obj.id === id).send = !value;

        dispatch(
            setSubscription({
                ...this.props.data,
                pillboxSettings: newPillboxSettings,
            }),
        );
    };

    changeInputValueHandler = (value, id) => {
        const newEmails = [...this.props.emails];
        newEmails.find((obj) => obj.id === id).email = value;
        this.setState({ emails: newEmails });
    };

    sendEmailValueHandler = (id) => {
        const { dispatch } = this.props;

        const newPillboxSettings = [...this.props.data.pillboxSettings];
        newPillboxSettings.find(
            (obj) => obj.id === id,
        ).email = this.props.emails.find((obj) => obj.id === id).email;
        dispatch(
            setSubscription({
                ...this.props.data,
                pillboxSettings: newPillboxSettings,
            }),
        );
    };

    sendEmailCodeHandler = (email) => {
        const { dispatch } = this.props;

        dispatch(sendEmailCode(email));
    };

    render() {
        return (
            <>
                <FlatPopup title={LK_MAP_ELEMENTS.SETTINGS_PAGE.name}>
                    <Row fullPage>
                        <Column fraction={6} paddings={0}>
                            <Desktop>
                                <ScrollBar>{this.renderPalettes()}</ScrollBar>
                            </Desktop>
                            <Tablet>{this.renderPalettes()}</Tablet>
                        </Column>
                        <Column
                            fraction={6}
                            paddingRight={0}
                            mobilePaddingLeft={0}
                        >
                            <Desktop>
                                <ScrollBar>
                                    {this.renderNotifications()}
                                </ScrollBar>
                            </Desktop>
                            <Tablet>{this.renderNotifications()}</Tablet>
                        </Column>
                    </Row>
                </FlatPopup>
            </>
        );
    }

    renderNotifications = () => {
        return (
            <>
                <WidgetBlock title={"Уведомления об обновлении данных"}>
                    <CheckboxWrapper>
                        <Checkbox
                            onChange={(e) =>
                                this.changeCheckboxHandler(
                                    e,
                                    "dataUpdates",
                                    this.props.data.dataUpdates,
                                )
                            }
                            name={"dataUpdates"}
                            label={"Уведомления об обновлении данных"}
                            value={this.props.data.dataUpdates}
                        />
                    </CheckboxWrapper>
                    <TextBlock>
                        В вашем кабинете, список оказанных услуг, услуг скорой
                        помощи, услуг в регионах, сведений о прикреплениях
                        общего и стоматологического профилей
                    </TextBlock>
                </WidgetBlock>
                <WidgetBlock title={"Уведомления о событиях календаря"}>
                    <CheckboxWrapper>
                        <Checkbox
                            onChange={(e) =>
                                this.changeCheckboxHandler(
                                    e,
                                    "calendarEmails",
                                    this.props.data.calendarEmails,
                                )
                            }
                            name={"calendarEmails"}
                            label={"На электронную почту"}
                            value={this.props.data.calendarEmails}
                        />
                    </CheckboxWrapper>
                    <CheckboxWrapper>
                        <Checkbox
                            onChange={(e) =>
                                this.changeCheckboxHandler(
                                    e,
                                    "calendarPushes",
                                    this.props.data.calendarPushes,
                                )
                            }
                            name={"calendarPushes"}
                            label={"Пуш-уведомления"}
                            value={this.props.data.calendarPushes}
                        />
                    </CheckboxWrapper>
                </WidgetBlock>
                <WidgetBlock title={"Уведомления таблетницы"}>
                    {this.props.data.pillboxSettings.map((item) => {
                        return (
                            <CheckboxWrapper key={item.id}>
                                <Checkbox
                                    onChange={(e) =>
                                        this.changePillboxCheckboxHandler(
                                            e,
                                            item.id,
                                            item.send,
                                        )
                                    }
                                    name={item.name}
                                    label={item.name}
                                    value={item.send}
                                />
                                {item.send ? (
                                    <>
                                        <InputWrapper>
                                            <Input>
                                                <InlineFormField
                                                    label={"Дублировать на:"}
                                                    placeholder={"Адрес почты"}
                                                    value={
                                                        this.props.emails.find(
                                                            (obj) =>
                                                                obj.id ===
                                                                item.id,
                                                        ).email
                                                    }
                                                    onChange={(value) =>
                                                        this.changeInputValueHandler(
                                                            value,
                                                            item.id,
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        this.sendEmailValueHandler(
                                                            item.id,
                                                        )
                                                    }
                                                />
                                            </Input>
                                            <ConfirmEmail
                                                check={item}
                                                mail={item.email}
                                                onSendEmail={() =>
                                                    this.sendEmailCodeHandler(
                                                        item.email,
                                                    )
                                                }
                                                onCheckEmail={() =>
                                                    this.props.dispatch(
                                                        getSubscriptions(),
                                                    )
                                                }
                                            />
                                        </InputWrapper>
                                    </>
                                ) : null}
                            </CheckboxWrapper>
                        );
                    })}
                    <MailStatus></MailStatus>
                </WidgetBlock>
            </>
        );
    };

    onSelect = (item) => () => {
        const { dispatch, userTheme } = this.props;
        saveUserTheme({ ...userTheme, ...item });
        dispatch(changeUserTheme(item));
    };

    renderPalettes = () => {
        const { userThemeId, backgroundImage } = this.props;
        return (
            <>
                <WidgetBlock title={"Палитра"}>
                    <PaletteWrapper>
                        {map(palettes, (item, i) => (
                            <PaletteItem key={`palettes_${i}`}>
                                <Palette
                                    data={item}
                                    onSelect={this.onSelect(item)}
                                    checked={item.id === userThemeId}
                                />
                            </PaletteItem>
                        ))}
                    </PaletteWrapper>
                    <PaletteWrapper>
                        {map(gradients, (item, i) => (
                            <PaletteItem key={`gradients_${i}`}>
                                <Palette
                                    data={item}
                                    onSelect={this.onSelect(item)}
                                    checked={item.id === userThemeId}
                                />
                            </PaletteItem>
                        ))}
                    </PaletteWrapper>
                </WidgetBlock>
                <WidgetBlock title={"Фон"}>
                    <PaletteWrapper>
                        {map(thumbs, (item, i) => (
                            <PaletteItem key={`backgrounds_${i}`}>
                                <Palette
                                    checked={item.key === backgroundImage}
                                    data={item}
                                    onSelect={this.onSelect({
                                        backgroundImage: item.key,
                                    })}
                                />
                            </PaletteItem>
                        ))}
                    </PaletteWrapper>
                </WidgetBlock>
            </>
        );
    };
}

const Input = styled.div`
    flex: 1 1 auto;
`;

const PaletteWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        justify-content: center;
    }
`;

const PaletteItem = styled.div`
    margin-right: 15px;
    margin-bottom: 15px;
`;

const CheckboxWrapper = styled.div`
    margin-bottom: 20px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;

    > div {
        margin-right: 10px;
    }
`;

const MailStatus = styled.div``;

Settings.propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    backgroundImage: PropTypes.string,
    emails: PropTypes.array,
    userThemeId: PropTypes.string,
    userTheme: PropTypes.object,
};

export default Settings;
