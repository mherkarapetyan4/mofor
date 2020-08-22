import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { ADMIN_ELEMENTS } from "config/menu";
import { connect } from "react-redux";

const withRedirectAdmin = (objectKey) => (WrappedComponent) => {
    @withRouter
    @connect((state) => ({
        user: state.admin.user,
    }))
    class DataProvider extends PureComponent {
        constructor(props) {
            super(props);
            const roles = ADMIN_ELEMENTS[objectKey].roles;
            this.redirect =
                roles && !roles.some((e) => e === props.user.role.name);
        }

        static propTypes = {
            user: PropTypes.object.isRequired,
        };

        render() {
            if (this.redirect) {
                const roleName = this.props.user.role?.name;
                const redirectSection = Object.keys(ADMIN_ELEMENTS).find(
                    (e) => {
                        const item = ADMIN_ELEMENTS[e];
                        return (
                            item.leftMenu &&
                            item.roles.some((el) => el === roleName)
                        );
                    },
                );
                return <Redirect to={ADMIN_ELEMENTS[redirectSection].path} />;
            }
            return <WrappedComponent {...this.props} />;
        }
    }

    return DataProvider;
};

export default withRedirectAdmin;
