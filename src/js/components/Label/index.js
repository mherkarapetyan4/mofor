import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class Label extends PureComponent {
    render() {
        const { label } = this.props;

        return <Wrapper>{label}</Wrapper>;
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    background-color: ${(props) => props.theme.userTheme.color};
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    border-radius: 4px;
    padding: 7px 20px;
`;

Label.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Label;
