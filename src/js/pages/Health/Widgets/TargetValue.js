/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FormikFormField } from "wrappers/Formik/FormField";
import { form } from "wrappers/Formik";
import { targetFields, targetFieldsPressure } from "pages/Health/meta";
import styled from "styled-components";
import { saveTargetHealthData } from "actions/health";
import Actions from "containers/Header/Actions";
import EditIcon from "icons/EditIcon";
import { sendForm } from "utils/sendForm";
import { connect } from "react-redux";
import CheckIcon from "icons/CheckIcon";
import CloseIcon from "icons/CloseIcon";
import InlineFormField from "components/InlineFormField";

export const generateTargetComponent = (type) => {
    @form({
        fields:
            type === "PRESSURE"
                ? targetFieldsPressure(type)
                : targetFields(type),
    })
    @connect(() => ({}), { saveTargetHealthData })
    class TargetValue extends PureComponent {
        editAction = [
            {
                icon: <EditIcon opacity={0.5} />,
                tooltip: "Редактировать",
                action: () => this.completeTarget(),
            },
        ];

        confirmationIcons = [
            {
                icon: <CheckIcon opacity={0.5} />,
                tooltip: "Сохранить",
                action: () => this.completeTarget(),
            },
            {
                icon: <CloseIcon opacity={0.5} />,
                tooltip: "Отменить",
                action: () => this.cancelTarget(),
            },
        ];

        static propTypes = {
            target: PropTypes.array,
            action: PropTypes.func.isRequired,
            edit: PropTypes.bool.isRequired,
            type: PropTypes.string.isRequired,
            changeInitialValues: PropTypes.func.isRequired,
            saveTargetHealthData: PropTypes.func.isRequired,
        };

        componentDidMount() {
            const { type, target } = this.props;

            let value;

            if (target) {
                value = target.find((item) => item.type === type);
            }

            if (value) {
                if (type === "PRESSURE") {
                    const initial = {
                        systolic: value.systolic,
                        diastolic: value.diastolic,
                        type: type,
                    };
                    this.props.changeInitialValues(initial);
                } else {
                    const initial = {
                        value: value.value,
                        type: type,
                    };
                    this.props.changeInitialValues(initial);
                }
            } else {
                const initial = {
                    type: type,
                };
                this.props.changeInitialValues(initial);
            }
        }

        cancelTarget = () => {
            const { action } = this.props;

            action(false);
        };

        completeTarget = () => {
            const { saveTargetHealthData, type, action, edit } = this.props;

            if (edit) {
                if (type === "PRESSURE") {
                    sendForm(this.props, targetFieldsPressure(type)).then(
                        (response) => {
                            saveTargetHealthData({ ...response }, () =>
                                action(false),
                            );
                        },
                    );
                } else {
                    sendForm(this.props, targetFields(type)).then(
                        (response) => {
                            saveTargetHealthData({ ...response }, () =>
                                action(false),
                            );
                        },
                    );
                }
            } else {
                action(true);
            }
        };

        render() {
            const { type, edit } = this.props;
            return (
                <ElementsWrapper>
                    <FormWrapper>
                        {type !== "PRESSURE" ? (
                            <Wrapper>
                                <FormikFormField
                                    name={"value"}
                                    component={(props) => (
                                        <InlineFormField
                                            label={"Целевое значение:"}
                                            {...props}
                                            type={"number"}
                                            disabled={!edit}
                                            placeholder={"Не указано"}
                                        />
                                    )}
                                />
                            </Wrapper>
                        ) : (
                            <Wrapper>
                                <FieldWrapper>
                                    <FormikFormField
                                        name={"systolic"}
                                        component={(props) => (
                                            <InlineFormField
                                                label={
                                                    "Целевое значение (сист.):"
                                                }
                                                {...props}
                                                type={"number"}
                                                disabled={!edit}
                                                placeholder={"Не указано"}
                                            />
                                        )}
                                    />
                                </FieldWrapper>
                                <FieldWrapper>
                                    <FormikFormField
                                        name={"diastolic"}
                                        component={(props) => (
                                            <InlineFormField
                                                label={
                                                    "Целевое значение (диаст.):"
                                                }
                                                {...props}
                                                type={"number"}
                                                disabled={!edit}
                                                placeholder={"Не указано"}
                                            />
                                        )}
                                    />
                                </FieldWrapper>
                            </Wrapper>
                        )}
                    </FormWrapper>
                    <EditTarget>
                        {edit ? (
                            <Actions items={this.confirmationIcons} />
                        ) : (
                            <Actions items={this.editAction} />
                        )}
                    </EditTarget>
                </ElementsWrapper>
            );
        }
    }

    const FieldWrapper = styled.div`
        margin-bottom: 10px;
    `;

    const FormWrapper = styled.div`
        width: 100%;
        margin-right: 16px;
    `;

    const EditTarget = styled.div`
        cursor: pointer;
        flex: 0 0 auto;
    `;

    const ElementsWrapper = styled.div`
        display: flex;
        width: 100%;
        align-items: flex-end;
    `;

    const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
    `;

    return TargetValue;
};
