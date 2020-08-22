import React, { PureComponent } from "react";
import styled from "styled-components";
import { Radio } from "components/Radio";
import { editEachItem, getClaimDictionary } from "actions/policy";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Loader } from "components/Loader";
import { get, isEmpty } from "lodash";
import NoData from "components/NoData";
import { policyPaths } from "config/paths";
import { FormikFormField } from "wrappers/Formik/FormField";
import { clearFileds, findError } from "pages/NewPolis/Forms/helper";
import { initial } from "reducers/policy";
// import {findError, getFormData} from "pages/NewPolis/Forms/helper";
const COMPONENT_NAME = "OMSPolisExistenceType";
import { fontStyles } from "styledMixins/mixins";

@connect((state) => ({
    data: get(state.policy, `${COMPONENT_NAME}.content`, []),
    isFetching: state.policy.isFetching,
}))
class OMSPolisExistenceType extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.array,
        isFetching: PropTypes.bool.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
    };
    state = {
        formElements: [],
        isValid: null,
    };

    componentDidMount() {
        const { dispatch, values } = this.props;
        dispatch(
            getClaimDictionary(
                policyPaths.GET_CLAIM_DICTIONARY_EXISTENCE_KIND_LIST,
                COMPONENT_NAME,
                { existenceCode: values.policyExistenceCode },
            ),
        );
        this.changeData();
    }

    componentDidUpdate(prevProps) {
        const { values, errors, fields } = this.props;
        if (
            JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)
        ) {
            this.changeData();
        }
        if (
            (findError(fields, prevProps.errors) &&
                !findError(fields, errors)) ||
            values.existingPolicyKindCode !==
                prevProps.values.existingPolicyKindCode
        ) {
            this.handleItems(values);
        }
    }

    changeData() {
        const { data } = this.props;
        const formElements = data.map((item) => ({
            reasonNeed: item.reasonNeed,
            label: item.name,
            value: item.code,
        }));
        this.setState({ formElements });
    }

    handleItems = ({ existingPolicyKindCode: value }) => {
        const { dispatch, setFormValues } = this.props;
        const { formElements } = this.state;
        dispatch(editEachItem(COMPONENT_NAME, "checked", true));

        const selectedData = formElements.find((item) => item.value === value);

        if (selectedData && !selectedData.reasonNeed) {
            dispatch(editEachItem("AppealReason", "isShow", false));
            dispatch(editEachItem("PolisShape", "isShow", true));
            return false;
        }
        dispatch(editEachItem("AppealReason", "isShow", true));
        setFormValues(clearFileds(initial.accordions[2].fields));
        dispatch(editEachItem("AppealReason", "checked", false));
        // dispatch(editEachItem("PolisShape", "isShow", false  ));
    };

    render() {
        const { formElements } = this.state;
        const { isFetching, data, values } = this.props;
        if (isFetching) return <Loader />;
        if (isEmpty(formElements))
            return (
                <NoData
                    title={"Нет данных"}
                    message={"Для данного объекта отсутствуют данные"}
                />
            );

        const hint = data.find(
            (item) => item.code === values?.existingPolicyKindCode,
        )?.hint;

        return (
            <Wrapper>
                <FormikFormField
                    name={"existingPolicyKindCode"}
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
`;

export default OMSPolisExistenceType;
