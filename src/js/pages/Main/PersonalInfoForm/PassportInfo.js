import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class PassportInfo extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render() {
        const { data } = this.props;
        const { confirmations, pbdDocument } = data;
        const { passportData } = confirmations;
        const series = get(pbdDocument, "series");
        const number = get(pbdDocument, "number");
        const notIndicatedYet = passportData === null;
        return (
            <Wrapper>
                {series && number ? (
                    <Number>
                        {series} {number}
                    </Number>
                ) : (
                    <NoInfo>Нет информации</NoInfo>
                )}
                {notIndicatedYet && series && number && (
                    <Warning>
                        Пожалуйста, проверьте правильность данных документа,
                        удостоверяющего личность
                    </Warning>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const Number = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const NoInfo = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Warning = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.notifications.alert })};
`;

export default PassportInfo;
