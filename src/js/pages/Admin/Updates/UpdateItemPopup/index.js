import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import { hidePopup } from "actions/popup";
import { connect } from "react-redux";
import styled from "styled-components";

@connect(null, { hidePopup })
class UpdateItemPopup extends PureComponent {
    render() {
        const { params, onClick, hidePopup } = this.props;

        return (
            <Wrapper>
                <ActionsWrapper>
                    <Button
                        label={"Да"}
                        onClick={() => {
                            onClick(params);
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

UpdateItemPopup.propTypes = {
    onClick: PropTypes.func,
    hidePopup: PropTypes.func,
    params: PropTypes.object,
};

export default UpdateItemPopup;
