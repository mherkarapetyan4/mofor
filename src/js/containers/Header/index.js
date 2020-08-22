import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Actions from "containers/Header/Actions";
import ActionsWithRouter from "containers/Header/Actions/ActionsWithRouter";
import Profile from "containers/Header/Profile";
import User from "containers/Header/User";
import { connect } from "react-redux";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import SettingsIcon from "icons/SettingsIcon";
import ChatIcon from "icons/ChatIcon";
import HelpIcon from "icons/HelpIcon";
import UpdateIcon from "icons/UpdateIcon";
import QuestionnaireIcon from "icons/QuestionnaireIcon";
import ContactsIcon from "icons/ContactsIcon";
import SMORequestIcon from "icons/SMORequestIcon";
import { history } from "routes/history";
import { LK_MAP_ELEMENTS } from "config/menu";
import { show, hide } from "actions/anchorPopup";
import Questionnaire from "pages/Questionnaire";
import ServiceUpdate from "components/ServiceUpdate";
import SMORequest from "components/SMORequest";
import ExitIcon from "icons/ExitIcon";
import { logout } from "actions/auth";
import { Desktop, Tablet } from "wrappers/responsive";
import MobileHeader from "containers/MobileHeader";
import { isShowHelper } from "actions/app";
import { ADMIN_ROLES, RESPONSIVE } from "config/consts";
import { adminLogout } from "actions/admin";
import { withRouter } from "react-router-dom";

@withRouter
@connect((state) => ({
    myData: state.myData.myData,
    actual: state.user.actual,
    questionary: state.user.questionary,
    adminUser: state.admin.user,
    ward: state.myData.myData.ward,
}))
class Header extends PureComponent {
    actions = (important, hideObject) => {
        return [
            {
                id: 0,
                icon: <SettingsIcon opacity={0.5} />,
                action: () => {
                    history.push(LK_MAP_ELEMENTS.SETTINGS_PAGE.path);
                },
                tooltip: "Настройки",
                path: LK_MAP_ELEMENTS.SETTINGS_PAGE.path,
            },
            {
                id: 1,
                icon: <ChatIcon opacity={0.5} />,
                action: () => {
                    window.open(
                        "https://www.mgfoms.ru/chastnye-lica/goryachaya-liniya",
                        "_blank",
                    );
                },
                tooltip: "Куда обратиться",
            },
            {
                id: 2,
                icon: <HelpIcon opacity={0.5} />,
                action: () => {
                    this.props.dispatch(isShowHelper());
                },
                tooltip: "Помощь",
            },
            {
                id: 3,
                icon: <UpdateIcon opacity={0.5} />,
                action: (position) =>
                    this.props.dispatch(
                        show({
                            position,
                            component: <ServiceUpdate />,
                            title: "Обновления сервиса",
                        }),
                    ),
                inactive: true,
                tooltip: "Обновления сервиса",
                important: important.update,
            },
            {
                id: 4,
                icon: <QuestionnaireIcon opacity={0.5} />,
                action: (position) =>
                    this.props.dispatch(
                        show({
                            position,
                            component: <Questionnaire />,
                            title: "Анкетирование",
                        }),
                    ),
                inactive: true,
                tooltip: "Анкетирование",
                important: important.questionary,
                hide: hideObject.ward,
            },
            {
                id: 5,
                icon: <ContactsIcon opacity={0.5} />,
                action: () => {
                    history.push(LK_MAP_ELEMENTS.CONTACTS_PAGE.path);
                },
                tooltip: "Контакты",
                path: LK_MAP_ELEMENTS.CONTACTS_PAGE.path,
            },
            {
                id: 6,
                icon: <SMORequestIcon opacity={0.5} />,
                action: (position) =>
                    this.props.dispatch(
                        show({
                            position,
                            component: (
                                <SMORequest
                                    hideModal={() =>
                                        this.props.dispatch(hide())
                                    }
                                />
                            ),
                            title: "Обращения в Вашу страховую компанию",
                        }),
                    ),
                inactive: true,
                tooltip: "Обращения в Вашу страховую компанию",
            },
        ];
    };

    exitIcon = [
        {
            id: 0,
            icon: <ExitIcon opacity={0.5} />,
            action: () => {
                this.props.dispatch(logout());
            },
            tooltip: "Выход",
        },
    ];

    exitIconAdmin = [
        {
            id: 0,
            icon: <ExitIcon opacity={0.5} />,
            action: () => {
                this.props.dispatch(adminLogout());
                localStorage.removeItem("adminUserInfo");
                // history.push(ADMIN_ELEMENTS.AUTH_PAGE.path);
            },
            tooltip: "Выход",
        },
    ];

    static propTypes = {
        myData: PropTypes.object,
        actual: PropTypes.object.isRequired,
        questionary: PropTypes.object.isRequired,
        adminUser: PropTypes.object.isRequired,
        dispatch: PropTypes.func,
        admin: PropTypes.bool,
        ward: PropTypes.bool,
    };

    render() {
        const { myData, admin, adminUser, ward } = this.props;

        return (
            <HeaderWrapper>
                <Desktop>
                    {!admin && (
                        <ActionsWrapper>
                            <ActionsWithRouter
                                items={this.actions(
                                    {
                                        update: !!get(this.props.actual, "id"),
                                        questionary: !isEmpty(
                                            this.props.questionary,
                                        ),
                                    },
                                    {
                                        ward,
                                    },
                                )}
                            />
                        </ActionsWrapper>
                    )}
                    <UserInfo>
                        {!admin && (
                            <ProfileWrapper>
                                <Profile />
                            </ProfileWrapper>
                        )}
                        {admin && (
                            <User
                                firstName={get(adminUser, "name", "")}
                                middleName={
                                    ADMIN_ROLES[get(adminUser, "role.name", "")]
                                }
                            />
                        )}
                        {!admin && (
                            <User
                                firstName={get(myData, "person.firstName", "")}
                                middleName={get(
                                    myData,
                                    "person.middleName",
                                    "",
                                )}
                            />
                        )}
                        {!admin ? (
                            <Exit>
                                <Actions items={this.exitIcon} />
                            </Exit>
                        ) : (
                            <Exit>
                                <Actions items={this.exitIconAdmin} />
                            </Exit>
                        )}
                    </UserInfo>
                </Desktop>
                {!admin && (
                    <Tablet>
                        <MobileHeader />
                    </Tablet>
                )}
            </HeaderWrapper>
        );
    }
}

const ActionsWrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-start;
`;

const ProfileWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: ${(props) => props.theme.header.height};
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
    padding: 0 16px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        height: 50px;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

const Exit = styled.div`
    margin-left: 20px;
`;

export default Header;
