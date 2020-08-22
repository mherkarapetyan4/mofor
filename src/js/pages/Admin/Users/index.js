import React, { PureComponent } from "react";
import styled from "styled-components";
import { FetchingList } from "components/FetchingList";
import { getUsersList } from "actions/admin";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import { ADMIN_ELEMENTS } from "config/menu";
import Row from "containers/Row";
import Column from "containers/Column";
import { Desktop } from "wrappers/responsive";
import ScrollBar from "components/ScrollBar";
import { Button } from "components/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { withRouter } from "react-router-dom";
import withRedirectAdmin from "decorators/admin";

@withRedirectAdmin("USERS")
@connect()
@withRouter
class Users extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    };

    renderItem = (item, index) => {
        const action = () => this.onClick(item);
        return (
            <ListItem
                {...{ item, index }}
                key={`policy_${index}`}
                onClick={action}
            />
        );
    };

    updateList = () => {
        const { dispatch } = this.props;

        dispatch(
            getUsersList({
                pageNumber: null,
                pageSize: null,
            }),
        );
    };

    onClick = (item) => {
        const { history } = this.props;
        if (item) {
            history.push({
                pathname: `${ADMIN_ELEMENTS.USER_CREATE.path}`,
                state: { user: item },
            });
        } else {
            history.push({
                pathname: `${ADMIN_ELEMENTS.USER_CREATE.path}`,
                state: { userCreate: true },
            });
        }
    };
    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={ADMIN_ELEMENTS.USERS.name} />
                    <Actions>
                        <Button
                            label={ADMIN_ELEMENTS.USER_CREATE.name}
                            onClick={() => this.onClick()}
                        />
                        <Button
                            label={"Обновить список"}
                            onClick={() => this.updateList()}
                        />
                    </Actions>
                </Heading>
                <Row fullPage>
                    <Column>
                        <Desktop>
                            <ScrollBar>
                                <Wrapper>
                                    <FetchingList
                                        action={getUsersList}
                                        reducerName={"admin.usersList"}
                                        renderItem={this.renderItem}
                                    />
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
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
`;

export default Users;
