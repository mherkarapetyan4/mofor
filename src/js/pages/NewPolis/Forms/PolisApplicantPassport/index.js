import React, { PureComponent } from "react";
import styled from "styled-components";
import Row from "containers/Row";
import InlineFormField from "components/InlineFormField";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import Column from "containers/Column";
import FileLoader from "components/FileLoader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormikFormField } from "wrappers/Formik/FormField";
import { editEachItem } from "actions/policy";
import { findError } from "pages/NewPolis/Forms/helper";
import dayjs from "dayjs";
// import dayjs from "dayjs";
import { filePopupInfo, RESPONSIVE } from "config/consts";
import { fontStyles } from "styledMixins/mixins";

const COMPONENT_NAME = "PolisApplicantPassport";

@connect((state) => ({
    isFetching: state.policy.isFetching,
    formData: state.policy.formData,
    pbdDocument: state.myData.myData.pbdDocument,
}))
class PolisApplicantPassport extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
        values: PropTypes.object.isRequired,
        pbdDocument: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const { pbdDocument, setFormValues, values } = this.props;
        const buffData = {
            "passportData.series":
                values.passportData.series || pbdDocument?.unmaskedSeries,
            "passportData.number":
                values.passportData.number || pbdDocument?.unmaskedNumber,
            "passportData.issueDate": values.passportData.issueDate
                ? dayjs(values.passportData.issueDate)
                : pbdDocument?.issueDate,
        };
        setFormValues(buffData);
    }

    componentDidUpdate(prevProps) {
        const { dispatch, errors, fields } = this.props;
        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
        }
        if (findError(fields, prevProps.errors) && !findError(fields, errors)) {
            dispatch(editEachItem(COMPONENT_NAME, "checked", true));
            dispatch(editEachItem("ApplicantCategory", "isShow", true));
        }
    }

    render() {
        const { values } = this.props;
        return (
            <Wrapper>
                <ApplicantPassportInfo>
                    <Row>
                        <Column paddingLeft={0} paddingRight={0} fraction={6}>
                            <FieldWrapper>
                                <FormikFormField
                                    name={"passportData.series"}
                                    component={(props) => (
                                        <InlineFormField
                                            {...props}
                                            label={"Серия:"}
                                            placeholder={"Серия паспорта"}
                                            required
                                            // disabled
                                        />
                                    )}
                                />
                            </FieldWrapper>
                        </Column>
                        <Column
                            paddingRight={0}
                            mobilePaddingLeft={0}
                            fraction={6}
                        >
                            <FormikFormField
                                name={"passportData.number"}
                                component={(props) => (
                                    <InlineFormField
                                        {...props}
                                        label={"Номер:"}
                                        placeholder={"Номер паспорта"}
                                        required
                                        // disabled
                                    />
                                )}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"passportData.issuer"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Кем выдан:"}
                                    placeholder={"Подразделение"}
                                    required
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"passportData.issueDate"}
                            component={(props) => (
                                <InlineFormFieldDate
                                    {...props}
                                    label={"Когда выдан:"}
                                    placeholder={"Дата выдачи"}
                                    maxDate={dayjs()}
                                    required
                                />
                            )}
                        />
                    </Row>
                    <Row>
                        <FormikFormField
                            name={"passportData.issuerCode"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Код подразделения:"}
                                    type={"issuerCode"}
                                    placeholder={"Код"}
                                    required
                                />
                            )}
                        />
                    </Row>
                    <Hint>
                        Указывать данные в точном соответствии с паспортом
                    </Hint>
                </ApplicantPassportInfo>
                <File>
                    <FormikFormField
                        name={"passportPhotoPage"}
                        component={(props) => (
                            <FileLoader
                                accept={
                                    "image/jpeg,image/jpg,application/pdf,application/x-rar-compressed,application/rar,.rar,application/x-zip-compressed,application/zip,.zip"
                                }
                                {...props}
                                required
                                title={"Разворот с фотографией"}
                                infoPopupTooltip={filePopupInfo.tooltip}
                                infoPopupTitle={filePopupInfo.title}
                                infoPopupText={[filePopupInfo.text]}
                            />
                        )}
                    />
                </File>
                {!values?.passportPhotoPage && (
                    <HintWrapper>
                        <Hint>Разворот с фотографией отсутствует.</Hint>
                    </HintWrapper>
                )}
                <File>
                    <FormikFormField
                        name={"passportRegistrationPage"}
                        component={(props) => (
                            <FileLoader
                                accept={
                                    "image/jpeg,image/jpg,application/pdf,application/x-rar-compressed,application/rar,.rar,application/x-zip-compressed,application/zip,.zip"
                                }
                                {...props}
                                required
                                title={"Разворот с регистрацией"}
                                infoPopupTooltip={filePopupInfo.tooltip}
                                infoPopupTitle={filePopupInfo.title}
                                infoPopupText={[filePopupInfo.text]}
                            />
                        )}
                    />
                </File>
                {!values?.passportRegistrationPage && (
                    <HintWrapper>
                        <Hint>Разворот с регистрацией отсутствует.</Hint>
                    </HintWrapper>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

const ApplicantPassportInfo = styled.div`
    margin-bottom: 20px;
`;

const File = styled.div`
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

const FieldWrapper = styled.div`
    width: 100%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        margin-bottom: 16px;
    }
`;

export default PolisApplicantPassport;
