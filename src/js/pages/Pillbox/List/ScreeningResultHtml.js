import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { getScreeningHtml } from "actions/pillbox";
import { Loader } from "components/Loader";
import { fontStyles } from "styledMixins/mixins";
import styled from "styled-components";

class ScreeningResultHtml extends PureComponent {
    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    constructor() {
        super();
        this.state = {
            html: "",
        };
    }

    componentDidMount() {
        const { id } = this.props;
        getScreeningHtml(id, (html) => this.setState({ html }));
    }

    render() {
        const { html } = this.state;
        return (
            <Wrapper>
                {html ? (
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                    <Loader />
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

export default ScreeningResultHtml;
