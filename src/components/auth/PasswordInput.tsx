import styled from "styled-components";
import { FormElement, Input } from "../../styles/form";
import { useState, FC } from "react";

const PasswordToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  .pwd-toggle-text {
    padding-left: 5px;
    font-size: 0.8rem;
  }
`;

const FormElemBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

interface PasswordInputProps {
  fieldName: string;
  name: string;
  value: string; // Add value prop
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
  errorMsg?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ fieldName, name, value, onChange, errorMsg = "" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormElement>
      <label htmlFor={name} className="form-elem-label">
        {fieldName}
      </label>
      <FormElemBlock className="form-elem-block">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder=""
          name={name}
          value={value} // Set value prop
          onChange={onChange} // Set onChange prop
          className="form-elem-control"
        />
        <PasswordToggleButton type="button" className="pwd-value-toggle" onClick={togglePassword}>
          {showPassword ? (
            <>
              <i className="bi bi-eye-fill"></i>
              <span className="pwd-toggle-text">Hide</span>
            </>
          ) : (
            <>
              <i className="bi bi-eye-slash-fill"></i>
              <span className="pwd-toggle-text">Show</span>
            </>
          )}
        </PasswordToggleButton>
      </FormElemBlock>
      {errorMsg && <span className="form-elem-error text-end font-medium">{errorMsg}</span>}
    </FormElement>
  );
};

export default PasswordInput;
