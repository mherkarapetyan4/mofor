import React, { PureComponent } from "react";
import { LK_LEFT_MENU_ELEMENTS } from "config/menu";
import { LazyComponent } from "containers/LazyComponent";
const Menu = React.lazy(() => import("containers/Menu"));
import Routes from "./routes";
import { hasPersonalDataArgee } from "modules/hasPersonalDataArgee";

@hasPersonalDataArgee
class Container extends PureComponent {
    render() {
        return (
            <>
                <LazyComponent
                    component={Menu}
                    data={{ elements: LK_LEFT_MENU_ELEMENTS }}
                />
                <Routes />
            </>
        );
    }
}

export default Container;
