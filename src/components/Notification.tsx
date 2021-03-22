import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {colors} from "./theme/colors";

interface ContainerProps {
    type: string;
    isVisible: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  bottom: 1rem;
  right:-100%;
  padding: 16px;
  z-index: 99;
  width: 135px;
  background-color: ${props => props.type === "info" 
        ? colors.steelTeal 
        : props.type === "warn" 
            ? colors.thistle 
            : colors.goldenGateBridge};
  -webkit-animation: ${props => props.isVisible ? "right-to-left" : "left-to-right"} .9s ease-in-out forwards;
  animation: ${props => props.isVisible ? "right-to-left" : "left-to-right"} .9s ease-in-out forwards;
    @-webkit-keyframes right-to-left{
      from{right:-100%}
      to{right:0}
    }
    @keyframes right-to-left{
      from{right:-100%}
      to{right:0}
    }
    @-webkit-keyframes left-to-right{
      from{right:0}
      to{right:-100%}
    }
    @keyframes left-to-right{
      from{right:0}
      to{right:-100%}
    }
`;

interface NotificationProps {
    type: "error" | "warn" | "info";
    text?: string;
}

const delay = 3500; //ms

const Notification = ({type, text = ""}: NotificationProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const content = type === "error" ? `Ooops! Something went wrong.. ${text}` : text;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(!isVisible), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [isVisible]);

    return <Container type={type} isVisible={isVisible}>{content}</Container>;
};

export default Notification;