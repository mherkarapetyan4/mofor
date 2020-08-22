import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MGFOMSLogo from "components/MGFOMSLogo";
import { connect } from "react-redux";

@connect((state) => ({
    firstAvailRoute: state.admin.firstAvailRoute,
}))
class MGFOMSShortLogo extends PureComponent {
    render() {
        const { color } = this.props;

        return (
            <Link to={this.props.firstAvailRoute}>
                <MGFOMSLogo color={color} />
            </Link>
        );
    }
}

MGFOMSShortLogo.propTypes = {
    color: PropTypes.string,
    firstAvailRoute: PropTypes.string,
};

export default MGFOMSShortLogo;
