import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AutoComplete from "../AutoComplete";
import isEqual from "lodash/isEqual";
import styled, { withTheme } from "styled-components";
import { get, isEmpty } from "lodash";
import { fontStyles } from "styledMixins/mixins";
import ClosableItem from "components/ClosableItem";
import TextBlock from "components/TextBlock";

class MultiAutoComplete extends PureComponent {
    static defaultProps = {
        queryParams: {},
        disabled: false,
        minCountSymbol: 2,
    };

    static propTypes = {
        disabled: PropTypes.bool,
        path: PropTypes.string,
        queryParams: PropTypes.object,
        serverValue: PropTypes.string,
        minCountSymbol: PropTypes.number,
        listLabel: PropTypes.string,
        elementLabel: PropTypes.string,
        elementValue: PropTypes.string,
        onSelect: PropTypes.func,
        items: PropTypes.array,
        onRemove: PropTypes.func,
        title: PropTypes.string,
        theme: PropTypes.object,
        placeholder: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    };

    onRemoveElement = (element) => {
        const { items, onRemove } = this.props;
        onRemove(items.filter((item) => !isEqual(item, element)));
    };

    renderItems = () => {
        const { items, elementLabel, path, theme, disabled } = this.props;
        if (isEmpty(items)) {
            return <TextBlock>Список пуст</TextBlock>;
        }
        return items.map((element, index) => {
            return (
                <ItemWrapper key={path + index + index}>
                    <ClosableItem
                        closable={!disabled}
                        onClick={() => this.onRemoveElement(element)}
                        theme={theme}
                        title={get(element, elementLabel, "")}
                    />
                </ItemWrapper>
            );
        });
    };

    render() {
        const {
            disabled,
            label,
            path,
            listLabel,
            elementLabel,
            elementValue,
            queryParams,
            serverValue,
            minCountSymbol,
            onSelect,
            title,
            placeholder,
        } = this.props;
        return (
            <AutoCompleteWrapper>
                <InputWrapper>
                    {!disabled && (
                        <AutoComplete
                            label={label}
                            path={path}
                            serverValue={serverValue}
                            queryParams={queryParams}
                            minCountSymbol={minCountSymbol}
                            elementLabel={listLabel || elementLabel}
                            elementValue={elementValue}
                            onSelect={onSelect}
                            placeholder={placeholder}
                        />
                    )}
                </InputWrapper>
                <ItemList>
                    {title && <Title>{title}</Title>}
                    <ListWrapper>{this.renderItems()}</ListWrapper>
                </ItemList>
            </AutoCompleteWrapper>
        );
    }
}

const InputWrapper = styled.div`
    margin-bottom: 16px;
`;

const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 14px;
`;
const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 16px;
`;

const ListWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
`;

const AutoCompleteWrapper = styled.div`
    width: 100%;
`;

const ItemWrapper = styled.div`
    margin-right: 10px;
    margin-bottom: 10px;
`;

export default withTheme(MultiAutoComplete);
