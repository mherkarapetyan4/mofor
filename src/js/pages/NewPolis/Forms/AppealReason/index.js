import React, { PureComponent } from "react";
import styled from "styled-components";
import { Radio } from "components/Radio";
import InlineFormField from "components/InlineFormField";
import Row from "containers/Row";
import FileLoader from "components/FileLoader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { get, isEmpty } from "lodash";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import { Loader } from "components/Loader";
import NoData from "components/NoData";
import { editEachItem, getClaimDictionary } from "actions/policy";
import { policyPaths } from "config/paths";
import { FormikFormField } from "wrappers/Formik/FormField";
import { SEX_LIST } from "config/consts";
import { clearFileds, findError } from "pages/NewPolis/Forms/helper";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import dayjs from "dayjs";
import { initial } from "reducers/policy";
import { filePopupInfo } from "config/consts";
import { fontStyles } from "styledMixins/mixins";

const COMPONENT_NAME = "AppealReason";

@connect((state) => ({
    data: get(state.policy, "AppealReason.content", []),
    isFetching: state.policy.isFetching,
    person: state.myData.myData.person,
    snils: state.myData.myData.snils,
    contacts: state.myData.myData.contacts,
}))
class AppealReason extends PureComponent {
    state = {
        formElements: [],
    };
    static defaultProps = {
        data: [],
    };
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.array,
        isFetching: PropTypes.bool.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
        person: PropTypes.object.isRequired,
        snils: PropTypes.string.isRequired,
        contacts: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const {
            dispatch,

            values,
        } = this.props;
        if (!values.existingPolicyKindCode) {
            dispatch(editEachItem(COMPONENT_NAME, "isShow", false));
            return false;
        }
        // if (isEmpty(this.props.data)) {
        dispatch(
            getClaimDictionary(
                policyPaths.GET_CLAIM_DICTIONARY_REASON_LIST,
                COMPONENT_NAME,
                { existingKindCode: values.existingPolicyKindCode },
            ),
        );
        // }
        this.changeData();

