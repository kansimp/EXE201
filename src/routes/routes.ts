
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home/Home";
import Register from "@components/pages/Register/Register";
import { ComponentType } from "react";
import LoginForm from "@components/pages/Login/Login";
import UserProfile from "@components/pages/UserProfile/UserProfile";
import VerifyAccount from "@components/pages/VerifyAccount/VerifyAccount";
import AuthLayout from "@layouts/AuthLayout";
import AuthHeader from "@layouts/AuthHeader";
import ResetScreen from "@components/pages/Password/SendEmailResetPassWord";
import ChangePasswordScreen from "@components/pages/ChangePassWord/ChangePassWord";
import AccountScreen from "@components/pages/Account/Account";
import ProductDetail from "@components/pages/ProductDetail/ProductDetail";
import Product from "@components/pages/Product/Product";
import WishListScreen from "@components/pages/Wishlist/Wishlist";
import AdminLayout from "@layouts/AdminLayouts";
import Dashboard from "@components/pages/Admin/Dashboard";
import UserTable from "@components/pages/Admin/UserTable";
import Cart from '@components/pages/Cart/Cart';


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
    layout: AuthLayout,
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
    layout: AuthLayout,
  },
  {
    path: "/reset-password",
    component: ResetScreen,
    layout: AuthLayout,
  },
  {
    path: "/change-password/:token",
    component: ChangePasswordScreen,
    layout: AuthLayout,
  },
  {
    path: "/account",
    component: AccountScreen,
    layout: MainLayout,
  },
  {
    path: "/product/details",
    component: ProductDetail,
    layout: MainLayout,
  },
  {
    path: "/product",
    component: Product,
    layout: MainLayout,
  },
  {
    path: "/wishlist",
    component: WishListScreen,
    layout: MainLayout,
  },
  {
    path: "/admin",
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: "/admin/tables",
    component: UserTable,
    layout: AdminLayout,
  },
  {
    path: '/cart',
    component: Cart,
    layout: MainLayout,
},
{
    path: '/product/:id',
    component: ProductDetail,
    layout: MainLayout,
},
];

const privateRoute: RouteType[] = [];

export { publicRoute, privateRoute };
