import React from "react";
import Button from "./Button";

interface DeleteButtonProps {
    handleClick: () => void;
    children: string;
}

const DeleteButton = ({ handleClick, children }: DeleteButtonProps) => {

    return <Button
        handleClick={handleClick}
        id={"deleteButton"}
        actionType={"danger"}
    >
        {children}
    </Button>;
};

export default DeleteButton;