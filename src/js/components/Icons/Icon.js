import React from "react";
import PropTypes from "prop-types";

const IconWrapper = (Component) => {
    return class Icon extends React.PureComponent {
        render() {
            return <Component {...this.props} />;
        }
    };
};

IconWrapper.propTypes = {
    color: PropTypes.string,
};

IconWrapper.defaultProps = {
    color: "#000",
};

export default IconWrapper;
