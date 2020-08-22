import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";

class Title extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
    };

    render() {
        const { onClick, title } = this.props;
        return (
            <div>
                <Button label={"Назад"} onClick={onClick} />
                <div>{title}</div>
            </div>
        );
    }
}

export default Title;
