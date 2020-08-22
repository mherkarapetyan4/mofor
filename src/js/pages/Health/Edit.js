/* eslint react/no-deprecated: 0 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Radio } from "components/Radio";
import styled from "styled-components";
import InlineFormField from "components/InlineFormField";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import Column from "containers/Column";
import Row from "containers/Row";
import { Button } from "components/Button";
import { FormikFormField } from "wrappers/Formik/FormField";
import TimePicker from "components/TimePicker";
import { form } from "wrappers/Formik";
import { healthFields, healthFieldsPressure } from "pages/Health/meta";
import dayjs from "dayjs";
import { sendForm } from "utils/sendForm";
import { connect } from "react-redux";
import {
    deleteHealthData,
    getHealthData,
    saveHealthData,
} from "actions/health";
import ScrollBar from "components/ScrollBar";
import { RESPONSIVE } from "config/consts";
import { validate } from "pages/Health/validate";
import { showPopup, hidePopup } from "actions/popup";

export const generateEditComponent = (type, page) => {
    @form({
        fields:
            type === "PRESSURE"
                ? healthFieldsPressure(type)
                : healthFields(type),
        validate,
    })
    @connect(
        () => {
            return {};
        },
        {
            getHealthData,
            saveHealthData,
            deleteHealthData,
            showPopup,
            hidePopup,
        },
    )
    class Edit extends PureComponent {
        static propTypes = {
            type: PropTypes.string.isRequired,
            target: PropTypes.array,
            data: PropTypes.object.isRequired,
            values: PropTypes.object.isRequired,
            getHealthData: PropTypes.func,
            saveHealthData: PropTypes.func,
            changeInitialValues: PropTypes.func.isRequired,
            renderTargetValue: PropTypes.element.isRequired,
            setTouched: PropTypes.func.isRequired,
            deleteHealthData: PropTypes.func.isRequired,
            renderFormLabel: PropTypes.func.isRequired,
            changeEditState: PropTypes.func.isRequired,
            hidePopup: PropTypes.func,
            showPopup: PropTypes.func,
        };

        pressureRadio = [
            {
                value: "LEFT_HAND",
                label: "Левая рука",
            },
            {
                value: "RIGHT_HAND",
                label: "Правая рука",
            },
        ];

        componentDidMount() {
            const { type, data } = this.props;
            if (data) {
                this.fillData(data);
            } else {
                if (type === "PRESSURE") {
                    const initial = {
                        // date: "",
                        time: "00:00",
                        modifier: "",
                        type: type,
                        systolic: "",
                        diastolic: "",
                    };
                    this.props.changeInitialValues(initial);
                } else {
                    const initial = {
                        // date: "",
                        time: "00:00",
                        value: "",
                        type,
                        // note: "",
                    };
                    this.props.changeInitialValues(initial);
                }
            }
        }

        componentWillReceiveProps(nextProps) {
            if (
                JSON.stringify(nextProps.data) !==
                JSON.stringify(this.props.data)
            ) {
                this.fillData(nextProps.data);
            }
        }

        fillData = (data) => {
            const { type, changeEditState } = this.props;

            if (type === "PRESSURE") {
                const initial = {
                    id: data.id,
                    date: dayjs(data.date),
                    time: dayjs(data.date).format("HH:mm"),
                    modifier: data.modifier,
                    systolic: data.systolic,
                    diastolic: data.diastolic,
                    type: type,
                    note: data.note,
                };
                this.props.changeInitialValues(initial);
            } else {
                const initial = {
                    id: data.id,
                    date: dayjs(data.date),
                    time: dayjs(data.date).format("HH:mm"),
                    value: data.value,
                    type: type,
                    note: data.note,
                };
                this.props.changeInitialValues(initial);
            }
            if (!page) changeEditState(true);
        };

        saveForm = () => {
            const { saveHealthData, changeEditState, type } = this.props;

            sendForm(
                this.props,
                type === "PRESSURE"
                    ? healthFieldsPressure(type)
                    : healthFields(type),
            ).then((response) => {
                saveHealthData({ ...response }, () => changeEditState(false));
            });
        };

        deleteValues = () => {
            const {
                values,
                type,
                deleteHealthData,
                changeEditState,
                showPopup,
                hidePopup,
            } = this.props;
            showPopup(
                "Удалить показание?",
                <Wrapper>
                    <ActionsWrapper>
                        <Button label={"Отмена"} onClick={() => hidePopup()} />
                        <Button
                            label={"Удалить"}
                            onClick={() => {
                                deleteHealthData(values.id, type, () =>
                                    changeEditState(false),
                                );
                                hidePopup();
                            }}
                        />
                    </ActionsWrapper>
                </Wrapper>,
            );
        };

        render() {
            return (
                <>
                    {page === "pregnancy"
                        ? this.renderPregnancyForm()
                        : this.renderForm()}
                </>
            );
        }

        renderPregnancyForm = () => {
            const {
                values,
                type,
                renderFormLabel,
                changeEditState,
                renderTargetValue,
            } = this.props;

            return (
                <>
                    <PregnancyForm>
                        {type !== "PRESSURE" ? (
                            <Row>
                                <Column paddings={0}>
                                    <FormikFormField
                                        name={"value"}
                                        component={(props) => (
                                            <InlineFormField
                                                type={"number"}
                                                required
                                                {...props}
                                                label={renderFormLabel()}
                                                placeholder={"Введите значение"}
                                            />
                                        )}
                                    />
                                </Column>
                            </Row>
                        ) : (
                            <>
                                <Row>
                                    <FormikFormField
                                        name={"systolic"}
                                        component={(props) => (
                                            <InlineFormField
                                                required
                                                type={"number"}
                                                {...props}
                                                label={"Систолическое:"}
                                                placeholder={"Введите значение"}
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={"diastolic"}
                                        component={(props) => (
                                            <InlineFormField
                                                type={"number"}
                                                required
                                                {...props}
                                                label={"Диастолическое:"}
                                                placeholder={"Введите значение"}
                                            />
                                        )}
                                    />
                                </Row>
                            </>
                        )}
                        <Row>
                            <FormikFormField
                                name={"date"}
                                component={(props) => (
                                    <InlineFormFieldDate
                                        required
                                        {...props}
                                        label={"Дата измерения:"}
                                        placeholder={"Выберите дату"}
                                    />
                                )}
                            />
                        </Row>
                        <Row>
                            <FormikFormField
                                name={"time"}
                                component={(props) => (
                                    <TimePicker
                                        required
                                        {...props}
                                        label={"Время измерения:"}
                                        placeholder={"Выберите время"}
                                    />
                                )}
                            />
                        </Row>
                        {type === "PRESSURE" && (
                            <Row>
                                <Column paddings={0}>
                                    <FormikFormField
                                        name={"modifier"}
                                        component={(props) => {
                                            return (
                                                <Radio
                                                    required
                                                    {...props}
                                                    elements={
                                                        this.pressureRadio
                                                    }
                                                />
                                            );
                                        }}
                                    />
                                </Column>
                            </Row>
                        )}
                        <Row>
                            <Column paddings={0}>
                                <FormikFormField
                                    name={"note"}
                                    component={(props) => (
                                        <InlineFormFieldTextarea
                                            {...props}
                                            label={"Комментарий:"}
                                            placeholder={"Введите комментарий"}
                                            type={"textarea"}
                                        />
                                    )}
                                />
                            </Column>
                        </Row>
                    </PregnancyForm>
                    <Controls>
                        <TargetValue>
                            <FormWrapper>{renderTargetValue}</FormWrapper>
                        </TargetValue>
                        <ViewControls>
                            {values.id ? (
                                <>
                                    <Button
                                        label={"Удалить показание"}
                                        onClick={() => this.deleteValues()}
                                    />
                                    <Button
                                        label={"Сохранить изменения"}
                                        onClick={() => this.saveForm()}
                                    />
                                </>
                            ) : (
                                <>
                                    <Button
                                        label={"Сохранить"}
                                        onClick={() => this.saveForm()}
                                    />
                                    <Button
                                        label={"Отменить"}
                                        onClick={() => changeEditState(false)}
                                    />
                                </>
                            )}
                        </ViewControls>
                    </Controls>
                </>
            );
        };

        renderForm = () => {
            const {
                values,
                type,
                renderFormLabel,
                changeEditState,
                renderTargetValue,
            } = this.props;

            return (
                <>
                    <Form>
                        <ScrollBar>
                            {type !== "PRESSURE" ? (
                                <Row>
                                    <Column paddings={0}>
                                        <FormikFormField
                                            name={"value"}
                                            component={(props) => (
                                                <InlineFormField
                                                    type={"number"}
                                                    required
                                                    {...props}
                                                    label={renderFormLabel()}
                                                    placeholder={
                                                        "Введите значение"
                                                    }
                                                />
                                            )}
                                        />
                                    </Column>
                                </Row>
                            ) : (
                                <>
                                    <Row>
                                        <MobileWrapper>
                                            <FormikFormField
                                                name={"systolic"}
                                                component={(props) => (
                                                    <InlineFormField
                                                        required
                                                        type={"number"}
                                                        {...props}
                                                        label={"Систолическое:"}
                                                        placeholder={
                                                            "Введите значение"
                                                        }
                                                    />
                                                )}
                                            />
                                        </MobileWrapper>
                                    </Row>
                                    <Row>
                                        <FormikFormField
                                            name={"diastolic"}
                                            component={(props) => (
                                                <InlineFormField
                                                    type={"number"}
                                                    required
                                                    {...props}
                                                    label={"Диастолическое:"}
                                                    placeholder={
                                                        "Введите значение"
                                                    }
                                                />
                                            )}
                                        />
                                    </Row>
                                </>
                            )}
                            <Row>
                                <MobileWrapper>
                                    <FormikFormField
                                        name={"date"}
                                        component={(props) => (
                                            <InlineFormFieldDate
                                                required
                                                {...props}
                                                label={"Дата измерения:"}
                                                placeholder={"Выберите дату"}
                                            />
                                        )}
                                    />
                                </MobileWrapper>
                            </Row>
                            <Row>
                                <FormikFormField
                                    name={"time"}
                                    component={(props) => (
                                        <TimePicker
                                            required
                                            {...props}
                                            label={"Время измерения:"}
                                            placeholder={"Выберите время"}
                                        />
                                    )}
                                />
                            </Row>
                            {type === "PRESSURE" && (
                                <Row>
                                    <Column paddings={0}>
                                        <>
                                            <FormikFormField
                                                name={"modifier"}
                                                component={(props) => {
                                                    return (
                                                        <Radio
                                                            required
                                                            {...props}
                                                            elements={
                                                                this
                                                                    .pressureRadio
                                                            }
                                                        />
                                                    );
                                                }}
                                            />
                                        </>
                                    </Column>
                                </Row>
                            )}
                            <Row>
                                <Column paddings={0}>
                                    <FormikFormField
                                        name={"note"}
                                        component={(props) => (
                                            <InlineFormFieldTextarea
                                                {...props}
                                                label={"Комментарий:"}
                                                placeholder={
                                                    "Введите комментарий"
                                                }
                                                type={"textarea"}
                                            />
                                        )}
                                    />
                                </Column>
                            </Row>
                        </ScrollBar>
                    </Form>
                    <Controls>
                        <TargetValue>
                            <FormWrapper>{renderTargetValue}</FormWrapper>
                        </TargetValue>
                        <ViewControls>
                            {values.id ? (
                                <>
                                    <Button
                                        label={"Удалить показание"}
                                        onClick={() => this.deleteValues()}
                                    />
                                    <Button
                                        label={"Сохранить изменения"}
                                        onClick={() => this.saveForm()}
                                    />
                                </>
                            ) : (
                                <>
                                    <Button
                                        label={"Сохранить"}
                                        onClick={() => this.saveForm()}
                                    />
                                    <Button
                                        label={"Отменить"}
                                        onClick={() => changeEditState(false)}
                                    />
                                </>
                            )}
                        </ViewControls>
                    </Controls>
                </>
            );
        };
    }

    const PregnancyForm = styled.div`
        margin-bottom: 16px;
    `;

    const Form = styled.div`
        margin-bottom: 16px;
        height: 250px;
    `;

    const Controls = styled.div`
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-wrap: wrap;
    `;

    const TargetValue = styled.div`
        display: flex;
        align-items: center;
        flex: 1 1 auto;
        margin-right: 10px;
    `;

    const FormWrapper = styled.div`
        width: 100%;
    `;

    const ViewControls = styled.div`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    `;

    const MobileWrapper = styled.div`
        width: 100%;

        @media all and (max-width: ${RESPONSIVE.mobile}) {
            margin-bottom: 16px;
        }
    `;

    const Wrapper = styled.div`
        padding: 0 16px;
    `;

    const ActionsWrapper = styled.div`
        display: flex;

        > div {
            margin-right: 16px;

            :last-child {
                margin-right: 0;
            }
        }
    `;

    return Edit;
};
