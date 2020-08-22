import { validateRules } from "config/consts";

export default {
    policyExistenceCode: {
        name: "наличие полиса ОМС",
        rules: [validateRules.required],
        type: "string",
        default: "",
    },
    existingPolicyKindCode: {
        name: "вид имеющегося полиса",
        rules: [],
        type: "string",
        default: "",
    },
    policyClaimReasonCode: {
        name: "причина обращения",
        rules: [],
        type: "string",
        default: "",
    },
    "personalData.newLastName": {
        rules: [],
        name: "фамилия",
        type: "string",
        default: "",
    },
    "personalData.newFirstName": {
        rules: [],
        name: "имя",
        type: "string",
        default: "",
    },
    "personalData.newMiddleName": {
        rules: [],
        name: "отчество",
        type: "string",
        default: "",
    },
    "personalData.newBirthday": {
        rules: [],
        name: "дата рождения",
        type: "date",
        default: "",
    },
    "personalData.newBirthplace": {
        rules: [],
        name: "место рождения",
        type: "string",
        default: "",
    },
    "personalData.newSex": {
        rules: [],
        name: "пол",
        type: "string",
        default: "",
    },
    "personalData.phone": {
        rules: [validateRules.required],
        name: "телефон",
        type: "string",
        default: "",
    },
    "personalData.email": {
        rules: [validateRules.required],
        name: "email",
        type: "string",
        default: "",
    },
    "personalData.snils": {
        rules: [validateRules.required],
        name: "снилс",
        type: "string",
        default: "",
    },
    inaccuracyComment: {
        rules: [],
        name: "некорректные данные",
        type: "string",
        default: "",
    },
    policyForm: {
        name: "форма полиса",
        rules: [validateRules.required],
        type: "string",
        default: "",
    },
    tempCertificateAsPaperRequired: {
        name: "временное свидетельство",
        rules: [validateRules.required],
        type: "boolean",
        default: false,
    },
    "personalData.lastName": {
        rules: [validateRules.required],
        name: "фамилия",
        type: "string",
        default: "",
    },
    "personalData.firstName": {
        rules: [validateRules.required],
        name: "имя",
        type: "string",
        default: "",
    },
    "personalData.middleName": {
        rules: [validateRules.required],
        name: "отчество",
        type: "string",
        default: "",
    },
    "personalData.birthday": {
        rules: [validateRules.required],
        name: "дата рождения",
        type: "date",
        default: "",
    },
    "personalData.birthplace": {
        rules: [validateRules.required],
        name: "место рождения",
        type: "string",
        default: "",
    },
    "personalData.sex": {
        rules: [validateRules.required],
        name: "пол",
        type: "string",
        default: "",
    },
    "passportData.series": {
        rules: [validateRules.required],
        name: "серия паспорта",
        type: "string",
    },
    "passportData.number": {
        rules: [validateRules.required],
        name: "номер паспорта",
        type: "string",
        default: "",
    },
    "passportData.issueDate": {
        rules: [validateRules.required],
        name: "когда выдан",
        type: "date",
        default: "",
    },
    "passportData.issuer": {
        rules: [validateRules.required],
        name: "кем выдан",
        type: "string",
        default: "",
    },
    "passportData.issuerCode": {
        rules: [validateRules.required],
        name: "код подразделения",
        type: "string",
        default: "",
    },

    applicantCategory: {
        rules: [validateRules.required],
        name: "категория заявителя",
        type: "string",
        default: "",
    },
    // actual address
    "actualAddress.regionGuid": {
        name: "регион",
        rules: [validateRules.required],
        type: "string",
    },
    "actualAddress.areaGuid": {
        name: "район",
        rules: [],
        type: "string",
    },
    "actualAddress.cityGuid": {
        name: "город",
        rules: [],
        type: "string",
    },
    "actualAddress.placeGuid": {
        name: "населенный пункт",
        rules: [],
        type: "string",
    },
    "actualAddress.streetGuid": {
        name: "улица",
        rules: [],
        type: "string",
    },
    "actualAddress.houseGuid": {
        name: "дом",
        rules: [validateRules.required],
        type: "string",
    },
    "actualAddress.regionName": {
        name: "регион",
        rules: [],
        type: "string",
        omit: true,
    },
    "actualAddress.areaName": {
        name: "район",
        rules: [],
        type: "string",
    },
    "actualAddress.cityName": {
        name: "город",
        rules: [],
        type: "string",
    },

    "actualAddress.placeName": {
        name: "населенный пункт",
        rules: [],
        type: "string",
    },
    "actualAddress.streetName": {
        name: "улица",
        rules: [],
        type: "string",
    },
    "actualAddress.house": {
        name: "дом",
        rules: [],
        type: "string",
    },
    "actualAddress.demesne": {
        name: "квартира",
        rules: [],
        type: "string",
    },
    "actualAddress.zipCode": {
        name: "индекс",
        rules: [],
        type: "string",
    },
    // legal address
    "legalAddress.regionGuid": {
        name: "регион",
        rules: [],
        type: "string",
    },
    "legalAddress.areaGuid": {
        name: "район",
        rules: [],
        type: "string",
    },
    "legalAddress.cityGuid": {
        name: "город",
        rules: [],
        type: "string",
    },
    "legalAddress.placeGuid": {
        name: "населенный пункт",
        rules: [],
        type: "string",
    },
    "legalAddress.streetGuid": {
        name: "улица",
        rules: [],
        type: "string",
    },
    "legalAddress.houseGuid": {
        name: "дом",
        rules: [],
        type: "string",
    },
    "legalAddress.regionName": {
        name: "регион",
        rules: [],
        type: "string",
        omit: true,
    },
    "legalAddress.areaName": {
        name: "район",
        rules: [],
        type: "string",
    },
    "legalAddress.cityName": {
        name: "город",
        rules: [],
        type: "string",
    },

    "legalAddress.placeName": {
        name: "место рождения",
        rules: [],
        type: "string",
    },
    "legalAddress.streetName": {
        name: "улица",
        rules: [],
        type: "string",
    },
    "legalAddress.house": {
        name: "дом",
        rules: [],
        type: "string",
    },
    "legalAddress.demesne": {
        name: "квартира",
        rules: [],
        type: "string",
    },

    "legalAddressOptions.sameAsActual": {
        name: "value",
        type: "boolean",
        rules: [],
        default: false,
    },
    "legalAddressOptions.notExists": {
        name: "value",
        type: "boolean",
        rules: [],
        default: false,
    },
    "legalAddressOptions.temp": {
        name: "value",
        type: "boolean",
        rules: [],
        default: false,
    },
    "existingPolicyData.number": {
        name: "number",
        rules: [],
        type: "string",
    },
    "existingPolicyData.numberUnknown": {
        name: "numberUnknown",
        rules: [],
        type: "boolean",
    },
    "existingPolicyData.smoCode": {
        name: "код московской СМО",
        rules: [],
        type: "string",
    },
    "existingPolicyData.smoName": {
        name: "страховая организация",
        rules: [],
        type: "string",
    },
    newSmoCode: {
        name: "страховая организация",
        rules: [validateRules.required],
        type: "string",
    },
    newSmoId: {
        name: "код московской СМО",
        rules: [],
        type: "string",
        omit: true,
    },
    "issuePlace.type": {
        name: "type",
        rules: [validateRules.required],
        type: "string",
    },
    "issuePlace.district": {
        name: "округ МФЦ",
        rules: [],
        type: "string",
    },
    "issuePlace.mfcId": {
        name: "идентификатор МФЦ",
        rules: [],
        type: "string",
    },
    "issuePlace.smoOfficeId": {
        name: "идентификатор офиса СМО",
        rules: [],
        type: "string",
    },

    "approvements.conditions": {
        name: "условия",
        rules: [validateRules.required],
        type: "boolean",
    },

    "approvements.accuracy": {
        name: "достоверность и полнота указанных данных",
        rules: [validateRules.required],
        type: "boolean",
    },

    "approvements.notSpecialist": {
        name: "не являюсь высококвалифицированным специалистом",
        rules: [validateRules.required],
        type: "boolean",
    },
    "approvements.individualSupport": {
        name: "индивидуальное информационное сопровождение",
        rules: [validateRules.required],
        type: "boolean",
    },

    //  start type=file meta
    personalDataConfirmation: {
        rules: [],
        name: "подтверждающий документ",
        type: "file",
        default: "",
    },
    snils: {
        rules: [],
        name: "снилс",
        type: "file",
        default: "",
    },
    passportPhotoPage: {
        rules: [],
        name: "разворот с фотографией",
        type: "file",
        default: "",
    },
    passportRegistrationPage: {
        rules: [],
        name: "разворот с регистрацией",
        type: "file",
        default: "",
    },
    tempRegistration: {
        rules: [],
        name: "Скан свидетельства о временной регистрации",
        type: "file",
        default: "",
    },
    photo: {
        rules: [],
        name: "фото",
        type: "file",
        default: "",
    },
    sign: {
        rules: [],
        name: "подпись",
        type: "file",
        default: "",
    },
};

export const addressHierarchy = [
    "regionGuid",
    "areaGuid",
    "cityGuid",
    "placeGuid",
    "streetGuid",
    "houseGuid",
];
