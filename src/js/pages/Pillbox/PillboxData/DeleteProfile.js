import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import { deleteProfile } from "actions/pillbox";
import { hidePopup } from "actions/popup";
import { connect } from "react-redux";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

@connect()
class DeleteProfile extends PureComponent {
    render() {
        const { dispatch, profile } = this.props;

        return (
            <Wrapper>
                <Text>
                    Вы уверены что хотите удалить профиль &ldquo;{profile.name}
                    &rdquo;?
                </Text>
                <ActionsWrapper>
                    <Button
                        label={"Да"}
                        onClick={() => {
                            dispatch(deleteProfile(profile.id));
                            dispatch(hidePopup());
                        }}
                    />
                    <Button
                        label={"Отмена"}
                        onClick={() => dispatch(hidePopup())}
                    />
                </ActionsWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 0 10px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;
`;

const ActionsWrapper = styled.div`
    display: flex;

    > div {
        margin-right: 16px;
        :last-child {
            margin-right: 0;
        }
    }
`;

DeleteProfile.propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.object,
};

export default DeleteProfile;
