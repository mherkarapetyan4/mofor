import React, { PureComponent } from "react";
import { Checkbox } from "components/Checkbox";
import ResearchUploadFile from "pages/Researches/Components/ResearchUploadFile";
import WidgetBlock from "components/WidgetBlock";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import Row from "containers/Row";
import Column from "containers/Column";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import PropTypes from "prop-types";
import { form } from "wrappers/Formik";
import { surveyFields } from "pages/Researches/meta";
import { FormikFormField } from "wrappers/Formik/FormField";
import { connect } from "react-redux";
import dayjs from "dayjs";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { pillboxPaths } from "config/paths";
import AutoComplete from "components/AutoComplete";
import FormField from "components/FormField";
import InlineFormField from "components/InlineFormField";

@connect((state) => ({
    researchesTypes: state.directory.researchesTypes,
}))
@form({
    fields: surveyFields,
})
class EditResearch extends PureComponent {
    static propTypes = {
        research: PropTypes.object.isRequired,
        researchesTypes: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
    };

    state = {
        files: [],
    };

    componentDidUpdate(prevProps) {
        const { research, changeInitialValues } = this.props;

        if (isEmpty(prevProps.research) && !isEmpty(research)) {
            let initial = {};
            Object.keys(surveyFields).map((key) => {
                let val = get(research, key);
                if (key === "executionDate" || key === "uploadDate") {
                    val = dayjs(val);
                }
                if (key === "kindId") {
                    val = research.kind.id;
                }
                initial = { ...initial, [key]: val };
            });
            this.setState({ files: research.files }, () => {
                changeInitialValues(initial);
            });
        }
    }

    initialDisease = (item) => {
        const { setFormValues } = this.props;
        const data = {
            diseaseName: item.name,
            diseaseDisplayName: item.displayName,
            diseaseUniqueId: item.uniqueId,
            diseaseType: item.type,
            diseaseCode: item.code,
        };
        setFormValues(data);
    };
    onRemoveFile = (id) => {
        this.setState((state) => ({
            files: state.files.filter((e) => e.id !== id),
        }));
    };
    onClearCallback = () => {
        const { setFormValues } = this.props;
        const data = {
            diseaseName: "",
            diseaseDisplayName: "",
            diseaseUniqueId: "",
            diseaseType: "",
            diseaseCode: "",
        };
        setFormValues(data);
    };
    render() {
        const { research, researchesTypes, values } = this.props;

        const surveyTitleEditable = get(
            research,
            "kind.surveyTitleEditable",
            true,
        );
        const surveyKindEditable = get(
            research,
            "kind.surveyKindEditable",
            true,
        );

        let selectedKind = researchesTypes.find(
            (e) => e.value === values.kindId,
        );
        if (!selectedKind) {
            selectedKind = research?.kind;
        }

        return (
            <WidgetBlock title={"Информация по исследованию"}>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"title"}
                            component={(props) => (
                                <FormField
                                    required
                                    {...props}
                                    onChange={(e) =>
                                        props.onChange(e.target.value)
                                    }
                                    label={"Название медицинского мероприятия:"}
                                    disabled={!surveyTitleEditable}
                                    type={"textarea"}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"kindId"}
                            component={(props) => (
                                <InlineFormFieldSelect
                                    required
                                    {...props}
                                    label={"Тип документа:"}
                                    options={researchesTypes}
                                    disabled={!surveyKindEditable}
                                    defaultValue={
                                        !surveyKindEditable
                                            ? research?.kind?.title || ""
                                            : ""
                                    }
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"executionDate"}
                            component={(props) => (
                                <InlineFormFieldDate
                                    required
                                    {...props}
                                    label={"Дата проведения:"}
                                    placeholder={"Выберите дату"}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <Row>
                    <AutoComplete
                        label={"Диагноз:"}
                        path={pillboxPaths.GET_DISEASE_LIST}
                        serverValue={"query"}
                        queryParams={{
                            pageSize: 10,
                            barcode: false,
                        }}
                        elementLabel="displayName"
                        elementValue="displayName"
                        placeholder={"Введите диагноз"}
                        onSelect={(item) => {
                            this.initialDisease(item);
                        }}
                        preserveValueAfterSelect={true}
                        onClearCallback={this.onClearCallback}
                        showClearButton={true}
                        initialValue={values.diseaseDisplayName}
                    />
                </Row>
                {selectedKind && selectedKind.vaccineNameVisible && (
                    <Row>
                        <FormikFormField
                            name={"vaccineName"}
                            component={(props) => (
                                <InlineFormField
                                    {...props}
                                    label={"Название вакцины"}
                                    disabled={!selectedKind.vaccineNameEditable}
                                />
                            )}
                        />
                    </Row>
                )}
                <Row>
                    <Column paddings={0}>
                        <Column paddings={0}>
                            <FormikFormField
                                name={"availableToDoctor"}
                                component={(props) => (
                                    <Checkbox
                                        {...props}
                                        label={"Доступно врачу"}
                                    />
                                )}
                            />
                        </Column>
                    </Column>
                </Row>
                <Row>
                    <Column paddings={0}>
                        <FormikFormField
                            name={"comment"}
                            component={(props) => (
                                <InlineFormFieldTextarea
                                    {...props}
                                    label={"Комментарий"}
                                    placeholder={"Введите комментарий"}
                                    type={"textarea"}
                                />
                            )}
                        />
                    </Column>
                </Row>
                <ResearchUploadFile
                    files={this.state.files}
                    {...this.props}
                    onRemoveFile={this.onRemoveFile}
                />
            </WidgetBlock>
        );
    }
}

export default EditResearch;
