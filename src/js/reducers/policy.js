import { policyActions } from "config/actionsKeys";

export const initial = {
    data: {},
    isFetching: false,
    currentItem: {},
    formData: {},
    areas: [],
    accordions: [
        {
            id: 0,
            title: "Наличие полиса ОМС",
            checked: false,
            isShow: true,
            component: "OMSPolisExistence",
            fields: ["policyExistenceCode"],
        },
        {
            id: 1,
            title: "Вид имеющегося полиса",
            checked: false,
            isShow: false,
            component: "OMSPolisExistenceType",
            fields: ["existingPolicyKindCode"],
        },
        {
            id: 2,
            title: "Причина обращения",
            checked: false,
            isShow: false,
            component: "AppealReason",
            fields: [
                "policyClaimReasonCode",
                "personalData.newLastName",
                "personalData.newFirstName",
                "personalData.newMiddleName",
                "personalData.newBirthday",
                "personalData.newBirthplace",
                "personalData.newSex",
                "personalDataConfirmation",
                "inaccuracyComment",
            ],
        },
        {
            id: 3,
            title: "Выбор формы полиса",
            checked: false,
            isShow: false,
            component: "PolisShape",
            fields: ["policyForm", "photo", "sign"],
        },
        {
            id: 4,
            title: "Оформление временного свидетельства",
            checked: false,
            isShow: false,
            component: "TemporaryCertificate",
            fields: ["tempCertificateAsPaperRequired"],
        },
        {
            id: 5,
            title: "Заявитель",
            checked: false,
            isShow: false,
            component: "PolisApplicant",
            fields: [
                "personalData.lastName",
                "personalData.firstName",
                "personalData.middleName",
                "personalData.birthday",
                "personalData.birthplace",
                "snils",
                "personalData.snils",
                "personalData.sex",
                "personalData.phone",
                "personalData.email",
                // "personalData.snils",
                // "personalDataConfirmation",
            ],
        },
        {
            id: 6,
            title: "Паспорт заявителя",
            checked: false,
            isShow: false,
            component: "PolisApplicantPassport",
            fields: [
                "passportData.series",
                "passportData.number",
                "passportData.issuer",
                "passportData.issueDate",
                "passportData.issuerCode",
                "passportPhotoPage",
                "passportRegistrationPage",
            ],
        },
        {
            id: 7,
            title: "Категория заявителя",
            checked: false,
            isShow: false,
            component: "ApplicantCategory",
            fields: ["applicantCategory"],
        },
        {
            id: 8,
            title: "Адрес фактического места проживания",
            checked: false,
            isShow: false,
            // isShow: false,
            component: "ActualAddress",
            fields: [
                "actualAddress.regionGuid",
                "actualAddress.areaGuid",
                "actualAddress.cityGuid",
                "actualAddress.placeGuid",
                "actualAddress.streetGuid",
                "actualAddress.houseGuid",
                "actualAddress.regionName",
                "actualAddress.areaName",
                "actualAddress.cityName",
                "actualAddress.placeName",
                "actualAddress.streetName",
                "actualAddress.house",
                "actualAddress.demesne",
                "actualAddress.zipCode",
            ],
        },
        {
            id: 9,
            title: "Адрес регистрации по месту жительства в РФ",
            checked: false,
            isShow: false,
            // isShow: false,
            component: "RegistrationAddress",
            fields: [
                "legalAddress.regionGuid",
                "legalAddress.areaGuid",
                "legalAddress.cityGuid",
                "legalAddress.placeGuid",
                "legalAddress.streetGuid",
                "legalAddress.houseGuid",
                "legalAddress.regionName",
                "legalAddress.areaName",
                "legalAddress.cityName",
                "legalAddress.placeName",
                "legalAddress.streetName",
                "legalAddress.house",
                "legalAddress.demesne",
                "legalAddress.zipCode",
                "legalAddressOptions.sameAsActual",
                "legalAddressOptions.notExists",
                "legalAddressOptions.temp",
                "tempRegistration",
            ],
        },
        {
            id: 10,
            title: "Имеющийся полис",
            checked: false,
            isShow: false,
            component: "CurrentPolis",
        },
        {
            id: 11,
            title: "Выбор страховой медицинской организации",
            checked: false,
            isShow: false,
            component: "InsuranceCompany",
            fields: ["newSmoCode"],
        },
        {
            id: 12,
            title: "Выбор места получения полиса",
            checked: false,
            isShow: false,
            component: "PolisPlaceOfReceipt",
            fields: [
                "issuePlace.type",
                "issuePlace.district",
                "issuePlace.mfcId",
                "issuePlace.smoOfficeId",
            ],
        },
        {
            id: 13,
            title: "Согласие заявителя",
            checked: false,
            isShow: false,
            component: "ApplicantAgreement",
            fields: [
                "approvements.conditions",
                "approvements.accuracy",
                "approvements.notSpecialist",
                "approvements.individualSupport",
            ],
        },
    ],
};

export function policy(state = initial, action) {
    switch (action.type) {
        case policyActions.START_PENDING: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case policyActions.END_PENDING: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case policyActions.GET_EDIT_ACCORDIONS_POLICY_FULFILLED: {
            return {
                ...state,
                accordions: action.payload,
            };
        }
        case policyActions.GET_POLICY_LIST_FULL_FILLED: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case policyActions.GET_CLAIM_DICTIONARY_FULFILLED: {
            return {
                ...state,
                [action.name]: action.payload,
            };
        }
        case policyActions.GET_CURRENT_POLICY_FULL_FILLED: {
            return {
                ...state,
                currentItem: action.payload,
            };
        }
        case policyActions.FINAL_FORM_FULFILLED: {
            return {
                ...state,
                formData: {
                    ...state.formData,
                    ...action.payload,
                },
            };
        }

        case policyActions.SET_ACCORDIONS: {
            return {
                ...state,
                accordions: action.payload,
            };
        }

        case policyActions.RESET_ACCORDIONS: {
            return {
                ...state,
                accordions: [...initial.accordions],
            };
        }

        case policyActions.FILL_AREAS: {
            return {
                ...state,
                areas: action.payload,
            };
        }

        default:
            return state;
    }
}
