import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import { connect } from "react-redux";
import { loginByUkl } from "actions/auth";
import styled from "styled-components";
import FullLogo from "icons/FullLogo";
import appleStore from "images/mobileApps/appleStoreLogo.png";
import googlePlay from "images/mobileApps/google.png";
import ContextList from "components/ContextList";
import SelectArrowIcon from "icons/SelectArrowIcon";
import { RESPONSIVE } from "config/consts";
import InlineFormField from "components/InlineFormField";
import { Loader } from "components/Loader";
import { checkAuthByUkl } from "actions/user";

const ukls = [
    {
        value: 11491224,
        label: "Беременность",
    },
    {
        value: 20372332,
        label: "Стандарт",
    },
    {
        value: 30077622,
        label: "Подопечный",
    },
    {
        value: 20372355,
        label: "Новый",
    },
    {
        value: 8408834,
        label: "Результаты диспансеризации?",
    },
    {
        value: 19764293,
        label: "20-JUN-45 М",
    },
    {
        value: 29094554,
        label: "08-MAR-45 Ж",
    },
    {
        value: 31173076,
        label: "21-FEB-40 М",
    },
    {
        value: 12924518,
        label: "19-MAR-40 Ж",
    },
    {
        value: 23995180,
        label: "02-FEB-74 М",
    },
    {
        value: 35075480,
        label: "04-MAR-74 Ж",
    },
    {
        value: 29416691,
        label: "23-JUN-75 М",
    },
    {
        value: 33170364,
        label: "13-OCT-75 Ж",
    },
    {
        value: 34427637,
        label: "10-FEB-83 М",
    },
    {
        value: 26717504,
        label: "26-MAR-83 Ж",
    },
    {
        value: 11661137,
        label: "79гр (40лет)",
    },
    {
        value: 9972130,
        label: "89гр",
    },
    {
        value: 9882738,
        label: "90гр",
    },
    {
        value: 9750765,
        label: "92гр",
    },
    {
        value: 1271023,
        label: "95гр",
    },
];

@connect((state) => ({
    myDataFetching: state.myData.myDataFetching,
    isAuthLoading: state.user.isAuthLoading,
    showLoginByUkl: state.user.showLoginByUkl,
}))
class Auth extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        myDataFetching: PropTypes.bool.isRequired,
        isAuthLoading: PropTypes.bool.isRequired,
        showLoginByUkl: PropTypes.bool.isRequired,
    };
    state = {
        currentUkl: 20372332,
        isOpened: false,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(checkAuthByUkl());
    }

    byUkl = () => {
        const { dispatch } = this.props;
        dispatch(loginByUkl(this.state.currentUkl));
    };

    toggleList = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    };

    setCurrentUkl = (value) => {
        this.setState({
            currentUkl: value,
        });
        this.toggleList();
    };

    render() {
        const { myDataFetching, isAuthLoading, showLoginByUkl } = this.props;
        const { currentUkl, isOpened } = this.state;
        return (
            <AuthWrapper>
                <AuthContentWrapper>
                    <FullLogoWrapper>
                        <FullLogo color={"#fff"} />
                    </FullLogoWrapper>
                    <Info>
                        С помощью Сервиса производится информирование
                        застрахованных лиц об оказанной им за счет средств ОМС
                        медицинской помощи. Сервис является интерактивным
                        помощником в планировании мероприятий, связанных с
                        заботой о здоровье и ведением здорового образа жизни.
                    </Info>
                    {showLoginByUkl ? (
                        <>
                            <ButtonWrapper>
                                <Button
                                    label={"Войти по укл"}
                                    onClick={() => this.byUkl()}
                                    white
                                    disabled={myDataFetching || isAuthLoading}
                                />
                            </ButtonWrapper>
                            <UklWrapper>
                                <InlineFormField
                                    label={"УКЛ"}
                                    value={currentUkl}
                                    onChange={(value) => {
                                        this.setState({
                                            currentUkl: value,
                                        });
                                    }}
                                />
                            </UklWrapper>
                            <UklWrapper
                                onClick={this.toggleList}
                                isOpened={isOpened}
                            >
                                <UklTitle>{currentUkl}</UklTitle>
                                <UklSelectIcon>
                                    <SelectArrowIcon
                                        color={"#ffffff"}
                                        opacity={1}
                                    />
                                </UklSelectIcon>
                            </UklWrapper>
                            <ContextListWrapper>
                                <ContextList
                                    position={{ x: 0, y: 0 }}
                                    onChange={this.setCurrentUkl}
                                    isOpened={isOpened}
                                    items={ukls}
                                />
                            </ContextListWrapper>
                        </>
                    ) : (
                        <Loader />
                    )}

                    <MobileAdvertising>
                        <a
                            href={
                                "https://itunes.apple.com/us/app/%D0%BC%D0%B3%D1%84%D0%BE%D0%BC%D1%81/id1288040721?l=ru&ls=1&mt=8"
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                        >
                            <img src={appleStore} alt="mobileApp" />
                        </a>
                        <a
                            href={
                                "https://play.google.com/store/apps/details?id=ru.mgfoms.pandora&rdid=ru.mgfoms.pandora"
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                        >
                            <img src={googlePlay} alt="mobileApp" />
                        </a>
                    </MobileAdvertising>
                </AuthContentWrapper>
                <AuthFooter>
                    © 2020 “Московский городской фонд обязательного медицинского
                    страхования”
                </AuthFooter>
            </AuthWrapper>
        );
    }
}

const AuthWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: ${(props) => props.theme.authBackground};
    background-size: cover;
`;

const Info = styled.div`
    margin: 40px 0;
    font-family: ${(props) => props.theme.fonts.family.gotham};
    font-size: ${(props) => props.theme.fonts.sizes.normal};
    color: ${(props) => props.theme.colors.text.colorWhite};
    text-align: center;
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    padding: 0 20px;
    width: 100%;
`;

const FullLogoWrapper = styled.div``;

const ButtonWrapper = styled.div``;

const MobileAdvertising = styled.div`
    margin-top: 30px;

    a {
        margin: 0 10px;
    }
`;

const AuthContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 500px;
`;

const AuthFooter = styled.div`
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-family: ${(props) => props.theme.fonts.family.gotham};
    color: ${(props) => props.theme.colors.text.colorWhite};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    opacity: ${(props) => props.theme.textOpacity.half};
`;

const UklWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px;
`;

const UklTitle = styled.div`
    font-family: ${(props) => props.theme.fonts.family.gothamBold};
    font-size: ${(props) => props.theme.fonts.sizes.normal};
    color: ${(props) => props.theme.colors.text.colorWhite};
`;

const UklSelectIcon = styled.div`
    margin-left: 10px;
    color: ${(props) => props.theme.colors.text.colorWhite};
`;

const ContextListWrapper = styled.div`
    position: relative;
    right: 50px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        right: 0;
        width: 100%;
    }
`;

export default Auth;
