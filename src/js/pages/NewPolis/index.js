import React, { PureComponent } from "react";
import Row from "containers/Row";
import Column from "containers/Column";
import ScrollBar from "components/ScrollBar";
import FlatPopup from "components/FlatPopup";
import WidgetBlock from "components/WidgetBlock";
import ProgressBar from "components/ProgressBar";
import { List } from "components/List";
import styled, { withTheme } from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import CheckIcon from "icons/CheckIcon";
import PropTypes from "prop-types";
import Accordeon from "components/Accordeon";
import PolisAccordeonHeader from "components/PolisAccordeonHeader";
import forms from "pages/NewPolis/Forms";
import { Desktop, Tablet } from "wrappers/responsive";
import { policyStorageKey, RESPONSIVE } from "config/consts";
import { connect } from "react-redux";
import {
    getClaimDictionary,
    resetAccordions,
    sendPolicy,
    setAccordions,
} from "actions/policy";
import { policyPaths } from "config/paths";
import { form } from "wrappers/Formik";
import meta from "pages/NewPolis/Forms/meta";
import { Button } from "components/Button";
import { sendForm } from "utils/sendForm";
import { validate } from "pages/NewPolis/Forms/validate";
import { getAreasList } from "actions/polis";
import isEmpty from "lodash/isEmpty";
import some from "lodash/some";
import intersection from "lodash/intersection";
import keys from "lodash/keys";
import { resetStepStatuses } from "pages/NewPolis/Forms/helper";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Link } from "react-router-dom";
import { initial } from "reducers/policy";
import { showSuccessMessage, showSystemMessage } from "actions/app";
import { history } from "routes/history";

@withTheme
@connect((state) => ({
    data: state.policy.accordions,
}))
@form({
    fields: meta,
    validate: validate,
})
@hasHistoryState(LK_MENU_ELEMENTS.POLIS_PAGE.path)
class NewPolis extends PureComponent {
    state = {
        progress: 0,
        isOpenKey: false,
        data: [],
        form: {},
        fieldsValid: false,
    };

    static propTypes = {
        theme: PropTypes.object,
        data: PropTypes.array,
        dispatch: PropTypes.func.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
    };
    action = (componentName) => {
        const { dispatch } = this.props;
        const urls = {
            OmsExistence: policyPaths.GET_CLAIM_DICTIONARY_EXISTENCE_LIST,
            OMSPolisExistenceType:
                policyPaths.GET_CLAIM_DICTIONARY_EXISTENCE_KIND_LIST,
            AppealReason: policyPaths.GET_CLAIM_DICTIONARY_REASON_LIST,
        };
        if (!urls[componentName]) {
            return false;
        }
        dispatch(
            getClaimDictionary(
                policyPaths.GET_CLAIM_DICTIONARY_EXISTENCE_LIST,
                componentName,
            ),
        );
    };

    getFormData() {
        const { data } = this.state;
        const {
            changeInitialValues,
            values,
            errors,
            setFormValues,
        } = this.props;
        return data.map(({ title, checked, component, isShow, fields }) => {
            const Component = forms[component];
            return {
                title,
                checked,
                value: (
                    <Component
                        changeInitialValues={changeInitialValues}
                        setFormValues={setFormValues}
                        fields={fields}
                        isShow={isShow}
                        values={{ ...values }}
                        errors={errors}
                    />
                ),
            };
        });
    }

    progressBar() {
        const { data } = this.props;
        const count = data.length;
        if (!count) {
            return this.setState({
                progress: 0,
            });
        }
        const percent = parseInt(100 / data.length);
        const checkedData = data.filter(({ checked }) => checked);
        if (
            count === checkedData.length ||
            (count - 2 === checkedData.length &&
                !data[1].isShow &&
                !data[2].isShow) ||
            (count - 1 === checkedData.length &&
                data[1].isShow &&
                !data[2].isShow)
        ) {
            return this.setState({
                progress: 100,
            });
        }
        this.setState({
            progress: percent * checkedData.length,
        });
    }

