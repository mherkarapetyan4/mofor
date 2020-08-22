import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class TabletIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill={color}
                fillOpacity={opacity}
            >
                <path d="M17.3024 7.47344C24.6435 5.50642 32.3335 9.8646 34.3264 17.3022C36.2934 24.6433 31.9352 32.3333 24.4976 34.3262C17.06 36.3191 9.46657 31.935 7.47366 24.4974C5.50664 17.1564 9.86482 9.46635 17.3024 7.47344ZM16.526 4.57566C7.54288 6.98268 2.16887 16.2907 4.57589 25.2739C6.9829 34.257 16.291 39.631 25.2741 37.224C34.2572 34.8169 39.6312 25.5089 37.2242 16.5258C34.8172 7.54266 25.5091 2.16865 16.526 4.57566Z" />
                <path d="M29.4949 17.0438L11.5287 21.8579C10.756 22.0649 10.261 22.9222 10.3714 23.7209C10.5785 24.4936 11.4358 24.9886 12.3052 24.7556L30.2714 19.9416C31.0441 19.7345 31.5391 18.8772 31.4286 18.0786C31.125 17.3317 30.2677 16.8368 29.4949 17.0438Z" />
            </svg>
        );
    }
}

TabletIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default TabletIcon;
