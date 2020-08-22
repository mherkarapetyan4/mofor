import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { LazyComponent } from "containers/LazyComponent";
import styled from "styled-components";

const Statistic = React.lazy(() => import("pages/Admin/Statistic"));
const Budget = React.lazy(() => import("pages/Admin/Budget"));
const Users = React.lazy(() => import("pages/Admin/Users"));
const Updates = React.lazy(() => import("pages/Admin/Updates"));
const Questioning = React.lazy(() => import("pages/Admin/Questioning"));
import NewUpdate from "pages/Admin/Updates/NewUpdate";
import NewQuestioning from "pages/Admin/Questioning/NewQuestioning";

import { ADMIN_ELEMENTS } from "config/menu";
import Footer from "containers/Footer";
import System from "pages/Admin/system";
import UserCreate from "pages/Admin/Users/Create";
import Header from "containers/Header";
import QuestioningStats from "pages/Admin/Questioning/QuestioningStats";
import HotlineSMO from "pages/Admin/HotlineSMO";

class Routes extends PureComponent {
    static propTypes = {};
    render() {
        return (
            <ContentWrapper>
                <Header admin />
                <Content>
                    <Switch>
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.STATISTIC_PAGE.path}
                            component={() => (
                                <LazyComponent component={Statistic} />
                            )}
                        />
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.USERS.path}
                            component={() => (
                                <LazyComponent component={Users} />
                            )}
                        />
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.USER_CREATE.path}
                            component={() => (
                                <LazyComponent component={UserCreate} />
                            )}
                        />
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.USER_EDIT.path}
                            component={() => (
                                <LazyComponent component={UserCreate} />
                            )}
                        />
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.SYSTEM.path}
                            component={() => (
                                <LazyComponent component={System} />
                            )}
                        />
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.UPDATES.path}
                            component={() => (
                                <LazyComponent component={Updates} />
                            )}
                        />
                        <Route
                            exact
                            path={`${ADMIN_ELEMENTS.UPDATES.path}/new`}
                            component={() => (
                                <LazyComponent component={NewUpdate} />
                            )}
                        />
                        <Route
                            exact
                            path={`${ADMIN_ELEMENTS.UPDATES.path}/edit`}
                            component={() => (
                                <LazyComponent component={NewUpdate} />
                            )}
                        />
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.BUDGET.path}
                            component={() => (
                                <LazyComponent component={Budget} />
                            )}
                        />
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.HOTLINE.path}
                            component={() => (
                                <LazyComponent component={HotlineSMO} />
                            )}
                        />
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.QUESTIONING.path}
                            component={() => (
                                <LazyComponent component={Questioning} />
                            )}
                        />
                        <Route
                            exact
                            path={`${ADMIN_ELEMENTS.QUESTIONING.path}/new`}
                            component={() => (
                                <LazyComponent component={NewQuestioning} />
                            )}
                        />
                        <Route
                            exact
                            path={`${ADMIN_ELEMENTS.QUESTIONING.path}/stats`}
                            component={() => (
                                <LazyComponent component={QuestioningStats} />
                            )}
                        />
                        <Route
                            exact
                            path={`${ADMIN_ELEMENTS.QUESTIONING.path}/edit`}
                            component={() => (
                                <LazyComponent component={NewQuestioning} />
                            )}
                        />
                    </Switch>
                </Content>
                <Footer admin />
            </ContentWrapper>
        );
    }
}

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    flex: 1;
    height: 100vh;
    overflow: auto;
`;

const Content = styled.div`
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

export default Routes;
