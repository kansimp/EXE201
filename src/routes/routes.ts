import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home/Home";
import Register from "@components/pages/Register/Register";
import { ComponentType } from "react";
import LoginForm from "@components/pages/Login/Login";
import UserProfile from "@components/pages/UserProfile/UserProfile";
import VerifyAccount from "@components/pages/VerifyAccount/VerifyAccount";
import Header from "@components/pages/Admin/Header/Header";
import AuthLayout from "@layouts/AuthLayout";
import AuthHeader from "@layouts/AuthHeader";

export type RouteType = {
  path: string;
  component: ComponentType<any>;
  layout?: ComponentType<any> | null;
};

const publicRoute: RouteType[] = [
  {
    path: "/",
    component: Home,
    layout: MainLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: null,
  },
  {
    path: "/login",
    component: LoginForm,
    layout: AuthLayout,
  },
  {
    path: "/userprofile",
    component: UserProfile,
    layout: MainLayout,
  },
  {
    path: "/verify",
    component: VerifyAccount,
    layout: null,
  },
  {
    path: "/auth",
    component: AuthHeader,
    layout: null,
  },
];

const privateRoute: RouteType[] = [];

export { publicRoute, privateRoute };
