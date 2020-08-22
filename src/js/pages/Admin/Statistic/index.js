import React, { PureComponent } from "react";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import styled from "styled-components";
import Row from "containers/Row";
import ScrollBar from "components/ScrollBar";
import Column from "containers/Column";
import { ADMIN_ELEMENTS } from "config/menu";
import CountsInfo from "pages/Admin/Statistic/Counts";
import FeedBacks from "pages/Admin/Statistic/FeedBacks";
import Attachments from "pages/Admin/Statistic/Attachments";
import Platform from "pages/Admin/Statistic/Platform";
import DispanserResults from "pages/Admin/Statistic/DispanserResults";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import UnconfirmedServices from "pages/Admin/Statistic/UnconfirmedServices";
import UnconfirmedServicesTable from "pages/Admin/Reports/UnconfirmedServicesTable";
import WidgetBlock from "components/WidgetBlock";
import UnconfirmedServicesList from "pages/Admin/Reports/UnconfirmedServicesList";
import Dispanserisation from "pages/Admin/Reports/Dispanserisation";
import UnconfirmedServicesStatistics from "pages/Admin/Reports/UnconfirmedServicesStatistics";
import WardsCountBySmo from "pages/Admin/Reports/WardsCountBySmo";
import SmoAppealsCount from "pages/Admin/Reports/SmoAppealsCount";
import Feedbacks from "pages/Admin/Reports/Feedbacks";
import PlatformReport from "pages/Admin/Reports/PlatformReport";
import Monthly from "pages/Admin/Reports/Monthly";
import AttachmentsReport from "pages/Admin/Reports/Attachments";
import withRedirectAdmin from "decorators/admin";

@withRedirectAdmin("STATISTIC_PAGE")
class Statistic extends PureComponent {
    options = [
        {
            value: "count",
            label: "Общая статистика",
            component: <CountsInfo />,
        },
        {
            value: "feedBacks",
            label: "Статистика по отзывам",
            component: <FeedBacks />,
        },
        {
            value: "attachments",
            label: "Статистика по прикреплениям",
            component: <Attachments />,
        },
        {
            value: "platforms",
            label: "Статистика по платформам",
            component: <Platform />,
        },
        {
            value: "unconfirmedServices",
            label: "Кол-во неподтвержденных услуг",
            component: <UnconfirmedServices />,
        },
        {
            value: "dispanserResults",
            label: "Результаты диспансеризации",
            component: <DispanserResults />,
        },
        {
            value: "unconfirmedServicesTable",
            label:
                "Отчет: Количество неподтверждённых посещений с видами услуг",
            component: <UnconfirmedServicesTable />,
        },
        {
            value: "attachmentsReports",
            label: "Отчет: Статистика по прикреплениям",
            component: <AttachmentsReport />,
        },
        {
            value: "unconfirmedServicesList",
            label: "Отчет: По фактам неоказания услуг",
            component: <UnconfirmedServicesList />,
        },
        {
            value: "dispanserisation",
            label: "Отчет: Диспансеризация 1 раз в 3 года",
            component: <Dispanserisation />,
        },
        {
            value: "unconfirmedServicesStatistics",
            label: "Отчет: Количество неподтвержденных посещений",
            component: <UnconfirmedServicesStatistics />,
        },
        {
            value: "wardsCountBySmo",
            label: "Отчет: Количество ЛК подопечных в разрезе СМО",
            component: <WardsCountBySmo />,
        },
        {
            value: "smoAppealsCount",
            label: "Отчет: Количество обращений в СМО",
            component: <SmoAppealsCount />,
        },
        {
            value: "feedbacks",
            label: "Отчет: Статистика по отзывам",
            component: <Feedbacks />,
        },
        {
            value: "monthly",
            label: "Отчет: Помесячный отчет",
            component: <Monthly />,
        },
        {
            value: "platformsReport",
            label: "Отчет: Статистика по платформам",
            component: <PlatformReport />,
        },
    ];
    state = {
        title: "Общая статистика",
        selectedOption: this.options[0],
    };
    onClickOption = (value, label) => {
        this.setState({
            title: label,
            selectedOption: this.options.filter((item) => {
                return item.value === value;
            })[0],
        });
    };
    render() {
        const { selectedOption, title } = this.state;
        const { value, component } = selectedOption;
        return (
            <>
                <Heading>
                    <PageHeading title={ADMIN_ELEMENTS.STATISTIC_PAGE.name} />
                </Heading>
                <Row fullPage>
                    <Column>
                        <SelectWrapper>
                            <InlineFormFieldSelect
                                onChange={(val, label) =>
                                    this.onClickOption(val, label)
                                }
                                value={value}
                                options={this.options}
                                label={"Статистика:"}
                            />
                        </SelectWrapper>
                        <ScrollBar>
                            <WidgetBlock title={title}>
                                <Wrapper>{component}</Wrapper>
                            </WidgetBlock>
                        </ScrollBar>
                    </Column>
                </Row>
            </>
        );
    }
}

const SelectWrapper = styled.div`
    width: 100%;
    margin-bottom: 16px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export default Statistic;
