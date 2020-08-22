import React, { PureComponent } from "react";
import { FetchingList } from "components/FetchingList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AutoComplete from "components/AutoComplete";
import { getPillboxDrugs } from "actions/pillbox";
import { pillboxPaths } from "config/paths";
import ScreeningItem from "pages/Pillbox/ScreeningItem";
import styled from "styled-components";
import { Desktop, Tablet } from "wrappers/responsive";
import { Link } from "react-router-dom";
import { LK_MENU_ELEMENTS } from "config/menu";
import { fontStyles } from "styledMixins/mixins";
import { withRouter } from "react-router-dom";
import { showPopup, hidePopup } from "actions/popup";
import ScreeningResultHtml from "pages/Pillbox/List/ScreeningResultHtml";
import { Button } from "components/Button";
import { BASE_URL, RESPONSIVE } from "config/consts";
import {
    getScreeningResultCounts,
    getPillboxDoScreening,
    doctorVisited,
    getPillboxScreeningResult,
} from "actions/pillbox";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import IncompatibilitiesDetails from "pages/Pillbox/List/IncompatibilitiesDetails";
import PrintHeader from "components/PrintHeader";
import ReactPrint from "components/ReactToPrint";

const messages = {
    NEED_RENEW:
        "Требуется повторная проверка совместимости в связи с внесенными в таблетницу изменениями. Перед проверкой, пожалуйста, убедитесь что в профиле таблетницы приведена актуальная информация.",
    NO_PROBLEMS: "Проблем совместимости не выявлено",
    PROBLEMS_FOUND:
        "Выявлены проблемы совместимости. Предоставленные описания предназначаются, в первую очередь, для врачей",
    PROBLEMS_FOUND_DOCTOR_NEED:
        "Выявлены несовместимости. Предоставленные описания предназначаются, в первую очередь, для врачей. Обращаем внимание, что несмотря на наличие предупреждений, в отдельных случаях врач может назначить лекарственные средства, имеющие выявленные несовместимости. Проконсультируйтесь с Вашим лечащим врачом",
    PROBLEMS_FOUND_DOCTOR_VISITED: "Выявлены проблемы совместимости",
};

@withRouter
@connect(
    (state) => ({
        profile: state.pillbox.currentPillbox.profile,
        screeningResultCounts: state.pillbox.screeningResultCounts,
        isFetching: state.pillbox.isFetching,
        screening: state.pillbox.screening,
    }),
    {
        showPopup,
        hidePopup,
        getScreeningResultCounts,
        getPillboxDoScreening,
        doctorVisited,
        getPillboxScreeningResult,
    },
)
class PillboxList extends PureComponent {
    constructor(props) {
        super(props);
        this.reportRef = React.createRef();
    }

