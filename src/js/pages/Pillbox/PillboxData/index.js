import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "components/Checkbox";
import { connect } from "react-redux";
import { Loader } from "components/Loader";
import {
    getPillboxList,
    getCurrentPillbox,
    sendEmailCode,
    checkEmail,
    savePillbox,
} from "actions/pillbox";
import { Button } from "components/Button";
import AllergiesAndDiseases from "pages/Pillbox/PillboxData/AllergiesAndDiseases";
import styled from "styled-components";
import WidgetBlock from "components/WidgetBlock";
import ListData from "components/List/ListData";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import get from "lodash/get";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router-dom";
import { LK_MENU_ELEMENTS } from "config/menu";
import ConfirmEmail from "components/ConfirmEmail";
import InlineFormField from "components/InlineFormField";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import { RESPONSIVE } from "config/consts";
import { getPluralLabel } from "utils/getPluralLabel";
import { showPopup } from "actions/popup";
import DeleteProfile from "pages/Pillbox/PillboxData/DeleteProfile";

@withRouter
@connect((state) => ({
    myPillboxList: state.pillbox.myPillboxList,
    checkEmailConfirmations: state.pillbox.checkEmailConfirmations,
    checkEmailReminders: state.pillbox.checkEmailReminders,
    profile: state.pillbox.currentPillbox.profile,
}))
class PillboxData extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        checkEmailConfirmations: PropTypes.object.isRequired,
        checkEmailReminders: PropTypes.object.isRequired,
        myPillboxList: PropTypes.array,
        profile: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.maxCountProfile = 5;
        this.currentCountProfile = 0;
    }

    state = {
        sendRemindersToUser: false,
        sendConfirmationsToUser: false,
        remindersEmail: "",
        confirmationsEmail: "",
    };

    checkEmailByType = (email, mailType) => {
        const { dispatch } = this.props;

        dispatch(checkEmail(email, mailType));
    };

    onSave = () => {
        const { profile, dispatch } = this.props;

        dispatch(
            savePillbox(
                {
                    ...profile,
                    ...this.state,
                    birthday: serverFormatDate(dayjs(profile.birthday)),
                },
                () => this.onClickOption(profile.id),
            ),
        );
    };

    componentDidMount() {
        const { dispatch, myPillboxList, profile } = this.props;
        if (isEmpty(myPillboxList)) dispatch(getPillboxList());
        if (!isEmpty(profile)) {
            this.setState({
                sendRemindersToUser: profile.sendRemindersToUser,
                sendConfirmationsToUser: profile.sendConfirmationsToUser,
                remindersEmail: profile.remindersEmail || "",
                confirmationsEmail: profile.confirmationsEmail || "",
            });
        }
    }

    getPickedValue = (value) => {
        return pick(value, [
            "id",
            "sendRemindersToUser",
            "sendConfirmationsToUser",
            "remindersEmail",
            "confirmationsEmail",
        ]);
    };

    componentDidUpdate(prevProps) {
        const { profile } = this.props;
        if (
            profile &&
            !isEmpty(profile) &&
            JSON.stringify(this.getPickedValue(prevProps.profile)) !==
                JSON.stringify(this.getPickedValue(profile))
        ) {
            const confirmationsMail = get(profile, "confirmationsEmail", "");
            const remindersEmail = get(profile, "remindersEmail", "");
            if (confirmationsMail)
                this.checkEmailByType(
                    confirmationsMail,
                    "checkEmailConfirmations",
                );
            if (remindersEmail)
                this.checkEmailByType(remindersEmail, "checkEmailReminders");
            this.setState({
                sendRemindersToUser: profile.sendRemindersToUser,
                sendConfirmationsToUser: profile.sendConfirmationsToUser,
                remindersEmail: profile.remindersEmail || "",
                confirmationsEmail: profile.confirmationsEmail || "",
            });
        }
    }

    onClickOption = (id) => {
        const { dispatch } = this.props;
        dispatch(getCurrentPillbox(id));
    };

    getSex = (gender) => {
        if (!gender) {
            return "";
        }
        if (gender === "MALE") {
            return "Мужской";
        }
        if (gender === "FEMALE") {
            return "Женский";
        }
        return "";
    };
    getAge = (birthday) => {
        let birthdayStr =
            birthday.slice(0, birthday.indexOf(" ")) +
            "T" +
            birthday.slice(birthday.indexOf(" ") + 1) +
            "+03:00";

        if (!birthday) {
            return "";
        }
        birthday = new Date(birthdayStr);

        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        let year = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (year) {
            return `${year} ${getPluralLabel(year, ["год", "года", "лет"])}`;
        }
        const months = ageDate.getUTCMonth();
        return `${months} ${getPluralLabel(months, [
            "месяц",
            "месяца",
            "месяцев",
        ])}`;
    };

    createOrEditProfile = (profile = {}) => {
        const { history } = this.props;
        history.push({
            pathname: LK_MENU_ELEMENTS.MEDICINES_PAGE.items.CREATEORUPDATE.path,
            state: { profile },
        });
    };

    onChange = (value, name) => {
        this.setState({
            [name]: value,
        });
        if (name === "sendRemindersToUser") {
            const { profile, dispatch } = this.props;

            dispatch(
                savePillbox(
                    {
                        ...profile,
                        ...this.state,
                        sendRemindersToUser: value,
                        birthday: serverFormatDate(dayjs(profile.birthday)),
                    },
                    () => this.onClickOption(profile.id),
                ),
            );
        }
        if (name === "sendConfirmationsToUser") {
            const { profile, dispatch } = this.props;

            dispatch(
                savePillbox(
                    {
                        ...profile,
                        ...this.state,
                        sendConfirmationsToUser: value,
                        birthday: serverFormatDate(dayjs(profile.birthday)),
                    },
                    () => this.onClickOption(profile.id),
                ),
            );
        }
    };

    onRemoveProfile = () => {
        const { profile, dispatch } = this.props;
        dispatch(
            showPopup("Удаление профиля", <DeleteProfile profile={profile} />),
        );
    };

    render() {
        const {
            myPillboxList,
            profile,
            checkEmailConfirmations,
            checkEmailReminders,
            dispatch,
        } = this.props;

        if (!profile) return <Loader />;

        const {
            sendRemindersToUser,
            sendConfirmationsToUser,
            remindersEmail,
            confirmationsEmail,
        } = this.state;
        const pillboxList = myPillboxList.map((item) => {
            return {
                value: item.id,
                label: item.name,
            };
        });
        this.currentCountProfile = pillboxList.length;
        // const confirmationsMail = get(profile, "confirmationsEmail", "");
        // const remindersEmail = get(profile, "remindersEmail", "");

        return (
            <Wrapper>
                <WidgetBlock title={"Данные профиля"}>
                    <ProfileInfoWrapper>
                        <ProfileInfo>
                            <SelectFieldWrapper>
                                <InlineFormFieldSelect
                                    onChange={(id) => this.onClickOption(id)}
                                    value={get(profile, "id")}
                                    options={pillboxList}
                                    label={"Профиль:"}
                                />
                            </SelectFieldWrapper>
                            <PersonalData>
                                <DataWrapper>
                                    <ListData
                                        label={"Возраст:"}
                                        data={this.getAge(
                                            get(profile, "birthday", false),
                                        )}
                                    />
                                </DataWrapper>
                                <DataWrapper>
                                    <ListData
                                        label={"Пол:"}
                                        data={this.getSex(
                                            get(profile, "sex", false),
                                        )}
                                    />
                                </DataWrapper>
                            </PersonalData>
                        </ProfileInfo>
                        <ProfileActions>
                            <ButtonWrapper>
                                <Button
                                    label={"Добавить профиль"}
                                    disabled={
                                        this.currentCountProfile >=
                                        this.maxCountProfile
                                    }
                                    onClick={() => this.createOrEditProfile()}
                                />
                            </ButtonWrapper>
                            <ButtonWrapper>
                                <Button
                                    label={"Удалить профиль"}
                                    onClick={this.onRemoveProfile}
                                    disabled={profile.byDefault}
                                />
                            </ButtonWrapper>
                            <ButtonWrapper>
                                <Button
                                    label={"Редактировать профиль"}
                                    onClick={() =>
                                        this.createOrEditProfile(profile)
                                    }
                                />
                            </ButtonWrapper>
                        </ProfileActions>
                        <ListData
                            label={"Количество профилей:"}
                            data={`${this.currentCountProfile} из ${this.maxCountProfile}`}
                        />
                    </ProfileInfoWrapper>
                    <FieldWrapper>
                        <MailFieldWrapper>
                            <CheckboxWrapper>
                                <Checkbox
                                    name={"sendRemindersToUser"}
                                    label={
                                        "Включить напоминания о необходимости приема"
                                    }
                                    value={sendRemindersToUser}
                                    onChange={(e) =>
                                        this.onChange(e, "sendRemindersToUser")
                                    }
                                />
                            </CheckboxWrapper>
                            {sendRemindersToUser && (
                                <>
                                    <InputWrapper>
                                        <InlineFormField
                                            label={"Email для уведомлений:"}
                                            value={remindersEmail}
                                            placeholder={"Введите почту"}
                                            onChange={(e) =>
                                                this.onChange(
                                                    e,
                                                    "remindersEmail",
                                                )
                                            }
                                            onBlur={this.onSave}
                                        />
                                    </InputWrapper>
                                    <StatusWrapper>
                                        <ConfirmEmail
                                            check={checkEmailReminders}
                                            mail={remindersEmail}
                                            onCheckEmail={() =>
                                                this.checkEmailByType(
                                                    remindersEmail,
                                                    "checkEmailReminders",
                                                )
                                            }
                                            onSendEmail={() =>
                                                dispatch(
                                                    sendEmailCode(
                                                        remindersEmail,
                                                        "checkEmailReminders",
                                                    ),
                                                )
                                            }
                                        />
                                    </StatusWrapper>
                                </>
                            )}
                        </MailFieldWrapper>
                        <MailFieldWrapper>
                            <CheckboxWrapper>
                                <Checkbox
                                    name={"ds"}
                                    label={
                                        "Включить уведомления, что лекарство принято"
                                    }
                                    value={sendConfirmationsToUser}
                                    onChange={(e) =>
                                        this.onChange(
                                            e,
                                            "sendConfirmationsToUser",
                                        )
                                    }
                                />
                            </CheckboxWrapper>
                            {sendConfirmationsToUser && (
                                <>
                                    <InputWrapper>
                                        <InlineFormField
                                            label={"Email для подтверждений:"}
                                            value={confirmationsEmail}
                                            placeholder={"Введите почту"}
                                            onChange={(e) =>
                                                this.onChange(
                                                    e,
                                                    "confirmationsEmail",
                                                )
                                            }
                                            onBlur={this.onSave}
                                        />
                                    </InputWrapper>
                                    <StatusWrapper>
                                        <ConfirmEmail
                                            check={checkEmailConfirmations}
                                            mail={confirmationsEmail}
                                            onCheckEmail={() =>
                                                this.checkEmailByType(
                                                    confirmationsEmail,
                                                    "checkEmailConfirmations",
                                                )
                                            }
                                            onSendEmail={() =>
                                                dispatch(
                                                    sendEmailCode(
                                                        confirmationsEmail,
                                                        "checkEmailConfirmations",
                                                    ),
                                                )
                                            }
                                        />
                                    </StatusWrapper>
                                </>
                            )}
                        </MailFieldWrapper>
                    </FieldWrapper>
                </WidgetBlock>
                <WidgetBlock
                    title={"Ведение хронических заболеваний и аллергий"}
                >
                    <AllergiesAndDiseases />
                </WidgetBlock>
            </Wrapper>
        );
    }
}

const PersonalData = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
`;

const Wrapper = styled.div``;

const ProfileInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 800px;
    margin-bottom: ${(props) => props.theme.paddings.normal};

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
    flex-wrap: wrap;
`;

const SelectFieldWrapper = styled.div`
    margin-right: 16px;
    flex: 1 1 auto;
    min-width: 400px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        min-width: 100%;
    }
`;

const ButtonWrapper = styled.div`
    flex: 0 0 auto;
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        margin-bottom: 16px;
    }
`;

const DataWrapper = styled.div`
    margin-right: 30px;

    &:last-child {
        margin-right: 0;
    }
`;
const CheckboxWrapper = styled.div`
    margin-bottom: ${(props) => props.theme.paddings.normal};
    display: flex;
`;

const FieldWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        display: block;
    }
`;

const MailFieldWrapper = styled.div`
    margin-right: 16px;
    flex: 1 0 0;

    &:last-child {
        margin-right: 0;
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

const ProfileActions = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
`;

const StatusWrapper = styled.div`
    margin-bottom: 10px;
`;

const InputWrapper = styled.div`
    margin-bottom: 10px;
`;

export default PillboxData;
