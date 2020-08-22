import React, { PureComponent } from "react";
import styled, { keyframes } from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import LoaderIcon from "icons/LoaderIcon";

class Loader extends PureComponent {
    render() {
        return (
            <Wrapper>
                <Icon>
                    <LoaderIcon />
                </Icon>
                <Shadow></Shadow>
                <Label>Загружаются данные</Label>
            </Wrapper>
        );
    }
}

const iconAnimation = keyframes`
    0% {
        transform: scaleX(1) scaleY(1) translateY(0);
    }
    
    10% {
        transform: scaleX(1.2) scaleY(.8) translateY(0);
    }
    
    20% {
        transform: scaleX(.8) scaleY(1.2) translateY(-10px);
    }
    
    30% {
        transform: scaleX(.8) scaleY(1.2) translateY(-20px);
    }
    
    40% {
        transform: scaleX(1.2) scaleY(.8) translateY(-30px);
    }
    
    50% {
        transform: scaleX(1.1) scaleY(.9) translateY(-30px);
    }
    
    70% {
        transform: scaleX(.8) scaleY(1.2) translateY(-20px);
    }
    
    80% {
        transform: scaleX(.8) scaleY(1.2) translateY(-10px);
    }
    
    90% {
        transform: scaleX(1.2) scaleY(.8) translateY(0);
    }
    
    100% {
        transform: scaleX(1) scaleY(1) translateY(0);
    }
   
`;

const Icon = styled.div`
    animation: ${iconAnimation} 2s ease-in infinite;
    position: relative;
    z-index: 1;
`;

const Label = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    text-align: center;
    margin-top: 20px;
`;

const Shadow = styled.div`
    width: 74px;
    height: 74px;
    transform: scaleY(0.2);
    margin: -40px 0;
    background: radial-gradient(
        circle,
        rgba(196, 196, 196, 1) 0%,
        rgba(196, 196, 196, 0) 100%
    );
    border-radius: 50%;
    overflow: hidden;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export { Loader };
