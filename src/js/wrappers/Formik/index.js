import React, { PureComponent } from "react";
import { Formik, Form } from "formik";
import forEach from "lodash/forEach";
import get from "lodash/get";
import set from "lodash/set";
import isString from "lodash/isString";
import isEmpty from "lodash/isEmpty";
import * as Yup from "yup";
import { validateRules } from "config/consts";

const initialValues = {
    string: "",
    number: "",
    boolean: false,
    date: null,
    array: [],
    object: {},
    file: "",
};

const isEndedField = (obj) =>
    get(obj, "type") !== undefined &&
    get(obj, "name") !== undefined &&
    isString(obj.type) &&
    isString(obj.name);

const fillEndedObject = (v) => {
    let field = null;
    if (v.rules && !isEmpty(v.rules)) {
        if (v.type === "date" || v.type === "file") {
            field = Yup.mixed();
        } else if (v.type === "number") {
            field = Yup.number().typeError(
                `Значение поля ${v.name} должно быть числом`,
            );
        } else {
            field = Yup[v.type]();
        }
        v.rules.forEach((e) => {
            if (e === validateRules.required) {
                const error = `Поле ${v.name} обязательно для заполнения`;
                if (
                    v.type === "string" ||
                    v.type === "number" ||
                    v.type === "date" ||
                    v.type === "string"
                ) {
                    field = field.required(error);
                }
            } else if (e.indexOf(`${validateRules.min}:`) !== -1) {
                const value = Number(e.split(":")[1]);

                if (v.type === "number" || v.type === "string") {
                    const error = `${
                        v.type === "number" ? "Значение" : "Длина"
                    } поля ${v.name} не может быть меньше ${value}`;
                    field = field.min(value, error);
                }
            } else if (e.indexOf(`${validateRules.max}:`) !== -1) {
                const value = Number(e.split(":")[1]);

                if (v.type === "number" || v.type === "string") {
                    const error = `${
                        v.type === "number" ? "Значение" : "Длина"
                    } поля ${v.name} не может быть больше ${value}`;
                    field = field.max(value, error);
                }
            } else if (e.indexOf(`${validateRules.round}:0`) !== -1) {
                const error = `Значение поля ${v.name} должно быть целым`;
                field = field.integer(error);
            } else if (e === validateRules.phone) {
                const errorMaxMin = `Неверный формат поля номер телефона`;
                const phoneRegExp = /^([0-9]{10}|\(\d{3}\)\d{3}-\d{2}-\d{2}|[(]{1}[_]{3}[)]{1}[_]{3}[-]{1}[_]{2}[-]{1}[_]{2}|)$/;

                field = field.matches(phoneRegExp, errorMaxMin);
            } else if (e === validateRules.email) {
                field = field.email("Неверный формат электронной почты");
            } else if (e === validateRules.password) {
                field = field.test(
                    "is-password",
                    "Минимальная длина пароля 9 символов, должны присутствовать латинские буквы в верхнем и нижнем регистре, цифры.",
                    (value) => {
                        if (!value && value !== 0) return true;
                        const rules = [];
                        let sum = 0;

                        rules[0] = /[A-Z]/.test(value);
                        rules[1] = /[a-z]/.test(value);
                        rules[2] = /\d/.test(value);
                        rules[3] = value.length >= 9;

                        for (let i = 0; i < rules.length; i++) {
                            sum += rules[i] ? 1 : 0;
                        }
                        return sum === 4;
                    },
                );
            }
        });
    }
    return field;
};

export const form = ({ fields, validate = () => {} }) => (Component) => {
    /*
    Ограничения: сейчас максимальная вложенность 3 (xxx.yyy.zzz)

    fields
    каждое поле описывается
    1) обязательными параметрами:
    name = имя поля (отображается при валидации)
    type = тип поля (одно из: string, number, boolean, date, array, object)
    rules = список правил для поля

    2) необязательными параметрами:
    initial = начальное значение
    omit === true - если это значение не нужно в sendForm

    Описание типов поля и их валидаций:
    string:
        - required: поле обязательно для заполнения

    validate - функция для кастомной валидации

    если нужны пропсы для валидации, подписываемся через connect на нужные пропсы в форме где есть декоратор @form
     */
    class FormikWrapper extends PureComponent {
        constructor(props) {
            super(props);
            this.initialValues = {};
            this.schema = {};

            const model = {};
            forEach(fields, (v, k) => {
                set(model, k, v);
                set(
                    this.initialValues,
                    k,
                    get(v, "initial", initialValues[v.type]),
                );
            });

            forEach(model, (v, k) => {
                const ended = isEndedField(v);
                if (ended) {
                    const field = fillEndedObject(v);
                    if (field) this.schema[k] = field;
                } else {
                    const obj = {
                        nested: Yup.object(),
                    };
                    this.setNestedFields(obj, v);
                    this.schema[k] = obj.nested;
                }
            });
        }

        setNestedFields = (schema, obj) => {
            // console.log(obj)
            forEach(obj, (v, k) => {
                const ended = isEndedField(v);
                if (ended) {
                    const field = fillEndedObject(v);
                    if (field) {
                        schema.nested = schema.nested.shape({
                            [k]: field,
                        });
                    }
                } else {
                    const params = {};
                    forEach(v, (value, key) => {
                        const field = fillEndedObject(value);
                        if (field) params[key] = field;
                    });
                    schema.nested = schema.nested.shape({
                        [k]: Yup.object().shape(params),
                    });
                }
            });
        };

        changeInitialValues = (initial, setValues) => {
            const initObject = {};
            forEach(fields, (v, k) => {
                set(initObject, k, get(initial, k) || initialValues[v.type]);
            });
            setValues(initObject);
        };

        clearFormValues = (setValues) => {
            const initObject = {};
            forEach(fields, (v, k) => {
                set(initObject, k, fields[k].default);
            });
            setValues(initObject);
        };

        setFormValues = (cleanFields, setFieldValue) => {
            forEach(cleanFields, (v, k) => {
                setFieldValue(k, v);
            });
        };

        render() {
            const validationSchema = Yup.object().shape(this.schema);
            return (
                <Formik
                    initialValues={this.initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    enableReinitialize={true}
                    onSubmit={() => {}}
                    validate={(v) => validate(v, this.props)}
                >
                    {(formProps) => (
                        <Form style={{ height: "100%", width: "100%" }}>
                            <Component
                                {...formProps}
                                {...this.props}
                                changeInitialValues={(initial) =>
                                    this.changeInitialValues(
                                        initial,
                                        formProps.setValues,
                                    )
                                }
                                clearFormValues={() =>
                                    this.clearFormValues(formProps.setValues)
                                }
                                setFormValues={(fields) =>
                                    this.setFormValues(
                                        fields,
                                        formProps.setFieldValue,
                                    )
                                }
                            />
                        </Form>
                    )}
                </Formik>
            );
        }
    }

    return FormikWrapper;
};
