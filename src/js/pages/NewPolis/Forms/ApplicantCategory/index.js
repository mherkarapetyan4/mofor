import React, { PureComponent } from "react";
import styled from "styled-components";
import { Radio } from "components/Radio";
import { FormikFormField } from "wrappers/Formik/FormField";
import PropTypes from "prop-types";
import { findError } from "pages/NewPolis/Forms/helper";
import { editEachItem } from "actions/policy";
import { connect } from "react-redux";

const formElements = [
    {
        label: "Работающий гражданин РФ",
        value: "EMPLOYED",
    },
    {
        label: "Неработающий гражданин РФ",
        value: "UNEMPLOYED",
    },
];

const COMPONENT_NAME = "ApplicantCategory";
@connect()
class ApplicantCategory extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { values, fields, errors } = this.props;
        if (
            (findError(fields, prevProps.errors) &&
                !findError(fields, errors)) ||
            JSON.stringify(values) !== JSON.stringify(prevProps.values)
        ) {
            this.nextStep();
        }
    }

    nextStep = () => {
        // TODO:: handle validation from formik , at this moment it's only goes to next step
        const { dispatch } = this.props;
        dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        dispatch(editEachItem("ActualAddress", "isShow", true));
    };

    render() {
        return (
            <Wrapper>
                <FormikFormField
                    name={"applicantCategory"}
                    component={(props) => (
                        <Radio {...props} elements={formElements} />
                    )}
                />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

export default ApplicantCategory;
