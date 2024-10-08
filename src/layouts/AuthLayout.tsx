import { ReactNode } from "react";
import AuthHeader from "./AuthHeader";
import Footer from "./Footer";

export type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <AuthHeader />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default AuthLayout;
