import React, { PureComponent } from "react";
import styled, { withTheme } from "styled-components";
import Required from "components/Required";
import PropTypes from "prop-types";
import FileButton from "components/FileButton";
import { Button } from "components/Button";
import { fontStyles } from "styledMixins/mixins";
import { hasError } from "modules/hasError";
import isEmpty from "lodash/isEmpty";
import Actions from "containers/Header/Actions";
import InfoIcon from "icons/InfoIcon";
import { showPopup } from "actions/popup";
import { connect } from "react-redux";
import DescriptionIcon from "icons/mydata/DescriptionIcon";
import { RESPONSIVE } from "config/consts";

@hasError
@withTheme
@connect()
class FileLoader extends PureComponent {
    state = {
        file: null,
    };

    infoBtn = [
        {
            icon: <InfoIcon opacity={0.5} color={"#000"} />,
            tooltip: this.props.infoPopupTitle,
            action: () => this.showPopupHandler(),
        },
    ];

    componentDidMount() {
        const { value } = this.props;

        if (!isEmpty(value) || value.type) {
            this.setState({
                file: URL.createObjectURL(value),
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props;
        if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
            this.setState({
                file: value ? URL.createObjectURL(value) : null,
            });
        }
    }

    render() {
        const { required, title, value, accept, theme } = this.props;
        const { file } = this.state;
        const filename = value.name || "";
        return (
            <Wrapper>
                <Header>
                    <Title>
                        {required && <Required />}
                        {title}
                    </Title>
                    <ActionsWrapper>
                        <FileButton
                            accept={accept}
                            label={value ? "Выбрать другой" : "Загрузить файл"}
                            onChange={this.fileUpload}
                        />
                        <Button
                            label={"Удалить файл"}
                            onClick={this.removeFile}
                        />
                        {this.props.infoPopupText && (
                            <Actions items={this.infoBtn} />
                        )}
                    </ActionsWrapper>
                </Header>
                <FilePreview>
                    <PreviewImage>
                        {file ? (
                            value.type === "image/jpeg" ||
                            value.type === "image/jpg" ||
                            value.type === "image/png" ? (
                                <img src={file} alt={"uploaded file"} />
                            ) : (
                                <FileWrapper>
                                    <DescriptionIcon
                                        color={theme.userTheme.color}
                                    />
                                </FileWrapper>
                            )
                        ) : (
                            <NoFile>Выберите файл</NoFile>
                        )}
                    </PreviewImage>
                    <FileName>{filename}</FileName>
                </FilePreview>
            </Wrapper>
        );
    }

    showPopupHandler = () => {
        const { dispatch, infoPopupTitle, infoPopupText } = this.props;

        dispatch(
            showPopup(
                infoPopupTitle,
                <InfoPopupContent>{infoPopupText}</InfoPopupContent>,
            ),
        );
    };

    removeFile = () => {
        const { onChange } = this.props;
        this.setState({
            file: null,
        });
        onChange("");
    };

    fileUpload = (e) => {
        const { onChange } = this.props;
        const file = e.target.files[0];
        this.setState({
            file: URL.createObjectURL(file),
        });
        onChange(file);
    };
}

const FileWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    svg {
        width: 50px;
        height: 50px;
    }
`;

const Wrapper = styled.div``;

const Header = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-right: 16px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 10px;
    }

    > div:last-child {
        margin-right: 0;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        padding: 5px 0;
    }
`;

const FilePreview = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const PreviewImage = styled.div`
    width: 130px;
    height: 130px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    display: flex;
    align-items: center;
    img {
        width: 100%;
    }
`;

const InfoPopupContent = styled.div`
    padding: 0 10px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const NoFile = styled.div`
    text-align: center;
    ${(props) => fontStyles(props)};
    width: 100%;
`;

const FileName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-left: 20px;
`;

FileLoader.propTypes = {
    required: PropTypes.bool,
    title: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    accept: PropTypes.string,
    theme: PropTypes.object,
    infoPopupTitle: PropTypes.string,
    infoPopupText: PropTypes.element,
    dispatch: PropTypes.func,
};

FileLoader.deafultProps = {
    required: false,
    value: "",
    accept: "image/jpeg,image/jpg",
};

export default FileLoader;
