import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import FullLogo from "icons/FullLogo";
import { Link } from "react-router-dom";
import appleStore from "images/mobileApps/appleStoreLogo.png";
import googlePlay from "images/mobileApps/google.png";
import AdminAuthForm from "./AdminAuthForm";

@connect((state) => ({
    myDataFetching: state.myData.myDataFetching,
    isAuthLoading: state.user.isAuthLoading,
}))
class Auth extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        myDataFetching: PropTypes.bool.isRequired,
        isAuthLoading: PropTypes.bool.isRequired,
    };

    render() {
        //const {myDataFetching, isAuthLoading} = this.props;
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
                    <AdminAuthForm />
                    <MobileAdvertising>
                        <Link to={"/"}>
                            <img src={appleStore} alt="mobileApp" />
                        </Link>
                        <Link to={"/"}>
                            <img src={googlePlay} alt="mobileApp" />
                        </Link>
                    </MobileAdvertising>
                </AuthContentWrapper>
                <AuthFooter>
                    © 2019 “Московский городской фонд обязательного медицинского
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
    margin: 60px 0;
    font-family: ${(props) => props.theme.fonts.family.gotham};
    font-size: ${(props) => props.theme.fonts.sizes.normal};
    color: ${(props) => props.theme.colors.text.colorWhite};
    text-align: center;
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    padding: 0 20px;
    width: 100%;
`;

const FullLogoWrapper = styled.div``;

const MobileAdvertising = styled.div`
    margin-top: 60px;

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

export default Auth;