    filterData() {
        const buffData = [...this.props.data].filter(({ isShow }) => isShow);
        this.setState({
            data: buffData,
        });
    }

    emptyFieldsHandler = () => {
        const { data, changeInitialValues, values } = this.props;
        let emptyFields = {};
        [...data].map(({ isShow, fields }) => {
            if (!isShow && fields) {
                fields.map((key) => {
                    if (
                        key === "snils" ||
                        key === "personalDataConfirmation" ||
                        key === "personalData.snils" ||
                        key === "personalData.phone" ||
                        key === "personalData.email"
                    ) {
                        return false;
                    }
                    const current = meta[key];
                    if (current) {
                        emptyFields = {
                            ...emptyFields,
                            [key]: current.default,
                        };
                    }
                });
            }
        });
        changeInitialValues({ ...values, ...emptyFields });
    };

    static defaultProps = {
        data: [],
    };

    componentDidMount() {
        this.filterData();
        this.progressBar();
        this.props.dispatch(getAreasList());

        this.setFromLocalStorage();
    }

    setFromLocalStorage = () => {
        const { changeInitialValues, dispatch } = this.props;
        if (!localStorage.getItem(policyStorageKey)) {
            changeInitialValues({});
            dispatch(setAccordions(initial.accordions));
            return false;
        }
        const policy = JSON.parse(localStorage.getItem(policyStorageKey));
        const emptyImages = {
            personalDataConfirmation: "",
            snils: "",
            passportPhotoPage: "",
            passportRegistrationPage: "",
            photo: "",
            sign: "",
            tempRegistration: "",
        };
        changeInitialValues({ ...policy.values, ...emptyImages });
        const buffAccordions = policy.data.map((item) => {
            if (some(intersection(item.fields, keys(emptyImages)))) {
                return {
                    ...item,
                    checked: resetStepStatuses(item, policy.values),
                    // checked: item.component === "AppealReason" && policy.values.policyClaimReasonCode !== "ATTRIBUTES_CHANGED" ? true : false,
                };
            } else {
                return item;
            }
            // return item;
        });
        dispatch(setAccordions(buffAccordions));
    };

    componentDidUpdate(prevProps) {
        const { data, errors, values, setFormValues } = this.props;
        if (
            prevProps.values.policyExistenceCode === "" &&
            values.policyExistenceCode !== ""
        ) {
            const emptyImages = {
                personalDataConfirmation: "",
                snils: "",
                passportPhotoPage: "",
                passportRegistrationPage: "",
                photo: "",
                sign: "",
            };
            setFormValues(emptyImages);
        }

        if (
            JSON.stringify(data) !== JSON.stringify(prevProps.data) ||
            JSON.stringify(values) !== JSON.stringify(prevProps.values)
        ) {
            localStorage.setItem(
                policyStorageKey,
                JSON.stringify({ values, data }),
            );
        }
        if (JSON.stringify(data) !== JSON.stringify(prevProps.data)) {
            this.filterData();
            this.progressBar();
            this.emptyFieldsHandler();
        }

        if (
            JSON.stringify(prevProps.errors) !== JSON.stringify(errors) &&
            isEmpty(errors)
        ) {
            this.setState({ fieldsValid: true });
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetAccordions());
    }

    showPopupAndRedirect = () => {
        const { changeInitialValues, dispatch } = this.props;
        dispatch(showSuccessMessage("Заявление на полис оправлено!"));
        setTimeout(async () => {
            history.push(LK_MENU_ELEMENTS.POLIS_PAGE.path);
            await dispatch(setAccordions(initial.accordions));
            await changeInitialValues({});
            localStorage.setItem(policyStorageKey, "");
        }, 3000);
    };

