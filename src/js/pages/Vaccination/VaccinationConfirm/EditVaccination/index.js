import React, { PureComponent } from "react";
import Row from "containers/Row";
import Column from "containers/Column";
import { FormikFormField } from "wrappers/Formik/FormField";
import InlineFormField from "components/InlineFormField";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import { Checkbox } from "components/Checkbox";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import VaccinationUploadFile from "./VaccinationUploadFile";
import WidgetBlock from "components/WidgetBlock";
import { form } from "wrappers/Formik";
import { vaccinationFields } from "pages/Vaccination/meta";
import { getVaccinationEpidemicList } from "actions/vaccinations";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import dayjs from "dayjs";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { LK_MENU_ELEMENTS } from "config/menu";
import { hasHistoryState } from "modules/hasHistoryState";
import { Desktop, Tablet } from "wrappers/responsive";

@withRouter
@form({
    fields: vaccinationFields,
})
@connect(
    (state) => ({
        vaccinationEpidemicList: state.vaccinations.vaccinationEpidemicList,
    }),
    { getVaccinationEpidemicList },
)
@hasHistoryState(LK_MENU_ELEMENTS.VACCINATION_PAGE.path)
class EditVaccination extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        vaccinationEpidemicList: PropTypes.object.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        getVaccinationEpidemicList: PropTypes.func.isRequired,
    };

    state = {
        files: [],
    };

    componentDidMount() {
        if (
            this.props.location &&
            this.props.location.state &&
            !isEmpty(this.props.location.state.params)
        ) {
            const initial = {
                eventId: this.props.location.state.params.event
                    ? this.props.location.state.params.event.id
                    : "",
                title: this.props.location.state.params.event
                    ? this.props.location.state.params.event.title
                    : "",
                vaccineName: this.props.location.state.params.confirmation
                    ? this.props.location.state.params.confirmation.vaccineName
                    : "",
                moName: this.props.location.state.params.confirmation
                    ? this.props.location.state.params.confirmation.moName
                    : "",
                comment: this.props.location.state.params.survey
                    ? this.props.location.state.params.survey.comment
                    : "",
                availableToDoctor: this.props.location.state.params.survey
                    ? this.props.location.state.params.survey.availableToDoctor
                    : "",
                date: this.props.location.state.params.confirmation
                    ? dayjs(this.props.location.state.params.confirmation.date)
                    : "",
            };
            this.props.changeInitialValues(initial);
        } else {
            this.props.getVaccinationEpidemicList();
        }
    }

    render() {
        const { vaccinationEpidemicList } = this.props;
        const { state } = this.props.location;

        let vaccinationOptions = [];
        if (
            vaccinationEpidemicList &&
            !isEmpty(vaccinationEpidemicList.content)
        ) {
            vaccinationOptions = vaccinationEpidemicList.content.map(
                (item) => ({ value: item.id, label: item.title }),
            );
        }

        return (
            <WidgetBlock title={"Информация по прививке"}>
                <Row>
                    <Column paddings={0}>
                        {this.props.location &&
                        this.props.location.state &&
                        this.props.location.state.params.event ? (
                            <FormikFormField
                                name={"title"}
                                component={(props) => (
                                    <InlineFormField
                                        required
                                        {...props}
                                        label={
                                            <>
                                                <Desktop>
                                                    Название прививки:
                                                </Desktop>
                                                <Tablet>Назв. прививки:</Tablet>
                                            </>
                                        }
                                        placeholder={""}
                                        disabled
                                    />
                                )}
                            />
                        ) : (
                            <FormikFormField
                                name={"eventId"}
                                component={(props) => (
                                    <InlineFormFieldSelect
                                        required
                                        {...props}
                                        options={vaccinationOptions}
                                        label={
                                            <>
                                                <Desktop>
                                                    Название прививки:
                                                </Desktop>
                                                <Tablet>Назв. прививки:</Tablet>
                                            </>
                                        }
                                        placeholder={""}
                                    />
                                )}
                            />
                        )}
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"vaccineName"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Название вакцины:"}
                                    placeholder={""}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0} fraction={6}>
                        <FormikFormField
                            name={"date"}
                            component={(props) => (
                                <InlineFormFieldDate
                                    required
                                    {...props}
                                    label={"Дата прививки:"}
                                    placeholder={"Выберите дату"}
                                    maxDate={dayjs()}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"moName"}
                            component={(props) => (
                                <InlineFormField
                                    required
                                    {...props}
                                    label={"Название МО:"}
                                    placeholder={""}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <Column paddings={0}>
                            <FormikFormField
                                name={"availableToDoctor"}
                                component={(props) => {
                                    return (
                                        <Checkbox
                                            {...props}
                                            label={"Доступно врачу"}
                                            placeholder={""}
                                        />
                                    );
                                }}
                            />
                        </Column>
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"comment"}
                            component={(props) => {
                                return (
                                    <InlineFormFieldTextarea
                                        {...props}
                                        label={"Комментарий:"}
                                        placeholder={"Введите комментарий"}
                                        type={"textarea"}
                                    />
                                );
                            }}
                        />
                    </Column>
                </Row>
                <VaccinationUploadFile
                    files={
                        state && state.params.survey
                            ? state.params.survey.files
                            : []
                    }
                    {...this.props}
                    formFields={vaccinationFields}
                />
            </WidgetBlock>
        );
    }
}

export default EditVaccination;
