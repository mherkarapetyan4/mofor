import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import RootComponent from "routes/Root";
import AdminApp from "routes/Admin";
import { ThemeProvider, withTheme } from "styled-components";
import { connect } from "react-redux";
import { ADMIN_ELEMENTS } from "config/menu";
import { history } from "routes/history";
import AnchorPopup from "components/AnchorPopup";
import Popup from "components/Popup";
import { authUserSuccess } from "actions/admin";
import axios from "axios";
import { adminPaths } from "config/paths";

@connect((state) => ({
    adminIsAuth: state.admin.adminIsAuth,
    theme: state.app.theme,
    userTheme: state.app.userTheme,
}))
@withTheme
class AdminContainer extends PureComponent {
    static propTypes = {
        theme: PropTypes.object.isRequired,
        userTheme: PropTypes.object.isRequired,
        adminIsAuth: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    async componentDidMount() {
        const adminUserInfo = localStorage.getItem("adminUserInfo");
        const response = await axios.get(`/${adminPaths.GET_ROLES_LIST}`);

        if (adminUserInfo && response.status === 200) {
            const adminUserInfoObject = JSON.parse(adminUserInfo || "[]");
            const { user: adminUser, id: adminSession } = adminUserInfoObject;
            // eslint-disable-next-line require-atomic-updates
            axios.defaults.headers["mgfoms-admin-session"] = adminSession;
            this.props.dispatch(authUserSuccess(adminUser));
        } else {
            localStorage.removeItem("adminUserInfo");
            history.push(ADMIN_ELEMENTS.LOGIN_PAGE.path);
        }
    }

    render() {
        const { theme, userTheme } = this.props;

        return (
            <ThemeProvider theme={{ ...theme, userTheme }}>
                <RootComponent>
                    <AnchorPopup />
                    <Popup />
                    <AdminApp />
                </RootComponent>
            </ThemeProvider>
        );
    }
}

export default AdminContainer;
