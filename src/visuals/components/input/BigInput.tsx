import React, {ChangeEvent, KeyboardEvent} from "react";
import styled from "@emotion/styled";
import {fontFamily, fontSize} from "../../theme/fonts";
import Input from "./Input";

const Border = styled.span`
    font-family: ${fontFamily.specialElite};
    font-size: ${fontSize.title};
  @media (max-width: 620px) {
    font-size: ${fontSize.subtitle};
  }
`;

interface BigInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    value: string;
    isLoading: boolean;
}

const BigInput = ({
    onChange,
    onKeyDown,
    value,
    isLoading
}: BigInputProps) => {

    return (
        <React.Fragment>
            <Border>[</Border>
            <Input
                id={"bigInput"}
                handleOnChange={onChange}
                handleKeyDown={onKeyDown}
                value={value}
                type="text"
                name="todoInput"
                placeholder={isLoading ? "" : "What needs to be done?"}
                disabled={isLoading}
            />
            <Border>]</Border>
        </React.Fragment>
    );
};

export default BigInput;