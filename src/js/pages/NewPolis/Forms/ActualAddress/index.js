import React, { PureComponent } from "react";
import styled from "styled-components";
import InlineFormField from "components/InlineFormField";
import Row from "containers/Row";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fiasPaths } from "config/paths";
import { findError } from "pages/NewPolis/Forms/helper";
import { FormikFormField } from "wrappers/Formik/FormField";
import AutoComplete from "components/AutoComplete";
import { Loader } from "components/Loader";
// import hasIn from "lodash/hasIn";
import { editEachItem } from "actions/policy";
import { MOSCOW_CODE } from "config/consts";
import { addressHierarchy } from "pages/NewPolis/Forms/meta";
import { fontStyles } from "styledMixins/mixins";

const COMPONENT_NAME = "ActualAddress";

@connect((state) => ({
    isFetching: state.policy.isFetching,
    areas: state.policy.areas,
}))
class ActualAddress extends PureComponent {
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
        const { areas } = this.props;
        if (!isEmpty(areas)) this.fillAreaGuid(areas);
    }

    componentDidUpdate(prevProps) {
        const { dispatch, errors, fields, areas } = this.props;

        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
            // dispatch(editEachItem("ApplicantCategory", "isShow", false));
        }
        if (findError(fields, prevProps.errors) && !findError(fields, errors)) {
            dispatch(editEachItem("RegistrationAddress", "isShow", true));
            dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        }
        if (isEmpty(prevProps.areas) && !isEmpty(areas)) {
            this.fillAreaGuid(areas);
        }
    }

    fillAreaGuid = (areas) => {
        const { changeInitialValues, values } = this.props;
        const element = areas.find((e) => e.code === MOSCOW_CODE);
        if (element) {
            changeInitialValues({
                ...values,
                ["actualAddress.regionGuid"]: element.guid,
                ["actualAddress.regionName"]: element.name,
            });
        }
    };

    loadData = (item, name) => {
        const { changeInitialValues, values } = this.props;
        let actualAddress = { ...values.actualAddress, zipCode: item.zipCode };
        if (name === "house") {
            actualAddress = {
                ...actualAddress,
                [`${name}`]: item.name,
                [`${name}Guid`]: item.guid,
            };
        } else {
            actualAddress = {
                ...actualAddress,
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
                actualAddress = {
                    ...actualAddress,
                    [`${itemName}`]: "",
                    [`${itemName}Guid`]: "",
                };
            } else {
                actualAddress = {
                    ...actualAddress,
                    [`${itemName}Name`]: "",
                    [`${itemName}Guid`]: "",
                };
            }
        });

        changeInitialValues({ ...values, actualAddress: { ...actualAddress } });
    };

    onChangeField = (value, name) => {
        let guid;

        let addressHierarchyArr = addressHierarchy
            .slice(0, addressHierarchy.indexOf(name + "Guid"))
            .reverse();

        for (let i = 0; i < addressHierarchyArr.length; i++) {
            if (this.props?.values?.actualAddress?.[addressHierarchyArr[i]]) {
                guid = this.props?.values?.actualAddress?.[
                    addressHierarchyArr[i]
                ];
                break;
            }
        }

        this.setState({ guid });
    };

    onClearCallback = () => {
        // const { setFormValues } = this.props;
        // const data = {
        //     diseaseName: "",
        //     diseaseDisplayName: "",
        //     diseaseUniqueId: "",
        //     diseaseType: "",
        //     diseaseCode: "",
        // };
        // setFormValues(data);
    };

    render() {
        const { isFetching, values } = this.props;
        const { guid } = this.state;
        if (isFetching) {
            return <Loader />;
        }
        const queryParams = { pageSize: 10, pageNumber: 1, parentGuid: guid };
        return (
            <Wrapper>
                <Row>
                    <Text>
                        Регион: {values.actualAddress?.regionName || ""}
                    </Text>
                </Row>
                <>
                    <Row>
                        <FormikFormField
                            name={"actualAddress.areaGuid"}
                            component={(props) => (
                                <AutoComplete
                                    label={"Район:"}
                                    placeholder={"Район"}
                                    {...props}
                                    queryParams={queryParams}
                                    serverValue={"filter"}
                                    path={fiasPaths.AREA_LIST}
                                    elementLabel={"name"}
                                    elementValue={"guid"}
                                    initialValue={
                                        values?.actualAddress?.areaName
                                    }
                                    onSelect={(item) => {
                                        this.loadData(item, "area");
                                    }}
                                    onClearCallback={this.onClearCallback}
                                    // showClearButton={true}
                                    preserveValueAfterSelect={true}
                                    onChange={(value) =>
                                        this.onChangeField(value, "area")
                                    }
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={`actualAddress.cityGuid`}
                            component={(props) => (
                                <AutoComplete
                                    label={"Город:"}
                                    placeholder={"Город"}
                                    {...props}
                                    queryParams={queryParams}
                                    serverValue={"filter"}
                                    path={fiasPaths.CITY_LIST}
                                    elementLabel={"name"}
                                    elementValue={"guid"}
                                    initialValue={
                                        values?.actualAddress?.cityName
                                    }
                                    onSelect={(item) => {
                                        this.loadData(item, "city");
                                    }}
                                    preserveValueAfterSelect={true}
                                    onChange={(value) =>
                                        this.onChangeField(value, "city")
                                    }
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"actualAddress.placeGuid"}
                            component={(props) => (
                                <AutoComplete
                                    label={"Населенный пункт:"}
                                    placeholder={"Населенный пункт"}
                                    {...props}
                                    queryParams={queryParams}
                                    serverValue={"filter"}
                                    path={fiasPaths.PLACE_LIST}
                                    elementLabel={"name"}
                                    elementValue={"guid"}
                                    initialValue={
                                        values?.actualAddress?.placeName
                                    }
                                    onSelect={(item) => {
                                        this.loadData(item, "place");
                                    }}
                                    preserveValueAfterSelect={true}
                                    onChange={(value) =>
                                        this.onChangeField(value, "place")
                                    }
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={`actualAddress.streetGuid`}
                            component={(props) => (
                                <AutoComplete
                                    label={"Улица:"}
                                    placeholder={"Улица"}
                                    {...props}
                                    queryParams={queryParams}
                                    serverValue={"filter"}
                                    path={fiasPaths.STREET_LIST}
                                    elementLabel={"name"}
                                    elementValue={"guid"}
                                    initialValue={
                                        values?.actualAddress?.streetName
                                    }
                                    onSelect={(item) => {
                                        this.loadData(item, "street");
                                    }}
                                    preserveValueAfterSelect={true}
                                    onChange={(value) =>
                                        this.onChangeField(value, "street")
                                    }
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"actualAddress.houseGuid"}
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
                                    initialValue={values?.actualAddress?.house}
                                    onSelect={(item) => {
                                        this.loadData(item, "house");
                                    }}
                                    preserveValueAfterSelect={true}
                                    onChange={(value) =>
                                        this.onChangeField(value, "house")
                                    }
                                    minCountSymbol={1}
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"actualAddress.demesne"}
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
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

export default ActualAddress;
