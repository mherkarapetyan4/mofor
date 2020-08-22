import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import { connect } from "react-redux";
import { checkAllowConfirmation } from "actions/user";
import { confirmationPasspordData } from "actions/user";

@connect()
class ConfirmInfoButton extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { dispatch } = this.props;
        dispatch(checkAllowConfirmation(true)).then(() => {
            dispatch(confirmationPasspordData({ confirmed: true }));
        });
    };

    render() {
        return <Button label={"Подтвердить данные"} onClick={this.onClick} />;
    }
}

export default ConfirmInfoButton;
