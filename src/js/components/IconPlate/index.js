import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { gradientColorPicker } from "utils/colorPicker";
import { RESPONSIVE } from "config/consts";
import Tooltip from "react-tooltip-lite";

@withTheme
class IconPlate extends PureComponent {
    constructor(props) {
        super(props);

        this.backgroundColor = gradientColorPicker(props);
    }

    render() {
        const { tooltip } = this.props;

        return (
            <Wrapper>
                {tooltip ? (
                    <Tooltip content={tooltip && tooltip}>
                        {this.renderContent()}
                    </Tooltip>
                ) : (
                    this.renderContent()
                )}
            </Wrapper>
        );
    }

    renderContent = () => {
        const { title, width, height } = this.props;

        return (
            <IconPlateWrapper
                backgroundColor={this.backgroundColor}
                width={width}
                height={height}
            >
                {title}
            </IconPlateWrapper>
        );
    };
}

const Wrapper = styled.div``;

const IconPlateWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 6px;
    background: ${(props) => props.backgroundColor};
    color: #fff;
    font-family: ${(props) => props.theme.fonts.family.newsCondensed};
    font-size: ${(props) => props.theme.fonts.sizes.plate};

    svg {
        width: 24px;
        height: 24px;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: ${(props) => props.width - 10}px;
        height: ${(props) => props.height - 10}px;
        font-size: ${(props) => props.theme.fonts.sizes.large};

        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

IconPlate.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    tooltip: PropTypes.string,
};

IconPlate.defaultProps = {
    width: 40,
    height: 40,
};

export default IconPlate;
