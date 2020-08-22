import React, { PureComponent } from "react";
import { Button } from "components/Button";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    addVitalAutocomplete,
    deleteVitalAutocomplete,
    getVitalData,
    saveVital,
} from "actions/user";
import { Loader } from "components/Loader";
import { isEmpty, get, xor } from "lodash";
import NoData from "components/NoData";
import MultiAutoComplete from "components/MultiAutoComplete";
import { pillboxPaths, userPath } from "config/paths";
import { Desktop, Tablet } from "wrappers/responsive";
import { form } from "wrappers/Formik";
import { FormikFormField } from "wrappers/Formik/FormField";
import { doctorFields } from "./meta";
import { USER_VITAL_RH_FACTOR_SELECT_SECTION } from "config/consts";
import { sendForm } from "utils/sendForm";
import { Radio } from "components/Radio";
import { fontStyles } from "styledMixins/mixins";
import Tooltip from "react-tooltip-lite";
import FormField from "components/FormField";
@form({
    fields: doctorFields,
})
@connect((state) => ({
    allData: state.user.vital,
    isFetching: state.app.isFetching,
    isWard: state.myData.myData.ward,
}))
class DoctorForm extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        allData: PropTypes.object,
        isFetching: PropTypes.bool.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        isWard: PropTypes.bool.isRequired,
    };
    static defaultProps = {
        allData: {},
    };
    state = {
        disabled: true,
    };

    onSelectElement = (element, fieldName) => {
        const { dispatch } = this.props;
        let url = "";
        if (fieldName === "diseases") {
            url = userPath.ADD_DISEASE;
        } else if (fieldName === "allergens") {
            url = userPath.ADD_ALLERGENS;
        } else if (fieldName === "pregnancy") {
            url = userPath.ADD_COMPLICATION_KIND;
        }

        dispatch(addVitalAutocomplete({ ...element }, url));
    };

    onRemoveElement = (items, fieldName) => {
        const { allData, dispatch } = this.props;
        const data = get(allData, fieldName, []);
        const removedItem = xor(data, items);
        const removedItemID = get(removedItem, "0.id", false);
        let url = "";
        if (!removedItemID) {
            return false;
        }

        if (fieldName === "diseases") {
            url = userPath.DELETE_DISEASE;
        } else if (fieldName === "allergens") {
            url = userPath.DELETE_ALLERGEN;
        } else if (fieldName === "pregnancyComplicationKinds") {
            url = userPath.DELETE_COMPLICATION_KIND;
        }
        dispatch(deleteVitalAutocomplete(removedItemID, url));
    };
    componentDidMount() {
        const { dispatch } = this.props;
        const { allData } = this.props;

        if (allData.information) {
            this.props.changeInitialValues(allData.information);
        }

        dispatch(getVitalData());
    }
    componentDidUpdate(prevProps) {
        const { allData } = this.props;
        if (
            JSON.stringify(prevProps.allData.information) !==
            JSON.stringify(allData.information)
        ) {
            this.props.changeInitialValues(allData.information);
        }
    }

    onSave = () => {
        const { dispatch } = this.props;
        sendForm(this.props, doctorFields).then((response) => {
            dispatch(saveVital(response));
            this.setState({
                disabled: !this.state.disabled,
            });
        });
    };

    getRhFactor = (rhFV) => {
        return rhFV
            ? USER_VITAL_RH_FACTOR_SELECT_SECTION.find(
                  (item) => item.value === rhFV,
              ).label
            : "";
    };

    render() {
        const {
            isFetching,
            allData,
            isWard,
            values: { rhFactor },
        } = this.props;

        if (isFetching) {
            return <Loader />;
        }
        if (isEmpty(allData)) {
            return (
                <NoData
                    title={"Нет данных"}
                    message={"Для данного объекта отсутствуют данные"}
                />
            );
        }
        const {
            // information,
            allergens,
            diseases,
            pregnancyComplicationKinds,
        } = allData;
        const { disabled } = this.state;

        return (
            <FormWrapper>
                <Item>
                    <MultiAutoComplete
                        title={
                            "Наличие хронических и перенесенных заболеваний:"
                        }
                        path={pillboxPaths.GET_DISEASE_LIST}
                        serverValue={"query"}
                        queryParams={{
                            pageSize: 10,
                            barcode: false,
                        }}
                        disabled={disabled}
                        minCountSymbol={2}
                        listLabel="displayName"
                        elementLabel="disease.displayName"
                        elementValue="uniqueId"
                        onSelect={(e) => this.onSelectElement(e, "diseases")}
                        onRemove={(e) => this.onRemoveElement(e, "diseases")}
                        items={diseases}
                        placeholder={"Введите диагноз"}
                        label={
                            <>
                                <Desktop>Хронические заболевания:</Desktop>
                                <Tablet>Хронические забол.:</Tablet>
                            </>
                        }
                    />
                </Item>
                <Item>
                    <MultiAutoComplete
                        title={"Аллергологический анамнез:"}
                        path={pillboxPaths.GET_ALLERGEN_LIST}
                        serverValue={"query"}
                        queryParams={{
                            pageSize: 10,
                            barcode: false,
                        }}
                        disabled={disabled}
                        minCountSymbol={2}
                        listLabel="displayName"
                        elementLabel="allergen.displayName"
                        elementValue="uniqueId"
                        onSelect={(e) => this.onSelectElement(e, "allergens")}
                        onRemove={(e) => this.onRemoveElement(e, "allergens")}
                        items={allergens}
                        placeholder={"Введите аллергию"}
                        label={
                            <>
                                <Desktop>Аллергологический анамнез:</Desktop>
                                <Tablet>Аллергол. анамнез.:</Tablet>
                            </>
                        }
                    />
                </Item>
                {pregnancyComplicationKinds && !isWard && (
                    <Item>
                        <MultiAutoComplete
                            title={
                                "Список возможных осложнений при беременности:"
                            }
                            path={userPath.VITAL_GET_COMPLICATION_KIND_LIST}
                            serverValue={"query"}
                            queryParams={{
                                pageSize: 10,
                                barcode: false,
                            }}
                            disabled={disabled}
                            minCountSymbol={2}
                            listLabel="title"
                            elementLabel="title"
                            elementValue="id"
                            onSelect={(e) =>
                                this.onSelectElement(e, "pregnancy")
                            }
                            onRemove={(e) =>
                                this.onRemoveElement(
                                    e,
                                    "pregnancyComplicationKinds",
                                )
                            }
                            items={pregnancyComplicationKinds}
                            placeholder={"Введите осложнение"}
                            label={
                                <>
                                    <Desktop>
                                        Осложнения при беременности:
                                    </Desktop>
                                    <Tablet>Ослож. при берем.:</Tablet>
                                </>
                            }
                        />
                    </Item>
                )}
                <Item>
                    <FormikFormField
                        name={"normalSystolicPressure"}
                        component={(props) => (
                            <FormField
                                label={"Систолическое (верхнее), мм.рт.ст:"}
                                {...props}
                                type={"number"}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>
                <Item>
                    <FormikFormField
                        name={"normalDiastolicPressure"}
                        component={(props) => (
                            <FormField
                                label={"Диастолическое (нижнее), мм.рт.ст:"}
                                {...props}
                                type={"number"}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>
                <Item>
                    <FormikFormField
                        name={"dispensaryRegistration"}
                        component={(props) => (
                            <FormField
                                label={
                                    "Состою на диспансерном учете (укажите специалиста):"
                                }
                                type={"textarea"}
                                {...props}
                                onChange={(e) => props.onChange(e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>
                <Item>
                    <FormikFormField
                        name={"emergencyContactPhones"}
                        component={(props) => (
                            <FormField
                                label={
                                    "Контакты лиц/лица для связи в случае нарушения сознания:"
                                }
                                type={"textarea"}
                                {...props}
                                onChange={(e) => props.onChange(e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>
                <Item>
                    <FormikFormField
                        name={"bloodType"}
                        component={(props) => (
                            <FormField
                                label={"Группа крови:"}
                                type={"number"}
                                {...props}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>
                <Item>
                    <RhFactorWrapper>
                        <RhFactorLabel>Резус фактор:</RhFactorLabel>
                        {disabled ? (
                            <RhFactorValue>
                                {this.getRhFactor(rhFactor)}
                            </RhFactorValue>
                        ) : (
                            <RhFactorFieldWrapper>
                                <FormikFormField
                                    name={"rhFactor"}
                                    component={(props) => {
                                        return (
                                            <Radio
                                                {...props}
                                                elements={
                                                    USER_VITAL_RH_FACTOR_SELECT_SECTION
                                                }
                                            />
                                        );
                                    }}
                                />
                            </RhFactorFieldWrapper>
                        )}
                    </RhFactorWrapper>
                </Item>
                <Item>
                    <FormikFormField
                        name={"surgeryAndTrauma"}
                        component={(props) => (
                            <FormField
                                label={"Операции, травмы и гемотрансфузии:"}
                                type={"textarea"}
                                {...props}
                                onChange={(e) => props.onChange(e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>
                <Item>
                    <FormikFormField
                        name={"implants"}
                        component={(props) => (
                            <FormField
                                label={"Импланты:"}
                                type={"textarea"}
                                {...props}
                                onChange={(e) => props.onChange(e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>
                <Item>
                    <FormikFormField
                        name={"regularDrugs"}
                        component={(props) => (
                            <FormField
                                label={
                                    "Постоянно принимаемые лекарственные препараты:"
                                }
                                type={"textarea"}
                                {...props}
                                onChange={(e) => props.onChange(e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    />
                </Item>
                <Item>
                    <FormikFormField
                        name={"other"}
                        component={(props) => (
                            <Tooltip
                                content={
                                    "Как добраться, код домофона, этаж, наличие лифта, информация облегчающая идентификацию (татуировки, шрамы) и другая информация"
                                }
                            >
                                <FormField
                                    label={"Иное:"}
                                    type={"textarea"}
                                    {...props}
                                    onChange={(e) =>
                                        props.onChange(e.target.value)
                                    }
                                    disabled={disabled}
                                />
                            </Tooltip>
                        )}
                    />
                </Item>
                <Actions>
                    {disabled && (
                        <Button
                            label={"Редактировать"}
                            onClick={() =>
                                this.setState({
                                    disabled: !this.state.disabled,
                                })
                            }
                        />
                    )}
                    {!disabled && (
                        <ButtonsWrapper>
                            <Button
                                label={"Сохранить"}
                                onClick={() => this.onSave()}
                            />
                            <Button
                                label={"Отмена"}
                                onClick={() => {
                                    this.props.changeInitialValues(
                                        this.props.allData.information,
                                    );
                                    this.setState({
                                        disabled: !this.state.disabled,
                                    });
                                }}
                            />
                        </ButtonsWrapper>
                    )}
                </Actions>
            </FormWrapper>
        );
    }
}

const FormWrapper = styled.div`
    padding: 20px 20px 20px 50px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-start;

    > div {
        margin-right: 16px;
    }
`;

const Item = styled.div`
    margin-bottom: ${(props) => (props["margin-0"] ? 0 : "16px")};
`;

const RhFactorWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const RhFactorLabel = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    display: inline-block;
`;

const RhFactorValue = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
        })};
    display: inline-block;
    margin-top: 10px;
    padding: 10px 0;
`;

const RhFactorFieldWrapper = styled.div`
    margin-top: 10px;
`;

export default DoctorForm;
