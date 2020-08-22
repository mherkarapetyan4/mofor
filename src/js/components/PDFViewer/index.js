import React, { PureComponent } from "react";
import { Document, Page } from "react-pdf";
import PropTypes from "prop-types";
import styled from "styled-components";

class PDFViewer extends PureComponent {
    static propTypes = {
        file: PropTypes.string.isRequired,
    };

    state = {
        numPages: null,
        pageNumber: 1,
    };
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    render() {
        const { pageNumber, numPages } = this.state;
        const { file } = this.props;

        return (
            <Wrapper>
                <Document
                    file={file}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    canvas {
        width: 100% !important;
        height: 100% !important;
    }
`;

export { PDFViewer };
