import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home/Home";
import Register from "@components/pages/Register/Register";
import { ComponentType } from "react";
import LoginForm from "@components/pages/Login/Login";
import UserProfile from "@components/pages/UserProfile/UserProfile";
import VerifyAccount from "@components/pages/VerifyAccount/VerifyAccount";

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
    layout: null,
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
];

const privateRoute: RouteType[] = [];

export { publicRoute, privateRoute };
