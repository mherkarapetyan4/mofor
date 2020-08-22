import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { HashRouter } from "react-router-dom";

import { BASE_URL } from "config/consts";
import axios from "axios";
import ErrorModal from "components/Modal/ErrorModal";
import SuccessModal from "components/SuccessModal/SuccessModal";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

class Root extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
            .isRequired,
    };

    render() {
        return (
            <HashRouter>
                {/*тут будет обертка для приложения + модальные окна (общие для всего приложения) типо error modal, ...*/}
                {this.props.children}
                <ErrorModal />
                <SuccessModal />
            </HashRouter>
        );
    }
}

export default Root;
