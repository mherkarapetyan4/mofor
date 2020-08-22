import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ValueLabel } from "components/ValueLabel";
import get from "lodash/get";
import { placeHolder } from "config/consts";

class Expertise extends PureComponent {
    static propTypes = {
        service: PropTypes.object.isRequired,
    };

    render() {
        const { service } = this.props;
        return (
            <>
                <h2>Сведения об экспертизе</h2>
                <ValueLabel
                    label={"Вид нарушения"}
                    value={get(service, "expertise.violationName", placeHolder)}
                />
                <ValueLabel
                    label={"Сумма санкций"}
                    value={get(
                        service,
                        "expertise.sanctionsAmount",
                        placeHolder,
                    )}
                />
            </>
        );
    }
}

export default Expertise;
