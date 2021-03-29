import {Checkmark, StyledCheckbox} from "./styledCheckbox";
import React from "react";
import styled from "@emotion/styled";
import {boxShadow, colors} from "../../theme/colors";

interface LabelProps {
    checked: boolean;
}

const LabelContainer = styled.label<LabelProps>`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: ${props => props.checked ? "line-through" : "none"};
  overflow-wrap: anywhere;
  /* On mouse-over, add a thistle background color */
  &:hover input ~ span {
    background-color: ${colors.thistle};
    box-shadow: ${boxShadow.dreamy};
  }
`;

interface CheckboxProps {
    id: string;
    handleCompleted: () => void;
    checked: boolean;
    inputToggle: boolean;
    handleDoubleClick: () => void;
    label: string | JSX.Element;
}

const Checkbox = ({
    id,
    handleCompleted,
    checked,
    inputToggle,
    handleDoubleClick,
    label
}: CheckboxProps) => {

    return (
        <React.Fragment>
            <StyledCheckbox
                id={`checkbox-${id}`}
                name={"checkbox"}
                type={"checkbox"}
                value={">"}
                onChange={handleCompleted}
                checked={checked}
                disabled={inputToggle}
            />
            <Checkmark/>
            <LabelContainer  onDoubleClick={handleDoubleClick} checked={checked}>
                {label}
            </LabelContainer>
        </React.Fragment>
    );
};

export default Checkbox;