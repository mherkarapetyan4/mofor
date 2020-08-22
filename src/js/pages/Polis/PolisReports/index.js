import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { formatDate } from "utils/formatDate";
import IconPlate from "components/IconPlate";

class PolisReports extends PureComponent {
    render() {
        const { onClick } = this.props;
        const { sendDate, finishDate, statusTitle, id } = this.props.data;

        return (
            <Wrapper onClick={() => onClick(id)}>
                <PlateWrapper>
                    <IconPlate title={"З"} />
                </PlateWrapper>
                <Info>
                    <LineWrapper>
                        <Title>Дата подачи:</Title>
                        <Date>{formatDate(sendDate)}</Date>
                    </LineWrapper>
                    <LineWrapper>
                        <Title>Дата завершения:</Title>
                        <Complete complete={finishDate}>
                            {formatDate(finishDate) || "-"}
                        </Complete>
                    </LineWrapper>
                    <LineWrapper>
                        <Title>Статус:</Title>
                        <Status>{statusTitle}</Status>
                    </LineWrapper>
                </Info>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    padding: ${(props) => props.theme.paddings.normal};
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`;

const LineWrapper = styled.div`
    display: flex;
    margin-bottom: 7px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const Title = styled.div`
    ${(props) => fontStyles(props)};
    margin-right: 16px;
`;

const Date = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Complete = styled.div`
    ${(props) => fontStyles(props)};
    color: ${(props) =>
        props.complete
            ? props.theme.colors.notifications.alert
            : props.theme.colors.text.colorBlack};
`;

const Status = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

PolisReports.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func.isRequired,
};

PolisReports.defaultProp = {
    onClick: () => {},
};

export default PolisReports;
