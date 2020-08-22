import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";

class ListData extends PureComponent {
    render() {
        const { label, data } = this.props;

        return (
            <Wrapper>
                <Label>{label}</Label>
                <Data>{data}</Data>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        flex-wrap: wrap;
    }
`;

const Label = styled.div`
    ${(props) => fontStyles(props)};
    margin-right: 16px;
    flex: 1 0 auto;
    line-height: 1;
    padding: 5px 0;
`;

const Data = styled.div`
    width: 100%;
    word-wrap: break-word;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    flex: 1 1 auto;
    line-height: 1;
    padding: 5px 0;
`;

ListData.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.number,
    ]),
};

export default ListData;
