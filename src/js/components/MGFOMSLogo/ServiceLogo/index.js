import React, { PureComponent } from "react";
import Logo from "icons/Logo";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";
import { fontStyles } from "styledMixins/mixins";

@withTheme
class ServiceLogo extends PureComponent {
    render() {
        const { color, theme } = this.props;

        return (
            <Wrapper>
                <Icon>
                    <Logo color={color} opacity={theme.logo.opacity} />
                </Icon>
                <Text color={color}>МГФОМС</Text>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => props.theme.logo.height};
`;

const Icon = styled.div`
    width: 37px;
    height: 32px;
    margin-right: 6px;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "medium",
            size: props.theme.fonts.sizes.large,
        })};
    color: ${(props) => props.color};
    text-transform: uppercase;
`;

ServiceLogo.propTypes = {
    color: PropTypes.string,
    theme: PropTypes.object,
};

export default ServiceLogo;
