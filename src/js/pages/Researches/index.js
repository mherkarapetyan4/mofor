import React, { PureComponent } from "react";
import { FetchingList } from "components/FetchingList";
import { getMyResearches, getMyPrintResearches } from "actions/myResearches";
import PageHeading from "components/PageHeading";
import Heading from "containers/Heading";
import Column from "containers/Column";
import Row from "containers/Row";
import ResearchListItem from "pages/Researches/ResearchListItem";
import { LK_MENU_ELEMENTS } from "config/menu";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ScrollBar from "components/ScrollBar";
import { Desktop, Tablet } from "wrappers/responsive";
import { Button } from "components/Button";
import {
    getResearchesTypes,
    getResearchesTypesExisting,
} from "actions/directory";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import Filter from "modules/Filter";
import { getStatistics } from "actions/myResearches";
import { getPluralLabel } from "utils/getPluralLabel";
import TextBlock from "components/TextBlock";
import Actions from "containers/Header/Actions";
import { RESPONSIVE } from "config/consts";
import styled from "styled-components";
import InfoIcon from "icons/InfoIcon";
import { show } from "actions/anchorPopup";
import { fontStyles } from "styledMixins/mixins";
import ReactPrint from "components/ReactToPrint";
import PrintHeader from "components/PrintHeader";
import { hidePopup } from "actions/popup";
import { deleteMyResearches } from "actions/myResearches";

