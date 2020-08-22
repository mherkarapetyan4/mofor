import set from "lodash/set";
import indexOf from "lodash/indexOf";
import { validFileType } from "pages/NewPolis/Forms/helper";

const megaBytes = 1024 * 1024;
const MAX_PHOTO = 1;

const isShow = (data, key) => {
    let isShow = false;
    data.map((e) => {
        const finded = indexOf(e.fields, key);
        if (e.isShow && finded >= 0) {
            isShow = true;
        }
    });
    return isShow;
};

const imageWithSizes = (imgage) => {
    const getUploadedFileDimensions = (file) =>
        new Promise((resolve, reject) => {
            try {
                let img = new Image();

                img.onload = () => {
                    const width = img.naturalWidth,
                        height = img.naturalHeight;

                    window.URL.revokeObjectURL(img.src);

                    return resolve({ width, height });
                };

                img.src = window.URL.createObjectURL(file);
            } catch (exception) {
                return reject(exception);
            }
        });
    return getUploadedFileDimensions(imgage);
};

const defaultRequiredValue = (label) =>
    `Поле ${label} обязательно для заполнения`;

export const validate = async (values, props) => {
    const errors = {};
    const isOneMbImage = async (key) => {
        const file = values[key];
        const mb = file.size / megaBytes;
        const mimeType = file.type;

        const MAX_WIDTH = key === "photo" ? 320 : 736;
        const MAX_HEIGHT = key === "photo" ? 400 : 160;
        if (mb > MAX_PHOTO) {
            set(
                errors,
                `${key}`,
                `${errors[key] ? errors[key] : ""} 
                Несоответствие по объему файла: ${mb.toFixed(2)}мб`,
            );
        }

        if (mimeType !== "image/jpeg" && mimeType !== "image/jpg") {
            set(
                errors,
                key,
                `${
                    errors[key] ? errors[key] : ""
                } Несоответствие по расширению: ${file.name.split(".").pop()}`,
            );
        } else {
            const res = await imageWithSizes(file);

            if (res.height !== MAX_HEIGHT) {
                set(
                    errors,
                    key,
                    `${
                        errors[key] ? errors[key] : ""
                    } Несоответствие по высоте:: ${res.height}px`,
                );
            }
            if (res.width !== MAX_WIDTH) {
                set(
                    errors,
                    `${key}`,
                    `${
                        errors[key] ? errors[key] : ""
                    } Несоответствие по ширине:: ${res.width}px`,
                );
            }
        }
    };

    const validateImages = (key) => {
        const file = values[key];
        const mimeType = file.type;
        const mb = file.size / megaBytes;
        if (mb > MAX_PHOTO) {
            set(
                errors,
                `${key}`,
                `Несоответствие по размеру файла: ${mb.toFixed(2)}мб`,
            );
        }
        if (!validFileType(mimeType)) {
            set(
                errors,
                key,
                `${errors[key] ? errors[key] : ""}
                      Несоответствие по расширению: ${file.name
                          .split(".")
                          .pop()}`,
            );
        }
    };
    if (!values.existingPolicyKindCode && props.data[1].isShow) {
        errors.existingPolicyKindCode = defaultRequiredValue(
            "вид имеющегося полиса",
        );
    }
    if (isShow(props.data, "policyClaimReasonCode")) {
        if (!values.policyClaimReasonCode) {
            set(
                errors,
                `policyClaimReasonCode`,
                defaultRequiredValue("причина обращения"),
            );
        }
    }

    if (values.policyClaimReasonCode === "ATTRIBUTES_CHANGED") {
        if (!values.personalData.newLastName) {
            set(
                errors,
                `personalData.newLastName`,
                defaultRequiredValue("фамилия после изменения"),
            );
        }
        if (!values.personalData.newFirstName) {
            set(
                errors,
                `personalData.newFirstName`,
                defaultRequiredValue("имя после изменения"),
            );
        }
        if (!values.personalData.newMiddleName) {
            set(
                errors,
                `personalData.newMiddleName`,
                defaultRequiredValue("отчество после изменения"),
            );
        }

        if (!values.personalData.newBirthday) {
            set(
                errors,
                `personalData.newBirthday`,
                defaultRequiredValue("дата рождения после изменения"),
            );
        }

        if (!values.personalData.newBirthplace) {
            set(
                errors,
                `personalData.newBirthplace`,
                defaultRequiredValue("место рождения после изменения"),
            );
        }
        if (!values.personalData.newSex) {
            set(
                errors,
                `personalData.newSex`,
                defaultRequiredValue("пол после изменения"),
            );
        }

        if (!values.personalDataConfirmation) {
            set(
                errors,
                `personalDataConfirmation`,
                "Скан документа, подтверждающего смену ФИО обязателен для заполнения",
            );
        }

        if (values.personalDataConfirmation) {
            validateImages("personalDataConfirmation");
        }

        // if (!values.snils && isShow(props.data, "policyClaimReasonCode")) {
        //     set(errors, `snils`, "Поле СНИЛС обязательно для заполнения");
        // }
    }

    if (values.policyClaimReasonCode === "INACCURACY_FOUND") {
        if (!values.inaccuracyComment) {
            set(
                errors,
                `inaccuracyComment`,
                defaultRequiredValue("некорректные данные"),
            );
        }
    }

    if (values.policyForm === "PLASTIC") {
        if (!values.photo) {
            set(errors, `photo`, "Скан фотографии обязателен для заполнения");
        }
        if (!values.sign) {
            set(errors, `sign`, "Cкан подписи обязателен для заполнения");
        }
        if (values.photo) {
            await isOneMbImage("photo");
        }
        if (values.sign) {
            await isOneMbImage("sign");
        }
    }

    if (isShow(props.data, "issuePlace.type")) {
        if (values.issuePlace.type && values.issuePlace.type === "SMO") {
            if (!values.issuePlace.smoOfficeId) {
                set(
                    errors,
                    `issuePlace.smoOfficeId`,
                    defaultRequiredValue("идентификатор офиса СМО"),
                );
            }
        } else {
            if (!values.issuePlace.district) {
                set(
                    errors,
                    `issuePlace.district`,
                    defaultRequiredValue("округ МФЦ"),
                );
            }

            if (!values.issuePlace.mfcId) {
                set(
                    errors,
                    `issuePlace.mfcId`,
                    defaultRequiredValue("идентификатор МФЦ"),
                );
            }
        }
    }
    if (isShow(props.data, "personalData.lastName")) {
        if (!values.snils) {
            set(errors, `snils`, defaultRequiredValue("СНИЛС"));
        }
        if (values.snils) {
            validateImages("snils");
        }
    }

    if (isShow(props.data, "passportData.series")) {
        if (!values.passportPhotoPage) {
            set(
                errors,
                `passportPhotoPage`,
                "Файл разворот с фотографией обязателен для заполнения",
            );
        }

        if (values.passportPhotoPage) {
            validateImages("passportPhotoPage");
        }

        if (!values.passportRegistrationPage) {
            set(
                errors,
                `passportRegistrationPage`,
                "Файл разворот с регистрацией обязателен для заполнения",
            );
        }

        if (values.passportRegistrationPage) {
            validateImages("passportRegistrationPage");
        }
    }
    if (isShow(props.data, "legalAddress.regionGuid")) {
        if (
            !values.legalAddressOptions.temp &&
            !values.legalAddressOptions.sameAsActual &&
            !values.legalAddressOptions.notExists
        ) {
            set(errors, `legalAddressOptions.temp`, defaultRequiredValue(""));
        }
        if (
            values.legalAddressOptions.temp &&
            !values.legalAddressOptions.sameAsActual &&
            !values.legalAddressOptions.notExists
        ) {
            if (!values.legalAddress.houseGuid) {
                set(
                    errors,
                    `legalAddress.houseGuid`,
                    defaultRequiredValue("дом"),
                );
            }

            if (!values.legalAddress.regionGuid) {
                set(
                    errors,
                    `legalAddress.regionGuid`,
                    defaultRequiredValue("регион"),
                );
            }
            // set(errors, `legalAddressOptions.temp`, defaultRequiredValue(""));
        }
        if (
            (values.legalAddressOptions.temp &&
                !values.legalAddressOptions.sameAsActual) ||
            (values.legalAddressOptions.temp &&
                values.legalAddressOptions.sameAsActual)
        ) {
            if (!values.tempRegistration) {
                set(
                    errors,
                    `tempRegistration`,
                    defaultRequiredValue(
                        "Скан свидетельства о временной регистрации",
                    ),
                );
            }

            if (values.tempRegistration) {
                validateImages("tempRegistration");
            }
        }

        if (
            values.legalAddressOptions.temp &&
            !values.legalAddressOptions.sameAsActual
        ) {
            if (!values.legalAddress.houseGuid) {
                set(
                    errors,
                    `legalAddress.houseGuid`,
                    defaultRequiredValue("дом"),
                );
            }

            if (!values.legalAddress.regionGuid) {
                set(
                    errors,
                    `legalAddress.regionGuid`,
                    defaultRequiredValue("регион"),
                );
            }
        }
    }
    // phone and email validation

    // if (!values.personalData.phone) {
    //     set(
    //         errors,
    //         `personalData.phone`,
    //         "Поле телефон обязательно для заполнения",
    //     );
    // }
    //
    // if (!values.personalData.email) {
    //     set(
    //         errors,
    //         `personalData.email`,
    //         "Поле email обязательно для заполнения",
    //     );
    // }

    if (isShow(props.data, "approvements.conditions")) {
        if (!values.approvements.conditions) {
            set(errors, `approvements.conditions`, "Необходимо подтверждение");
        }
        if (!values.approvements.accuracy) {
            set(errors, `approvements.accuracy`, "Необходимо подтверждение");
        }
        if (!values.approvements.notSpecialist) {
            set(
                errors,
                `approvements.notSpecialist`,
                "Необходимо подтверждение",
            );
        }
        if (!values.approvements.individualSupport) {
            set(
                errors,
                `approvements.individualSupport`,
                "Необходимо подтверждение",
            );
        }
    }
    return errors;
};
