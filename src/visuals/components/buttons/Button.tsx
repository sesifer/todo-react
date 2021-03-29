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

const Button = ({ disabled, handleClick, children, id, actionType, backgroundColor }: ButtonProps) => {
    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        !disabled && handleClick(event);
    };

    return <StyledButton
        onClick={onClick}
        disabled={disabled}
        id={id}
        actionType={actionType}
        backgroundColor={backgroundColor}
    >
        {children}
    </StyledButton>;
};

export default Button;
