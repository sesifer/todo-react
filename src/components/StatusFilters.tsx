import React from "react";
import {Filters} from "../features/filters/filtersSlice";
import styled from "@emotion/styled";

type ButtonProps = {
    highlight: boolean
}

const Button = styled.button<ButtonProps>`
    color: ${props => props.highlight ? "red" : "gray"}
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