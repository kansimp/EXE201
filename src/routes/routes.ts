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
import Cart from "@components/pages/Cart/Cart";
import NotFoundScreen from "@components/pages/error/NotFoundScreen";
import RegisterShop from "@components/pages/Register/RegisterShop";
import Checkout from "@components/pages/CheckOut/Checkout";
import OrderListScreen from "@components/pages/Order/OrderListScreen";
import OrderDetailScreen from "@components/pages/Order/OrderDetail";
import ConfirmScreen from "@components/pages/CheckOut/PaymentSuccess";
import ErrorScreen from "@components/pages/CheckOut/PaymentError";
import ProductShopListScreen from "@components/pages/ProductShop/ProductShop";
import ManagerLayout from "@components/pages/Manager/ManagerLayout";
import ManagerScreen from "@components/pages/Manager/ManagerScreen";
import SellerLayout from "@components/pages/Seller/SellerLayouts";
import TableProductsSeller from "@components/pages/Seller/TableProductsSeller";
import TablePostSeller from "@components/pages/Seller/TablePostSeller";
import TableOrderSeller from "@components/pages/Seller/TableOrderSeller";
import PostDetails from "@components/pages/Seller/PostDetail";
import DashboardSeller from "@components/pages/Seller/DashboardSeller";
import OrderTable from "@components/pages/Admin/OrderTable";

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
    path: "/register-shop",
    component: RegisterShop,
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
    path: "/tables",
    component: UserTable,
    layout: AdminLayout,
  },
  {
    path: "/admin-order",
    component: OrderTable,
    layout: AdminLayout,
  },
  {
    path: "/product-tables",
    component: TableProductsSeller,
    layout: SellerLayout,
  },
  {
    path: "/post-tables",
    component: TablePostSeller,
    layout: SellerLayout,
  },
  {
    path: "/posts/:postId/products",
    component: PostDetails,
    layout: SellerLayout,
  },
  {
    path: "/seller-order",
    component: TableOrderSeller,
    layout: SellerLayout,
  },
  {
    path: "/cart",
    component: Cart,
    layout: MainLayout,
  },
  {
    path: "/product/:id",
    component: ProductDetail,
    layout: MainLayout,
  },
  {
    path: "*",
    component: NotFoundScreen,
    layout: null,
  },
  {
    path: "/checkout",
    component: Checkout,
    layout: MainLayout,
  },
  {
    path: "/paymentSuccess",
    component: ConfirmScreen,
    layout: MainLayout,
  },
  {
    path: "/paymentError",
    component: ErrorScreen,
    layout: MainLayout,
  },
  {
    path: "/search",
    component: Product,
    layout: MainLayout,
  },
  {
    path: "/order",
    component: OrderListScreen,
    layout: MainLayout,
  },
  {
    path: "/order-detail/:orderCode",
    component: OrderDetailScreen,
    layout: MainLayout,
  },
  {
    path: "/shop/:shopId",
    component: ProductShopListScreen,
    layout: MainLayout,
  },
  {
    path: "/manager",
    component: ManagerScreen,
    layout: ManagerLayout,
  },
  {
    path: "/manager",
    component: ManagerScreen,
    layout: ManagerLayout,
  },
  {
    path: "/seller",
    component: DashboardSeller,
    layout: SellerLayout,
  },
];

const privateRoute: RouteType[] = [];

export { publicRoute, privateRoute };
