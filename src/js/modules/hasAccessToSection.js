import React, { PureComponent } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LK_MENU_ELEMENTS } from "config/menu";

export const hasAccessToSection = (path) => (Component) => {
    @withRouter
    @connect((state) => ({
        settings: state.user.settings,
        isWard: state.myData.myData.ward,
    }))
    class HasAccessToSection extends PureComponent {
        static propTypes = {
            settings: PropTypes.object,
            isWard: PropTypes.any,
            history: PropTypes.object,
            dispatch: PropTypes.func,
        };

        render() {
            const { settings, isWard } = this.props;
            const { pathname } = this.props.history.location;

            if (
                (pathname.indexOf(LK_MENU_ELEMENTS.PREGNANCY_PAGE.path) !==
                    -1 &&
                    !settings.pregnancy) ||
                (pathname.indexOf(LK_MENU_ELEMENTS.ONCO_PAGE.path) !== -1 &&
                    !settings.onco) ||
                (pathname.indexOf(LK_MENU_ELEMENTS.POLIS_PAGE.path) !== -1 &&
                    !settings.policyClaim) ||
                (pathname.indexOf(LK_MENU_ELEMENTS.VACCINATION_PAGE.path) !==
                    -1 &&
                    !isWard) ||
                (pathname.indexOf(LK_MENU_ELEMENTS.DOCTOR_PAGE.path) !== -1 &&
                    settings.emiasVersion !== 5)
            ) {
                if (path) {
                    window.open(path, "_blank");
                }
                return <Redirect to={LK_MENU_ELEMENTS.MAIN_PAGE.path} />;
            }
            return <Component {...this.props} />;
        }
    }

    return HasAccessToSection;
};
