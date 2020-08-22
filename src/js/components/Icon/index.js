import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Icon extends PureComponent {
    render() {
        const { icon, width, height, opacity, color } = this.props;
        const { hoverOpacity, hoverColor } = this.props.options;

        const IconComponent = icon;

        return (
            <Wrapper
                hoverColor={hoverColor}
                hoverOpacity={hoverOpacity}
                width={width}
                height={height}
            >
                <IconComponent opacity={opacity} color={color} />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    svg {
        width: 100%;
        height: 100%;
        transition: fill, fill-opacity,
            ${(props) => props.theme.animations.transition};
    }

    &:hover {
        svg {
            fill: ${(props) => props.hoverColor};
            fill-opacity: ${(props) => props.hoverOpacity};
        }
    }
`;

Icon.propTypes = {
    icon: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    opacity: PropTypes.number,
    color: PropTypes.string,
    options: PropTypes.shape({
        hoverOpacity: PropTypes.number,
        hoverColor: PropTypes.string,
    }),
};

Icon.deafultProps = {
    width: "24px",
    height: "24px",
    color: "#000",
    opacity: 1,
};

export default Icon;
