import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Scrollbar } from "react-scrollbars-custom";
import styled from "styled-components";

class ScrollBar extends PureComponent {
    render() {
        const { children, noScrollX, noScrollY, scrollTop } = this.props;

        return (
            <Scrollbar
                style={{ height: "100%" }}
                className={"mgfoms_scrollbar"}
                noScrollX={noScrollX}
                noScrollY={noScrollY}
                scrollTop={scrollTop}
            >
                <Wrapper>{children}</Wrapper>
            </Scrollbar>
        );
    }
}

const Wrapper = styled.div`
    width: calc(100% - 2px);
    height: 100%;
`;

ScrollBar.propTypes = {
    children: PropTypes.any,
    noScrollX: PropTypes.bool,
    noScrollY: PropTypes.bool,
    scrollTop: PropTypes.number,
};

ScrollBar.defaultProps = {
    noScrollX: false,
    noScrollY: false,
    children: "",
};

export default ScrollBar;
