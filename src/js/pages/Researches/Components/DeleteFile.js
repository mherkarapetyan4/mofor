import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TextBlock from "components/TextBlock";
import { Button } from "components/Button";
import { clearFile, deleteResearchFile } from "actions/myResearches";
import { hide } from "actions/anchorPopup";
import { connect } from "react-redux";
import styled from "styled-components";

@connect()
class DeleteFile extends PureComponent {
    render() {
        return (
            <Wrapper>
                <TextBlock>
                    Вы уверены что хотите удалить файл {this.props.data.name}?
                </TextBlock>
                <Actions>
                    <Button
                        label={"Да"}
                        onClick={() =>
                            this.props.dispatch(
                                deleteResearchFile(
                                    this.props.data.id,
                                    () => this.props.dispatch(hide()),
                                    () =>
                                        this.props.onDelete(this.props.data.id),
                                    () => this.props.dispatch(clearFile()),
                                ),
                            )
                        }
                    />
                    <Button
                        label={"Отмена"}
                        onClick={() => this.props.dispatch(hide())}
                    />
                </Actions>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

DeleteFile.propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    onDelete: PropTypes.func,
};

export default DeleteFile;
