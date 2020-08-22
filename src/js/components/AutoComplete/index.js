import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Input } from "components/Input";
import isEmpty from "lodash/isEmpty";
import reduce from "lodash/reduce";
import axios from "axios";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import ContextList from "components/ContextList";
import Actions from "containers/Header/Actions";
import CloseIcon from "icons/CloseIcon";

const Label = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    flex-shrink: 0;
    margin-right: 10px;
`;

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid
        ${(props) =>
            props.disabled
                ? "transparent"
                : props.focus
                ? props.theme.colors.borderColorHover
                : props.theme.colors.borderColor};
    border-radius: 4px;
    padding: ${(props) =>
        props.clearButton ? "1px 1px 1px 12px" : "11px 12px"};
    transition: border ${(props) => props.theme.animations.transition};
    position: relative;
    background-color: #fff;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        border: 1px solid
            ${(props) =>
                props.disabled
                    ? " transparent"
                    : props.theme.colors.borderColorHover};
    }
`;

const EmptyItems = styled.div`
    position: absolute;
    top: 39px;
    left: -2px;
    height: 40px;
    width: 100%;
    z-index: 1000;
    background-color: ${(props) => props.theme.colors.background.white};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.shadows.blurred};
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    ${(props) =>
        fontStyles(props, {
            font: "medium",
        })};
`;

class AutoComplete extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue,
            items: [],
            loading: false,
            cursor: 0,
            open: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.initialValue !== this.props.initialValue &&
            this.props.initialValue
        ) {
            this.setState({
                value: this.props.initialValue,
            });
        }
    }

    static defaultProps = {
        queryParams: {},
        minCountSymbol: 2,
        preserveValueAfterSelect: false,
        elementValue: "value",
        onClearCallback: () => {},
        showClearButton: false,
        initialValue: "",
        onChange: () => {},
    };

    static propTypes = {
        path: PropTypes.string.isRequired,
        queryParams: PropTypes.object,
        serverValue: PropTypes.string.isRequired,
        minCountSymbol: PropTypes.number,
        elementLabel: PropTypes.string.isRequired,
        elementValue: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        preserveValueAfterSelect: PropTypes.bool,
        onClearCallback: PropTypes.func,
        showClearButton: PropTypes.bool,
        initialValue: PropTypes.string,
        onChange: PropTypes.func,
    };

    clearIcon = [
        {
            icon: <CloseIcon opacity={0.5} />,
            tooltip: "Очистить",
            action: () =>
                this.setState({ value: "" }, this.props.onClearCallback),
        },
    ];

    timer = null;

    onChange = (value) => {
        const { onChange } = this.props;

        clearTimeout(this.timer);
        this.setState(
            {
                value,
                items: [],
                open: true,
            },
            () => {
                const { minCountSymbol } = this.props;
                clearTimeout(this.timer);
                if (value.length >= minCountSymbol) {
                    this.timer = setTimeout(() => {
                        this.fetchData(value);
                    }, 500);
                }
            },
        );
        onChange(value);
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside, false);
    }

    onClickOutside = (e) => {
        if (!this.multiautocomplete.contains(e.target)) {
            const { open } = this.state;
            if (open) {
                this.setState({
                    open: false,
                });
            }
        }
    };

    onKeyDown = (e) => {
        const { cursor, items } = this.state;
        if (e.keyCode === 40 && cursor < items.length - 1) {
            this.setState({ cursor: cursor + 1 });
        } else if (e.keyCode === 38 && cursor > 0) {
            this.setState({ cursor: this.state.cursor - 1 });
        } else if (e.keyCode === 13) {
            this.onSelectElement(items[cursor]);
        }
    };

    createUrl = (value) => {
        const { path, serverValue, queryParams } = this.props;
        const url = `${path}?${serverValue}=${encodeURIComponent(
            typeof value === "string" ? value.slice(0, 10) : "",
        )}`;
        return url + this.getQueryParams(queryParams);
    };

    getQueryParams = (params) => {
        if (isEmpty(params)) {
            return "";
        }
        return reduce(params, (qs, v, k) => (qs += `&${k}=${v}`), "");
    };

    fetchData = (value) => {
        this.setState(
            {
                loading: true,
            },
            () => {
                const url = this.createUrl(value);
                axios.get(url).then((response) => {
                    const items = response.data.content;
                    this.setState({
                        items,
                        loading: false,
                        cursor: 0,
                    });
                });
            },
        );
    };

    onSelectElement = (element) => {
        const { onSelect, preserveValueAfterSelect, elementLabel } = this.props;
        this.setState(
            {
                value: preserveValueAfterSelect ? element[elementLabel] : "",
                items: [],
                loading: false,
            },
            () => {
                onSelect(element);
            },
        );
    };

    renderItems = (items) => {
        const { elementLabel, elementValue } = this.props;
        // const {cursor} = this.state;
        return (
            <ContextList
                elementLabel={elementLabel}
                elementValue={elementValue}
                isOpened={true}
                items={items}
                onChange={(value) => {
                    this.onSelectElement(
                        items.filter((item) => item[elementValue] === value)[0],
                    );
                }}
            />
        );
        // <SearchList>
        //     {
        //         items.map((element, index) => {
        //             return (
        //                 <Item cursor={cursor === index? 1 : 0} onClick={() => this.onSelectElement(element)} key={path + index}>
        //                     {element[elementLabel]}
        //                 </Item>
        //             )
        //         })
        //     }
        // </SearchList>
    };

    renderEmpty = () => {
        return <EmptyItems>Результатов не найдено</EmptyItems>;
    };

    render() {
        const { value, loading, items, open } = this.state;

        const { placeholder, label, showClearButton } = this.props;

        return (
            <InputWrapper
                clearButton={showClearButton}
                ref={(e) => (this.multiautocomplete = e)}
            >
                <Label>{label}</Label>
                <Input
                    name={"value"}
                    value={value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    placeholder={placeholder || ""}
                />
                {showClearButton && <Actions items={this.clearIcon} />}
                {open && !loading && !isEmpty(items) && this.renderItems(items)}
                {open && !loading && isEmpty(items) && this.renderEmpty()}
            </InputWrapper>
        );
    }
}

export default AutoComplete;
