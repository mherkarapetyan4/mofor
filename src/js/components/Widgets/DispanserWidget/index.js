import React, { PureComponent } from "react";
import styled from "styled-components";
import DispanserInfo from "components/Widgets/DispanserWidget/DispanserInfo";
import DispanserQuestions from "components/Widgets/DispanserWidget/DispanserQuestions";
import DispanserDownloadForm from "components/Widgets/DispanserWidget/DispanserDownloadForm";
import DispanserResult from "components/Widgets/DispanserWidget/DispanserResult";
// import DispanserCatalog from "components/Widgets/DispanserWidget/DispanserCatalog";
// import DispanserDoctorsList from "components/Widgets/DispanserWidget/DispanserProceduresList";
import { connect } from "react-redux";
import { getDispanserState } from "actions/widgets";
import PropTypes from "prop-types";
import ChildDispanser from "components/Widgets/DispanserWidget/ChildDispanser";

@connect((state) => ({
    data: state.widgets.dispanserWidget,
    myData: state.myData.myData,
}))
class DispanserWidget extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getDispanserState());
    }

    render() {
        const { data, myData } = this.props;

        if (myData.ward) {
            return (
                <DispanserWrapper>
                    <ChildDispanser />
                </DispanserWrapper>
            );
        }

        return (
            <DispanserWrapper>
                {(() => {
                    switch (data.state.status) {
                        case "QUESTIONARY":
                            return <DispanserQuestions />;
                        case "IN_PROGRESS":
                            return <DispanserDownloadForm />;
                        case "NONE":
                            return <DispanserInfo />;
                        case "FINISHED":
                            return <DispanserResult />;
                        default:
                            return <></>;
                    }
                })()}
                {/*<DispanserCatalog />*/}
                {/*<DispanserDoctorsList />*/}
            </DispanserWrapper>
        );
    }
}

DispanserWidget.propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    myData: PropTypes.object,
};

const DispanserWrapper = styled.div`
    padding: 10px;
`;

export default DispanserWidget;
