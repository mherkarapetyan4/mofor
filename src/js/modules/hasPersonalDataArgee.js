import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AgreementPage from "pages/Agreement";
import { Loader } from "components/Loader";

export const hasPersonalDataArgee = (Component) => {
    @connect((state) => ({
        confirmations: state.myData.myData.confirmations,
    }))
    class PersonalDataAgree extends PureComponent {
        static propTypes = {
            dispatch: PropTypes.func.isRequired,
            confirmations: PropTypes.object,
        };

        render() {
            const { confirmations } = this.props;
            if (!confirmations && confirmations !== null) return <Loader />;
            if (!confirmations || !confirmations.personalData) {
                return <AgreementPage />;
            }
            return <Component {...this.props} />;
        }
    }

    return PersonalDataAgree;
};
