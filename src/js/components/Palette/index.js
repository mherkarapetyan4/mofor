import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CheckIcon from "icons/CheckIcon";

class Palette extends PureComponent {
    render() {
        const { data, onSelect, checked } = this.props;

        return (
            <Wrapper background={data.backgroundColor} onClick={onSelect}>
                {checked && (
                    <>
                        <Icon>
                            <CheckIcon color={"#fff"} />
                        </Icon>
                        <Overlay />
                    </>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 5px;
    background: ${(props) => props.background};
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 0;
    left: 0;
    top: 0;
`;

const Icon = styled.div`
    position: relative;
    z-index: 1;
    line-height: 0;
`;

Palette.propTypes = {
    data: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
};

Palette.defaultProps = {
    checked: false,
};

export default Palette;
