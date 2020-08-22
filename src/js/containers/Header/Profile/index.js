import React, { PureComponent } from "react";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";
import SelectArrowIcon from "icons/SelectArrowIcon";
import ContextList from "components/ContextList";
import { rgba } from "polished";
import { connect } from "react-redux";
import { getUserSubProfiles } from "actions/user";
import { switchProfile } from "actions/user";
import get from "lodash/get";
import { RESPONSIVE } from "config/consts";
import { fontStyles } from "styledMixins/mixins";
import { Desktop, Tablet } from "wrappers/responsive";
import { withRouter } from "react-router-dom";

@withRouter
@withTheme
@connect((state) => ({
    subProfiles: state.user.subProfiles,
    myData: state.myData.myData,
}))
class Profile extends PureComponent {
    state = {
        isOpened: false,
    };

    getUserSubProfiles() {
        const { dispatch } = this.props;
        dispatch(getUserSubProfiles());
    }

    componentDidMount() {
        this.getUserSubProfiles();
    }

    switchProfileHandler = (id) => {
        const { dispatch } = this.props;
        const formData = new FormData();
        formData.append("id", id);
        const result = dispatch(switchProfile(formData));
        result.then(() => {
            this.props.history.push("/");
            window.location.reload();
        });
    };

    render() {
        const { theme, subProfiles, myData } = this.props;
        const { isOpened } = this.state;

        const names = subProfiles.reduce((acc, item) => {
            if (!item.active) acc.push({ value: item.id, label: item.title });
            return acc;
        }, []);
        const isWard = myData.ward;

        return (
            <>
                {subProfiles.length > 1 && (
                    <>
                        <ProfileWrapper
                            onClick={this.toggleList}
                            isOpened={isOpened}
                        >
                            <ProfileName>
                                {isWard
                                    ? `Профиль: ${get(
                                          myData,
                                          "person.firstName",
                                      ) || ""} ${get(
                                          myData,
                                          "person.middleName",
                                      ) || ""}`
                                    : "Выбрать профиль подопечного"}
                            </ProfileName>
                            <ProfileSelectIcon>
                                <SelectArrowIcon
                                    color={theme.colors.text.colorBlack}
                                    opacity={1}
                                />
                            </ProfileSelectIcon>
                        </ProfileWrapper>
                        <Desktop>
                            <ContextList
                                onChange={this.switchProfileHandler}
                                isOpened={isOpened}
                                items={names}
                            />
                        </Desktop>
                        <Tablet>
                            <ContextList
                                onChange={this.switchProfileHandler}
                                isOpened={isOpened}
                                items={names}
                                position={{
                                    x: 0,
                                    y: 0,
                                }}
                                globalPosition={"top"}
                            />
                        </Tablet>
                    </>
                )}
            </>
        );
    }

    toggleList = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    };
}

Profile.propTypes = {
    theme: PropTypes.object,
    dispatch: PropTypes.func,
    subProfiles: PropTypes.array,
    myData: PropTypes.object,
    history: PropTypes.object,
};

PropTypes.defaultProps = {
    subProfiles: [],
};

const ProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px;
    background-color: ${(props) =>
        props.isOpened ? rgba(0, 0, 0, 0.1) : "transparent"};
    transition: background-color ${(props) => props.theme.animations.transition};

    :hover {
        background-color: ${() => rgba(0, 0, 0, 0.1)};
    }
`;

const ProfileName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        color: ${(props) => props.theme.colors.text.colorWhite};
    }
`;

const ProfileSelectIcon = styled.div`
    margin-left: 10px;
`;

export default Profile;
