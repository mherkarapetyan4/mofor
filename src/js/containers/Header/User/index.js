import React, { PureComponent } from "react";
import styled from "styled-components";
import IconPlate from "components/IconPlate";
import PropTypes from "prop-types";

class User extends PureComponent {
    render() {
        const { firstName, middleName } = this.props;

        return (
            <UserWrapper>
                <IconPlate title={this.renderUserInitials()} />
                <UserGreetings>
                    <Greeting>Добро пожаловать,</Greeting>
                    <UserName>
                        {firstName} {middleName}
                    </UserName>
                </UserGreetings>
            </UserWrapper>
        );
    }

    renderUserInitials = () => {
        const { firstName, middleName } = this.props;

        return firstName.charAt(0) + middleName.charAt(0);
    };
}

User.propTypes = {
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string.isRequired,
};

const UserName = styled.div`
    color: ${(props) => props.theme.colors.text.colorBlack};
    font-family: ${(props) => props.theme.fonts.family.gothamBold};
    font-size: ${(props) => props.theme.fonts.sizes.normal};
`;

const UserWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: ${(props) => props.theme.paddings.normal};
    position: relative;
`;

const UserGreetings = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
`;

const Greeting = styled.div`
    font-family: ${(props) => props.theme.fonts.family.gotham};
    font-size: ${(props) => props.theme.fonts.sizes.normal};
    opacity: 0.5;
`;

export default User;
