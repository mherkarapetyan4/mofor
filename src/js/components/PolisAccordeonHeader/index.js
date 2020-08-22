import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import CheckIcon from "icons/CheckIcon";
import ArrowIcon from "icons/ArrowIcon";

@withTheme
class PolisAccordeonHeader extends PureComponent {
    render() {
        const { data, theme } = this.props;
        const { title, checked } = data;

        return (
            <Wrapper>
                <TitleWrapper>
                    <Title>{title}</Title>
                    {checked && (
                        <CheckIconWrapper>
                            <CheckIcon color={theme.userTheme.color} />
                        </CheckIconWrapper>
                    )}
                </TitleWrapper>
                <ActionsWrapper>
                    <ArrowIconWrapper>
                        <ArrowIcon
                            opacity={0.5}
                            rotate={this.handleClick() ? 90 : -90}
                        />
                    </ArrowIconWrapper>
                </ActionsWrapper>
            </Wrapper>
        );
    }

    handleClick = () => {
        const { itemClicked, itemKey, openElements } = this.props;
        return (
            itemClicked === openElements.indexOf(openElements[itemKey]) &&
            openElements[itemKey] !== false
        );
    };
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const CheckIconWrapper = styled.div`
    margin-left: 20px;
`;

const ArrowIconWrapper = styled.div`
    width: 24px;
    height: 24px;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

PolisAccordeonHeader.propTypes = {
    data: PropTypes.object.isRequired,
    theme: PropTypes.object,
    itemKey: PropTypes.number,
    itemClicked: PropTypes.number,
    openElements: PropTypes.array,
};

export default PolisAccordeonHeader;
