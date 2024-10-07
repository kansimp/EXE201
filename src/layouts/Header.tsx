import React from "react";
import Souvi from "../assets/images/souvi.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={""} className="flex items-center">
            <img
              src={Souvi}
              className="mr-3 h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              alt="Souvi Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SOUVI</span>
          </Link>

          <div className="flex-grow max-w-3xl mx-auto lg:order-1">
            <div className="flex rounded-md border-2 border-pink-400 overflow-hidden font-[sans-serif]">
              <input
                type="email"
                placeholder="Search Something..."
                className="w-full outline-none bg-white text-black-600 text-sm px-4 py-3"
              />
              <button type="button" className="flex items-center justify-centerblack bg-pink-400 px-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="16px"
                  className="fill-white"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center lg:order-2">
            <Link
              to={""}
              className="text-black bg-pink-300 hover:bg-gray-600 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Sign in
            </Link>
            <Link
              to={""}
              className="text-black bg-pink-300 hover:bg-gray-600 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
export {};
