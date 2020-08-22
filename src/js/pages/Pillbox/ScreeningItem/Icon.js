import React from "react";
import * as icons from "../Icons/index";
import get from "lodash/get";
import PropTypes from "prop-types";

class Icon extends React.Component {
    render() {
        const iconId = this._getIconId(this.props.data);
        const Icon = icons[iconId] || icons.default;
        return <Icon color={"#fff"} />;
    }

    _getIconId(data) {
        return get(data, "form.code");
    }
}

Icon.propTypes = {
    data: PropTypes.object,
};

export default Icon;
