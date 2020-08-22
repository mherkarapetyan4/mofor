import React, { PureComponent } from "react";
import { ADMIN_ELEMENTS } from "config/menu";
import { RESPONSIVE } from "config/consts";
import styled from "styled-components";
import Column from "containers/Column";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import Row from "containers/Row";
import { Desktop } from "wrappers/responsive";
import ScrollBar from "components/ScrollBar";
import Attachments from "./Attachments";
import UnconfirmedServicesTable from "pages/Admin/Reports/UnconfirmedServicesTable";
import UnconfirmedServicesList from "pages/Admin/Reports/UnconfirmedServicesList";
import Dispanserisation from "pages/Admin/Reports/Dispanserisation";
import UnconfirmedServicesStatistics from "pages/Admin/Reports/UnconfirmedServicesStatistics";
import WardsCountBySmo from "pages/Admin/Reports/WardsCountBySmo";
import Feedbacks from "pages/Admin/Reports/Feedbacks";
import Monthly from "pages/Admin/Reports/Monthly";
import WidgetBlock from "components/WidgetBlock";
class Reports extends PureComponent {
    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={ADMIN_ELEMENTS.REPORTS.name} />
                </Heading>
                <Row fullPage>
                    <Column>
                        <Desktop>
                            <ScrollBar>
                                <Wrapper>
                                    <GridItem>
                                        <WidgetBlock
                                            title={"По фактам неоказания услуг"}
                                        >
                                            <UnconfirmedServicesTable />
                                        </WidgetBlock>
                                    </GridItem>
                                    <GridItem>
                                        <WidgetBlock
                                            title={
                                                "Статистика по прикреплениям"
                                            }
                                        >
                                            <Attachments />
                                        </WidgetBlock>
                                    </GridItem>
                                    <GridItem>
                                        <WidgetBlock
                                            title={
                                                "По фактам неоказанных услуг"
                                            }
                                        >
                                            <UnconfirmedServicesList />
                                        </WidgetBlock>
                                    </GridItem>
                                    <GridItem>
                                        <WidgetBlock
                                            title={
                                                "Диспансеризация 1 раз в 3 года"
                                            }
                                        >
                                            <Dispanserisation />
                                        </WidgetBlock>
                                    </GridItem>
                                    <GridItem>
                                        <WidgetBlock
                                            title={
                                                "Количество неподтвержденных посещений"
                                            }
                                        >
                                            <UnconfirmedServicesStatistics />
                                        </WidgetBlock>
                                    </GridItem>
                                    <GridItem>
                                        <WidgetBlock
                                            title={
                                                "ЛК подопечных в разрезе СМО"
                                            }
                                        >
                                            <WardsCountBySmo />
                                        </WidgetBlock>
                                    </GridItem>
                                    <GridItem>
                                        <WidgetBlock
                                            title={"Статистика по отзывам"}
                                        >
                                            <Feedbacks />
                                        </WidgetBlock>
                                    </GridItem>
                                    <GridItem>
                                        <WidgetBlock title={"Помесячный отчет"}>
                                            <Monthly />
                                        </WidgetBlock>
                                    </GridItem>
                                </Wrapper>
                            </ScrollBar>
                        </Desktop>
                    </Column>
                </Row>
            </>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const GridItem = styled.div`
    width: 48%;
    flex: 1 1 auto;
    margin-right: 1%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
        margin-right: 0;
    }
`;
export default Reports;
