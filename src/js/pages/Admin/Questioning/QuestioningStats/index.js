import React, { PureComponent } from "react";
import Row from "containers/Row";
import Column from "containers/Column";
import FlatPopup from "components/FlatPopup";
import { Tabs } from "components/Tabs";
import styled from "styled-components";
import WidgetBlock from "components/WidgetBlock";
import FormField from "components/FormField";
import { List } from "components/List";
import StatisticsListItem from "pages/Admin/Questioning/QuestioningStats/StatisticsListItem";
import { fontStyles } from "styledMixins/mixins";
import QuestionAnswers from "pages/Admin/Questioning/QuestionAnswers";
import { Button } from "components/Button";
import Actions from "containers/Header/Actions";
import FullArrowIcon from "icons/FullArrowIcon";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import {
    actionGetQuestioningStatisticFull,
    getPBDUser,
    getQuestioningDetailFull,
    getQuestioningStatisticCompleted,
} from "actions/admin";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Loader } from "components/Loader";
import { formatDate } from "utils/formatDate";
import { get, findIndex, isEmpty } from "lodash";
import DetailFull from "pages/Admin/Questioning/QuestioningStats/DetailFull";
import { ADMIN_ELEMENTS } from "config/menu";

@withRouter
@connect((state) => ({
    isFetching: state.admin.isFetching,
    data: state.admin.questioning.data,
    statisticsCompleted: get(
        state.admin.questioning,
        "statisticsCompleted.content",
        [],
    ),
    userData: get(state.admin.questioning, "PBDUser.person", {}),
    detailFull: get(state.admin.questioning, "detailFull.content", []),
}))
class QuestioningStats extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        statisticsCompleted: PropTypes.array,
        detailFull: PropTypes.array,
        userData: PropTypes.object,
        data: PropTypes.shape({
            countsByAgeAndSex: PropTypes.object,
            countsBySex: PropTypes.object,
            questions: PropTypes.array,
            completionsCount: PropTypes.number,
            length: PropTypes.number,
        }),
    };
    static defaultProps = {
        location: {},
        statisticsCompleted: [],
        userData: {},
        detailFull: [],
    };
    state = {
        questionaryId: "",
        type: "overall",
        ageFilter: "allAge",
        genderFilter: "all",
        byAgeAndSexData: [],
        ukls: [],
        ukl: "",
        currentUklIndex: 1,
    };
    componentDidMount() {
        const { dispatch, location, history } = this.props;
        const id = get(location, "state.item.id", "");
        if (!id) {
            history.push(ADMIN_ELEMENTS.QUESTIONING.path);
        } else {
            this.setState({ questionaryId: id });
            dispatch(actionGetQuestioningStatisticFull(id));
            dispatch(
                getQuestioningStatisticCompleted({
                    questionaryId: id,
                    pageNumber: 1,
                    pageSize: 10,
                }),
            );
            this.setUkls();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { statisticsCompleted, data } = this.props;
        const { byAgeAndSexData } = this.state;
        if (isEmpty(byAgeAndSexData) && !isEmpty(data)) {
            const male = data.countsByAgeAndSex.filter(
                (item) => item.sex === "MALE",
            );
            const female = data.countsByAgeAndSex.filter(
                (item) => item.sex === "FEMALE",
            );
            this.setState({ byAgeAndSexData: [male, female] });
        }
        const { ukl } = this.state;
        if (prevState.ukl !== ukl && ukl) {
            this.getDetail();
        }
        if (
            JSON.stringify(statisticsCompleted) !==
            JSON.stringify(prevProps.statisticsCompleted)
        ) {
            this.setUkls();
        }
    }

    setUkls = () => {
        const { statisticsCompleted } = this.props;
        const data = statisticsCompleted.map(({ ukl }) => ({
            value: ukl,
            label: ukl,
        }));
        this.setState({ ukls: data });
    };
    genderElements = [
        {
            value: "female",
            label: "Женщины",
        },
        {
            value: "male",
            label: "Мужчины",
        },
        {
            value: "all",
            label: "Все",
        },
    ];

    ageElements = [
        {
            value: "young",
            label: "От 18 до 23 лет",
        },
        {
            value: "adult",
            label: "От 24 до 60 лет",
        },
        {
            value: "old",
            label: "От 61 года",
        },
        {
            value: "allAge",
            label: "Все",
        },
    ];

    prevAction = [
        {
            icon: <FullArrowIcon rotate={180} opacity={0.5} />,
            tooltip: "Предыдущий пользователь",
            action: () => this.changeUkls(true),
        },
    ];

    nextAction = [
        {
            icon: <FullArrowIcon opacity={0.5} />,
            tooltip: "Следующий пользователь",
            action: () => this.changeUkls(false),
        },
    ];

    changeUkls = (prev = false) => {
        const { ukls, ukl } = this.state;
        const currentIndex = findIndex(ukls, ({ value }) => value === ukl);
        if (prev && currentIndex > 0) {
            this.setState({ ukl: get(ukls, `${currentIndex - 1}.value`, "") });
            return false;
        }
        if (!prev && currentIndex < ukls.length - 1) {
            this.setState({ ukl: get(ukls, `${currentIndex + 1}.value`, "") });
            return false;
        }
    };

    getDetail = () => {
        const { dispatch } = this.props;
        const { ukl, questionaryId } = this.state;
        dispatch(getQuestioningDetailFull({ ukl, questionaryId }));
    };
    showFullName() {
        const { ukl, questionaryId } = this.state;
        if (!ukl || !questionaryId) return false;
        const { dispatch } = this.props;
        dispatch(getPBDUser({ ukl, questionaryId }));
    }

    renderPerson() {
        const { userData } = this.props;
        if (isEmpty(userData)) return false;
        const { lastName, firstName, middleName, birthday } = userData;

        return (
            <>
                <Item>
                    <FormField
                        label={"Анкета отправлена:"}
                        value={formatDate(birthday)}
                        disabled
                        type={"text"}
                    />
                </Item>
                <Item>
                    <FormField
                        label={"ФИО пользователя:"}
                        value={`${lastName} ${firstName} ${middleName}`}
                        disabled
                        type={"text"}
                    />
                </Item>
            </>
        );
    }

    renderStatisticsCompleted = (item) => {
        return (
            <>
                <Item>
                    <FormField
                        label={"Анкета отправлена:"}
                        value={formatDate(item.completionDate)}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"ФИО пользователя"}
                        value={"Иванов Иван Иванович"}
                        disabled
                    />
                </Item>
            </>
        );
    };

    render() {
        const { type, byAgeAndSexData, ukls, ukl } = this.state;
        const { data, detailFull, location } = this.props;
        const { completionsCount, countsBySex } = data;
        const questions = get(data, "questions", []);
        const currentUklIndex =
            findIndex(ukls, ({ value }) => value === ukl) + 1;
        const { isFetching } = this.props;
        if (isFetching) return <Loader />;

        const tabs = [
            {
                value: "overall",
                label: "Сводная",
            },
        ];
        if (ukls.length > 0) {
            tabs.push({
                value: "byUser",
                label: "Пользователи",
            });
        }

        return (
            <FlatPopup
                title={`Статистика анкеты ${location?.state?.item?.title}`}
            >
                <Row fullPage>
                    <Column paddings={0}>
                        <TabsWrapper>
                            <Tabs
                                elements={tabs}
                                onChange={(item) => this.handleChange(item)}
                                name={""}
                                tab={type}
                            />
                        </TabsWrapper>
                        <Content>
                            {type === "overall" && (
                                <Question>
                                    <WidgetBlock
                                        title={
                                            "Информация по пройденному анкетированию"
                                        }
                                    >
                                        <Field>
                                            <FormField
                                                label={"Прошло анкетирование"}
                                                onChange={() => {}}
                                                value={`${completionsCount} чел.`}
                                                disabled
                                            />
                                        </Field>
                                        <Field>
                                            <Title>Проголосовавшие:</Title>
                                            <ListWrapper>
                                                <List
                                                    data={byAgeAndSexData}
                                                    renderItem={(items) => (
                                                        <StatisticsListItem
                                                            byAgeAndSexItems={
                                                                items
                                                            }
                                                            bySexItems={
                                                                countsBySex
                                                            }
                                                        />
                                                    )}
                                                    rigid
                                                />
                                            </ListWrapper>
                                        </Field>
                                    </WidgetBlock>
                                    <QuestionsAnswers>
                                        {questions.map((item) => (
                                            <QuestionAnswers
                                                key={item.question.id}
                                                question={item.question}
                                                answers={item.answers}
                                            />
                                        ))}
                                    </QuestionsAnswers>
                                </Question>
                            )}
                            {type === "byUser" && ukls.length > 0 && (
                                <>
                                    <Row>
                                        <WidgetBlock
                                            title={
                                                "Выбор статистики по пользователю"
                                            }
                                        >
                                            <Form>
                                                <Input>
                                                    <InlineFormFieldSelect
                                                        label={
                                                            "УКЛ пользователя:"
                                                        }
                                                        onChange={(ukl) =>
                                                            this.setState({
                                                                ukl,
                                                            })
                                                        }
                                                        placeholder={
                                                            "Выберите пользователя"
                                                        }
                                                        value={ukl}
                                                        options={ukls}
                                                    />
                                                </Input>
                                                <Action>
                                                    <Button
                                                        label={"Показать ФИО"}
                                                        onClick={() =>
                                                            this.showFullName()
                                                        }
                                                    />
                                                </Action>
                                                <Controls>
                                                    <Actions
                                                        items={this.prevAction}
                                                    />
                                                    <Count>{`${currentUklIndex} из ${ukls.length}`}</Count>
                                                    <Actions
                                                        items={this.nextAction}
                                                    />
                                                </Controls>
                                            </Form>
                                        </WidgetBlock>
                                    </Row>
                                    <Row>
                                        <InfoWrapper>
                                            {this.renderPerson()}
                                        </InfoWrapper>
                                    </Row>
                                    <Row>
                                        <QuestionWrapper>
                                            {detailFull.map((item, index) => (
                                                <DetailFull
                                                    key={`detailFull_${index}`}
                                                    item={item}
                                                />
                                            ))}
                                        </QuestionWrapper>
                                    </Row>
                                </>
                            )}
                        </Content>
                    </Column>
                </Row>
            </FlatPopup>
        );
    }

    handleChange = (item) => {
        this.setState({
            type: item.value,
        });
    };

    changeFilterHandler = (type, value) => {
        this.setState({
            [`${type}Filter`]: value,
        });
    };
}

const Question = styled.div`
    margin-bottom: 16px;
`;

const InfoWrapper = styled.div`
    display: flex;
`;

const QuestionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Item = styled.div``;

const Input = styled.div`
    margin-right: 16px;
`;

const Action = styled.div`
    margin-right: 16px;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
`;

const Count = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    flex: 0 0 auto;
    margin: 0 16px;
`;

const Form = styled.div`
    display: flex;
    align-items: center;
`;

const TabsWrapper = styled.div`
    margin-bottom: 16px;
`;

const Content = styled.div`
    width: 100%;
`;

const ListWrapper = styled.div``;

const Field = styled.div`
    margin-bottom: 16px;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

const QuestionsAnswers = styled.div`
    margin-bottom: 16px;
`;
export default QuestioningStats;
