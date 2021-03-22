import styled from "@emotion/styled";
import {fontFamily, fontSize} from "../theme/fonts";
import {boxShadow, colors} from "../theme/colors";

interface StyledButtonProps {
    actionType?: string;
    backgroundColor?: string
}
export const StyledButton = styled.button<StyledButtonProps>`
  padding: 3px 3px 0 3px;
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.body};
  border: none;
  background: none;
  color: ${props => props.actionType === "danger" 
        ? colors.goldenGateBridge 
        : colors.main
};
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: ${props => props.backgroundColor || ""};
  &:before {
    content: ">";
    margin: 0.2em;
  }
  &:after {
    content: "<";
    margin: 0.2em;
  }
  &:hover{
    box-shadow: ${boxShadow.dreamy};
    background-color: ${colors.thistleSoft};
  }
  &:focus {
    outline: none;
  }
`;