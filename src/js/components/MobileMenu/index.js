import React, { PureComponent } from "react";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";
import MGFOMSShortLogo from "components/MGFOMSShortLogo";
import CloseIcon from "icons/CloseIcon";
import Actions from "containers/Header/Actions";
import ActionsWithRouter from "containers/Header/Actions/ActionsWithRouter";
import {
    AUTH_REDIRECT,
    LK_LEFT_MENU_ELEMENTS,
    LK_MAP_ELEMENTS,
} from "config/menu";
import MenuElements from "containers/Menu/MenuElements";
import SettingsIcon from "icons/SettingsIcon";
import { history } from "routes/history";
import ChatIcon from "icons/ChatIcon";
import UpdateIcon from "icons/UpdateIcon";
import { show } from "actions/anchorPopup";
import ServiceUpdate from "components/ServiceUpdate";
import QuestionnaireIcon from "icons/QuestionnaireIcon";
import Questionnaire from "pages/Questionnaire";
import ContactsIcon from "icons/ContactsIcon";
import SMORequestIcon from "icons/SMORequestIcon";
import SMORequest from "components/SMORequest";
import { connect } from "react-redux";
import { RESPONSIVE } from "config/consts";
import ExitIcon from "icons/ExitIcon";
import { logout } from "actions/auth";
import Profile from "containers/Header/Profile";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

@connect((state) => ({
    ward: state.myData.myData.ward,
    actual: state.user.actual,
    questionary: state.user.questionary,
}))
@withTheme
class MobileMenu extends PureComponent {
    actions = (important, hide) => {
        return [
            {
                icon: (
                    <SettingsIcon
                        color={this.props.theme.colors.text.colorWhite}
                        opacity={0.5}
                    />
                ),
                staticColor: true,
                action: () => {
                    history.push(LK_MAP_ELEMENTS.SETTINGS_PAGE.path);
                    this.props.onClose();
                },
                tooltip: "Настройки",
                path: LK_MAP_ELEMENTS.SETTINGS_PAGE.path,
            },
            {
                icon: (
                    <ChatIcon
                        color={this.props.theme.colors.text.colorWhite}
                        opacity={0.5}
                    />
                ),
                staticColor: true,
                action: () => {
                    window.open(
                        "https://www.mgfoms.ru/chastnye-lica/goryachaya-liniya",
                        "_blank",
                    );
                    this.props.onClose();
                },
                tooltip: "Куда обратиться",
            },
            {
                icon: (
                    <UpdateIcon
                        color={this.props.theme.colors.text.colorWhite}
                        opacity={0.5}
                    />
                ),
                staticColor: true,
                action: (position) => {
                    this.props.dispatch(
                        show({
                            position,
                            component: <ServiceUpdate />,
                            title: "Обновления сервиса",
                        }),
                    );
                    this.props.onClose();
                },
                tooltip: "Обновления сервиса",
                important: important.update,
            },
            {
                icon: (
                    <QuestionnaireIcon
                        color={this.props.theme.colors.text.colorWhite}
                        opacity={0.5}
                    />
                ),
                staticColor: true,
                action: (position) => {
                    this.props.dispatch(
                        show({
                            position,
                            component: <Questionnaire />,
                            title: "Анкетирование",
                        }),
                    );
                    this.props.onClose();
                },
                tooltip: "Анкетирование",
                important: important.questionary,
                hide: hide.ward,
            },
            {
                icon: (
                    <ContactsIcon
                        color={this.props.theme.colors.text.colorWhite}
                        opacity={0.5}
                    />
                ),
                staticColor: true,
                action: () => {
                    history.push(LK_MAP_ELEMENTS.CONTACTS_PAGE.path);
                    this.props.onClose();
                },
                tooltip: "Контакты",
                path: LK_MAP_ELEMENTS.CONTACTS_PAGE.path,
            },
            {
                icon: (
                    <SMORequestIcon
                        color={this.props.theme.colors.text.colorWhite}
                        opacity={0.5}
                    />
                ),
                staticColor: true,
                action: (position) => {
                    this.props.dispatch(
                        show({
                            position,
                            component: <SMORequest />,
                            title: "Обращения в Вашу страховую компанию",
                        }),
                    );
                    this.props.onClose();
                },
                tooltip: "Обращения в Вашу страховую компанию",
            },
        ];
    };

    closeIcon = [
        {
            icon: (
                <ExitIcon
                    color={this.props.theme.colors.text.colorWhite}
                    opacity={0.5}
                />
            ),
            action: () => {
                this.props.dispatch(logout());
                history.push(AUTH_REDIRECT);
            },
        },
        {
            icon: <CloseIcon color={"#fff"} />,
            action: () => {
                this.props.onClose();
            },
        },
    ];

    render() {
        const { isOpened, onClose, ward, actual, questionary } = this.props;

        return (
            <Wrapper isOpened={isOpened}>
                <Header>
                    <LogoWrapper>
                        <MGFOMSShortLogo color={"#fff"} />
                    </LogoWrapper>
                    <IconWrapper>
                        <Actions items={this.closeIcon} />
                    </IconWrapper>
                </Header>
                <MenuWrapper>
                    <MenuElements
                        elements={LK_LEFT_MENU_ELEMENTS}
                        toggleMenu={onClose}
                    />
                    <ProfileWrapper>
                        <Profile />
                    </ProfileWrapper>
                </MenuWrapper>
                <MobileMenuFooter>
                    <ActionsWithRouter
                        items={this.actions(
                            {
                                update: !!get(actual, "id"),
                                questionary: !isEmpty(questionary),
                            },
                            {
                                ward,
                            },
                        )}
                    />
                </MobileMenuFooter>
            </Wrapper>
        );
    }
}

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div`
    position: fixed;
    display: ${(props) => (props.isOpened ? "flex" : "none")};
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: ${(props) => props.theme.userTheme.backgroundColor};
    z-index: 1000;
`;

const LogoWrapper = styled.div``;

const MenuWrapper = styled.div`
    padding: 0 16px;
    flex: 1 1 auto;
    overflow-y: auto;
`;

const IconWrapper = styled.div``;

const Header = styled.div`
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid
        ${(props) => props.theme.colors.borderInGradientColor};
    padding: 0 16px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        height: 50px;
    }
`;

const MobileMenuFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    padding: 16px;
`;

MobileMenu.propTypes = {
    isOpened: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    theme: PropTypes.object,
    ward: PropTypes.bool.isRequired,
    actual: PropTypes.object.isRequired,
    questionary: PropTypes.object.isRequired,
};

MobileMenu.defaultProps = {
    isOpened: false,
};

export default MobileMenu;
