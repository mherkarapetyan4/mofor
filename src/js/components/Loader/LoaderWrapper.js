import React, { PureComponent } from "react";
import { Loader } from "components/Loader";
import styled from "styled-components";

class LoaderWrapper extends PureComponent {
    render() {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export default LoaderWrapper;
