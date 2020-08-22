import React, { PureComponent } from "react";
import styled from "styled-components";
import { Button } from "components/Button";
import { history } from "routes/history";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";

class PageNotFound extends PureComponent {
    render() {
        return (
            <Wrapper>
                <Code>404</Code>
                <Title>Страница не найдена</Title>
                <Button label={"Вернуться назад"} onClick={this.handleClick} />
            </Wrapper>
        );
    }

    handleClick = () => {
        history.goBack();
    };
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Code = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: "200px",
            color: props.theme.userTheme.color,
        })};

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        font-size: 120px;
    }
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
            font: "bold",
            size: props.theme.fonts.sizes.large,
        })};
    margin-bottom: 30px;
`;

export default PageNotFound;
