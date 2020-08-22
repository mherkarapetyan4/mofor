import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import { hidePopup } from "actions/popup";
import { connect } from "react-redux";
import styled from "styled-components";

@connect(null, { hidePopup })
class VaccinationDelete extends PureComponent {
    render() {
        const { id, onDelete, hidePopup } = this.props;

        return (
            <Wrapper>
                <ActionsWrapper>
                    <Button
                        label={"Да"}
                        onClick={() => {
                            onDelete(id);
                            hidePopup();
                        }}
                    />
                    <Button label={"Отмена"} onClick={() => hidePopup()} />
                </ActionsWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 0 16px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 16px;

        :last-child {
            margin-right: 0;
        }
    }
`;

VaccinationDelete.propTypes = {
    id: PropTypes.string,
    onDelete: PropTypes.func,
    hidePopup: PropTypes.func,
};

export default VaccinationDelete;
