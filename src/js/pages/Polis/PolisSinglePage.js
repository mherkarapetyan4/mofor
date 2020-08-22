import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import FlatPopup from "components/FlatPopup";
import Column from "containers/Column";
import Row from "containers/Row";
import PolisReportInfo from "pages/Polis/PolisReportInfo";

@hasHistoryState(LK_MENU_ELEMENTS.TREATMENT_PAGE.path)
class PolisSinglePage extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    render() {
        return (
            <FlatPopup title={"Сводная информация о заявлении"}>
                <Row fullPage>
                    <Column>
                        <PolisReportInfo />
                    </Column>
                </Row>
            </FlatPopup>
        );
    }
}

PolisSinglePage.propTypes = {};

export default PolisSinglePage;
