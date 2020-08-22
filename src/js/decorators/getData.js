import React, { PureComponent } from "react";
import { connect } from "react-redux";
import forEach from "lodash/forEach";
import PropTypes from "prop-types";

const createActions = (action, dispatch) => {
    const actions = {};
    forEach(action, (v, k) => {
        actions[k] = () => dispatch(v());
    });

    return actions;
};

export const getData = (action, fields) => (WrappedComponent) => {
    return @connect(
        (state) => {
            let stateToProps = {};

            if (fields)
                fields.forEach((item) => {
                    stateToProps[item] = state[item];
                });

            return stateToProps;
        },
        (dispatch) => {
            return { actions: createActions(action, dispatch) };
        },
    )
    class DataProvider extends PureComponent {
        componentDidMount() {
            // eslint-disable-next-line react/prop-types
            forEach(this.props.actions, (item) => item());
        }

        static propTypes = {
            actions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        };

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};
