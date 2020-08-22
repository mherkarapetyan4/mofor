import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import { ADMIN_ELEMENTS } from "config/menu";
import Row from "containers/Row";
import { Button } from "components/Button";
import UpdateItem from "pages/Admin/Updates/UpdateItem";
import { history } from "routes/history";
import Column from "containers/Column";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getNewsList } from "actions/admin";
import { FetchingList } from "components/FetchingList";
import ScrollBar from "components/ScrollBar";
import styled from "styled-components";
import UpdateInfoModal from "./UpdateInfoModal";
import { showPopup } from "actions/popup";
import withRedirectAdmin from "decorators/admin";

@withRedirectAdmin("UPDATES")
@connect()
@withRouter
class Updates extends PureComponent {
    showInfo = (item) => {
        const { dispatch } = this.props;
        dispatch(
            showPopup("Обновление сервиса", <UpdateInfoModal item={item} />),
        );
    };

    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={ADMIN_ELEMENTS.UPDATES.name} />
                    <Button
                        label={"Новое обновление"}
                        onClick={this.newUpdate}
                    />
                </Heading>
                <Row fullHeight>
                    <Column>
                        <ScrollBar>
                            <Wrapper>
                                <FetchingList
                                    action={getNewsList}
                                    reducerName={"admin.news"}
                                    renderItem={(item) => (
                                        <UpdateItem
                                            item={item}
                                            onClick={() => this.showInfo(item)}
                                        />
                                    )}
                                />
                            </Wrapper>
                        </ScrollBar>
                    </Column>
                </Row>
            </>
        );
    }

    newUpdate = () => {
        history.push(`${ADMIN_ELEMENTS.UPDATES.path}/new`);
    };
}

Updates.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
    display: flex;
`;

export default Updates;
