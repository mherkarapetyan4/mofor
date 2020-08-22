import React, { PureComponent } from "react";
import styled from "styled-components";
import ActionsWithRouter from "containers/Header/Actions/ActionsWithRouter";
import MapIcon from "icons/MapIcon";
import HeartIcon from "icons/HeartIcon";
import googlePlay from "images/mobileApps/google.png";
import appleStore from "images/mobileApps/appleStoreLogo.png";
import { history } from "routes/history";
import { LK_MAP_ELEMENTS, LK_MENU_ELEMENTS } from "config/menu";
import { RESPONSIVE } from "config/consts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PageFindIcon from "icons/PageFindIcon";
import AssignmentIcon from "icons/AssignmentIcon";
import { Desktop, Tablet } from "wrappers/responsive";
import GoogleIcon from "icons/GoogleIcon";
import AppleIcon from "icons/AppleIcon";
import { fontStyles } from "styledMixins/mixins";

@connect()
class Footer extends PureComponent {
    static propTypes = {
        admin: PropTypes.bool,
    };

    footerActions = [
        {
            id: 0,
            icon: <HeartIcon opacity={0.5} />,
            action: () => {
                history.push(LK_MAP_ELEMENTS.ABOUT_PAGE.path);
            },
            tooltip: "О проекте",
            path: LK_MAP_ELEMENTS.ABOUT_PAGE.path,
        },
        {
            id: 1,
            icon: <MapIcon opacity={0.5} />,
            action: () => {
                history.push(LK_MENU_ELEMENTS.SITE_MAP_PAGE.path);
            },
            tooltip: "Карта сайта",
            path: LK_MENU_ELEMENTS.SITE_MAP_PAGE.path,
        },
        {
            id: 2,
            icon: <PageFindIcon opacity={0.5} />,
            action: () => {
                history.push(LK_MENU_ELEMENTS.CONFIDENTIAL_PAGE.path);
            },
            tooltip: "Положение о конфиденциальности",
            path: LK_MENU_ELEMENTS.CONFIDENTIAL_PAGE.path,
        },
        {
            id: 3,
            icon: <AssignmentIcon opacity={0.5} />,
            action: () => {
                history.push(LK_MENU_ELEMENTS.RULES_PAGE.path);
            },
            tooltip: "Правила работы с сервисом",
            path: LK_MENU_ELEMENTS.RULES_PAGE.path,
        },
    ];

    marketsActions = [
        {
            icon: <GoogleIcon opacity={0.5} />,
            tooltip: "Google Play",
            action: () =>
                window.open(
                    "https://play.google.com/store/apps/details?id=ru.mgfoms.pandora&rdid=ru.mgfoms.pandora",
                    "_blank",
                ),
        },
        {
            icon: <AppleIcon opacity={0.5} />,
            tooltip: "Apple Store",
            action: () =>
                window.open(
                    "https://itunes.apple.com/us/app/%D0%BC%D0%B3%D1%84%D0%BE%D0%BC%D1%81/id1288040721?l=ru&ls=1&mt=8",
                    "_blank",
                ),
        },
    ];

    render() {
        const { admin } = this.props;
        return (
            <FooterWrapper>
                <Copyright>
                    <a href="https://www.mgfoms.ru/">
                        © 2020 “Московский городской фонд обязательного
                        медицинского страхования”
                    </a>
                </Copyright>
                {!admin && (
                    <Content>
                        <ActionsWithRouter items={this.footerActions} />
                        <Desktop>
                            <Links>
                                <a
                                    href={
                                        "https://play.google.com/store/apps/details?id=ru.mgfoms.pandora&rdid=ru.mgfoms.pandora"
                                    }
                                    rel="noopener noreferrer"
                                    target={"_blank"}
                                >
                                    <img src={googlePlay} alt="googleplay" />
                                </a>
                                <a
                                    href={
                                        "https://itunes.apple.com/us/app/%D0%BC%D0%B3%D1%84%D0%BE%D0%BC%D1%81/id1288040721?l=ru&ls=1&mt=8"
                                    }
                                    rel="noopener noreferrer"
                                    target={"_blank"}
                                >
                                    <img src={appleStore} alt="applestore" />
                                </a>
                            </Links>
                        </Desktop>
                        <Tablet>
                            <Links>
                                <ActionsWithRouter
                                    items={this.marketsActions}
                                />
                            </Links>
                        </Tablet>
                    </Content>
                )}
            </FooterWrapper>
        );
    }
}

const FooterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${(props) => props.theme.footer.height};
    padding: 0 ${(props) => props.theme.paddings.normal};
    border-top: 1px solid ${(props) => props.theme.colors.borderColor};

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        flex-direction: column;
        height: auto;
        padding: 0 10px;
    }
`;

const Copyright = styled.div`
    ${(props) => fontStyles(props)};

    a {
        color: inherit;
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        padding: 10px 0;
    }
`;

const Content = styled.div`
    display: flex;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        padding: 10px 0;
    }
`;

const Links = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;

    a {
        margin-right: 20px;

        &:last-child {
            margin-right: 0;
        }
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-left: 10px;

        a {
            margin-right: 5px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
`;
Footer.propTypes = {
    dispatch: PropTypes.func,
};
export default Footer;
