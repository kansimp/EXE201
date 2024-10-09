import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/slices/userSlice";
import Souvi from "@images/login.jpg";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styled from "styled-components";
import { breakpoints, defaultTheme } from "styles/themes/default";
import { FormGridWrapper, FormTitle } from "styles/form_grid";
import { Container } from "styles/styles";
import { FormElement, Input } from "styles/form";

const SignInScreenWrapper = styled.section`
  .form-separator {
    margin: 32px 0;
    column-gap: 18px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 24px 0;
    }

    .separator-text {
      border-radius: 50%;
      min-width: 36px;
      height: 36px;
      background-color: ${defaultTheme.color_purple};
      position: relative;
    }

    .separator-line {
      width: 100%;
      height: 1px;
      background-color: ${defaultTheme.color_platinum};
    }
  }

  .form-elem-text {
    margin-top: -16px;
    display: block;
  }
`;

const LoginForm = () => {
  const isLoadingLogin = useAppSelector((state) => state.user.loading);
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  // Lấy trạng thái checked or unchecked
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };
  const dispatch = useAppDispatch();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let UserCredential = { ...formValue, rememberMe: false }; // Truyền cả rememberMe nếu cần
    const login = await dispatch(loginUser(UserCredential)).unwrap();
    // Check for successful login
    if (login === "Successfully Sign in") {
      navigate("/");
    }
  };

  return (
    <SignInScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="brand-img-wrap flex items-center justify-center">
              <img className="site-brand-img" src={Souvi} alt="" />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <div className="w-full flex flex-col max-w-[550px]">
                  <div className="w-full flex flex-col mb-12">
                    <h3 className="text-4xl font-semibold mb-12">Đăng nhập</h3>
                    <p className="text-base mt-10">Chào mừng bạn trở lại !! Vui lòng điền thông tin của bạn.</p>
                  </div>
                </div>
              </FormTitle>

              <form className="w-full flex flex-col" onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  required
                  autoComplete="email"
                />
                <input
                  type="password"
                  name="password"
                  value={formValue.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  required
                  autoComplete="current-password"
                />
                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      className="w-4 h-4 mr-2"
                    />
                    <p className="text-sm">Remember me</p>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="w-full flex flex-col my-4">
                  <button
                    type="submit"
                    className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                  >
                    {isLoadingLogin == true ? "Loading!!!" : "Đăng nhập"}
                  </button>

                  <button className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                    Đăng kí
                  </button>
                </div>
              </form>
              <p className="flex flex-wrap account-rel-text">
                Bạn chưa có tài khoản ?
                <Link to="/sign_up" className="font-medium">
                  Đăng ký ngay tại đây !!
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignInScreenWrapper>
  );
};

export default LoginForm;
