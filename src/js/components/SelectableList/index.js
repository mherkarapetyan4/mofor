import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { darken } from "polished";

class SelectableList extends PureComponent {
    render() {
        const { list, onSelect } = this.props;

        return (
            <Wrapper>
                {list.map((item, i) => (
                    <Item key={i} onClick={() => onSelect(item)}>
                        {item.label}
                    </Item>
                ))}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    border-radius: 5px;
    padding: 2px;
`;

const Item = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: props.theme.fonts.sizes.normal,
            color: props.theme.colors.text.colorBlack,
        })};
    background-color: ${(props) => props.theme.colors.background.white};
    border-radius: 2px;
    cursor: pointer;
    transition: background-color ${(props) => props.theme.animations.transition};
    padding: 10px;

    &:hover {
        background-color: ${(props) =>
            darken(0.05, props.theme.colors.background.white)};
    }
`;

SelectableList.propTypes = {
    list: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default SelectableList;
