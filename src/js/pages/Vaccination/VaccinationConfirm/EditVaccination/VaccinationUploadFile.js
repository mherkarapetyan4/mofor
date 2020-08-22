import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import File from "pages/Researches/Components/File";
import WidgetBlock from "components/WidgetBlock";
import TextBlock from "components/TextBlock";
import FileButton from "components/FileButton";
import { sendForm } from "utils/sendForm";
import styled from "styled-components";
import { checkInvalidResearchFiles, checkResearchFile } from "utils/checkFiles";
import { connect } from "react-redux";
import {
    saveConfirmationWithSurvey,
    deleteConfirmation,
} from "actions/vaccinations";
// import { getZip } from "actions/myResearches";
import { vaccinationFields } from "pages/Vaccination/meta";
import { LK_MENU_ELEMENTS } from "config/menu";
import { BASE_URL } from "config/consts";
import { myResearchedPaths } from "config/paths";

@connect((state) => ({
    isFetching: state.app.isFetching,
}))
class VaccinationUploadFile extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        files: PropTypes.array.isRequired,
        isValid: PropTypes.bool.isRequired,
        onRemoveFile: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        location: PropTypes.object,
        history: PropTypes.object,
    };

    state = {
        uploadedBeforeFiles: [],
        localFiles: [],
        fileIdsToBeKept: [],
    };

    componentDidMount() {
        const { files } = this.props;

        if (files) {
            const copyUploadedBeforeFiles = [...files];
            const newfileIdsToBeKept = copyUploadedBeforeFiles.map(
                (item) => item.id,
            );

            this.setState({
                uploadedBeforeFiles: copyUploadedBeforeFiles,
                fileIdsToBeKept: newfileIdsToBeKept,
            });
        }
    }

    onClick = () => {
        const { dispatch, history } = this.props;
        const { type, params, viewIsTable } = this.props.location.state;

        sendForm(this.props, vaccinationFields).then((response) => {
            dispatch(
                saveConfirmationWithSurvey(
                    {
                        ...response,
                        files: this.state.localFiles,
                        id:
                            params &&
                            params.confirmation &&
                            params.confirmation.id
                                ? params.confirmation.id
                                : null,
                        fileIdsToBeKept: this.state.fileIdsToBeKept,
                        type: type,
                    },
                    () =>
                        history.push({
                            pathname: `${LK_MENU_ELEMENTS.VACCINATION_PAGE.path}`,
                            state: {
                                viewIsTable,
                            },
                        }),
                ),
            );
        });
    };

    onDelete = (id) => {
        const { dispatch, history } = this.props;

        dispatch(
            deleteConfirmation(id, () =>
                history.push({
                    pathname: `${LK_MENU_ELEMENTS.VACCINATION_PAGE.path}`,
                    state: {
                        viewIsTable: this.props.location?.state?.viewIsTable,
                    },
                }),
            ),
        );
    };

    onDeleteFile = (i, onClearPreview) => {
        const { localFiles } = this.state;
        let newLocalFiles = [...localFiles];
        newLocalFiles.splice(i, 1);
        this.setState({ localFiles: [...newLocalFiles] }, onClearPreview);
    };

    onRemoveFile = (id) => {
        const { uploadedBeforeFiles, fileIdsToBeKept } = this.state;

        const newUploadedBeforeFiles = uploadedBeforeFiles.filter(
            (e) => e.id !== id,
        );
        const newFileIdsToBeKept = fileIdsToBeKept.filter((e) => e !== id);

        this.setState({
            uploadedBeforeFiles: newUploadedBeforeFiles,
            fileIdsToBeKept: newFileIdsToBeKept,
        });
    };

    onDownloadAllFiles = () => {
        const { id } = this.props.location.state.params.survey;
        window.open(`${BASE_URL}${myResearchedPaths.GET_ZIP}${id}.zip`);
        // getZip(id);
    };

    render() {
        const { uploadedBeforeFiles, localFiles } = this.state;
        const { isValid, isFetching } = this.props;
        const { type, params } = this.props.location.state;

        return (
            <WidgetBlock
                title={`Список файлов (${uploadedBeforeFiles.length +
                    localFiles.length} из 10)`}
                additional={
                    <Buttons>
                        <FileButton
                            label={"Загрузить файл"}
                            onChange={
                                uploadedBeforeFiles.length + localFiles.length <
                                10
                                    ? this.fileUpload
                                    : () => {}
                            }
                            accept={"image/jpeg,image/jpg,application/pdf"}
                            disabled={
                                uploadedBeforeFiles.length + localFiles.length >
                                10
                            }
                        />
                        <Button
                            label={"Скачать всё"}
                            onClick={this.onDownloadAllFiles}
                            disabled={uploadedBeforeFiles.length === 0}
                        />
                    </Buttons>
                }
            >
                <FilesWrapper>
                    <TextBlock font={{ family: "bold" }}>
                        Список загруженных ранее файлов:
                    </TextBlock>
                    {uploadedBeforeFiles.length ? (
                        uploadedBeforeFiles.map((item, i) => {
                            return (
                                <File
                                    key={i}
                                    index={i}
                                    data={{ ...item, valid: true }}
                                    onDelete={this.onRemoveFile}
                                />
                            );
                        })
                    ) : (
                        <TextBlock>Нет загруженных ранее файлов</TextBlock>
                    )}

                    <TextBlock font={{ family: "bold" }}>
                        Список загруженных новых файлов:
                    </TextBlock>
                    {localFiles.length ? (
                        localFiles.map((item, i) => {
                            return (
                                <File
                                    key={i}
                                    index={i}
                                    data={{
                                        ...item,
                                        valid: !checkResearchFile(
                                            item.originalFile,
                                        ),
                                    }}
                                    onDelete={this.onDeleteFile}
                                />
                            );
                        })
                    ) : (
                        <TextBlock>Нет загруженных новых файлов</TextBlock>
                    )}
                </FilesWrapper>
                <ButtonWrapper>
                    <Button
                        label={"Сохранить"}
                        onClick={this.onClick}
                        disabled={
                            !isValid ||
                            checkInvalidResearchFiles(this.state.localFiles) ||
                            isFetching
                        }
                    />
                    {type === "regular" && params?.confirmation && (
                        <Button
                            label={"Удалить"}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.onDelete(params.confirmation.eventId);
                            }}
                        />
                    )}
                </ButtonWrapper>
            </WidgetBlock>
        );
    }

    fileUpload = (e) => {
        const that = this;
        let file, img;
        if ((file = e.target.files[0])) {
            if (file.type === "application/pdf") {
                this.setState({
                    localFiles: [
                        ...this.state.localFiles,
                        {
                            file: URL.createObjectURL(e.target.files[0]),
                            name: e.target.files[0].name,
                            originalFile: e.target.files[0],
                        },
                    ],
                });
            } else {
                img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = function() {
                    that.setState({
                        localFiles: [
                            ...that.state.localFiles,
                            {
                                file: URL.createObjectURL(file),
                                name: file.name,
                                originalFile: file,
                                width: this.width,
                                height: this.height,
                            },
                        ],
                    });
                };
            }
        }
    };
}

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 16px;
    }

    > div:last-child {
        margin-right: 0;
    }
`;

const FilesWrapper = styled.div`
    margin-bottom: 16px;
`;
export default VaccinationUploadFile;
