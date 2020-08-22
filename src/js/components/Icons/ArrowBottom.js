import React, { PureComponent } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";
import styled from "styled-components";

const SVGWrapper = styled.div`
    transform: rotate(${(props) => props.rotate + "deg"});
`;

@Icon
class ArrowBottomIcon extends PureComponent {
    render() {
        const { color } = this.props;

        return (
            <SVGWrapper rotate={this.props.rotate}>
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
                    <path
                        fill={color}
                        d="M4.42857 5L0 0.589431L0.428571 0.162602L4.42857 4.12602L8.57143 0L9 0.426829L4.42857 5Z"
                    />
                </svg>
            </SVGWrapper>
        );
    }
}

ArrowBottomIcon.propTypes = {
    color: PropTypes.string,
    rotate: PropTypes.number,
};
export default ArrowBottomIcon;
