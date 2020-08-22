import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ArrowIcon from "icons/ArrowIcon";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import ContextList from "components/ContextList";

class Select extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        elements: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.element,
                ]).isRequired,
            }),
        ).isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        showEmptyOption: PropTypes.bool,
        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        placeholder: "",
        showEmptyOption: true,
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside, false);
    }

    onClickOutside = (e) => {
        if (this.select && !this.select.contains(e.target)) {
            const { open } = this.state;
            if (open) {
                this.setState({
                    open: false,
                });
            }
        }
    };

    state = {
        open: false,
    };

    onChange = (item) => {
        const { onChange } = this.props;
        this.changeOpenState(false);
        onChange(item);
    };

    changeOpenState = (open) => {
        this.setState({ open });
    };

    renderItems = (elements, showEmptyOption = false) => {
        const { placeholder } = this.props;

        return (
            <ul>
                {showEmptyOption && (
                    <li onClick={this.onChange("")}>{placeholder}</li>
                )}
                {elements.map((item, index) => (
                    <li
                        key={`select-item=${item.value}-${index}`}
                        onClick={this.onChange(item.value)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        );
    };

    renderValue = () => {
        const { elements, value, placeholder } = this.props;
        const element = elements.find((e) => e.value === value);
        if (element) {
            return element.label;
        } else if (placeholder) {
            return placeholder;
        }
        return "";
    };

    render() {
        const { elements, disabled } = this.props;
        const { open } = this.state;

        return (
            <Wrapper disabled={disabled} ref={(e) => (this.select = e)}>
                <Input
                    onClick={() =>
                        disabled ? null : this.changeOpenState(!open)
                    }
                >
                    <Value>{this.renderValue()}</Value>
                    <Icon disabled={disabled}>
                        <ArrowIcon opacity={0.5} rotate={-90} />
                    </Icon>
                </Input>
                <ContextList
                    isOpened={open}
                    items={elements}
                    onChange={(value) => this.onChange(value)}
                />
            </Wrapper>
        );
    }
}

const Input = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Wrapper = styled.div`
    width: 100%;
    outline: none;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    padding: 10px 12px;
    border-radius: 4px;
    border: ${(props) =>
        props.disabled
            ? "1px solid transparent"
            : `1px solid ${props.theme.colors.borderColor}`};
    background-color: ${(props) => (props.disabled ? "transparent" : "#fff")};
    position: relative;
`;

const Value = styled.div``;

const Icon = styled.div`
    display: ${(props) => (props.disabled ? "none" : "block")};
    width: 16px;
    height: 16px;

    svg {
        width: 100%;
        height: 100%;
    }
`;

export { Select };
