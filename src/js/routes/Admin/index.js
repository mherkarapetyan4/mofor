import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import AdminRoutes from "./routes";
import { LazyComponent } from "containers/LazyComponent";
import { ADMIN_LEFT_MENU_ELEMENTS, ADMIN_ELEMENTS } from "config/menu";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import "scss/fonts.scss";
import { setFirstAvailRoute } from "actions/admin";
import { hidePopup } from "actions/popup";

const Menu = React.lazy(() => import("containers/Menu"));
const AdminLogin = React.lazy(() => import("pages/AdminAuth"));

@withRouter
@connect((state) => ({
    adminIsAuth: state.admin.adminIsAuth,
    user: state.admin.user,
}))
class AdminApp extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        adminIsAuth: PropTypes.bool.isRequired,
        setFirstAvailRoute: PropTypes.func,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.dispatch(hidePopup());
        }
    }

    render() {
        const { adminIsAuth, user } = this.props;
        let filteredMenu = [];

        if (adminIsAuth) {
            filteredMenu = ADMIN_LEFT_MENU_ELEMENTS.filter((menuItem) =>
                menuItem.roles.includes(user.role.name),
            );
            if (isEmpty(filteredMenu)) {
                return (
                    <div>
                        У вас нет прав для использования данного приложения
                    </div>
                );
            } else {
                this.props.dispatch(setFirstAvailRoute(filteredMenu[0].path));
            }
        }

        return (
            <AppWrapper>
                {adminIsAuth && (
                    <LazyComponent
                        component={Menu}
                        data={{ elements: filteredMenu }}
                    />
                )}
                <>
                    {adminIsAuth ? (
                        <AdminRoutes adminIsAuth={adminIsAuth} />
                    ) : (
                        <Route
                            exact
                            path={ADMIN_ELEMENTS.AUTH_PAGE.path}
                            component={(props) => (
                                <LazyComponent
                                    component={AdminLogin}
                                    data={props}
                                />
                            )}
                        />
                    )}
                </>
            </AppWrapper>
        );
    }
}

const AppWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    height: 100vh;
`;

export default AdminApp;
