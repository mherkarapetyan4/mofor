import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "components/Checkbox";
import { FormikFormField } from "wrappers/Formik/FormField";

class Comment extends PureComponent {
    static propTypes = {
        questionIndex: PropTypes.number.isRequired,
    };

    render() {
        const { questionIndex } = this.props;
        return (
            <FormikFormField
                name={`questions.${questionIndex}.question.commentEnabled`}
                component={(props) => (
                    <Checkbox {...props} label={"Поле комментария"} />
                )}
            />
        );
    }
}

export default Comment;
