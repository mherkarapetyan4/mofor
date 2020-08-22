import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import Row from "containers/Row";
import Column from "containers/Column";
import HealthGrid from "pages/Health/HealthGrid";
import ScrollBar from "components/ScrollBar";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Desktop, Tablet } from "wrappers/responsive";

@withRouter
class HealthPage extends PureComponent {
    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={LK_MENU_ELEMENTS.DIARY_PAGE.name} />
                </Heading>
                <Row fullHeight>
                    <Column>
                        <Desktop>
                            <ScrollBar>
                                <HealthGrid />
                            </ScrollBar>
                        </Desktop>
                        <Tablet>
                            <HealthGrid />
                        </Tablet>
                    </Column>
                </Row>
            </>
        );
    }
}

export default HealthPage;
