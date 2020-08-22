import React, { PureComponent } from "react";
import styled from "styled-components";
import Measuring from "components/PregnancyMeasuring/Measuring";
import { connect } from "react-redux";
import get from "lodash/get";
import { PREGNANCY_TYPES } from "config/consts";
import PropTypes from "prop-types";
import { getIndicatorList } from "actions/pregnancy";
import { Loader } from "components/Loader";
import { generateEditComponent } from "pages/Health/Edit";
import { getTargetHealthData } from "actions/health";
import { hidePopup, showPopup } from "actions/popup";

@connect((state) => ({
    data: get(state, "pregnancy.indicator.indicators", []),
    isFetching: state.pregnancy.isFetching,
    target: state.health.target,
}))
class PregnancyMeasuring extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        isFetching: PropTypes.bool.isRequired,
        target: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
        currentDate: PropTypes.object.isRequired,
    };
    state = {
        editTarget: false,
    };
    static defaultProps = {
        data: [],
        target: [],
    };

    changeEditState = () => {
        const { dispatch, currentDate } = this.props;
        dispatch(getIndicatorList(currentDate));
        dispatch(hidePopup());
    };

    changeEditAction = (value) => {
        this.setState({ editTarget: value });
    };
    renderFormLabel = (type) => {
        return get(PREGNANCY_TYPES, type);
    };

    componentDidMount() {
        const { dispatch, currentDate } = this.props;

        dispatch(getTargetHealthData());
        dispatch(getIndicatorList(currentDate));
    }

    componentDidUpdate(prevProps) {
        const { dispatch, currentDate } = this.props;
        if (!prevProps.currentDate.isSame(currentDate, "d")) {
            dispatch(getIndicatorList(currentDate));
        }
    }

    add = (type, data) => {
        this.setState({ type });
        const Edit = generateEditComponent(type, "pregnancy");
        const params = {};
        if (data) params.data = data;

        return (
            <EditWrapper>
                <Edit
                    type={type}
                    renderFormLabel={() =>
                        this.renderFormLabel(this.state.type)
                    }
                    changeEditState={this.changeEditState}
                    renderTargetValue={null}
                    {...params}
                />
            </EditWrapper>
        );
    };

    addSubmit(type, data) {
        const { dispatch } = this.props;
        dispatch(showPopup(this.renderFormLabel(type), this.add(type, data)));
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
                            title={get(PREGNANCY_TYPES, type)}
                            data={values}
                            action={() => this.addSubmit(type)}
                            overdue={overdue}
                            onClick={(data) => this.addSubmit(type, data)}
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

export default PregnancyMeasuring;
