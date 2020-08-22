import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import PregnancyIcon from "icons/PregnancyIcon";
import { darken } from "polished";
import { fontStyles } from "styledMixins/mixins";

@withTheme
class PregnancyScreening extends PureComponent {
    render() {
        const { severity, alert } = this.props.data;
        const { theme } = this.props;

        return (
            <Wrapper>
                <Icon>
                    <PregnancyIcon
                        color={darken(0.1, this.renderColor(theme, severity))}
                    />
                </Icon>
                <Text>{alert}</Text>
            </Wrapper>
        );
    }

    renderColor = (theme, number) => {
        switch (number) {
            case 1:
                return theme.colors.grades.plainColors.levelOne;
            case 2:
                return theme.colors.grades.plainColors.levelTwo;
            case 3:
                return theme.colors.grades.plainColors.levelThree;
            case 4:
                return theme.colors.grades.plainColors.levelFour;
            case 5:
                return theme.colors.grades.plainColors.levelFive;
            default:
                return theme.userTheme.color;
        }
    };
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: ${(props) => props.theme.paddings.normal};
`;

const Icon = styled.div`
    margin-right: 25px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.big};
`;

PregnancyScreening.propTypes = {
    data: PropTypes.object.isRequired,
    theme: PropTypes.object,
};

export default PregnancyScreening;
