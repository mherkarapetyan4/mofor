import React, { PureComponent } from "react";
import styled from "styled-components";
import { Radio } from "components/Radio";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editEachItem, getClaimDictionary } from "actions/policy";
import { policyPaths } from "config/paths";
import { Loader } from "components/Loader";
import { isEmpty, get } from "lodash";
import NoData from "components/NoData";
import { FormikFormField } from "wrappers/Formik/FormField";
import { findError } from "pages/NewPolis/Forms/helper";
import { fontStyles } from "styledMixins/mixins";

const COMPONENT_NAME = "OMSPolisExistence";

@connect((state) => ({
    data: get(state.policy, `${COMPONENT_NAME}.content`, []),
    isFetching: state.policy.isFetching,
}))
class OMSPolisExistence extends PureComponent {
    state = {
        formElements: [],
        isValid: null,
    };
    static defaultProps = {
        data: [],
    };
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.array,
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        fields: PropTypes.array.isRequired,
    };

    componentDidMount() {
        const { dispatch, errors, fields } = this.props;
        if (isEmpty(this.props.data)) {
            dispatch(
                getClaimDictionary(
                    policyPaths.GET_CLAIM_DICTIONARY_EXISTENCE_LIST,
                    COMPONENT_NAME,
                ),
            );
        }
        this.changeData();
        this.setState({
            isValid: !findError(fields, errors),
        });
    }

    componentDidUpdate(prevProps) {
        const { data, values, errors, fields, dispatch } = this.props;
        // const { isValid } = this.state;
        if (JSON.stringify(data) !== JSON.stringify(prevProps.data)) {
            this.changeData();
        }
        // if (JSON.stringify(errors) !== JSON.stringify(prevProps.errors)) {
        //     this.setState({
        //         isValid: !findError(fields, errors),
        //     });
        // }
        // if (
        //     isValid &&
        //     JSON.stringify(values) !== JSON.stringify(prevProps.values)
        // ) {
        //     this.handleItems(values);
        // }

        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
        }
        if (
            (findError(fields, prevProps.errors) &&
                !findError(fields, errors)) ||
            values.policyExistenceCode !== prevProps.values.policyExistenceCode
        ) {
            this.handleItems(values);
        }
    }

    changeData() {
        const { data } = this.props;
        const formElements = data.map((item) => ({
            existingKindNeed: item.existingKindNeed,
            label: item.name,
            value: item.code,
        }));
        this.setState({ formElements });
    }

    handleItems = ({ policyExistenceCode: value }) => {
        const { dispatch } = this.props;
        const { formElements } = this.state;
        dispatch(editEachItem(COMPONENT_NAME, "checked", true));

        const selectedData = formElements.find((item) => item.value === value);
        dispatch(editEachItem("AppealReason", "isShow", false));
        if (selectedData && !selectedData.existingKindNeed) {
            dispatch(editEachItem("OMSPolisExistenceType", "isShow", false));
            dispatch(editEachItem("PolisShape", "isShow", true));
            return false;
        }
        dispatch(editEachItem("OMSPolisExistenceType", "isShow", true));
        dispatch(editEachItem("PolisShape", "isShow", false));
    };

    render() {
        const { formElements } = this.state;
        const { isFetching, data, values } = this.props;

        const hint = data.find(
            (item) => item.code === values?.policyExistenceCode,
        )?.hint;

        if (isFetching) return <Loader />;
        if (isEmpty(formElements))
            return (
                <NoData
                    title={"Нет данных"}
                    message={"Для данного объекта отсутствуют данные"}
                />
            );
        return (
            <Wrapper>
                <FormikFormField
                    name={"policyExistenceCode"}
                    component={(props) => (
                        <Radio {...props} elements={formElements} />
                    )}
                />
                {hint && <Hint>{hint}</Hint>}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

const Hint = styled.div`
    padding: 5px 10px;
    border-radius: 5px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    background-color: ${(props) => props.theme.colors.notifications.warning};
    margin: ${(props) => (props.margin ? props.margin : 0)};
`;

export default OMSPolisExistence;
