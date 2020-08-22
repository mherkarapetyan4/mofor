import styled from "styled-components";

export const ConfirmedText = styled.div`
    font-family: ${(props) => props.theme.fontSemiBold};
    color: ${(props) => props.theme.textSuccessColor};
    font-size: ${(props) => props.theme.fontSize};
`;

export const AlertText = styled.div`
    font-family: ${(props) => props.theme.fontSemiBold};
    color: ${(props) => props.theme.alert};
    font-size: ${(props) => props.theme.fontSize};
`;

export const Text = styled.div`
    font-family: ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.textColor};
    font-size: ${(props) => props.theme.fontSize};
`;

export const TextSemiBold = styled.div`
    font-family: ${(props) => props.theme.fontSemiBold};
    color: ${(props) => (props.color ? props.color : props.theme.textColor)};
    font-size: ${(props) => props.theme.fontSize};
    transition: color ${(props) => props.theme.transition};
`;
