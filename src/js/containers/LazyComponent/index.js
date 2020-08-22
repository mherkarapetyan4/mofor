import React, { PureComponent, Suspense } from "react";
import { Loader } from "components/Loader";
import PropTypes from "prop-types";

class LazyComponent extends PureComponent {
    static propTypes = {
        component: PropTypes.any,
        data: PropTypes.object,
        children: PropTypes.any,
    };

    static defaultProps = {
        data: {},
    };

    render = () => {
        const { component, data, children } = this.props;
        const Component = component;

        return (
            <Suspense fallback={<Loader />}>
                {children ? children : <Component {...data} />}
            </Suspense>
        );
    };
}

export { LazyComponent };
