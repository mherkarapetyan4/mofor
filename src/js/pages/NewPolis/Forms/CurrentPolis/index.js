import React, { PureComponent } from "react";
import styled from "styled-components";
import InlineFormField from "components/InlineFormField";
import Row from "containers/Row";
import { editEachItem } from "actions/policy";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormikFormField } from "wrappers/Formik/FormField";
import { fontStyles } from "styledMixins/mixins";
import { Desktop, Tablet } from "wrappers/responsive";

const COMPONENT_NAME = "CurrentPolis";

@connect((state) => ({
    smo: state.myData.myData.smo,
    policy: state.myData.myData.policy,
}))
class CurrentPolis extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
        values: PropTypes.object.isRequired,
        smo: PropTypes.object.isRequired,
        policy: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const {
            changeInitialValues,
            smo,
            policy,
            dispatch,
            values,
        } = this.props;

        const buffPersonalData = {
            number: policy.unmaskedActualNumber,
            numberUnknown: false,
            smoCode: smo.code,
            smoName: smo.name,
        };
        changeInitialValues({
            ...values,
            existingPolicyData: buffPersonalData,
        });

        // *** start
        dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        dispatch(editEachItem("InsuranceCompany", "isShow", true));
        // *** end
    }

    render() {
        return (
            <Wrapper>
                <Row>
                    <FormikFormField
                        name={"existingPolicyData.number"}
                        component={(props) => (
                            <InlineFormField
                                {...props}
                                label={"Серия и номер полиса:"}
                                placeholder={"Серия и номер"}
                                required
                                disabled
                            />
                        )}
                    />
                </Row>
                {/*<Row>*/}
                {/*    <FormikFormField*/}
                {/*        name={"existingPolicyData.lastName"}*/}
                {/*        component={(props) => (*/}
                {/*            <InlineFormField*/}
                {/*                {...props}*/}
                {/*                label={"Страховая организация:"}*/}
                {/*                placeholder={"Страховая организация"}*/}
                {/*                required*/}
                {/*                disabled*/}
                {/*            />*/}
                {/*        )}*/}
                {/*    />*/}
                {/*</Row>*/}

                <Row>
                    <FormikFormField
                        name={"existingPolicyData.smoCode"}
                        component={(props) => (
                            <InlineFormField
                                {...props}
                                label={"Код московской СМО:"}
                                placeholder={"Код московской СМО"}
                                required
                                disabled
                            />
                        )}
                    />
                </Row>
                <Row>
                    <FormikFormField
                        name={"existingPolicyData.smoName"}
                        component={(props) => (
                            <InlineFormField
                                {...props}
                                label={
                                    <>
                                        <Desktop>
                                            Название немосковской СМО:
                                        </Desktop>
                                        <Tablet>Назв. немоск. СМО:</Tablet>
                                    </>
                                }
                                placeholder={"Название немосковской СМО"}
                                required
                                disabled
                            />
                        )}
                    />
                </Row>
                <Hint>
                    Фактическое наименование страховой медицинской организации
                    может отличаться от указанного в Вашем полисе в связи с её
                    переименованием или реорганизацией. При необходимости
                    уточнения информации рекомендуем обратиться в Контакт-центр
                    МГФОМС по телефону (495)952-9321.
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

export default CurrentPolis;
