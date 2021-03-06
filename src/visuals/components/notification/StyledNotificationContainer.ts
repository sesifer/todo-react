import styled from "@emotion/styled";
import {colors} from "../../theme/colors";

interface ContainerProps {
    type: string;
    isVisible: boolean;
}

export const StyledNotificationContainer = styled.div<ContainerProps>`
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