        this.initializeValuesFromStore();
    }

    initializeValuesFromStore = () => {
        const { changeInitialValues, person, values } = this.props;
        if (values.policyClaimReasonCode === "ATTRIBUTES_CHANGED") {
            const buffPersonalData = {
                ...values.personalData,
                newLastName: values.personalData.newLastName || person.lastName,
                newFirstName:
                    values.personalData.newFirstName || person.firstName,
                newMiddleName:
                    values.personalData.newMiddleName || person.middleName,
                newBirthday: values.personalData.newBirthday
                    ? dayjs(values.personalData.newBirthday)
                    : dayjs(person.birthday),
                newBirthplace: values.personalData.newBirthplace, // || contacts?.address,
                newSex: values.personalData.newSex || person.sex,
            };

            changeInitialValues({
                ...values,
                personalData: buffPersonalData,
            });
        }

        if (values.policyClaimReasonCode === "INACCURACY_FOUND") {
            changeInitialValues({
                ...values,
                inaccuracyComment: values.inaccuracyComment,
            });
        }
    };

    componentDidUpdate(prevProps) {
        if (
            JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)
        ) {
            this.changeData();
        }
        const { dispatch, errors, fields, values, setFormValues } = this.props;

        if (findError(fields, prevProps.errors) && !findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", true));
            dispatch(editEachItem("PolisShape", "isShow", true));
        }

        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
            dispatch(editEachItem("PolisShape", "isShow", false));
        }

        if (
            prevProps.values.policyClaimReasonCode !==
            values.policyClaimReasonCode
        ) {
            this.initializeValuesFromStore();
            if (
                values.policyClaimReasonCode !== "ATTRIBUTES_CHANGED" ||
                values.policyClaimReasonCode !== "INACCURACY_FOUND"
            ) {
                setFormValues(
                    omit(clearFileds(initial.accordions[2].fields), [
                        "policyClaimReasonCode",
                    ]),
                );
            }
        }
    }

    changeData() {
        const { data } = this.props;
        const formElements = data.map((item) => ({
            label: item.name,
            value: item.code,
        }));
        this.setState({ formElements });
    }

    render() {
        const { formElements } = this.state;
        const { isFetching, values } = this.props;
        if (isFetching) return <Loader />;
        if (isEmpty(formElements))
            return (
                <NoData
                    title={"Нет данных"}
                    message={"Для данного объекта отсутствуют данные"}
                />
            );
        return (
            <Wrapper>
                <FormikFormField
                    name={"policyClaimReasonCode"}
                    component={(props) => (
                        <Radio {...props} elements={formElements} />
                    )}
                />
                {values.policyClaimReasonCode === "ATTRIBUTES_CHANGED" && (
                    <InfoForm>
                        <FullName>
                            <Row>
                                <FormikFormField
                                    name={"personalData.newLastName"}
                                    component={(props) => (
                                        <InlineFormField
                                            {...props}
                                            label={"Фамилия:"}
                                            placeholder={"Новая фамилия"}
                                            required
                                        />
                                    )}
                                />
                            </Row>
                            <Row>
                                <FormikFormField
                                    name={"personalData.newFirstName"}
                                    component={(props) => (
                                        <InlineFormField
                                            {...props}
                                            label={"Имя:"}
                                            placeholder={"Новое имя"}
                                            required
                                        />
                                    )}
                                />
                            </Row>
                            <Row>
                                <FormikFormField
                                    name={"personalData.newMiddleName"}
                                    component={(props) => (
                                        <InlineFormField
                                            {...props}
                                            label={"Отчество:"}
                                            placeholder={"Новое отчество"}
                                            required
                                        />
                                    )}
                                />
                            </Row>
                            <Row>
                                <FormikFormField
                                    name={"personalData.newBirthday"}
                                    component={(props) => (
                                        <InlineFormFieldDate
                                            {...props}
                                            label={"Дата рождения:"}
                                            placeholder={"Дата рождения"}
                                            required
                                        />
                                    )}
                                />
                            </Row>
                            <Row>
                                <FormikFormField
                                    name={"personalData.newBirthplace"}
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
                            <Row>
                                <FormikFormField
                                    name={"personalData.newSex"}
                                    component={(props) => (
                                        <RadioWrapper>
                                            <Radio
                                                {...props}
                                                elements={SEX_LIST}
                                            />
                                        </RadioWrapper>
                                    )}
                                />
                            </Row>
                        </FullName>
                        <LoaderWrapper>
                            <FormikFormField
                                key={"appealreason.personalDataConfirmation"}
                                name={"personalDataConfirmation"}
                                component={(props) => (
                                    <FileLoader
                                        {...props}
                                        required
                                        accept={
                                            "image/jpeg,image/jpg,application/pdf,application/x-rar-compressed,application/rar,.rar,application/x-zip-compressed,application/zip,.zip"
                                        }
                                        title={"Подтверждающий документ:"}
                                        infoPopupTooltip={filePopupInfo.tooltip}
                                        infoPopupTitle={filePopupInfo.title}
                                        infoPopupText={[filePopupInfo.text]}
                                    />
                                )}
                            />
                        </LoaderWrapper>
                    </InfoForm>
                )}
                {values.policyClaimReasonCode === "INACCURACY_FOUND" && (
                    <InfoForm>
                        <FullName>
                            <Row>
                                <FormikFormField
                                    name={"inaccuracyComment"}
                                    component={(props) => (
                                        <InlineFormFieldTextarea
                                            {...props}
                                            label={"Некорректные данные:"}
                                            placeholder={"Некорректные данные"}
                                            required
                                        />
                                    )}
                                />
                            </Row>
                        </FullName>
                    </InfoForm>
                )}
                {values?.policyClaimReasonCode === "WANT_UNIFIED_MOSCOW" && (
                    <HintWrapper>
                        <Hint>
                            Обращаем Ваше внимание, что имеющийся у Вас на руках
                            полис ОМС будет погашен
                        </Hint>
                    </HintWrapper>
                )}
                {values?.policyClaimReasonCode === "ATTRIBUTES_CHANGED" && (
                    <HintWrapper>
                        <Hint>
                            Обращаем Ваше внимание, что имеющийся у Вас на руках
                            полис ОМС будет погашен
                        </Hint>
                    </HintWrapper>
                )}
                {values?.policyClaimReasonCode === "INACCURACY_FOUND" && (
                    <>
                        <HintWrapper>
                            <Hint>
                                Укажите некорректные данные, указанные в Вашем
                                действующем полисе, например неточности в
                                фамилии, имени, отчестве, дате рождения.
                            </Hint>
                        </HintWrapper>
                        <HintWrapper>
                            <Hint>
                                Обращаем Ваше внимание, что имеющийся у Вас на
                                руках полис ОМС будет погашен
                            </Hint>
                        </HintWrapper>
                    </>
                )}
                {values?.policyClaimReasonCode === "PLACE_CHANGED" && (
                    <HintWrapper>
                        <Hint>
                            Для совершения необходимых Вам действий с полисом
                            ОМС Вам следует обратиться в один из пунктов выдачи
                            полисов выбранной Вами страховой медицинской
                            организации (СМО) для перерегистрации имеющегося
                            полиса или внесения изменений в Единый регистр
                            застрахованных лиц. Повторный выпуск полиса в этом
                            случае не требуется, внесение изменений
                            осуществляется в день обращения. С информацией о
                            СМО, осуществляющих деятельность в сфере ОМС города
                            Москвы и организованных ими пунктах выдачи полисов,
                            Вы можете ознакомиться на сайте Московского
                            городского фонда ОМС www.mgfoms.ru в разделе
                            &quot;Справочники&quot;.
                        </Hint>
                    </HintWrapper>
                )}
                {values?.policyClaimReasonCode === "PASSPORT_CHANGED" && (
                    <HintWrapper>
                        <Hint>
                            Для совершения необходимых Вам действий с полисом
                            ОМС Вам следует обратиться в один из пунктов выдачи
                            полисов выбранной Вами страховой медицинской
                            организации (СМО) для перерегистрации имеющегося
                            полиса или внесения изменений в Единый регистр
                            застрахованных лиц. Повторный выпуск полиса в этом
                            случае не требуется, внесение изменений
                            осуществляется в день обращения. С информацией о
                            СМО, осуществляющих деятельность в сфере ОМС города
                            Москвы и организованных ими пунктах выдачи полисов,
                            Вы можете ознакомиться на сайте Московского
                            городского фонда ОМС www.mgfoms.ru в разделе
                            &quot;Справочники&quot;.
                        </Hint>
                    </HintWrapper>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

const Hint = styled.div`
    padding: 5px 10px;
    border-radius: 5px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    background-color: ${(props) => props.theme.colors.notifications.warning};
    margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const InfoForm = styled.div``;

const FullName = styled.div`
    margin-bottom: ${(props) => props.theme.paddings.normal};
`;

const LoaderWrapper = styled.div``;

const RadioWrapper = styled.div``;

const HintWrapper = styled.div`
    margin-top: 16px;
`;

export default AppealReason;
