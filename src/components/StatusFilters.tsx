import React from "react";
import {filterChanged, Filters} from "../features/filters/filtersSlice";
import styled from "@emotion/styled";
import {colors} from "./theme/colors";
import Button from "./buttons/Button";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../store";

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const StatusFilters = () => {
    const dispatch = useAppDispatch();
    const appliedFilter = useSelector((state: RootState) => state.filters);

    const onFilterChange = (appliedFilter: string) =>
        dispatch(filterChanged(appliedFilter));

    const filterButtons = Object.keys(Filters).map(key => {
        const value = Filters[key];

        const onClick = () => onFilterChange(value);
        const highlight = (value === appliedFilter) || false;

        return <Button
            key={`button-${key}`}
            handleClick={onClick}
            backgroundColor={highlight ? colors.steelTeal : ""}
        >
            {key}
        </Button>;
    });

    return <ButtonsContainer>
        {filterButtons}
    </ButtonsContainer>;
};

export default StatusFilters;