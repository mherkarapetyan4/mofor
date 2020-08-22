import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { fontStyles } from "styledMixins/mixins";

@withTheme
class TextBlock extends PureComponent {
    render() {
        const { children, font, theme } = this.props;

        return (
            <Wrapper
                font={
                    font || {
                        color: theme.colors.text.colorBlack,
                        size: theme.fonts.sizes.small,
                        family: "normal",
                    }
                }
            >
                {children}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: props.font.family,
            size: props.font.size,
            color: props.font.color,
        })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-bottom: ${(props) => props.theme.paddings.normal};

    &:last-child {
        margin-bottom: 0;
    }
`;

TextBlock.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.number,
        PropTypes.array,
    ]).isRequired,
    font: PropTypes.shape({
        color: PropTypes.string,
        size: PropTypes.string,
        family: PropTypes.string,
    }),
    theme: PropTypes.object,
};

export default TextBlock;
