import styled from "@emotion/styled";
import {colors} from "../../theme/colors";

export const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  z-index: 99; //move it forward to be clickable 
  margin: 0;
  cursor: pointer;
  top: 0.6rem;
  @media (max-width: 620px) {
    top: 0.2rem;
  }
  left: 0;
  height: 1.5rem;
  width: 1.5rem;
  /* When the checkbox is checked, add a thistle background */
  &:checked ~ span {
    background-color: ${colors.steelTeal};
  }
  /* Show the checkmark when checked */
  &:checked ~ span::after {
    display: block;
  }
`;

export const Checkmark = styled.span`
  position: absolute;
  top: 0.6rem;
  @media (max-width: 620px) {
    top: 0.2rem;
  }
  left: 0;
  height: 1.5rem;
  width: 1.5rem;
  background-color: ${colors.thistleSoft};
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  /* Create the checkmark/indicator (hidden when not checked) */
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
  /* Style the checkmark/indicator */
  &::after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;