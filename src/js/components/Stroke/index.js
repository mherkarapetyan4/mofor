import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { plainColorPicker } from "utils/colorPicker";

@withTheme
class Stroke extends PureComponent {
    constructor(props) {
        super(props);
        this.strokeColor = plainColorPicker(props);
    }

    render() {
        const { color } = this.props;

        return <Wrapper color={color ? color : this.strokeColor} />;
    }
}

const Wrapper = styled.div`
    width: 45px;
    height: 5px;
    border-radius: 5px;
    background: ${(props) => props.color};
`;

Stroke.propTypes = {
    color: PropTypes.string,
};

export default Stroke;
