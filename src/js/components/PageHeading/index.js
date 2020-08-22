import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class PageHeading extends PureComponent {
    render() {
        const {
            title,
            "data-description": dataDescription,
            "data-step": dataStep,
        } = this.props;

        return (
            <Heading data-description={dataDescription} data-step={dataStep}>
                {title}
            </Heading>
        );
    }
}

const Heading = styled.div`
    display: inline-block;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.large,
        })};
    color: ${(props) => props.theme.userTheme.color};
`;

PageHeading.propTypes = {
    title: PropTypes.string,
    "data-description": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    "data-step": PropTypes.number,
};

export default PageHeading;
