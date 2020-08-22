import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSmos } from "actions/polis";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import get from "lodash/get";
import { clearFileds, findError } from "pages/NewPolis/Forms/helper";
import { editEachItem } from "actions/policy";
import { initial } from "reducers/policy";

const COMPONENT_NAME = "InsuranceCompany";

@connect((state) => ({
    data: state.polis,
}))
class InsuranceCompany extends PureComponent {
    state = {
        options: [],
    };

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getSmos());
        this.getOptions();
    }

    componentDidUpdate(prevProps) {
        const {
            data,
            values,
            fields,
            errors,
            changeInitialValues,
            setFormValues,
            dispatch,
        } = this.props;
        const { options } = this.state;
        if (JSON.stringify(prevProps.data.smos) !== JSON.stringify(data.smos)) {
            this.getOptions();
        }
        if (
            (findError(fields, prevProps.errors) &&
                !findError(fields, errors)) ||
            JSON.stringify(values) !== JSON.stringify(prevProps.values)
        ) {
            dispatch(getSmos());
            this.nextStep();
        }

        if (prevProps.values.newSmoCode !== values.newSmoCode) {
            changeInitialValues({
                ...values,
                newSmoId: options.filter(
                    (e) => e.value === values.newSmoCode,
                )[0].id,
            });
            setFormValues(clearFileds(initial.accordions[12].fields));
        }
    }

    getOptions = () => {
        const { data } = this.props;
        this.setState({
            options: get(data.smos, "content", []).map((e) => ({
                value: e.code,
                label: e.name,
                id: e.id,
            })),
        });
    };
    nextStep = () => {
        const { dispatch } = this.props;
        dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        dispatch(editEachItem("PolisPlaceOfReceipt", "isShow", true));
    };

    render() {
        const { options } = this.state;
        return (
            <Wrapper>
                <FormikFormField
                    name={"newSmoCode"}
                    component={(props) => (
                        <InlineFormFieldSelect
                            required
                            {...props}
                            label={"Страховая организация:"}
                            options={options}
                            placeholder={"Страховая организация"}
                        />
                    )}
                />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

InsuranceCompany.propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default InsuranceCompany;
