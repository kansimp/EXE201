import styled from "styled-components";
import { FormElement, Input } from "../../styles/form";
import { useState, FC } from "react";

const PasswordToggleButton = styled.button`
  position: absolute;
  bottom: 100%;
  right: 0;

  .pwd-toggle-text {
    padding-left: 5px;
  }
`;

interface PasswordInputProps {
  fieldName: string;
  name: string;
  errorMsg?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ fieldName, name, errorMsg = "" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormElement>
      <label htmlFor={name} className="form-elem-label">
        {fieldName}
      </label>
      <div className="form-elem-block">
        <Input type={showPassword ? "text" : "password"} placeholder="" name={name} className="form-elem-control" />

        <PasswordToggleButton type="button" className="pwd-value-toggle flex items-center" onClick={togglePassword}>
          {showPassword ? (
            <>
              <i className="bi bi-eye-fill"></i>
              <span className="pwd-toggle-text text-sm">Hide</span>
            </>
          ) : (
            <>
              <i className="bi bi-eye-slash-fill"></i>
              <span className="pwd-toggle-text text-sm">Show</span>
            </>
          )}
        </PasswordToggleButton>
      </div>
      <span className="form-elem-error text-end font-medium">{errorMsg}</span>
    </FormElement>
  );
};

export default PasswordInput;
