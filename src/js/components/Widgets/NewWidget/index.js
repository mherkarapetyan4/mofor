import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddWidgetIcon from "icons/AddWidgetIcon";
import { darken } from "polished";

class NewWidget extends PureComponent {
    render() {
        const { onAdd, disable } = this.props;

        return (
            <NewWidgetWrapper onClick={disable ? false : onAdd}>
                <AddWidgetIcon color={"#ddd"} />
            </NewWidgetWrapper>
        );
    }
}

const NewWidgetWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 334px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color ${(props) => props.theme.animations.transition};

    &:hover {
        background-color: ${(props) =>
            darken(0.1, props.theme.colors.background.white)};

        svg {
            fill: #fff;
        }
    }
`;

NewWidget.propTypes = {
    onAdd: PropTypes.func.isRequired,
    disable: PropTypes.bool,
};

NewWidget.defaultProps = {
    disable: false,
};

export default NewWidget;
