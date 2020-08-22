import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class RejectedInfoWarning extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        field: PropTypes.string.isRequired,
        isWard: PropTypes.bool.isRequired,
    };

    render() {
        const { isWard, data, field } = this.props;
        if (data[field] !== false) {
            return null;
        }

        return (
            <Wrapper>
                {isWard
                    ? "Вы указали, что данные документа некорректны."
                    : "Вы указали, что данные документов некорректны"}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.notifications.alert,
            font: "bold",
        })};
    margin-bottom: 16px;
`;

export default RejectedInfoWarning;
