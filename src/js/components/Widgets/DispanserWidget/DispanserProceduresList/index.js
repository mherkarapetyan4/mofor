import React, { PureComponent } from "react";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class DispanserProceduresList extends PureComponent {
    procedures = [
        {
            title: "Антропометрия",
        },
        {
            title: "Анализ крови на общий холестерин",
        },
        {
            title: "Анализ крови на глюкозу",
        },
    ];

    render() {
        return (
            <List>
                {this.procedures.map((item, i) => (
                    <Item key={i}>{item.title}</Item>
                ))}
            </List>
        );
    }
}

const List = styled.div``;

const Item = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    padding: 10px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};

    &:last-child {
        border: none;
    }
`;

export default DispanserProceduresList;
