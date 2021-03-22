import React from "react";
import Button from "./Button";

interface DeleteButtonProps {
    handleClick: () => void;
    children: string;
}

const DeleteButton = (props: DeleteButtonProps) => {

    return <Button
        handleClick={props.handleClick}
        id={"deleteButton"}
        actionType={"danger"}
    >
        {props.children}
    </Button>;
};

export default DeleteButton;