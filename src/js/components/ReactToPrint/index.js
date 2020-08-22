import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import ReactToPrint from "react-to-print";
import { RESPONSIVE } from "config/consts";
import styled from "styled-components";

class ReactPrint extends PureComponent {
    render() {
        const { content, title } = this.props;

        return (
            <Wrapper>
                <ReactToPrint
                    trigger={() => <Button label={title} onClick={() => {}} />}
                    content={() => content}
                    pageStyle={{
                        padding: "1cm 1cm 1cm 2cm",
                    }}
                />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    @media all and (max-width: ${RESPONSIVE.tablet}) {
        display: none;
    }
`;

ReactPrint.propTypes = {
    content: PropTypes.any,
    title: PropTypes.string,
};

ReactPrint.defaultProps = {
    title: "Печать",
    content: "",
};

export default ReactPrint;
