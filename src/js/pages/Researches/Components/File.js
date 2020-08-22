import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Actions from "containers/Header/Actions";
import PreviewIcon from "icons/PreviewIcon";
import DownloadIcon from "icons/DownloadIcon";
import { fontStyles } from "styledMixins/mixins";
import CloseIcon from "icons/CloseIcon";
import { connect } from "react-redux";
import {
    // getFile,
    getTempFile,
    showFile,
    showTempFile,
    clearFile,
} from "actions/myResearches";
import { show } from "actions/anchorPopup";
import DeleteFile from "pages/Researches/Components/DeleteFile";
import { BASE_URL } from "config/consts";
import { myResearchedPaths } from "config/paths";

@connect()
class File extends PureComponent {
    fileActions = [
        {
            icon: <PreviewIcon opacity={0.5} />,
            tooltip: "Предпросмотр",
            action: () => {
                this.props.data.file
                    ? this.props.dispatch(
                          showTempFile(
                              this.props.data.originalFile,
                              this.props.data.width,
                              this.props.data.height,
                          ),
                      )
                    : this.props.dispatch(
                          showFile(this.props.data.id, this.props.data.name),
                      );
            },
        },
        {
            icon: <DownloadIcon opacity={0.5} />,
            tooltip: "Скачать",
            action: () => {
                this.props.data.file
                    ? getTempFile(
                          this.props.data.originalFile,
                          this.props.data.name,
                      )
                    : window.open(
                          `${BASE_URL}${myResearchedPaths.GET_FILE}${this.props.data.id}`,
                      );
            },
        },
        {
            icon: <CloseIcon opacity={0.5} />,
            tooltip: "Удалить",
            action: (position) => {
                this.props.data.file
                    ? this.props.onDelete(this.props.index, () =>
                          this.props.dispatch(clearFile()),
                      )
                    : this.props.dispatch(
                          show({
                              position,
                              component: (
                                  <DeleteFile
                                      data={this.props.data}
                                      onDelete={this.props.onDelete}
                                  />
                              ),
                              place: "left",
                              title: "Удаление файла",
                              size: {
                                  w: 240,
                                  h: 150,
                              },
                          }),
                      );
                // :
            },
        },
    ];

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        onDelete: PropTypes.func,
    };

    static defaultProps = {
        onDelete: () => {},
    };

    render() {
        const { name, valid } = this.props.data;

        return (
            <FileWrapper>
                <FileName valid={valid}>{name}</FileName>
                <ActionsWrapper>
                    <Actions items={this.fileActions} />
                </ActionsWrapper>
            </FileWrapper>
        );
    }
}

const FileWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const FileName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.valid
                ? props.theme.colors.notifications.success
                : props.theme.colors.notifications.alert,
        })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const ActionsWrapper = styled.div`
    flex: 0 0 auto;
    margin-left: 20px;
`;

export default File;
