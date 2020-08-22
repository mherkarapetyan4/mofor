import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class ProgressBar extends PureComponent {
    render() {
        const { progress } = this.props;

        return (
            <Wrapper>
                <ProgressLine progress={progress} />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: 100%;
    height: 6px;
    background-color: ${(props) => props.theme.colors.borderColor};
    border-radius: 4px;
    position: relative;
    margin-bottom: 20px;
`;

const ProgressLine = styled.div`
    width: ${(props) => props.progress + "%"};
    height: 6px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 4px;
    background-color: ${(props) => props.theme.userTheme.color};
    z-index: 1;
    transition: width ${(props) => props.theme.animations.transition};
    
    &:after {
        content: '${(props) => props.progress + "%"}';
        ${(props) =>
            fontStyles(props, {
                font: "bold",
                color: props.theme.colors.text.colorBlack,
            })};
        display: block;
        position: absolute;
        right: 0;
        bottom: -20px;
        z-index: 1;
    }
`;

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
    progress: 0,
};

export default ProgressBar;
