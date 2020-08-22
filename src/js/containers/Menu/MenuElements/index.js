import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LongArrowIcon from "icons/LongArrowIcon";
import theme from "config/theme";
import { history } from "routes/history";
import { RESPONSIVE } from "config/consts";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LK_MENU_ELEMENTS } from "config/menu";

@withRouter
@connect((state) => ({
    settings: state.user.settings,
    isWard: state.myData.myData.ward,
}))
class MenuElements extends PureComponent {
    render() {
        const { elements, settings, isWard } = this.props;

        let filteredElements = [...elements];
        filteredElements = filteredElements.filter(
            (item) =>
                !(
                    (item.path === LK_MENU_ELEMENTS.PREGNANCY_PAGE.path &&
                        !settings.pregnancy) ||
                    (item.path === LK_MENU_ELEMENTS.ONCO_PAGE.path &&
                        !settings.onco) ||
                    (item.path === LK_MENU_ELEMENTS.POLIS_PAGE.path &&
                        !settings.policyClaim) ||
                    (item.path === LK_MENU_ELEMENTS.VACCINATION_PAGE.path &&
                        !isWard)
                ),
        );

        return (
            <MenuElementsWrapper>
                {filteredElements.map((item) => this.renderItem(item, isWard))}
            </MenuElementsWrapper>
        );
    }

    renderItem = (item, isWard) => {
        const { location, toggleMenu, settings } = this.props;

        return (
            <Element key={`menu-item-${item.id}`}>
                <AnimationWrapper
                    onClick={() => {
                        if (
                            settings.emiasVersion !== 5 &&
                            item.path === LK_MENU_ELEMENTS.DOCTOR_PAGE.path
                        ) {
                            window.open("https://emias.info/", "_blank");
                        } else {
                            history.push(item.path);
                            toggleMenu && toggleMenu();
                        }
                    }}
                >
                    <MenuIcon>
                        <LongArrowIcon
                            color={theme.colors.text.colorWhite}
                            opacity={1}
                        />
                    </MenuIcon>
                    <ElementTitle
                        active={location.pathname === item.path}
                        data-step={this.checkPath(item, "step")}
                        data-description={this.checkPath(item, "description")}
                    >
                        {isWard ? item.wardName || item.name : item.name}
                    </ElementTitle>
                </AnimationWrapper>
            </Element>
        );
    };

    checkPath = (item, type) => {
        const { location } = this.props;

        if (location.pathname === item.path) {
            if (type === "step") {
                return item.helper?.dataStep ? item.helper.dataStep : null;
            }
            return item?.helper?.dataDescription
                ? item.helper.dataDescription
                : null;
        }

        return null;
    };
}

const MenuElementsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px 0;
    flex: 1 1 auto;
    overflow-y: auto;
`;

const Element = styled.div`
    margin: 25px 0 25px 75px;
    overflow: hidden;
    flex: 0 0 auto;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin: 25px 0 25px 50px;
    }
`;

const ElementTitle = styled.span`
    color: ${(props) =>
        props.active
            ? props.theme.menu.textColorHover
            : props.theme.menu.textColor};
    font-family: ${(props) => props.theme.fonts.family.gothamMedium};
    font-size: ${(props) => props.theme.fonts.sizes.normal};
    padding-left: 10px;
`;

const MenuIcon = styled.div``;

const AnimationWrapper = styled.div`
    display: flex;
    align-items: center;
    transform: translateX(-50px);
    transition: color, transform,
        ${(props) => props.theme.animations.transition};
    cursor: pointer;

    &:hover {
        span {
            color: ${(props) => props.theme.menu.textColorHover};
        }

        transform: translateX(0px);
    }
`;

MenuElements.propTypes = {
    elements: PropTypes.array.isRequired,
    location: PropTypes.object,
    settings: PropTypes.object,
    isWard: PropTypes.object,
    toggleMenu: PropTypes.func,
};

export default MenuElements;
