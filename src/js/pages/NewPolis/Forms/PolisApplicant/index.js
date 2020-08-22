import React, { PureComponent } from "react";
import styled from "styled-components";
import Row from "containers/Row";
import InlineFormField from "components/InlineFormField";
import { Radio } from "components/Radio";
import { fontStyles } from "styledMixins/mixins";
import get from "lodash/get";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormikFormField } from "wrappers/Formik/FormField";
import { SEX_LIST } from "config/consts";
import { editEachItem } from "actions/policy";
import dayjs from "dayjs";
import FileLoader from "components/FileLoader";
import { findError } from "pages/NewPolis/Forms/helper";
import { Link } from "react-router-dom";
import { LK_MENU_ELEMENTS } from "config/menu";
import { formatDate } from "utils/formatDate";
import { filePopupInfo } from "config/consts";

const COMPONENT_NAME = "PolisApplicant";

@connect((state) => ({
    data: get(state.policy, "AppealReason.content", []),
    isFetching: state.policy.isFetching,
    person: state.myData.myData.person,
    snils: state.myData.myData.snils,
    contacts: state.myData.myData.contacts,
}))
class PolisApplicant extends PureComponent {
    state = {
        notValidPhoneOrEmail: true,
    };
    static defaultProps = {
        data: [],
    };
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.array,
        isFetching: PropTypes.bool.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
        values: PropTypes.object.isRequired,
        person: PropTypes.object.isRequired,
        snils: PropTypes.string.isRequired,
        contacts: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const {
            changeInitialValues,
            person,
            snils,
            contacts,
            values,
        } = this.props;

        const buffPersonalData = {
            ...values.personalData,
            lastName: person.lastName,
            firstName: person.firstName,
            middleName: person.middleName,
            birthday: dayjs(person.birthday),
            birthplace: values.personalData.birthplace, //|| contacts?.address,
            sex: person.sex,
            snils: values.personalData.snils || snils,
            phone: contacts?.phone,
            email: contacts?.email,
        };
        changeInitialValues({
            ...values,
            personalData: buffPersonalData,
        });
    }

    componentDidUpdate(prevProps) {
        const { dispatch, errors, fields } = this.props;
        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
            // dispatch(editEachItem("PolisApplicantPassport", "isShow", false));
        }
        if (findError(fields, prevProps.errors) && !findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", true));
            dispatch(editEachItem("PolisApplicantPassport", "isShow", true));
        }
    }

    emailAndPhoneValidation = () => {
        const { contacts } = this.props;
        // return just this function without if statement

        // console.log(errors, "errorserrorserrors")
        //     if (findError(["personalData.phone", "personalData.email"], errors)) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        return !contacts?.email || !contacts?.phone;
    };

    render() {
        const { values } = this.props;
        return (
            <Wrapper>
                <ApplicantInfo>
                    <Hint>
                        Сведения, содержащиеся в Едином регистре застрахованных
                    </Hint>
                    <Row>
                        <FormikFormField
                            name={"personalData.lastName"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Фамилия:"}
                                    placeholder={"Фамилия"}
                                    required
                                    disabled
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"personalData.firstName"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Имя:"}
                                    placeholder={"Имя"}
                                    required
                                    disabled
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"personalData.middleName"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Отчество:"}
                                    placeholder={"Отчество"}
                                    required
                                    disabled
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"personalData.birthday"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Дата рождения:"}
                                    placeholder={"Дата рождения"}
                                    value={formatDate(
                                        values.personalData.birthday,
                                    )}
                                    required
                                    disabled
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"personalData.birthplace"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Место рождения:"}
                                    placeholder={"Место рождения"}
                                    required
                                />
                            )}
                        />
                    </Row>
                </ApplicantInfo>
                <Gender>
                    <GenderTitle>Пол:</GenderTitle>
                    <FormikFormField
                        name={"personalData.sex"}
                        component={(props) => (
                            <Radio
                                {...props}
                                elements={SEX_LIST}
                                disabled
                                onChange={() => false}
                            />
                        )}
                    />
                </Gender>
                <ApplicantContacts>
                    <Row>
                        <FormikFormField
                            name={"personalData.phone"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Контактный телефон"}
                                    placeholder={"Контактный телефон"}
                                    type={"phone"}
                                    required
                                    disabled
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"personalData.email"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Адрес электронной почты"}
                                    placeholder={"Ваша почта"}
                                    required
                                    disabled
                                />
                            )}
                        />
                    </Row>
                    {this.emailAndPhoneValidation() && (
                        <Row>
                            <AlertBox>
                                Необходимо заполнить телефон и email на{" "}
                                <Link to={LK_MENU_ELEMENTS.MAIN_PAGE.path}>
                                    главной
                                </Link>
                            </AlertBox>
                        </Row>
                    )}
                    <Row>
                        <FormikFormField
                            name={"personalData.snils"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"СНИЛС"}
                                    placeholder={"СНИЛС"}
                                    type={"snils"}
                                    required
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"snils"}
                            component={(props) => (
                                <FileLoader
                                    accept={
                                        "image/jpeg,image/jpg,application/pdf,application/x-rar-compressed,application/rar,.rar,application/x-zip-compressed,application/zip,.zip"
                                    }
                                    {...props}
                                    required
                                    title={"СНИЛС:"}
                                    infoPopupTooltip={filePopupInfo.tooltip}
                                    infoPopupTitle={filePopupInfo.title}
                                    infoPopupText={[filePopupInfo.text]}
                                />
                            )}
                        />
                    </Row>
                    {!values?.snils && (
                        <Hint>Скан-копия СНИЛС отсутствует</Hint>
                    )}
                </ApplicantContacts>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

const ApplicantInfo = styled.div`
    margin-bottom: 20px;
`;

const Gender = styled.div`
    margin-bottom: 20px;
`;
const AlertBox = styled.div`
    ${(props) => fontStyles(props)};
    background: #e46d25;
    color: white;
    padding: 15px;
    border-radius: 5px;

    a {
        color: black;
    }
`;

const GenderTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 20px;
`;

const ApplicantContacts = styled.div``;

const Hint = styled.div`
    padding: 5px 10px;
    border-radius: 5px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    background-color: ${(props) => props.theme.colors.notifications.warning};
    margin: ${(props) => (props.margin ? props.margin : 0)};
`;

export default PolisApplicant;
