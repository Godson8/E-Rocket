"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  const [toggle, setToggle] = useState<Boolean>(false);

  const [navBar, setNavBar] = useState(false);

  const showNavBar = () => {
    if (window.scrollY >= 67) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", showNavBar);
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div
      className={`${
        navBar && "shadow-nav"
      } bg-white sticky top-0  z-[99999] w-full`}
    >
      <div className="container z-30 bg-white">
        <div className="bg-white w-full flex justify-between items-center h-[67px]">
          <Link href="/">
            <div className="relative cursor-pointer">
              <Logo />
            </div>
          </Link>

          <div
            className="flex justify-center items-center w-8 h-8 cursor-pointer md:hidden"
            onClick={handleToggle}
          >
            <div
              className={`w-7 h-1 before:bg-primary after:bg-primary rounded-full before:content-[''] after:content-[''] before:absolute after:absolute before:rounded-full after:rounded-full before:w-7  after:w-7 before:h-1 after:h-1 transition after:transition before: ease-in-out after:ease-in-out before:duration-500 after:duration-500
                      ${
                        !toggle
                          ? " bg-primary before:-translate-y-2.5 after:translate-y-2.5"
                          : " bg-transparent  before:rotate-45 after:-rotate-45"
                      }`}
            ></div>
          </div>

          <div
            className={` mobile:absolute mobile:w-full  mobile:bg-white mobile:right-0 mobile:transition-all mobile:ease-in-out mobile:-z-10 mobile:shadow-nav
                  ${
                    toggle
                      ? " mobile:top-16 mobile:duration-700 mobile:overflow-y-scroll max-h-screen mobile:border-t mobile:border-opacity-30  mobile:border-solid"
                      : " mobile:-top-[750px]  mobile:duration-500 "
                  }`}
          >
            <ul className="mobile:bg-white mobile:pl-6 mobile:pr-6 mobile:h-full mobile:flex mobile:flex-col mobile:pt-5 mobile:shadow-nav mobile:font-primary font-semibold md:h-16 md:flex md:items-center md:gap-8 md:pt-0 md:text-base md:z-20">
              <li className="hover:text-cyan-700 transition-all underline">
                <Link href="/signin">Sign In</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
