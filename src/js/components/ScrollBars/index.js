import React, { PureComponent } from "react";
import Scrollbars from "react-custom-scrollbars";
import PropTypes from "prop-types";

class ScrollBars extends PureComponent {
    state = {
        marginTop: 0,
    };

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        yearsPicker: PropTypes.bool,
        currentValue: PropTypes.any,
        items: PropTypes.array,
        el: PropTypes.object,
        isOpened: PropTypes.bool,
        scrollTop: PropTypes.func,
    };

    static defaultProps = {
        maxHeight: 220,
        marginTop: 0,
    };

    componentDidMount() {
        const { items, yearsPicker, currentValue } = this.props;

        if (yearsPicker) {
            this.setState({
                marginTop: items.indexOf(
                    items.find((item) => item.value === currentValue),
                ),
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { marginTop } = this.state;
        const { items, yearsPicker, currentValue, el } = this.props;

        if (yearsPicker) {
            if (prevProps.isOpened !== this.props.isOpened) {
                if (this.props.isOpened) {
                    this.elem.scrollTop(marginTop * el.clientHeight);
                }
            }

            if (prevProps.currentValue !== this.props.currentValue) {
                this.setState({
                    marginTop: items.indexOf(
                        items.find((item) => item.value === currentValue),
                    ),
                });
            }
        }
    }

    render() {
        const { children, maxHeight } = this.props;

        return (
            <Scrollbars
                ref={(elem) => {
                    this.elem = elem;
                }}
                className={"custom-scroll"}
                autoHeight={true}
                autoHeightMax={maxHeight}
            >
                {children}
            </Scrollbars>
        );
    }
}

export default ScrollBars;
