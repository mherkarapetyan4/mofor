import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import FlatPopup from "components/FlatPopup";
import Row from "containers/Row";
import Column from "containers/Column";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import InlineFormField from "components/InlineFormField";
import { Button } from "components/Button";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { Desktop, Tablet } from "wrappers/responsive";
import isEmpty from "lodash/isEmpty";
import { form } from "wrappers/Formik";
import { pillboxFields } from "pages/Pillbox/Create/meta";
import dayjs from "dayjs";
import { FormikFormField } from "wrappers/Formik/FormField";
import { SEX_LIST } from "config/consts";
import { Checkbox } from "components/Checkbox";
import { sendForm } from "utils/sendForm";
import { validate } from "pages/Pillbox/Create/validate";
import { connect } from "react-redux";
import { savePillbox } from "actions/pillbox";
import { history } from "routes/history";

@connect((state) => ({
    myPillboxList: state.pillbox.myPillboxList,
}))
@form({
    fields: pillboxFields,
    validate,
})
@hasHistoryState(LK_MENU_ELEMENTS.MEDICINES_PAGE.path)
class PillboxCreate extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { location, changeInitialValues } = this.props;
        const { profile } = location.state;

        if (!isEmpty(profile)) {
            changeInitialValues({
                id: profile.id,
                name: profile.name,
                birthday: dayjs(profile.birthday),
                sex: profile.sex,
                pregnancy: profile.pregnancy,
                lactation: profile.lactation,
                owner: profile.owner,
                policy: profile.policy,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.values.sex === "MALE" &&
            this.props.values.sex === "FEMALE"
        ) {
            const { setFormValues } = this.props;
            setFormValues({
                pregnancy: false,
                lactation: false,
            });
        }
    }

    onSave = () => {
        const { dispatch } = this.props;
        sendForm(this.props, pillboxFields).then((result) => {
            dispatch(savePillbox(result, () => history.goBack()));
        });
    };

    render() {
        const { values, location } = this.props;
        const { profile } = location.state;
        const { byDefault } = profile;
        return (
            <FlatPopup
                title={values.id ? "Редактировать профиль" : "Новый профиль"}
            >
                <Row>
                    <Column fixed={550} paddings={0}>
                        <Row>
                            <FormikFormField
                                name={"name"}
                                component={(props) => (
                                    <InlineFormField
                                        {...props}
                                        label={"Название профиля таблетницы:"}
                                        placeholder={"Введите название профиля"}
                                        required
                                        disabled={byDefault}
                                    />
                                )}
                            />
                        </Row>
                        <Row>
                            <FormikFormField
                                name={"owner"}
                                component={(props) => (
                                    <InlineFormField
                                        {...props}
                                        label={"Владелец полиса:"}
                                        placeholder={"Введите владельца"}
                                    />
                                )}
                            />
                        </Row>
                        <Row>
                            <FormikFormField
                                name={"policy"}
                                component={(props) => (
                                    <InlineFormField
                                        {...props}
                                        label={
                                            <>
                                                <Desktop>
                                                    Серия и номер полиса ОМС
                                                    подопечного:
                                                </Desktop>
                                                <Tablet>
                                                    Сер. и № полиса ОМС
                                                    подопеч.:
                                                </Tablet>
                                            </>
                                        }
                                        placeholder={
                                            "Введите серию и номер ОМС"
                                        }
                                    />
                                )}
                            />
                        </Row>
                        <Row>
                            <FormikFormField
                                name={"sex"}
                                component={(props) => (
                                    <InlineFormFieldSelect
                                        {...props}
                                        label={"Пол:"}
                                        placeholder={"Выберите пол"}
                                        options={SEX_LIST}
                                        required
                                        disabled={byDefault}
                                    />
                                )}
                            />
                        </Row>
                        <Row>
                            <FormikFormField
                                name={"birthday"}
                                component={(props) => (
                                    <InlineFormFieldDate
                                        {...props}
                                        label={"Дата рождения:"}
                                        required
                                        disabled={byDefault}
                                    />
                                )}
                            />
                        </Row>
                        {values.sex === "FEMALE" && (
                            <>
                                <Row>
                                    <FormikFormField
                                        name={"lactation"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Кормление грудью"}
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={"pregnancy"}
                                        component={(props) => (
                                            <Checkbox
                                                {...props}
                                                label={"Беременность"}
                                            />
                                        )}
                                    />
                                </Row>
                            </>
                        )}
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <Button label={"Сохранить"} onClick={this.onSave} />
                    </Column>
                </Row>
            </FlatPopup>
        );
    }
}

export default PillboxCreate;
