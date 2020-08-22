import React, { PureComponent } from "react";
import FormField from "components/FormField";
import styled from "styled-components";
// import { Button } from "components/Button";
// import { fontStyles } from "styledMixins/mixins";
import get from "lodash/get";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { formatDate } from "utils/formatDate";
import WardProfile from "./WardProfile";
import PassportInfo from "./PassportInfo";
import MainProfile from "./MainProfile";

@connect((state) => ({
    myData: state.myData.myData,
}))
class PersonalInfoForm extends PureComponent {
    static propTypes = {
        myData: PropTypes.object,
        person: PropTypes.object,
        pbdDocument: PropTypes.object,
        snils: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
    };
    render() {
        const { myData } = this.props;
        const {
            person,
            pbdDocument,
            snils,
            ward: isWard,
            confirmations,
        } = myData;
        return (
            <FormWrapper>
                <Item>
                    <FormField
                        disabled
                        label={"ФИО"}
                        value={get(person, "fullName", "Нет данных")}
                    />
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Дата рождения"}
                        value={
                            formatDate(get(person, "birthday")) || "Нет данных"
                        }
                    />
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Пол"}
                        value={
                            person && person.sex
                                ? person.sex === "MALE"
                                    ? "Мужской"
                                    : "Женский"
                                : "Нет данных"
                        }
                    />
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Тип документа"}
                        value={get(pbdDocument, "typeName", "Нет данных")}
                    />
                </Item>
                <Item>
                    <FieldWrapper>
                        <FormField
                            disabled
                            label={"Данные документа, удостоверяющего личность"}
                            value={<PassportInfo disabled data={myData} />}
                            type={"element"}
                        />
                    </FieldWrapper>
                    {isWard && (
                        <WardProfile
                            field={"passportData"}
                            confirmations={confirmations}
                            showButton={!!get(pbdDocument, "unmaskedNumber")}
                        />
                    )}
                </Item>
                <Item>
                    <FieldWrapper>
                        <FormField disabled label={"СНИЛС"} value={snils} />
                    </FieldWrapper>
                    {isWard && (
                        <WardProfile
                            field={"snilsData"}
                            confirmations={confirmations}
                            showButton={!!snils}
                        />
                    )}
                </Item>
                {!isWard && <MainProfile />}
            </FormWrapper>
        );
    }
}

const FieldWrapper = styled.div`
    margin-bottom: 16px;

    :last-child {
        margin-bottom: 0;
    }
`;

const Item = styled.div`
    margin-bottom: 16px;
`;

const FormWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    padding: 20px 20px 20px 50px;
`;

export default PersonalInfoForm;
