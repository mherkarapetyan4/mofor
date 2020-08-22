import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Field, FieldArray } from "formik";

class FormikFormField extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        type: PropTypes.oneOf(["array", "common"]),
    };

    static defaultProps = {
        type: "common",
    };

    render() {
        const { name, component, type } = this.props;
        if (type === "array") {
            return (
                <FieldArray
                    name={name}
                    render={(props) => {
                        return component({
                            onChange: (value) =>
                                props.form.setFieldValue(name, value),
                        });
                    }}
                />
            );
        }
        return (
            <Field
                name={name}
                render={(props) => {
                    return component({
                        ...props.field,
                        meta: props.meta,
                        onChange: (value) =>
                            props.form.setFieldValue(name, value),
                        onBlur: () => props.form.setFieldTouched(name, true),
                    });
                }}
            />
        );
    }
}

export { FormikFormField };
