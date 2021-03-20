import React from "react";
import {Filters} from "../features/filters/filtersSlice";
import styled from "@emotion/styled";
import {fontFamily, fontSize} from "./theme/fonts";
import {boxShadow, colors} from "./theme/colors";

type ButtonProps = {
    highlight: boolean
}

const Button = styled.button<ButtonProps>`
  // color: ${props => props.highlight ? colors.steelTeal : colors.main};
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.body};
  border: none;
  background: none;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin: 0.5em;
  padding: 0.5em;
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
    background-color: ${colors.steelTeal};
  }
`;

interface StatusFiltersProps {
    value: string,
    handleClick: (arg0: string) => void
}

const StatusFilters = ({value: appliedFilter, handleClick}: StatusFiltersProps) => {
    const filterButtons = Object.keys(Filters).map(key => {
        const value = Filters[key];
        const onClick = () => handleClick(value);
        const highlight = (value === appliedFilter) || false;

        return <Button
            key={`button-${key}`}
            onClick={onClick}
            highlight={highlight}
        >
            {key}
        </Button>;
    });

    return <div>
        {filterButtons}
    </div>;
};

export default StatusFilters;