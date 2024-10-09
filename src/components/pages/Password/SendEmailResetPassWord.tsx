import styled from "styled-components";
import resetpass from "@images/resetpass.jpg";
import { Link } from "react-router-dom";
import { FormGridWrapper, FormTitle } from "styles/form_grid";
import { Container } from "styles/styles";
import { FormElement, Input } from "styles/form";
import { BaseButtonBlack } from "styles/button";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { sendEmailResetPassword } from "@redux/slices/sendEmailSlice";
import { useState } from "react";

const ResetScreenWrapper = styled.section``;

const ResetScreen = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const { loading, message, error } = useAppSelector((state: any) => state.sendEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendEmailResetPassword({ email }));
  };

  return (
    <ResetScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img src={resetpass} className="object-fit-cover" />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Thay đổi mật khẩu</h3>
                <p>Nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.</p>
              </FormTitle>

              <form onSubmit={handleSubmit}>
                <FormElement>
                  <label htmlFor="email" className="form-elem-label">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Nhập email của bạn"
                    name="email"
                    className="form-elem-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormElement>
                <BaseButtonBlack type="submit" className="form-submit-btn" disabled={loading}>
                  {loading ? "Đang gửi..." : "Gửi"}
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
    </ResetScreenWrapper>
  );
};

export default ResetScreen;
