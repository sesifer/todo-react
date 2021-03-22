import React from "react";
import {StyledButton} from "./StyledButton";

interface ButtonProps {
    disabled?: boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    children: string;
    id?: string;
    actionType?: string;
    backgroundColor?: string;
}

const Button = (props: ButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        !props.disabled && props.handleClick(event);
    };

    return <StyledButton
        onClick={handleClick}
        disabled={props.disabled}
        id={props.id}
        actionType={props.actionType}
        backgroundColor={props.backgroundColor}
    >
        {props.children}
    </StyledButton>;
};

export default Button;
