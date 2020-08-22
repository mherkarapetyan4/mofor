import React, { PureComponent } from "react";
import TextBlock from "components/TextBlock";
import styled from "styled-components";
import Accordeon from "components/Accordeon";
import DoctorsList from "components/Widgets/DispanserWidget/DispanserCatalog/DoctorsList";
import ArrowIcon from "icons/ArrowIcon";
import { fontStyles } from "styledMixins/mixins";

const accItems = [
    {
        value: <DoctorsList />,
        age: "9 месяцев",
    },
    {
        value: <DoctorsList />,
        age: "9 месяцев",
    },
    {
        value: <DoctorsList />,
        age: "9 месяцев",
    },
];

class DispanserCatalog extends PureComponent {
    render() {
        return (
            <Wrapper>
                <List>
                    <Accordeon
                        elements={accItems}
                        renderHeader={(item, { key, openElements }) => (
                            <Header>
                                <Text>{item.age}</Text>
                                <Icon>
                                    <ArrowIcon
                                        rotate={openElements[key] ? 90 : -90}
                                        opacity={0.5}
                                    />
                                </Icon>
                            </Header>
                        )}
                    />
                </List>
                <Footer>
                    <TextBlock>
                        Приказ №514н &quot;О порядке проведения профилактических
                        медицинских осмотров несовершеннолетних&quot;
                    </TextBlock>
                </Footer>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const List = styled.div``;

const Footer = styled.div`
    margin-top: 16px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Icon = styled.div``;

export default DispanserCatalog;
