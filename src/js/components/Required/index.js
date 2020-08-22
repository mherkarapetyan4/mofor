import React, { PureComponent } from "react";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class Required extends PureComponent {
    render() {
        return <Wrapper>*</Wrapper>;
    }
}

const Wrapper = styled.div`
    display: inline-block;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.normal,
            color: props.theme.colors.notifications.alert,
        })};
`;

export default Required;
