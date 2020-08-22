import React, { PureComponent } from "react";
import styled from "styled-components";
import { Checkbox } from "components/Checkbox";
import Row from "containers/Row";
import { FormikFormField } from "wrappers/Formik/FormField";
import { editEachItem } from "actions/policy";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { findError } from "pages/NewPolis/Forms/helper";
const COMPONENT_NAME = "ApplicantAgreement";
import { fontStyles } from "styledMixins/mixins";

@connect()
class ApplicantAgreement extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
    };
    // componentDidMount() {
    //     const { dispatch } = this.props;
    //     dispatch(editEachItem(COMPONENT_NAME, "checked", true));
    // }

    componentDidUpdate(prevProps) {
        const { fields, errors, dispatch } = this.props;
        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
        }
        if (findError(fields, prevProps.errors) && !findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        }
    }
    render() {
        return (
            <Wrapper>
                <Row>
                    <FormikFormField
                        name={"approvements.conditions"}
                        component={(props) => (
                            <Checkbox
                                {...props}
                                label={
                                    "С условиями обязательного медицинского страхования ознакомлен"
                                }
                            />
                        )}
                    />
                </Row>
                <Row>
                    <FormikFormField
                        name={"approvements.accuracy"}
                        component={(props) => (
                            <Checkbox
                                {...props}
                                label={
                                    "Достоверность и полноту указанных данных сведений подтверждаю"
                                }
                            />
                        )}
                    />
                </Row>
                <Row>
                    <FormikFormField
                        name={"approvements.notSpecialist"}
                        component={(props) => (
                            <Checkbox
                                {...props}
                                label={
                                    "Не являюсь высококвалифицированным специалистом и членом семьи высококвалифицированного спелиалиста в соответствии с ФЗ"
                                }
                            />
                        )}
                    />
                </Row>

                <Row>
                    <FormikFormField
                        name={"approvements.individualSupport"}
                        component={(props) => (
                            <Checkbox
                                {...props}
                                label={
                                    "Согласен на индивидуальное информационное сопровождение страховой мед организацией на всех этапах оказания мед помощи"
                                }
                            />
                        )}
                    />
                </Row>
                <Hint>
                    Для отправки заявления нажмите &quot;Сохранить и отправить в
                    МГФОМС&quot;. Обращаем Ваше внимание, что передача данных
                    может занять некоторое время.
                </Hint>
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

export default ApplicantAgreement;