    selectNewDrug = (value) => {
        this.props.history.push({
            pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/course`,
            state: { drug: value },
        });
    };

    componentDidMount() {
        const {
            getScreeningResultCounts,
            getPillboxScreeningResult,
            profile,
        } = this.props;
        if (profile.screeningResultValid && profile.screeningResultId)
            getPillboxScreeningResult(profile.screeningResultId);
        getScreeningResultCounts();
    }

    renderItem = (item, showIcons, screening) => {
        const screeningElements = {};
        if (screening) {
            Object.keys(screening).map((key) => {
                const items = get(screening[key], "items", []);
                items.map((element) => {
                    const drugs = get(element, "drugs") || [];
                    drugs.map((el) => {
                        if (el.code === item.drug.code) {
                            screeningElements[key] = {
                                alert: element.patientAlert || element.alert,
                                severity: element.severity,
                                management: element.management,
                                documentation: element.documentation,
                                onset: element.onset,
                            };
                        }
                    });
                });
            });
        }
        return (
            <ScreeningItem
                item={item}
                showIcons={showIcons}
                screeningElements={screeningElements}
            />
        );
    };

    onInfoClick = () => {
        const { showPopup } = this.props;
        showPopup("Уважаемый пользователь!", <IncompatibilitiesDetails />);
    };

    onPdfClick = () => {
        const { profile } = this.props;
        window.open(
            BASE_URL +
                pillboxPaths.GET_SCREENING_RESULT_PDF +
                `?id=${profile.screeningResultId}`,
        );
    };

    onScreeningClick = () => {
        const { profile, getPillboxDoScreening } = this.props;
        getPillboxDoScreening(profile.id);
    };

    onDoctorVisit = () => {
        const { doctorVisited, profile } = this.props;
        doctorVisited(profile.id);
    };

    render() {
        const {
            profile,
            screeningResultCounts,
            isFetching,
            screening,
        } = this.props;
        if (!profile) return null;

        return (
            <>
                <Wrapper>
                    <Header>
                        <InputWrapper>
                            <AutoComplete
                                label={
                                    <>
                                        <Desktop>
                                            Добавить новое лекарство:
                                        </Desktop>
                                        <Tablet>Доб. новое лекарство:</Tablet>
                                    </>
                                }
                                serverValue={"query"}
                                path={pillboxPaths.GET_DRUG_LIST}
                                queryParams={{
                                    pageSize: 10,
                                    profileId: profile.id,
                                }}
                                elementValue="uniqueId"
                                elementLabel="displayName"
                                placeholder={"Введите название лекарства"}
                                onSelect={this.selectNewDrug}
                            />
                            <WarningWrapper>
                                <Warning>
                                    Для запуска поиска лекарства введите по
                                    крайней мере 2 символа в строку поиска.
                                </Warning>
                            </WarningWrapper>
                        </InputWrapper>
                    </Header>
                    {profile.id && (
                        <ListWrapper>
                            <FetchingList
                                params={{ profileId: profile.id }}
                                renderItem={(item) =>
                                    this.renderItem(
                                        item,
                                        !isEmpty(screening) &&
                                            profile.screeningResultValid,
                                        screening.summary,
                                    )
                                }
                                reducerName={"pillbox.drugsList"}
                                action={getPillboxDrugs}
                                alwaysDidMountFetch={true}
                                rigid
                            />
                        </ListWrapper>
                    )}
                    <Notification>
                        Курсы лекарственных средств можно посмотреть в разделе{" "}
                        <Link to={LK_MENU_ELEMENTS.CALENDAR_PAGE.path}>
                            “Календарь”
                        </Link>
                    </Notification>

                    <IncompatibilitiesStatus>
                        {profile.screeningStatus !== "NEVER" && (
                            <MessageWrapper>
                                <Message>
                                    {messages[profile.screeningStatus]}
                                </Message>
                            </MessageWrapper>
                        )}
                        {profile.screeningResultValid && (
                            <Actions>
                                <Button
                                    label={"См. подробнее"}
                                    onClick={this.onInfoClick}
                                />
                                <Group>
                                    <GroupText>
                                        Для консультации с врачом Вы можете:
                                    </GroupText>
                                    <Button
                                        label={"Скачать результаты в PDF"}
                                        onClick={this.onPdfClick}
                                    />
                                    <GroupText>или</GroupText>
                                    <PrintWrapper>
                                        <ReactPrint
                                            content={this.reportRef.current}
                                            title={"Вывести на экран"}
                                        />
                                    </PrintWrapper>
                                    <GroupText>и распечатать.</GroupText>
                                    <PrintContentWrapper>
                                        <PrintContent ref={this.reportRef}>
                                            <PrintHeader />
                                            <ScreeningResultHtml
                                                id={profile.screeningResultId}
                                            />
                                        </PrintContent>
                                    </PrintContentWrapper>
                                </Group>
                            </Actions>
                        )}
                    </IncompatibilitiesStatus>
                    <Actions>
                        {profile.screeningStatus ===
                            "PROBLEMS_FOUND_DOCTOR_NEED" && (
                            <Button
                                label={"Я посетил врача"}
                                onClick={this.onDoctorVisit}
                            />
                        )}
                        <Button
                            label={"Проверить совместимость"}
                            onClick={this.onScreeningClick}
                            disabled={
                                profile.screeningResultValid ||
                                isFetching ||
                                isEmpty(screeningResultCounts) ||
                                screeningResultCounts.currentYearUsed >=
                                    screeningResultCounts.yearLimit
                            }
                        />
                        {!isEmpty(screeningResultCounts) && (
                            <ScreeningCount>
                                <CountText>
                                    Выполнено скринингов лекарственных средств:
                                </CountText>
                                <Count>
                                    {screeningResultCounts.currentYearUsed} из{" "}
                                    {screeningResultCounts.yearLimit}
                                </Count>
                            </ScreeningCount>
                        )}
                    </Actions>
                </Wrapper>
            </>
        );
    }
}

const WarningWrapper = styled.div`
    margin-top: 10px;
`;

const Warning = styled.div`
    ${(props) => fontStyles(props)};
`;

const PrintWrapper = styled.div`
    margin-right: 16px;
`;

const PrintContentWrapper = styled.div`
    display: none;
`;

const PrintContent = styled.div``;

const CountText = styled.div`
    padding: 7px 0;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const GroupText = styled.div`
    margin-right: 16px;
    padding: 7px 0;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Count = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Group = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        margin-top: 10px;
    }
`;

const ScreeningCount = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const MessageWrapper = styled.div`
    margin-bottom: 16px;
    display: inline-flex;
`;

const Message = styled.div`
    background-color: ${(props) => props.theme.colors.notifications.warning};
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    padding: 10px 16px;
    border-radius: 4px;
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
`;

const IncompatibilitiesStatus = styled.div``;

const InputWrapper = styled.div`
    margin-right: 16px;
    flex: 1 1 auto;

    &:last-child {
        margin-right: 0;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ListWrapper = styled.div`
    margin-bottom: 16px;
`;

const Notification = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 16px;
`;

PillboxList.propTypes = {
    profile: PropTypes.object,
    dispatch: PropTypes.func,
    history: PropTypes.array,
    showPopup: PropTypes.func,
    hidePopup: PropTypes.func,
    getScreeningResultCounts: PropTypes.func,
    screeningResultCounts: PropTypes.object,
    getPillboxDoScreening: PropTypes.func,
    getPillboxScreeningResult: PropTypes.func,
    isFetching: PropTypes.bool,
    doctorVisited: PropTypes.func,
    screening: PropTypes.object,
};

export default PillboxList;
