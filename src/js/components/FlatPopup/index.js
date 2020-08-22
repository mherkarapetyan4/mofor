import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Actions from "containers/Header/Actions";
import PageHeading from "components/PageHeading";
import Heading from "containers/Heading";
import BackspaceArrowIcon from "icons/BackspaceArrowIcon";
import Row from "containers/Row";
import Column from "containers/Column";
import { history } from "routes/history";
import { withRouter } from "react-router-dom";

@withRouter
class FlatPopup extends PureComponent {
    serviceAction = () => {
        const { backLocation, locationState, location } = this.props;

        if (backLocation) {
            return [
                {
                    icon: <BackspaceArrowIcon opacity={0.5} />,
                    tooltip: "Назад",
                    action: () => {
                        this.props.history.push({
                            pathname: backLocation,
                            state: {
                                ...locationState,
                                viewIsTable: location?.state?.viewIsTable,
                            },
                        });
                    },
                },
            ];
        }
        return [
            {
                icon: <BackspaceArrowIcon opacity={0.5} />,
                tooltip: "Назад",
                action: () => {
                    history.goBack();
                },
            },
        ];
    };

    render() {
        const { children, title, additional } = this.props;

        return (
            <Wrapper>
                <Heading autoHeight>
                    <HeadingWrapper>
                        <Actions items={this.serviceAction()} />
                        <PageHeading title={title} />
                    </HeadingWrapper>
                    {additional && (
                        <AdditionalInfo>{additional}</AdditionalInfo>
                    )}
                </Heading>
                <Row fullHeight>
                    <Column>
                        <ContentWrapper>{children}</ContentWrapper>
                    </Column>
                </Row>
            </Wrapper>
        );
    }
}

const AdditionalInfo = styled.div``;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const HeadingWrapper = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 16px;

        &:last-child {
            margin-right: 0;
        }
    }
`;

const ContentWrapper = styled.div`
    height: 100%;
    width: 100%;
    flex: 1 0 auto;
`;

FlatPopup.propTypes = {
    children: PropTypes.any.isRequired,
    history: PropTypes.object,
    title: PropTypes.string.isRequired,
    additional: PropTypes.any,
    backLocation: PropTypes.string,
    locationState: PropTypes.object,
    location: PropTypes.object,
};

FlatPopup.defaultProps = {
    backLocation: "",
    locationState: {},
};

export default FlatPopup;
