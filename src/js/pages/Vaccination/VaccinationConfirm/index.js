import React, { PureComponent } from "react";
import Row from "containers/Row";
import Column from "containers/Column";
import FlatPopup from "components/FlatPopup";
import { Desktop, Tablet } from "wrappers/responsive";
import ScrollBar from "components/ScrollBar";
import UploadInfo from "pages/Researches/Components/UploadInfo";
import EditVaccination from "pages/Vaccination/VaccinationConfirm/EditVaccination";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearFile } from "actions/myResearches";
import { withRouter } from "react-router-dom";

@withRouter
@connect()
class VaccinationConfirm extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.object.isRequired,
    };

    componentWillUnmount() {
        this.props.dispatch(clearFile());
    }

    render() {
        return (
            <FlatPopup
                title={"Отметка о вакцинации"}
                backLocation={"/vaccination"}
            >
                <Row fullPage>
                    <Column fraction={6} paddings={0}>
                        <Desktop>
                            <ScrollBar noScrollX>
                                <EditVaccination data={""} />
                            </ScrollBar>
                        </Desktop>
                        <Tablet>
                            <EditVaccination data={""} />
                        </Tablet>
                    </Column>
                    <Column fraction={6} paddingRight={0} mobilePaddingLeft={0}>
                        <Desktop>
                            <ScrollBar noScrollX>
                                <UploadInfo />
                            </ScrollBar>
                        </Desktop>
                        <Tablet>
                            <UploadInfo />
                        </Tablet>
                    </Column>
                </Row>
            </FlatPopup>
        );
    }
}

export default VaccinationConfirm;
