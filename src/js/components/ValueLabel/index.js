import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { formatDate } from "utils/formatDate";

class ValueLabel extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.array,
            PropTypes.string,
            PropTypes.number,
        ]),
        label: PropTypes.string.isRequired,
        type: PropTypes.string,
    };

    static defaultProps = {
        type: "",
        value: "",
    };

    renderValues = () => {
        const { value, type } = this.props;

        if (type === "date" && value) {
            return formatDate(value);
        }
        return value;
    };

    render() {
        const { label } = this.props;

        return (
            <div>
                <div>{label}</div>
                <div>{this.renderValues()}</div>
            </div>
        );
    }
}

export { ValueLabel };
