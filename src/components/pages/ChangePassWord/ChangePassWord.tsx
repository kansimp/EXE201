import React, { useState } from "react";
import PasswordInput from "@components/auth/PasswordInput"; // Your existing PasswordInput component
import { BaseButtonBlack } from "@styles/button";
import { FormGridWrapper, FormTitle } from "@styles/form_grid";
import { Container } from "@styles/styles";
import styled from "styled-components";
import ChangePass from "@images/changepass.jpg";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { changePassword } from "@redux/slices/changePassWord";

const ChangePwdScreenWrapper = styled.section``;

const ChangePasswordScreen = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");

  const { loading, message, error } = useAppSelector((state: any) => state.changePassword);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token && password) {
      dispatch(changePassword({ token, newPassword: password }));
    }
  };

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
                <h3>Tạo mật khẩu mới</h3>
                <p>Mật khẩu mới của bạn không được trùng với mật khẩu cũ !!</p>
              </FormTitle>
              <form onSubmit={handleSubmit}>
                <PasswordInput fieldName="Password" name="password" value={password} onChange={handlePasswordChange} />
                <BaseButtonBlack type="submit" className="form-submit-btn" disabled={loading}>
                  {loading ? "Đang thay đổi..." : "Tạo lại mật khẩu"}
                </BaseButtonBlack>
              </form>
              {error && <p className="error-text">Có lỗi xảy ra: {error}</p>}
              {message && <p className="success-text">{message}</p>}
              <p className="flex flex-wrap account-rel-text">
                <Link to="/login" className="font-medium">
                  Quay lại đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </ChangePwdScreenWrapper>
  );
};

export default ChangePasswordScreen;
