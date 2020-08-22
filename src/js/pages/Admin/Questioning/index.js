import React, { PureComponent } from "react";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import { ADMIN_ELEMENTS } from "config/menu";
import { Button } from "components/Button";
import Row from "containers/Row";
import Column from "containers/Column";
import WidgetBlock from "components/WidgetBlock";
import QuestioningItem from "pages/Admin/Questioning/QuestioningItem";
import NoData from "components/NoData";
import { FetchingList } from "components/FetchingList";
import { getQuestioningList } from "actions/admin";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ScrollBar from "components/ScrollBar";
import styled from "styled-components";

import withRedirectAdmin from "decorators/admin";

@withRedirectAdmin("QUESTIONING")
@withRouter
class Questioning extends PureComponent {
    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={ADMIN_ELEMENTS.QUESTIONING.name} />
                </Heading>
                <Row fullHeight>
                    <Column fraction={7}>
                        <ScrollBar>
                            <WidgetBlock
                                title={"Анкеты"}
                                additional={
                                    <Button
                                        label={"Создать анкету"}
                                        onClick={() => this.newQuestionnaire()}
                                    />
                                }
                            >
                                <FetchingList
                                    params={{
                                        states: ["PUBLISHED", "ENDED"],
                                        action: "pub_end",
                                    }}
                                    objectName={"questioning.pub_end"}
                                    emptyMessage={() => (
                                        <NoData
                                            title={"Нет опубликованных анкет"}
                                            message={
                                                "У вас отсутствуют опубликованные анкеты."
                                            }
                                        />
                                    )}
                                    action={getQuestioningList}
                                    reducerName={"admin"}
                                    renderItem={(item) => (
                                        <QuestioningItem
                                            item={item}
                                            onClick={() => this.viewStats(item)}
                                        />
                                    )}
                                />
                            </WidgetBlock>
                        </ScrollBar>
                    </Column>
                    <Column fraction={5}>
                        <ScrollBar>
                            <WidgetWrapper>
                                <WidgetBlock title={"Черновики"}>
                                    <FetchingList
                                        params={{
                                            states: ["DRAFT"],
                                            action: "draft",
                                        }}
                                        objectName={"questioning.draft"}
                                        emptyMessage={() => (
                                            <NoData
                                                title={"Нет черновиков"}
                                                message={
                                                    "У вас отсутствуют черновики анкет."
                                                }
                                            />
                                        )}
                                        action={getQuestioningList}
                                        reducerName={"admin"}
                                        renderItem={(item) => (
                                            <QuestioningItem
                                                item={item}
                                                onClick={() => {
                                                    this.editQuestionnaire(
                                                        item,
                                                    );
                                                }}
                                            />
                                        )}
                                    />
                                </WidgetBlock>
                            </WidgetWrapper>
                        </ScrollBar>
                    </Column>
                </Row>
            </>
        );
    }

    newQuestionnaire = () => {
        this.props.history.push({
            pathname: `${ADMIN_ELEMENTS.QUESTIONING.path}/new`,
            state: {},
        });
    };

    editQuestionnaire = (item) => {
        this.props.history.push({
            pathname: `${ADMIN_ELEMENTS.QUESTIONING.path}/edit`,
            state: { id: item.id },
        });
    };

    viewStats = (item) => {
        this.props.history.push({
            pathname: `${ADMIN_ELEMENTS.QUESTIONING.path}/stats`,
            state: { item },
        });
    };
}

const WidgetWrapper = styled.div`
    margin-top: 13px;
    width: 100%;
`;

Questioning.propTypes = {
    history: PropTypes.object.isRequired,
};
Questioning.defaultProps = {
    history: {},
};
export default Questioning;