@withRouter
@connect((state) => ({
    researchesTypes: state.directory.researchesTypesExisting,
    myStatistic: state.researches.myStatistic,
    ward: state.myData.myData.ward,
}))
class Researches extends PureComponent {
    infoIcon = [
        {
            icon: <InfoIcon opacity={0.5} />,
            action: (position) =>
                this.props.dispatch(
                    show({
                        position,
                        component: (
                            <TextBlock>
                                Внимание! Ответственность за содержание
                                загружаемых файлов лежит на пользователе личного
                                кабинета. Загружаемые файлы должны содержать
                                только сведения о проведенных исследованиях,
                                загружать файлы другого содержания не
                                допускается.
                            </TextBlock>
                        ),
                        place: "left",
                        title: "Информация",
                        size: {
                            w: 240,
                            h: 160,
                        },
                    }),
                ),
            important: true,
            tooltip: "Информация",
        },
    ];

    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
    }

    state = {
        filters: {},
    };

    componentDidMount() {
        const { dispatch, researchesTypes } = this.props;
        if (isEmpty(researchesTypes)) {
            dispatch(getResearchesTypes());
            dispatch(getResearchesTypesExisting());
        }
        dispatch(getStatistics());
    }

    static propTypes = {
        researchesTypes: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        myStatistic: PropTypes.object.isRequired,
        ward: PropTypes.bool.isRequired,
    };

    renderItem = (item) => {
        const { dispatch } = this.props;

        return (
            <ResearchListItem
                onClick={() => this.onClick(item)}
                onDelete={(id) => {
                    dispatch(
                        deleteMyResearches({
                            id,
                            filters: this.state.filters,
                        }),
                    );
                    dispatch(hidePopup());
                }}
                data={item}
            />
        );
    };

    onClick = (item) => {
        const { history } = this.props;
        history.push({
            pathname: `${LK_MENU_ELEMENTS.TREATMENT_PAGE.path}/view`,
            state: { item },
        });
    };

    newResearch = () => {
        const { history } = this.props;
        history.push({
            pathname: `${LK_MENU_ELEMENTS.TREATMENT_PAGE.path}/new`,
            state: { item: {} },
        });
    };

    renderList = () => {
        const { myStatistic } = this.props;
        const showStatistics = !isEmpty(myStatistic);
        return (
            <>
                <InformationWrapper>
                    {showStatistics && (
                        <Item>
                            В год можно загрузить до {myStatistic.allowed.count}{" "}
                            {getPluralLabel(myStatistic.allowed.count, [
                                "файла",
                                "файлов",
                                "файлов",
                            ])}{" "}
                            на все исследования.
                        </Item>
                    )}
                    {showStatistics && (
                        <Item>
                            Загружено файлов: {myStatistic.current.count} из{" "}
                            {myStatistic.allowed.count}
                        </Item>
                    )}
                    <Desktop>
                        <PrintWrapper>
                            <ReactPrint
                                content={this.contentRef.current || ""}
                            />
                        </PrintWrapper>
                    </Desktop>
                </InformationWrapper>
                <DataContent>
                    <FetchingList
                        params={this.state.filters}
                        action={getMyResearches}
                        reducerName={`researches`}
                        renderItem={this.renderItem}
                        alwaysDidMountFetch={true}
                    />
                </DataContent>
                <PrintContent ref={this.contentRef}>
                    <PrintHeader title={"Мое лечение"} />
                    <FetchingList
                        objectName={"printData"}
                        params={this.state.filters}
                        action={getMyPrintResearches}
                        reducerName={`researches`}
                        renderItem={this.renderItem}
                    />
                </PrintContent>
            </>
        );
    };

    render() {
        const { ward } = this.props;
        return (
            <>
                <Heading>
                    <PageHeading
                        title={
                            ward
                                ? LK_MENU_ELEMENTS.TREATMENT_PAGE.wardName
                                : LK_MENU_ELEMENTS.TREATMENT_PAGE.name
                        }
                    />
                    <Additional>
                        <Desktop>
                            <PageInfo>
                                <TextBlock>
                                    Внимание! Ответственность за содержание
                                    загружаемых файлов лежит на пользователе
                                    личного кабинета. Загружаемые файлы должны
                                    содержать только сведения о проведенных
                                    исследованиях, загружать файлы другого
                                    содержания не допускается.
                                </TextBlock>
                            </PageInfo>
                        </Desktop>
                        <Tablet>
                            <PageInfo>
                                <Actions items={this.infoIcon} />
                            </PageInfo>
                        </Tablet>
                        <Button
                            label={"Добавить документ"}
                            onClick={() => this.newResearch()}
                        />
                    </Additional>
                </Heading>
                <Row fullHeight>
                    <Desktop>
                        <ScrollBar>
                            <Column>
                                <ContentWrapper>
                                    {this.renderSearch()}
                                    {this.renderList()}
                                </ContentWrapper>
                            </Column>
                        </ScrollBar>
                    </Desktop>
                    <Tablet>
                        <Column>
                            <ContentWrapper>
                                {this.renderSearch()}
                                {this.renderList()}
                            </ContentWrapper>
                        </Column>
                    </Tablet>
                </Row>
            </>
        );
    }

    renderSearch = () => {
        return (
            <Filter
                ref={(el) => (this.filterElement = el)}
                fields={[
                    {
                        name: "title",
                        type: "input",
                        label: "Медицинское мероприятие:",
                        placeholder: "Поиск по названию услуги",
                    },
                    {
                        name: "fromExecutionDate",
                        type: "date",
                        label: "С:",
                        placeholder: "Дата с",
                    },
                    {
                        name: "toExecutionDate",
                        type: "date",
                        label: "По:",
                        placeholder: "Дата по",
                    },
                    {
                        name: "kindId",
                        type: "select",
                        label: "Тип документа:",
                        placeholder: "",
                        options: this.props.researchesTypes,
                    },
                ]}
                onSearch={(filters) => this.setState({ filters })}
            />
        );
    };
}

const DataContent = styled.div`
    width: 100%;
`;

const PrintContent = styled.div`
    width: 100%;
    opacity: 0;
    visibility: hidden;
    height: 0;
    overflow: hidden;

    @media print {
        opacity: 1;
        visibility: visible;
        height: auto;
        overflow: initial;
    }
`;

const PrintWrapper = styled.div``;

const PageInfo = styled.div`
    width: 600px;
    margin-right: 16px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: auto;
    }
`;

const Additional = styled.div`
    display: flex;
    align-items: center;
`;

const InformationWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
`;

const Item = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-right: 40px;

    &:last-child {
        margin-right: 0;
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    margin-bottom: 16px;
`;

export default Researches;
