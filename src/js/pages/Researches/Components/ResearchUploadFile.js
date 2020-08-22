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
import { editMyResearch, addMyResearch } from "actions/myResearches";
import { surveyFields } from "pages/Researches/meta";
import { myResearchedPaths } from "config/paths";
import { BASE_URL } from "config/consts";

@connect((state) => ({
    isFetching: state.app.isFetching,
    research: state.researches.research,
}))
class ResearchUploadFile extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        files: PropTypes.array.isRequired,
        isValid: PropTypes.bool.isRequired,
        onRemoveFile: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        location: PropTypes.object,
        research: PropTypes.object,
    };

    state = {
        localFiles: [],
    };

    onClick = () => {
        const { dispatch, data } = this.props;
        sendForm(this.props, surveyFields).then((response) => {
            if (data.id) {
                dispatch(
                    editMyResearch({
                        ...response,
                        files: this.state.localFiles,
                        id: data.id,
                    }),
                );
            } else {
                dispatch(
                    addMyResearch({
                        ...response,
                        files: this.state.localFiles,
                    }),
                );
            }
        });
    };

    onDeleteFile = (i, onClearPreview) => {
        const { localFiles } = this.state;
        let newLocalFiles = [...localFiles];
        newLocalFiles.splice(i, 1);
        this.setState({ localFiles: [...newLocalFiles] }, onClearPreview);
    };

    onDownloadAllFiles = () => {
        const { id } = this.props.research;

        window.open(
            `${BASE_URL}${myResearchedPaths.GET_ZIP}${id}.zip`,
            "_blank",
        );
    };

    render() {
        const { localFiles } = this.state;
        const { files, isValid, onRemoveFile, isFetching } = this.props;

        return (
            <WidgetBlock
                title={`Список файлов (${files.length +
                    localFiles.length} из 10)`}
                additional={
                    <Buttons>
                        <FileButton
                            label={"Загрузить файл"}
                            onChange={
                                files.length + localFiles.length < 10
                                    ? this.fileUpload
                                    : () => {}
                            }
                            accept={"image/jpeg,image/jpg,application/pdf"}
                            disabled={files.length + localFiles.length > 10}
                        />
                        <Button
                            label={"Скачать всё"}
                            onClick={this.onDownloadAllFiles}
                            disabled={files.length === 0}
                        />
                    </Buttons>
                }
            >
                <FilesWrapper>
                    <TextBlock font={{ family: "bold" }}>
                        Список загруженных ранее файлов:
                    </TextBlock>
                    {files.length ? (
                        files.map((item, i) => {
                            return (
                                <File
                                    key={i}
                                    index={i}
                                    data={{ ...item, valid: true }}
                                    onDelete={onRemoveFile}
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
                </ButtonWrapper>
            </WidgetBlock>
        );
    }

    fileUpload = (e) => {
        const promises = [];
        const files = e.target.files;
        for (let itemNum in files) {
            let f = files[itemNum];
            if (!f.type) continue;
            const isExists = this.state.localFiles.some(
                (localFile) =>
                    localFile.originalFile.name === f.name &&
                    localFile.originalFile.type === f.type,
            );
            const filesQty =
                Number(this.state.localFiles.length) + Number(itemNum) + 1;

            if (isExists || filesQty > 10) continue;
            if (f.type === "application/pdf") {
                promises.push(
                    new Promise((resolve) => {
                        resolve({
                            file: URL.createObjectURL(f),
                            name: f.name,
                            originalFile: f,
                        });
                    }),
                );
            } else {
                promises.push(
                    new Promise((resolve) => {
                        let img = new Image();
                        img.src = URL.createObjectURL(f);
                        img.onload = function() {
                            resolve({
                                file: URL.createObjectURL(f),
                                name: f.name,
                                originalFile: f,
                                width: this.width,
                                height: this.height,
                            });
                        };
                    }),
                );
            }
        }
        Promise.all(promises).then((localFiles) => {
            this.setState({
                localFiles: [...this.state.localFiles, ...localFiles],
            });
        });
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
export default ResearchUploadFile;
