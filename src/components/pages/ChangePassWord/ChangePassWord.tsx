import PasswordInput from "@components/auth/PasswordInput";
import { BaseButtonBlack } from "@styles/button";
import { FormGridWrapper, FormTitle } from "@styles/form_grid";
import { Container } from "@styles/styles";
import styled from "styled-components";
import ChangePass from "@images/changepass.jpg";

const ChangePwdScreenWrapper = styled.section``;

const ChangePasswordScreen = () => {
  return (
    <ChangePwdScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img src={ChangePass} className="object-fit-cover" alt="" />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Tạo mật khẩu mới </h3>
                <p>Mật khẩu mới của bạn không được trùng với mật khẩu cũ !!</p>
              </FormTitle>
              <form>
                <PasswordInput fieldName="Password" name="password" />
                <PasswordInput
                  fieldName="Confirm Password"
                  name="confirm_password"
                  errorMsg="New password and confirm password do not match"
                />
                <BaseButtonBlack type="submit" className="form-submit-btn">
                  Tạo lại mật khẩu
                </BaseButtonBlack>
              </form>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </ChangePwdScreenWrapper>
  );
};

export default ChangePasswordScreen;
