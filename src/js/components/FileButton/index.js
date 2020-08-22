import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { invert } from "polished";

class FileButton extends PureComponent {
    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
    }

    onChange = (e) => {
        const { onChange } = this.props;
        onChange(e);
        this.fileUpload.current.value = "";
    };

    render() {
        const { label, disabled, accept } = this.props;

        return (
            <Wrapper>
                <Button disabled={disabled}>
                    {label}
                    <input
                        multiple={true}
                        hidden
                        type="file"
                        ref={this.fileUpload}
                        onChange={this.onChange}
                        accept={accept}
                    />
                </Button>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const Button = styled.label`
    display: block;
    min-width: 100px;
    border-radius: 5px;
    border: 1px solid
        ${(props) =>
            props.disabled
                ? props.theme.colors.borderColor
                : props.borderColor || props.theme.userTheme.color};
    color: ${(props) =>
        props.disabled
            ? props.theme.colors.borderColor
            : props.textColor || props.theme.colors.text.colorBlack};
    text-align: center;
    font-family: ${(props) => props.theme.fonts.family.gothamBold};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    padding: 12px 20px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background: ${(props) => props.theme.colors.gradients.gradientZero};
    transition: background, border, color,
        ${(props) => props.theme.animations.transition};

    &:hover {
        background: ${(props) =>
            props.disabled
                ? "transparent"
                : props.background || props.theme.userTheme.backgroundColor};
        border: 1px solid
            ${(props) =>
                props.disabled
                    ? props.theme.colors.borderColor
                    : "transparent"};
        color: ${(props) =>
            props.disabled
                ? props.theme.colors.borderColor
                : invert(
                      props.textColor || props.theme.colors.text.colorBlack,
                  )};
    }
`;

FileButton.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
};

FileButton.defaultProps = {
    accept: "",
    disabled: false,
};

export default FileButton;
