import Breadcrumb from "@common/Breadcrum";
import Title from "@common/Title";
import UserMenu from "@components/user/User";
import { BaseLinkGreen } from "@styles/button";
import { FormElement, Input } from "@styles/form";
import { Container } from "@styles/styles";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { UserContent, UserDashboardWrapper } from "@styles/user";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AccountScreenWrapper = styled.main`
  .address-list {
    margin-top: 20px;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;

    @media (max-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .address-item {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px;
    row-gap: 8px;
  }

  .address-tags {
    gap: 12px;

    li {
      height: 28px;
      border-radius: 8px;
      padding: 2px 12px;
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  .address-btns {
    margin-top: 12px;
    .btn-separator {
      width: 1px;
      border-radius: 50px;
      background: ${defaultTheme.color_platinum};
      margin: 0 10px;
    }
  }
`;

const breadcrumbItems = [
  {
    label: "Home",
    link: "/",
  },
  { label: "Account", link: "/account" },
];

const AccountScreen = () => {
  return (
    <AccountScreenWrapper className="page-py-spacing mb-8 mt-8">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Account"} />
            <div className="flex flex-col items-center space-y-6 mb-5">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-gray-400 dark:ring-indigo-500"
                src={""}
                alt="Bordered avatar"
              />
              <div className="flex flex-col space-y-3">
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-white bg-gray-800 rounded-lg border border-pink-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                >
                  Thay đổi ảnh
                </button>
              </div>
            </div>
            <form>
              <div className="form-wrapper">
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Your Name
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value="Richard Doe"
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      Change
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Email Address
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="email"
                      className="form-elem-control text-outerspace font-semibold"
                      value="richard@gmail.com"
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      Change
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Phone Number
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value="+9686 6864 3434"
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      Change
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Password
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="password"
                      className="form-elem-control text-outerspace font-semibold"
                      value="Pass Key"
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      Change
                    </button>
                  </div>
                </FormElement>
              </div>
              <div>
                <h4 className="text-2xl">My Contact Addresss</h4>
                <div className="address-list grid">
                  <div className="address-item grid">
                    <p className="text-outerspace text-lg font-semibold address-title">Richard Doe</p>
                    <p className="text-gray text-base font-medium address-description">
                      1/4 Watson Street Flat, East Coastal Road, Ohio City
                    </p>
                    <ul className="address-tags flex flex-wrap">
                      <li className="text-gray text-base font-medium inline-flex items-center justify-center">Home</li>
                      <li className="text-gray text-base font-medium inline-flex items-center justify-center">
                        Default billing address
                      </li>
                    </ul>
                    <div className="address-btns flex">
                      <Link to="/" className="text-base text-outerspace font-semibold">
                        Remove
                      </Link>
                      <div className="btn-separator"></div>
                      <Link to="/" className="text-base text-outerspace font-semibold">
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>
  );
};

export default AccountScreen;
