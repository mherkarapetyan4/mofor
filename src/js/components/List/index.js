import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ListItem from "components/List/ListItem";

class List extends PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired,
        renderItem: PropTypes.func.isRequired,
        rigid: PropTypes.bool,
    };

    static defaultProps = {
        rigid: false,
    };

    render() {
        const { data, renderItem, rigid } = this.props;
        return (
            <ListWrapper>
                {data.map((item, i) => (
                    <ListItem
                        rigid={rigid}
                        key={i}
                        renderItem={() => renderItem(item, i)}
                    />
                ))}
            </ListWrapper>
        );
    }
}

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media print {
        @-moz-document url-prefix() {
            position: absolute;
            top: 50px;
        }
        display: block;

        height: auto;
        width: 100%;
        > div {
            margin-bottom: 15px;
            * {
            }
        }
    }
`;

export { List };
