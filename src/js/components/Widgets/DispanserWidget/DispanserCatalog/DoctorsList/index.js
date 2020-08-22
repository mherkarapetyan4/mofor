import React, { PureComponent } from "react";
import styled from "styled-components";
import DoctorIcon from "icons/services/DoctorIcon";
import { fontStyles } from "styledMixins/mixins";

const items = [
    {
        icon: <DoctorIcon color={"#149AE2"} />,
        name: "Педиатр",
    },
    {
        icon: <DoctorIcon color={"#149AE2"} />,
        name: "Педиатр",
    },
];

class DoctorsList extends PureComponent {
    render() {
        return (
            <Wrapper>
                {items.map((item, i) => (
                    <Item key={i}>
                        <Icon>{item.icon}</Icon>
                        <Name>{item.name}</Name>
                    </Item>
                ))}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 0 16px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    padding-top: 8px;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};

    &:last-child {
        border: none;
    }
`;

const Icon = styled.div`
    margin-right: 16px;
    width: 24px;
    height: 24px;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const Name = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

export default DoctorsList;
