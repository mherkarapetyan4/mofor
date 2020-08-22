import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

const hasError = (Component) => {
    class Error extends PureComponent {
        static propTypes = {
            meta: PropTypes.object,
        };

        isError = () => {
            const { meta } = this.props;
            if (!meta) return false;
            return meta.touched && meta.error;
        };

        isFileError = () => {
            const { meta } = this.props;
            if (!meta) return false;
            return meta.value instanceof File && meta.error;
        };

        render() {
            const { meta } = this.props;
            const error = this.isError();
            const fileError = this.isFileError();

            return (
                <>
                    <Component {...this.props} error={error} />
                    {error && <Wrapper>{meta.error}</Wrapper>}
                    {fileError && <Wrapper>{meta.error}</Wrapper>}
                </>
            );
        }
    }

    return Error;
};

const Wrapper = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorAlert })};
    margin-top: 5px;
`;

export { hasError };
