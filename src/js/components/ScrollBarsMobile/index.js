import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class ScrollBarsMobile extends PureComponent {
    state = {
        marginTop: 0,
    };

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        yearsPicker: PropTypes.bool,
        currentValue: PropTypes.any,
        items: PropTypes.array,
        el: PropTypes.object,
        isOpened: PropTypes.bool,
        scrollTop: PropTypes.func,
        height: PropTypes.string,
        autoHeight: PropTypes.bool,
    };

    static defaultProps = {
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
                    this.elem.scrollTo(0, marginTop * el.clientHeight);
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
        const { children } = this.props;

        return (
            <Wrapper
                ref={(elem) => {
                    this.elem = elem;
                }}
            >
                {children}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    max-height: ${(props) => (props.autoHeight ? "auto" : props.height)};
    overflow-y: ${(props) => (props.autoHeight ? "visible" : "auto")};
`;

export default ScrollBarsMobile;
