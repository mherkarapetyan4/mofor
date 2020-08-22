import React, { PureComponent } from "react";
import styled from "styled-components";
import Row from "containers/Row";
// import { Radio } from "components/Radio";
import { FormikFormField } from "wrappers/Formik/FormField";
import AutoComplete from "components/AutoComplete";
import { fiasPaths } from "config/paths";
import { connect } from "react-redux";
import InlineFormField from "components/InlineFormField";
import { clearFileds, findError } from "pages/NewPolis/Forms/helper";
import PropTypes from "prop-types";
import { editEachItem } from "actions/policy";
import { Loader } from "components/Loader";
import { addressHierarchy } from "pages/NewPolis/Forms/meta";
import { Checkbox } from "components/Checkbox";
import FileLoader from "components/FileLoader";
import omit from "lodash/omit";
import { initial } from "reducers/policy";
import { filePopupInfo } from "config/consts";
import { fontStyles } from "styledMixins/mixins";

const COMPONENT_NAME = "RegistrationAddress";

@connect((state) => ({
    isFetching: state.policy.isFetching,
    areas: state.policy.areas,
}))
class RegistrationAddress extends PureComponent {
    static propTypes = {
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        areas: PropTypes.array.isRequired,
    };

    state = {
        guid: null,
    };

    componentDidMount() {
        // const { areas } = this.props;
        // if (!isEmpty(areas)) this.fillAreaGuid(areas);
    }

    componentDidUpdate(prevProps) {
        const { dispatch, errors, fields, values, setFormValues } = this.props;

        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
            // dispatch(editEachItem("ApplicantCategory", "isShow", false));
        }
        if (findError(fields, prevProps.errors) && !findError(fields, errors)) {
            dispatch(editEachItem("CurrentPolis", "isShow", true));
            dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        }

