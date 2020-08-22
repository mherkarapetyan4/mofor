import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class UnorderedList extends PureComponent {
    render() {
        const { data } = this.props;

        return (
            <Wrapper>
                {data.map((item, i) => (
                    <Item key={i}> - {item.text}</Item>
                ))}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const Item = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

UnorderedList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default UnorderedList;
