import React, { PureComponent } from "react";
import styled, { withTheme } from "styled-components";
import MobileMenu from "components/MobileMenu";
import MGFOMSShortLogo from "components/MGFOMSShortLogo";
import PropTypes from "prop-types";
import MenuIcon from "icons/MenuIcon";
import Actions from "containers/Header/Actions";

@withTheme
class MobileHeader extends PureComponent {
    menuIcon = [
        {
            icon: <MenuIcon opacity={0.5} />,
            action: () => this.toggleMenu(),
        },
    ];

    state = {
        isOpened: false,
    };

    render() {
        const { theme } = this.props;
        const { isOpened } = this.state;

        return (
            <Wrapper>
                <LogoWrapper>
                    <MGFOMSShortLogo color={theme.userTheme.color} />
                </LogoWrapper>
                <MenuWrapper>
                    <MenuIconWrapper>
                        <Actions items={this.menuIcon} />
                    </MenuIconWrapper>
                    <MobileMenu isOpened={isOpened} onClose={this.toggleMenu} />
                </MenuWrapper>
            </Wrapper>
        );
    }

    toggleMenu = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    };
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const LogoWrapper = styled.div``;

const MenuWrapper = styled.div``;

const MenuIconWrapper = styled.div``;

MobileHeader.propTypes = {
    theme: PropTypes.object,
};

export default MobileHeader;
