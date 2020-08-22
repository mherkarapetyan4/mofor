import React, { PureComponent } from "react";
import styled from "styled-components";
import Measuring from "./Measuring";
import { connect } from "react-redux";
import get from "lodash/get";
import { OCNO_TYPES } from "config/consts";
import PropTypes from "prop-types";
import { getIndicatorList } from "actions/onco";
import { Loader } from "components/Loader";
import { generateEditComponent } from "pages/Health/Edit";
import { getTargetHealthData } from "actions/health";
import { hidePopup, showPopup } from "actions/popup";

@connect((state) => ({
    data: get(state, "onco.indicator.indicators", []),
    isFetching: state.onco.isFetching,
    target: state.health.target,
}))
class OncoMeasuring extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        isFetching: PropTypes.bool.isRequired,
        target: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    state = {
        editTarget: false,
    };
    static defaultProps = {
        data: [],
        target: [],
    };

    changeEditState = () => {
        const { dispatch } = this.props;
        dispatch(getIndicatorList());
        dispatch(hidePopup());
    };

    changeEditAction = (value) => {
        this.setState({ editTarget: value });
    };
    renderFormLabel = (type) => {
        return get(OCNO_TYPES, type);
    };

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getTargetHealthData());
        dispatch(getIndicatorList());
    }

    // componentDidUpdate(prevProps) {
    //     // const { dispatch } = this.props;
    //
    //     // if (!prevProps.currentDate.isSame(currentDate, "d")) {
    //     //     dispatch(getIndicatorList());
    //     // }
    // }

    add = (type) => {
        this.setState({ type });
        const Edit = generateEditComponent(type, "onco");
        return (
            <EditWrapper>
                <Edit
                    type={type}
                    renderFormLabel={(type) => this.renderFormLabel(type)}
                    changeEditState={this.changeEditState}
                    renderTargetValue={null}
                />
            </EditWrapper>
        );
    };

    addSubmit(type) {
        const { dispatch } = this.props;
        dispatch(showPopup(this.renderFormLabel(type), this.add(type)));
    }

    render() {
        const { data, isFetching } = this.props;
        if (isFetching) {
            return <Loader />;
        }
        return (
            <Wrapper>
                {data.map(({ type, values, overdue }) => {
                    return (
                        <Measuring
                            key={`measuring_${type}`}
                            title={get(OCNO_TYPES, type)}
                            data={values}
                            action={() => this.addSubmit(type)}
                            overdue={overdue}
                        />
                    );
                })}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;
const EditWrapper = styled.div`
    padding: 10px;
`;

export default OncoMeasuring;
