import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { PDFViewer } from "components/PDFViewer";

@connect((state) => ({
    image: state.researches.image,
}))
class PreviewImage extends PureComponent {
    static propTypes = {
        image: PropTypes.object.isRequired,
    };

    render() {
        const { image } = this.props;

        return (
            <Wrapper
                verticalImage={
                    image.additional
                        ? image.additional.height > image.additional.width
                        : null
                }
            >
                {this.renderContent()}
            </Wrapper>
        );
    }

    renderContent = () => {
        const { image } = this.props;

        if (!isEmpty(image)) {
            if (image.ext === "pdf") {
                return <PDFViewer file={image.file} />;
            }
            return <img src={image.file} alt="file" />;
        } else {
            return <PreviewText>Выберите файл для предпросмотра</PreviewText>;
        }
    };
}

const Wrapper = styled.div`
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    overflow: hidden;

    img {
        width: ${(props) => (props.verticalImage ? "auto" : "100%")};
        height: ${(props) => (props.verticalImage ? "100%" : "auto")};
    }
`;

const PreviewText = styled.span`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.large,
        })};
    text-align: center;
`;

export default PreviewImage;
