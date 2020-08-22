import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import ServiceLogo from "components/MGFOMSLogo/ServiceLogo";
import { Desktop, Tablet } from "wrappers/responsive";

class MGFOMSLogo extends PureComponent {
    render() {
        const { color } = this.props;

        return (
            <>
                <Desktop>
                    <LogoWrapper color={color}>
                        <ServiceLogo color={color} />
                    </LogoWrapper>
                </Desktop>
                <Tablet>
                    <ServiceLogo color={color} />
                </Tablet>
            </>
        );
    }
}

const LogoWrapper = styled.div`
    border-bottom: 1px solid
        ${(props) => props.theme.colors.borderInGradientColor};
    transition: background-color ${(props) => props.theme.animations.transition};

    &:hover {
        background-color: ${(props) =>
            rgba(props.theme.colors.background.white, 0.1)};
    }
`;

MGFOMSLogo.propTypes = {
    color: PropTypes.string,
    location: PropTypes.object,
};

export default MGFOMSLogo;
