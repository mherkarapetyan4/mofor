import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "components/Button";
import { RESPONSIVE } from "config/consts";
import { fontStyles } from "styledMixins/mixins";
import { connect } from "react-redux";
import archiveListHandler from "pages/Onco/getArchiveList";
import { showPopup } from "actions/popup";

@connect(null, {
    showPopup,
})
class PregnancyActivation extends PureComponent {
    render() {
        const { showPopup } = this.props;
        return (
            <Wrapper>
                <ContentWrapper>
                    <Title>Раздел OnlineDoc</Title>
                    <Text>Описание раздела</Text>
                    <Action>
                        <Button
                            label={"Архив"}
                            onClick={() => archiveListHandler(showPopup)}
                        />
                    </Action>
                </ContentWrapper>
            </Wrapper>
        );
    }
}

PregnancyActivation.propTypes = {
    showPopup: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentWrapper = styled.div`
    width: 500px;
    padding: 16px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

const Action = styled.div`
    display: flex;
    justify-content: center;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.large,
            color: props.theme.userTheme.color,
        })};
    margin-bottom: 16px;
    text-align: center;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 16px;
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
`;

export default PregnancyActivation;
