import Input from "./Input";
import {ChangeEvent, KeyboardEvent} from "react";
import styled from "@emotion/styled";
import {fontFamily, fontSize} from "../../theme/fonts";
import {colors} from "../../theme/colors";

const StyledEditInput = styled(Input)`
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.body};
  border: solid 0.1px ${colors.main};
  background-color: ${colors.thistleSoft};
  line-height: 21px;
`;

interface EditInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    value: string;
}

const EditInput = ({
    onChange,
    onKeyDown,
    value,
}: EditInputProps) => {

    return (
        <StyledEditInput
            id={"editInput"}
            handleOnChange={onChange}
            handleKeyDown={onKeyDown}
            value={value}
            type="text"
            name="todoEdit"
            placeholder="What needs to be done?"
        />
    );    
};

export default EditInput;