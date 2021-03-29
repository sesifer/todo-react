import React, {ChangeEvent} from "react";
import EditInput from "./input/EditInput";
import DeleteButton from "./buttons/DeleteButton";
import Checkbox from "./checkbox/Checkbox";

interface ListItemProps {
    id: string;
    handleCompleted: () => void;
    checked: boolean;
    inputToggle: boolean;
    handleDoubleClick: () => void;
    input: string;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleDelete: () => Promise<void>;
}

const ListItem = ({
    id,
    handleCompleted,
    checked,
    inputToggle,
    handleDoubleClick,
    input,
    handleKeyDown,
    handleInputChange,
    handleDelete,
}: ListItemProps) => {

    return (
        <React.Fragment>
            <Checkbox
                id={id}
                handleCompleted={handleCompleted}
                checked={checked}
                inputToggle={inputToggle}
                handleDoubleClick={handleDoubleClick}
                label={inputToggle
                    ? <EditInput
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}  //on key 'Enter'
                        value={input}
                    />
                    : input
                }
            />
            {inputToggle
                ? null
                : <DeleteButton handleClick={handleDelete}>x</DeleteButton>
            }
        </React.Fragment>
    );
};

export default ListItem;