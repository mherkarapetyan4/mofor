import React from "react";
import PropTypes from "prop-types";

const IconWrapper = (Component) => {
    return class Icon extends React.PureComponent {
        static propTypes = {
            color: PropTypes.string,
            opacity: PropTypes.number,
        };

        static defaultProps = {
            color: "#000",
            opacity: 1,
        };

        render() {
            return <Component {...this.props} />;
        }
    };
};

export default IconWrapper;
