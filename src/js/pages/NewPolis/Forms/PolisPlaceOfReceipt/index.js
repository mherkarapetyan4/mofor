import React, { PureComponent } from "react";
import styled from "styled-components";
import { Radio } from "components/Radio";
import PolisPlaceOfReceiptMap from "pages/NewPolis/Forms/PolisPlaceOfReceipt/PolisPlaceOfReceiptMap";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSmoOffices, getMoDistricts, getMcOffices } from "actions/polis";
import { FormikFormField } from "wrappers/Formik/FormField";
import { findError } from "pages/NewPolis/Forms/helper";
import { editEachItem } from "actions/policy";
import isEmpty from "lodash/isEmpty";
const COMPONENT_NAME = "PolisPlaceOfReceipt";

const formElements = [
    {
        label: "Получение полиса в страховой медицинской организации",
        value: "SMO",
    },
    {
        label: "Получение полиса в многофункциональном центре",
        value: "MFC",
    },
];

@connect((state) => ({
    smoOffices: state.polis.smoOffices.content,
    moDistricts: state.polis.moDistricts.content,
    mcOffices: state.polis.mcOffices.content,
}))
class PolisPlaceOfReceipt extends PureComponent {
    state = {
        moDistrictsOptions: [],
        adressesOptions: [],
        activePlaceType: "",
        activeMoDistrictCode: "",
        activePlaceCode: "",
        activePlaceDetails: {},
        mapCenter: [55.751244, 37.618423],
    };