        if (
            prevProps.values.legalAddressOptions.sameAsActual !==
                values.legalAddressOptions.sameAsActual ||
            prevProps.values.legalAddressOptions.notExists !==
                values.legalAddressOptions.notExists ||
            prevProps.values.legalAddressOptions.temp !==
                values.legalAddressOptions.temp
        ) {
            if (
                !(
                    values.legalAddressOptions.temp &&
                    !values.legalAddressOptions.sameAsActual
                )
            ) {
                setFormValues(
                    omit(clearFileds(initial.accordions[9].fields), [
                        "legalAddressOptions.sameAsActual",
                        "legalAddressOptions.notExists",
                        "legalAddressOptions.temp",
                        "tempRegistration",
                    ]),
                );
            }
            if (!values.legalAddressOptions.temp) {
                setFormValues(clearFileds(["tempRegistration"]));
            }
            if (values.legalAddressOptions.notExists) {
                setFormValues(
                    clearFileds([
                        "legalAddressOptions.sameAsActual",
                        "legalAddressOptions.temp",
                    ]),
                );
            }
        }
        // if (isEmpty(prevProps.areas) && !isEmpty(areas)) {
        //     this.fillAreaGuid(areas);
        // }
    }

    // fillAreaGuid = (areas) => {
    //     const { changeInitialValues } = this.props;
    //     const element = areas.find((e) => e.code === MOSCOW_CODE);
    //     if (element) {
    //         changeInitialValues({
    //             ["legalAddress.regionGuid"]: element.guid,
    //             ["legalAddress.regionName"]: element.name,
    //         });
    //     }
    // };

    loadData = (item, name) => {
        const { changeInitialValues, values } = this.props;
        let legalAddress = { ...values.legalAddress, zipCode: item.zipCode };
        if (name === "house") {
            legalAddress = {
                ...legalAddress,
                [`${name}`]: item.name,
                [`${name}Guid`]: item.guid,
            };
        } else {
            legalAddress = {
                ...legalAddress,
                [`${name}Name`]: item.name,
                [`${name}Guid`]: item.guid,
            };
        }

        let addressHierarchyArr = addressHierarchy.slice(
            addressHierarchy.indexOf(name + "Guid") + 1,
        );

        addressHierarchyArr.map((item) => {
            let itemName = item.slice(0, item.indexOf("Guid"));
            if (name === "house") {
                legalAddress = {
                    ...legalAddress,
                    [`${itemName}`]: "",
                    [`${itemName}Guid`]: "",
                };
            } else {
                legalAddress = {
                    ...legalAddress,
                    [`${itemName}Name`]: "",
                    [`${itemName}Guid`]: "",
                };
            }
        });
        changeInitialValues({ ...values, legalAddress: { ...legalAddress } });
    };

    onChangeField = (value, name) => {
        let guid;
        let addressHierarchyArr = addressHierarchy
            .slice(0, addressHierarchy.indexOf(name + "Guid"))
            .reverse();
        for (let i = 0; i < addressHierarchyArr.length; i++) {
            if (this.props?.values?.legalAddress?.[addressHierarchyArr[i]]) {
                guid = this.props?.values?.legalAddress?.[
                    addressHierarchyArr[i]
                ];
                break;
            }
        }
        if (guid) {
            this.setState({ guid });
        }
    };

    render() {
        const { isFetching, values } = this.props;
        const { guid } = this.state;
        if (isFetching) {
            return <Loader />;
        }
        const queryParams = { pageSize: 10, pageNumber: 1, parentGuid: guid };
        const showLegalAddress =
            !values.legalAddressOptions.sameAsActual &&
            !values.legalAddressOptions.notExists &&
            values.legalAddressOptions.temp;
        return (
            <Wrapper>
                {/* <Row>Регион: {values.legalAddress?.regionName || ""}</Row> */}
                {!values.legalAddressOptions.notExists && (
                    <Row>
                        <FormikFormField
                            name={"legalAddressOptions.sameAsActual"}
                            component={(props) => (
                                <Checkbox
                                    {...props}
                                    label={
                                        "Адрес фактического места жительства совпадает с адресом регистрации"
                                    }
                                />
                            )}
                        />
                    </Row>
                )}

                {((!values.legalAddressOptions.temp &&
                    !values.legalAddressOptions.sameAsActual) ||
                    !values.legalAddressOptions.sameAsActual) && (
                    <Row>
                        <FormikFormField
                            name={"legalAddressOptions.notExists"}
                            component={(props) => (
                                <Checkbox
                                    {...props}
                                    label={
                                        "Регистрация по фактическому месту жительства отсутствует"
                                    }
                                />
                            )}
                        />
                    </Row>
                )}
                {!values.legalAddressOptions.notExists && (
                    <Row>
                        <FormikFormField
                            name={"legalAddressOptions.temp"}
                            component={(props) => (
                                <Checkbox
                                    {...props}
                                    label={
                                        "Имею временную регистрацию по месту жительства"
                                    }
                                />
                            )}
                        />
                    </Row>
                )}

                {((values.legalAddressOptions.temp &&
                    !values.legalAddressOptions.sameAsActual) ||
                    (values.legalAddressOptions.temp &&
                        values.legalAddressOptions.sameAsActual)) && (
                    <File>
                        <FormikFormField
                            name={"tempRegistration"}
                            component={(props) => (
                                <FileLoader
                                    accept={
                                        "image/jpeg,image/jpg,application/pdf,application/x-rar-compressed,application/rar,.rar,application/x-zip-compressed,application/zip,.zip"
                                    }
                                    {...props}
                                    required
                                    title={
                                        "Скан свидетельства о временной регистрации"
                                    }
                                    infoPopupTooltip={filePopupInfo.tooltip}
                                    infoPopupTitle={filePopupInfo.title}
                                    infoPopupText={[filePopupInfo.text]}
                                />
                            )}
                        />
                    </File>
                )}
                {((values.legalAddressOptions.temp &&
                    !values.legalAddressOptions.sameAsActual) ||
                    (values.legalAddressOptions.temp &&
                        values.legalAddressOptions.sameAsActual)) &&
                    !values?.tempRegistration && (
                        <HintWrapper>
                            <Hint>
                                Свидетельство о временной регистрации
                                отсутствует.
                            </Hint>
                        </HintWrapper>
                    )}

                {showLegalAddress && (
                    <>
                        <Row>
                            <FormikFormField
                                name={"legalAddress.regionGuid"}
                                component={(props) => (
                                    <AutoComplete
                                        required
                                        label={"Регион:"}
                                        placeholder={"Регион"}
                                        {...props}
                                        queryParams={{
                                            pageSize: 10,
                                            pageNumber: 1,
                                        }}
                                        serverValue={"filter"}
                                        path={fiasPaths.REGION_LIST}
                                        elementLabel={"name"}
                                        elementValue={"guid"}
                                        initialValue={
                                            values?.legalAddress?.regionName
                                        }
                                        onSelect={(item) =>
                                            this.loadData(item, "region")
                                        }
                                        preserveValueAfterSelect={true}
                                        onChange={(value) =>
                                            this.onChangeField(value, "area")
                                        }
                                    />
                                )}
                            />
                        </Row>
                        {showLegalAddress && values?.legalAddress?.regionGuid && (
                            <>
                                <Row>
                                    <FormikFormField
                                        name={"legalAddress.areaGuid"}
                                        component={(props) => (
                                            <AutoComplete
                                                required
                                                label={"Район:"}
                                                placeholder={"Район"}
                                                {...props}
                                                queryParams={queryParams}
                                                serverValue={"filter"}
                                                path={fiasPaths.AREA_LIST}
                                                elementLabel={"name"}
                                                elementValue={"guid"}
                                                initialValue={
                                                    values?.legalAddress
                                                        ?.areaName
                                                }
                                                onSelect={(item) => {
                                                    this.loadData(item, "area");
                                                }}
                                                preserveValueAfterSelect={true}
                                                onChange={(value) =>
                                                    this.onChangeField(
                                                        value,
                                                        "area",
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={`legalAddress.cityGuid`}
                                        component={(props) => (
                                            <AutoComplete
                                                required
                                                label={"Город:"}
                                                placeholder={"Город"}
                                                {...props}
                                                queryParams={queryParams}
                                                serverValue={"filter"}
                                                path={fiasPaths.CITY_LIST}
                                                elementLabel={"name"}
                                                elementValue={"guid"}
                                                initialValue={
                                                    values?.legalAddress
                                                        ?.cityName
                                                }
                                                onSelect={(item) => {
                                                    this.loadData(item, "city");
                                                }}
                                                preserveValueAfterSelect={true}
                                                onChange={(value) =>
                                                    this.onChangeField(
                                                        value,
                                                        "city",
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={"legalAddress.placeGuid"}
                                        component={(props) => (
                                            <AutoComplete
                                                required
                                                label={"Населенный пункт:"}
                                                placeholder={"Населенный пункт"}
                                                {...props}
                                                queryParams={queryParams}
                                                serverValue={"filter"}
                                                path={fiasPaths.PLACE_LIST}
                                                elementLabel={"name"}
                                                elementValue={"guid"}
                                                initialValue={
                                                    values?.legalAddress
                                                        ?.placeName
                                                }
                                                onSelect={(item) => {
                                                    this.loadData(
                                                        item,
                                                        "place",
                                                    );
                                                }}
                                                preserveValueAfterSelect={true}
                                                onChange={(value) =>
                                                    this.onChangeField(
                                                        value,
                                                        "place",
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={`legalAddress.streetGuid`}
                                        component={(props) => (
                                            <AutoComplete
                                                required
                                                label={"Улица:"}
                                                placeholder={"Улица"}
                                                {...props}
                                                queryParams={queryParams}
                                                serverValue={"filter"}
                                                path={fiasPaths.STREET_LIST}
                                                elementLabel={"name"}
                                                elementValue={"guid"}
                                                initialValue={
                                                    values?.legalAddress
                                                        ?.streetName
                                                }
                                                onSelect={(item) => {
                                                    this.loadData(
                                                        item,
                                                        "street",
                                                    );
                                                }}
                                                preserveValueAfterSelect={true}
                                                onChange={(value) =>
                                                    this.onChangeField(
                                                        value,
                                                        "street",
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={"legalAddress.houseGuid"}
                                        component={(props) => (
                                            <AutoComplete
                                                required
                                                label={"Дом:"}
                                                placeholder={"Дом"}
                                                {...props}
                                                queryParams={queryParams}
                                                serverValue={"filter"}
                                                path={fiasPaths.HOUSE_LIST}
                                                elementLabel={"name"}
                                                elementValue={"guid"}
                                                initialValue={
                                                    values?.legalAddress?.house
                                                }
                                                onSelect={(item) => {
                                                    this.loadData(
                                                        item,
                                                        "house",
                                                    );
                                                }}
                                                preserveValueAfterSelect={true}
                                                onChange={(value) =>
                                                    this.onChangeField(
                                                        value,
                                                        "house",
                                                    )
                                                }
                                                minCountSymbol={1}
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={"legalAddress.demesne"}
                                        component={(props) => (
                                            <InlineFormField
                                                {...props}
                                                label={"Квартира:"}
                                                placeholder={"Квартира"}
                                            />
                                        )}
                                    />
                                </Row>
                            </>
                        )}
                    </>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

const File = styled.div`
    padding: 5px 0;
    margin-bottom: 10px;
`;

const Hint = styled.div`
    padding: 5px 10px;
    border-radius: 5px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    background-color: ${(props) => props.theme.colors.notifications.warning};
    margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const HintWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

export default RegistrationAddress;
