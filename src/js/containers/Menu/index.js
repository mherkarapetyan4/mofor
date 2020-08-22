import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import theme from "config/theme";
import { withRouter } from "react-router-dom";
import { Desktop } from "wrappers/responsive";
import MGFOMSShortLogo from "components/MGFOMSShortLogo";
import MenuElements from "containers/Menu/MenuElements";
import ScrollBar from "components/ScrollBar";

@withRouter
@withTheme
class Menu extends PureComponent {
    static propTypes = {
        elements: PropTypes.array.isRequired,
        ward: PropTypes.bool,
    };

    render() {
        const { elements } = this.props;
        return (
            <Desktop>
                <MenuWrapper>
                    <MGFOMSShortLogo color={theme.logo.color} />
                    <ScrollBar>
                        <MenuElements elements={elements} />
                    </ScrollBar>
                </MenuWrapper>
            </Desktop>
        );
    }
}

const MenuWrapper = styled.div`
    width: ${(props) => props.theme.menu.width};
    height: ${(props) => props.theme.menu.height};
    background: ${(props) => props.theme.userTheme.backgroundColor};
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export default Menu;
