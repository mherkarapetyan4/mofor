import React, { PureComponent } from "react";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class PolicyRenew extends PureComponent {
    render() {
        return (
            <Text>
                Вам необходимо направить заявление на замену полиса ОМС.
                Перейдите, пожалуйста, в раздел Заявление на полис.
            </Text>
        );
    }
}

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin: 10px;
`;

export default PolicyRenew;
