import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";

class ListItem extends PureComponent {
    render() {
        const { renderItem, rigid } = this.props;

        return <ItemWrapper rigid={rigid}>{renderItem()}</ItemWrapper>;
    }
}

const ItemWrapper = styled.div`
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 10px;
    cursor: ${(props) => (props.rigid ? "default" : "pointer")};
    transition: border ${(props) => props.theme.animations.transition};
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: ${(props) =>
        rgba(props.theme.colors.background.white, 0.9)};

    &:hover {
        border: 1px solid
            ${(props) =>
                props.rigid
                    ? props.theme.colors.borderColor
                    : props.theme.userTheme.color};
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

ListItem.propTypes = {
    renderItem: PropTypes.func.isRequired,
    rigid: PropTypes.bool,
};

ListItem.defaultProps = {
    rigid: false,
};

export default ListItem;