    showError = () => {
        const { dispatch } = this.props;
        dispatch(showSystemMessage("При отправке заявления произошла ошибка!"));
    };

    render() {
        const { data } = this.state;
        const { theme, dispatch, changeInitialValues, errors } = this.props;

        return (
            <FlatPopup title={"Новое заявление"}>
                <Column paddings={0}>
                    <Row>
                        <Column fraction={12}>
                            <ProgressBar progress={this.state.progress} />
                        </Column>
                    </Row>
                    <Row height={"100%"}>
                        <Column fixed={400} paddings={0}>
                            <Desktop>
                                <ScrollBar>
                                    <WidgetBlock title={"Список вопросов"}>
                                        <List
                                            renderItem={(item, i) => (
                                                <Question
                                                    key={i}
                                                    onClick={() => {
                                                        this.setState({
                                                            isOpenKey: i,
                                                        });
                                                    }}
                                                >
                                                    <Text>{item.title}</Text>
                                                    <Icon>
                                                        {item.checked && (
                                                            <CheckIcon
                                                                color={
                                                                    theme
                                                                        .userTheme
                                                                        .color
                                                                }
                                                            />
                                                        )}
                                                    </Icon>
                                                </Question>
                                            )}
                                            data={data}
                                        />

                                        <ButtonWrapper>
                                            <Link
                                                to={
                                                    LK_MENU_ELEMENTS.POLIS_PAGE
                                                        .path
                                                }
                                            >
                                                <Button
                                                    label={"Вернуться назад"}
                                                    onClick={() => {}}
                                                />
                                            </Link>

                                            <Button
                                                label={"Очистить форму"}
                                                onClick={async () => {
                                                    await dispatch(
                                                        setAccordions(
                                                            initial.accordions,
                                                        ),
                                                    );
                                                    await changeInitialValues(
                                                        {},
                                                    );
                                                    localStorage.setItem(
                                                        policyStorageKey,
                                                        "",
                                                    );
                                                }}
                                            />
                                        </ButtonWrapper>
                                    </WidgetBlock>
                                </ScrollBar>
                            </Desktop>
                        </Column>
                        <Column auto paddings={0}>
                            <Desktop>
                                <ScrollBar>{this.renderForm()}</ScrollBar>
                            </Desktop>
                            <Tablet>{this.renderForm()}</Tablet>

                            <ActionWrapper>
                                <Button
                                    label={"Сохранить и отправить в МГФОМС"}
                                    onClick={() => {
                                        sendForm(this.props, meta).then(
                                            (res) => {
                                                dispatch(
                                                    sendPolicy(
                                                        res,
                                                        this
                                                            .showPopupAndRedirect,
                                                        this.showError,
                                                    ),
                                                );
                                            },
                                        );
                                    }}
                                    disabled={!isEmpty(errors)}
                                />
                            </ActionWrapper>
                        </Column>
                    </Row>
                </Column>
            </FlatPopup>
        );
    }

    renderForm = () => {
        const { isOpenKey } = this.state;
        return (
            <WidgetWrapper>
                <WidgetBlock title={"Форма для заполнения"}>
                    <Accordeon
                        elements={this.getFormData()}
                        multiple={false}
                        isOpenKey={isOpenKey}
                        renderHeader={(
                            item,
                            { openElements, itemClicked, key },
                        ) => (
                            <PolisAccordeonHeader
                                data={item}
                                itemKey={key}
                                itemClicked={itemClicked}
                                openElements={openElements}
                            />
                        )}
                    />
                </WidgetBlock>
            </WidgetWrapper>
        );
    };
}

const ActionWrapper = styled.div`
    margin: 15px auto;
`;

const WidgetWrapper = styled.div`
    margin-left: 16px;
    width: 97%;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-left: 0;
    }
`;

const Question = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    padding: 0 10px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;
const ButtonWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`;

const Icon = styled.div`
    line-height: 0;
`;

export default NewPolis;