    componentDidUpdate(prevProps) {
        const {
            smoOffices,
            moDistricts,
            mcOffices,
            values,
            fields,
            errors,
            dispatch,
        } = this.props;

        if (prevProps.values.issuePlace.type !== values.issuePlace.type) {
            this.handleRadio(values.issuePlace.type);
        }
        if (
            prevProps.values.issuePlace.smoOfficeId !==
                values.issuePlace.smoOfficeId &&
            values.issuePlace.smoOfficeId !== ""
        ) {
            this.onChangeAddress(values.issuePlace.smoOfficeId);
        }
        if (
            prevProps.values.issuePlace.mfcId !== values.issuePlace.mfcId &&
            values.issuePlace.mfcId !== ""
        ) {
            this.onChangeAddress(values.issuePlace.mfcId);
        }
        if (
            prevProps.values.issuePlace.district !==
                values.issuePlace.district &&
            values.issuePlace.district !== ""
        ) {
            // this.onChangeAddress(values.issuePlace.smoOfficeId)
            this.onChangeDistrict(values.issuePlace.district);
        }
        if (this.props.moDistricts !== prevProps.moDistricts) {
            const arr = [];
            moDistricts.map((item) => {
                arr.push({
                    label: item.name,
                    value: item.name,
                });
            });

            this.setState({
                moDistrictsOptions: arr,
            });
        }

        if (this.props.smoOffices !== prevProps.smoOffices) {
            const arr = [];

            smoOffices.map((item) => {
                arr.push({
                    label: item.address,
                    value: item.code,
                });
            });

            this.setState({
                adressesOptions: arr,
            });
        }

        if (this.props.mcOffices !== prevProps.mcOffices) {
            const arr = [];

            mcOffices.map((item) => {
                arr.push({
                    label: item.address,
                    value: item.code,
                });
            });

            this.setState({
                adressesOptions: arr,
            });
        }
        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
            // dispatch(editEachItem("ApplicantCategory", "isShow", false));
        }
        if (findError(fields, prevProps.errors) && !findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", true));
            dispatch(editEachItem("ApplicantAgreement", "isShow", true));
        }
    }

    componentDidMount() {
        this.handleRadio(this.props.values.issuePlace.type);
        if (this.props.values.issuePlace.type) {
            if (this.props.values.issuePlace.type === "SMO") {
                this.onChangeAddress(this.props.values.issuePlace.smoOfficeId);
            } else {
                this.onChangeDistrict(this.props.values.issuePlace.district);
                this.onChangeAddress(this.props.values.issuePlace.mfcId);
            }
        }
    }

    render() {
        const {
            activeMoDistrictCode,
            activePlaceCode,
            adressesOptions,
            moDistrictsOptions,
            activePlaceDetails,
            mapCenter,
        } = this.state;
        const { smoOffices, mcOffices, values } = this.props;
        return (
            <Wrapper>
                <FormikFormField
                    name={"issuePlace.type"}
                    component={(props) => (
                        <Radio {...props} elements={formElements} />
                    )}
                />
                {values.issuePlace?.type === formElements[0].value && (
                    <PolisPlaceOfReceiptMap
                        title={
                            "Пункт выдачи страховой медицинской организации:"
                        }
                        activePlaceCode={activePlaceCode}
                        activePlaceDetails={activePlaceDetails}
                        mapCenter={mapCenter}
                        activeMoDistrictCode={activeMoDistrictCode}
                        offices={smoOffices}
                        onClickPlacemark={(e) => this.onClickPlacemark(e)}
                        adressesOptions={adressesOptions}
                        // onChangeAddress={(e) => this.onChangeAddress(e)}
                        values={values}
                    />
                )}
                {values.issuePlace?.type === formElements[1].value && (
                    <PolisPlaceOfReceiptMap
                        title={"Пункт выдачи многофункционального центра:"}
                        activePlaceCode={activePlaceCode}
                        activePlaceDetails={activePlaceDetails}
                        mapCenter={mapCenter}
                        activeMoDistrictCode={activeMoDistrictCode}
                        offices={mcOffices}
                        onClickPlacemark={(e) => this.onClickPlacemark(e)}
                        adressesOptions={adressesOptions}
                        // onChangeAddress={(e) => this.onChangeAddress(e)}
                        values={values}
                    >
                        <FieldWrapper>
                            <FormikFormField
                                name={"issuePlace.district"}
                                component={(props) => (
                                    <InlineFormFieldSelect
                                        {...props}
                                        // onChange={(value) => this.onChangeDistrict(value)}
                                        options={moDistrictsOptions}
                                        // value={activeMoDistrictCode}
                                        placeholder={"Выберите округ"}
                                        label={"Округ:"}
                                    />
                                )}
                            />
                        </FieldWrapper>
                    </PolisPlaceOfReceiptMap>
                )}
            </Wrapper>
        );
    }

    onChangeDistrict = (value) => {
        const { dispatch } = this.props;
        dispatch(getMcOffices(value));
        this.setState({
            activeMoDistrictCode: value,
            activePlaceCode: "",
            activePlaceDetails: {},
            adressesOptions: [],
            mapCenter: [55.751244, 37.618423],
        });
    };

    onChangeAddress = (value) => {
        this.setActivePlaceDetails(value);
        this.setState({
            activePlaceCode: value,
        });
    };

    setActivePlaceDetails = (value) => {
        const { smoOffices, mcOffices } = this.props;

        let activePlaceDetails;

        if (this.props.values.issuePlace.type === "SMO") {
            if (isEmpty(smoOffices)) {
                return false;
            }

            activePlaceDetails = smoOffices.find(
                (place) => place.code === value,
            );
        } else if (this.props.values.issuePlace.type === "MFC") {
            if (isEmpty(mcOffices)) {
                return false;
            }
            activePlaceDetails = mcOffices.find(
                (place) => place.code === value,
            );
        }

        this.setState({
            activePlaceDetails: activePlaceDetails,
            mapCenter: [
                activePlaceDetails?.coordinates.latitude,
                activePlaceDetails?.coordinates.longitude,
            ],
        });
    };

    onClickPlacemark = (e) => {
        const value = e.get("target").properties._data.code;
        const { changeInitialValues, values } = this.props;
        let key = {};

        if (values.issuePlace.type === formElements[0].value) {
            key = "smoOfficeId";
        } else {
            key = "mfcId";
        }
        changeInitialValues({
            ...values,
            issuePlace: {
                ...values.issuePlace,
                [key]: value,
            },
        });
        this.setActivePlaceDetails(value);
        this.setState({
            activePlaceCode: value,
        });
    };

    handleRadio = (value) => {
        const { changeInitialValues, values, dispatch } = this.props;
        this.setState({
            moDistrictsOptions: [],
            adressesOptions: [],
            activePlaceType: value,
            activePlaceCode: "",
            activePlaceDetails: {},
            mapCenter: [55.751244, 37.618423],
        });

        if (values.issuePlace.type === formElements[0].value) {
            dispatch(getSmoOffices(values.newSmoId));
            this.setState({
                activeMoDistrictCode: true,
            });
            changeInitialValues({
                ...values,
                issuePlace: {
                    ...values.issuePlace,
                    district: "",
                    mfcId: "",
                },
            });
        } else if (values.issuePlace.type === formElements[1].value) {
            this.setState({
                activeMoDistrictCode: "",
            });
            dispatch(getMoDistricts());
            changeInitialValues({
                ...values,
                issuePlace: {
                    ...values.issuePlace,
                    smoOfficeId: "",
                },
            });
        }
    };
}

const Wrapper = styled.div`
    padding: 10px;
`;

const FieldWrapper = styled.div`
    margin-bottom: 10px;
`;

PolisPlaceOfReceipt.propTypes = {
    dispatch: PropTypes.func,
    smoOffices: PropTypes.object,
    moDistricts: PropTypes.object,
    mcOffices: PropTypes.object,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    changeInitialValues: PropTypes.func.isRequired,
};

export default PolisPlaceOfReceipt;
