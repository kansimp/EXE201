import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Box } from "@mui/material";
import Text from "../components/Atom/Text";

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-300 p-10 font-[sans-serif] tracking-wide">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:flex lg:items-center">
          <a href="javascript:void(0)">
            <img src="https://readymadeui.com/readymadeui-light.svg" alt="logo" className="w-52" />
          </a>
        </div>

        <div className="lg:flex lg:items-center">
          <ul className="flex space-x-6">
            <li>
              <a href="javascript:void(0)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-rgb(94, 95, 119) hover:fill-white w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-rgb(94, 95, 119) hover:fill-white w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-rgb(94, 95, 119) hover:fill-white w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-rgb(94, 95, 119)">Contact Us</h4>
          <ul className="space-y-4">
            <li>
              <a href="javascript:void(0)" className="text--rgb(94, 95, 119) hover:text-white text-sm">
                Email
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-rgb(94, 95, 119) hover:text-white text-sm">
                Phone
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-rgb(94, 95, 119) hover:text-white text-sm">
                Address
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-rgb(94, 95, 119)">Information</h4>
          <ul className="space-y-4">
            <li>
              <a href="javascript:void(0)" className="text-rgb(94, 95, 119) hover:text-white text-sm">
                About Us
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-rgb(94, 95, 119) hover:text-white text-sm">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-rgb(94, 95, 119) hover:text-white text-sm">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-rgb(94, 95, 119) text-sm mt-10">© ReadymadeUI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
export {};
