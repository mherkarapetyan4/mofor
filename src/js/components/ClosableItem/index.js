import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CloseIcon from "icons/CloseIcon";
import { fontStyles } from "styledMixins/mixins";

class ClosableItem extends PureComponent {
    render() {
        const { title, onClick, closable } = this.props;

        return (
            <Wrapper>
                <Title>{title}</Title>
                {closable && (
                    <Close onClick={onClick}>
                        <CloseIcon color={"#fff"} />
                    </Close>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    border-radius: 5px;
    padding: 8px 8px 8px 12px;
    background-color: ${(props) => props.theme.userTheme.color};
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const Title = styled.div`
    ${(props) => fontStyles(props)};
    color: ${(props) => props.theme.colors.text.colorWhite};
    line-height: ${(props) => props.theme.fonts.lineHeight.big};
`;

const Close = styled.div`
    line-height: 0;
    margin-left: 20px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color ${(props) => props.theme.animations.transition};

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

ClosableItem.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    closable: PropTypes.bool,
};

ClosableItem.defaultProps = {
    closable: true,
    onClick: () => {},
};
export default ClosableItem;
