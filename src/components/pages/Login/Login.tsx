import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/slices/userSlice";
import Souvi from "../../../assets/images/souvi.png";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

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
    <div className="w-full h-screen flex items-start">
      <div className="relative w-2/3 h-full flex flex-col">
        <img src={Souvi} className="w-full h-full" alt="" />
      </div>
      <div className="w-1/2 h-full bg-[#fff] flex flex-col p-20 justify-between items-center">
        <h1 className="w-full max-w-[550px] mx-auto text-xl text-[#060606] font-semibold mr-auto">
          Souvi dịch vụ mua sắm quà tặng tốt nhất cho bạn
        </h1>
        <div className="w-full flex flex-col max-w-[550px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-4xl font-semibold mb-2">Đăng nhập</h3>
            <p className="text-base mb-2">Chào mừng bạn trở lại !! Vui lòng điền thông tin của bạn.</p>
          </div>
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
              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                Quên mật khẩu?
              </p>
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
          {/* <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5] px-2">or</p>
          </div> */}
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-black">
            Don't have a account ?{" "}
            <span className="font-semibold underline underline-offset-2 cursor-pointer">Sign up for free ?</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
