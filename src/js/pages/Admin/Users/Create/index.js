import React, { PureComponent } from "react";
import { ADMIN_ELEMENTS } from "config/menu";
import Row from "containers/Row";
import Column from "containers/Column";
import { getRolesList } from "actions/admin";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FlatPopup from "components/FlatPopup";
import ScrollBar from "components/ScrollBar";
import UserForm from "pages/Admin/Users/Create/form";
import { hasHistoryState } from "modules/hasHistoryState";

@connect()
@hasHistoryState(ADMIN_ELEMENTS.USERS.path)
class UserCreate extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.object,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getRolesList());
    }

    render() {
        const { history } = this.props;

        return (
            <FlatPopup
                title={
                    history?.location?.state?.user
                        ? ADMIN_ELEMENTS.USER_EDIT.name
                        : ADMIN_ELEMENTS.USER_CREATE.name
                }
            >
                <Row fullPage>
                    <ScrollBar>
                        <Column paddings={0}>
                            <UserForm />
                        </Column>
                    </ScrollBar>
                </Row>
            </FlatPopup>
        );
    }
}
export default UserCreate;
