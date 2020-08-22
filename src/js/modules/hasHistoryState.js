import React, { PureComponent } from "react";
import { withRouter, Redirect } from "react-router-dom";
import get from "lodash/get";
import PropTypes from "prop-types";

export const hasHistoryState = (path) => (Component) => {
    @withRouter
    class HasHistoryState extends PureComponent {
        static propTypes = {
            history: PropTypes.object.isRequired,
        };

        constructor(props) {
            super(props);
            this.isRedirect = !get(props, "history.location.state");
        }

        render() {
            if (this.isRedirect) {
                return <Redirect to={path} />;
            }
            return <Component {...this.props} />;
        }
    }

    return HasHistoryState;
};
