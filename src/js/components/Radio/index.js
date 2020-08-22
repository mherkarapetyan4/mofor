import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { hasError } from "modules/hasError";

@hasError
class Radio extends PureComponent {
    // constructor(props) {
    //     super(props);
    //
    //     props.elements.forEach((item) => {
    //         this[`${item.value}_ref`] = React.createRef();
    //     });
    // }

    static defaultProps = {
        onChange: () => {},
    };
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
        onChange: PropTypes.func,
        name: PropTypes.string.isRequired,
    };

    onChange = (e, item) => {
        const { onChange } = this.props;
        onChange(item.value);
    };

    render() {
        const { elements, value, name } = this.props;
        return (
            <>
                {elements.map((item, index) => {
                    return (
                        <Wrapper key={`radio_item-${item.value}-${index}`}>
                            <CustomRadio
                                value={item.value}
                                checked={item.value === value}
                                onClick={(e) => this.onChange(e, item)}
                            >
                                <RadioChecked />
                            </CustomRadio>
                            <input
                                // ref={this[`${item.value}_ref`]}
                                type="radio"
                                id={item.value}
                                name={name}
                                value={item.value}
                                onChange={(e) => this.onChange(e, item)}
                                checked={item.value === value}
                            />
                            <Label htmlFor={item.value}>{item.label}</Label>
                        </Wrapper>
                    );
                })}
            </>
        );
    }
}

const CustomRadio = styled.div`
    flex: 0 0 auto;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    border: 1px solid
        ${(props) =>
            props.checked ? "transparent" : props.theme.colors.borderColor};
    background-color: ${(props) =>
        props.checked
            ? props.theme.userTheme.color
            : props.theme.colors.background.white};
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    transition: border, background-color,
        ${(props) => props.theme.animations.transition};

    &:hover {
        border: 1px solid
            ${(props) =>
                props.checked
                    ? "transparent"
                    : props.theme.colors.borderColorHover};
    }
`;

const RadioChecked = styled.div`
    position: absolute;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    left: 4px;
    top: 4px;
    background-color: #fff;
`;

const Label = styled.label`
    ${(props) => fontStyles(props)};
    cursor: pointer;
    transition: ${(props) => props.theme.animations.transition};

    &:hover {
        ${(props) =>
            fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    }
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    input {
        position: absolute;
        left: -9999px;
    }

    input:checked + ${Label} {
        ${(props) =>
            fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

export { Radio };
