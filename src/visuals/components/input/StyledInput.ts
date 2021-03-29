import styled from "@emotion/styled";
import {fontFamily, fontSize} from "../../theme/fonts";
import {colors} from "../../theme/colors";

export const StyledInput = styled.input`
  margin: 0 0 10px 0;
  width: 95%;
  border: none;
  background: none;
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.subtitle};
  @media (max-width: 620px) {
    font-size: ${fontSize.body};
  }
  text-align: center;
  padding: 0.3em 0 0 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover{
    background-color: ${colors.thistleSoft};
  }
  &:focus {
    outline: none;
  }
`;

