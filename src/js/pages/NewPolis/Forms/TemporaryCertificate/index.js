import React, { PureComponent } from "react";
import styled from "styled-components";
import { Checkbox } from "components/Checkbox";
import { connect } from "react-redux";
import { findError } from "pages/NewPolis/Forms/helper";
import { editEachItem } from "actions/policy";
import PropTypes from "prop-types";
import { FormikFormField } from "wrappers/Formik/FormField";
import { fontStyles } from "styledMixins/mixins";

const COMPONENT_NAME = "TemporaryCertificate";

@connect((state) => ({
    formData: state.policy.formData,
}))
class TemporaryCertificate extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        dispatch(editEachItem("PolisApplicant", "isShow", true));
    }

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
        // const { dispatch } = this.props;
        // dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        // dispatch(editEachItem("PolisApplicant", "isShow", true));
        // const {policyForm} = this.props;
        // if (policyForm === formElements[0].value) {
        //     console.log("next step");
        // } else {
        //     console.log("next step after image")
        // }
    };

    render() {
        const { values } = this.props;
        return (
            <>
                <HintWrapper>
                    <Hint>
                        <p>
                            Временное свидетельство, сформированное в
                            электронном виде, подтверждающее оформление полиса и
                            удостоверяющее право на бесплатное оказание
                            медицинской помощи, будет направлено Вам в личный
                            кабинет. Временное свидетельство действительно до
                            момента получения полиса, но не более 30 рабочих
                            дней с даты его оформления.
                        </p>
                        <p>
                            Для обращения за медицинской помощью по ОМС в городе
                            Москве получение оригинала временного свидетельства
                            не является обязательным, достаточно предъявить
                            распечатанную/электронную копию. Для обращения за
                            медицинской помощью вне территории страхования (за
                            пределами города Москвы) потребуется предъявить
                            оригинал временного свидетельства.
                        </p>
                    </Hint>
                </HintWrapper>
                <Wrapper>
                    <FormikFormField
                        name={"tempCertificateAsPaperRequired"}
                        component={(props) => (
                            <Checkbox
                                {...props}
                                label={
                                    "Я хочу получить временное свидетельство, подтверждающее оформление полиса ОМС"
                                }
                            />
                        )}
                    />
                </Wrapper>
                {values?.tempCertificateAsPaperRequired && (
                    <HintWrapper>
                        <Hint>
                            Получить оригинал временного свидетельства Вы
                            можете, обратившись в выбранный Вами пункт выдачи
                            полисов в соответствии с уведомлением, которое будет
                            направлено Вам позднее.
                        </Hint>
                    </HintWrapper>
                )}
            </>
        );
    }
}

const HintWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Wrapper = styled.div`
    padding: 10px;
`;

const Hint = styled.div`
    padding: 5px 10px;
    border-radius: 5px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    background-color: ${(props) => props.theme.colors.notifications.warning};

    p {
        margin: 0 0 10px;
        :last-child {
            margin-bottom: 0;
        }
    }
`;

export default TemporaryCertificate;
