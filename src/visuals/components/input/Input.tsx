import {ChangeEvent, KeyboardEvent} from "react";
import {StyledInput} from "./StyledInput";

interface InputProps {
    id: string;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    value: string;
    type: string;
    name: string;
    placeholder: string;
    disabled?: boolean;
}

const Input = ({
    id,
    handleOnChange,
    handleKeyDown,
    value,
    type,
    name,
    placeholder,
    disabled,
}: InputProps) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        !disabled && handleOnChange(event);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        !disabled && handleKeyDown(event);
    };

    return (
        <StyledInput
            id={id}
            onChange={onChange}
            onKeyDown={onKeyDown}  //on key 'Enter'
            value={value}
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
};

export default Input;