"use client";
import React, { useState } from "react";
import MobileSidebar from "./mobile-sidebar";

const DashboardNavbar = () => {
  const [toggle, setToggle] = useState<Boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      {/* <div
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
      </div> */}
      <MobileSidebar />
    </div>
  );
};

export default DashboardNavbar;
