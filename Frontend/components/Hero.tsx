"use client";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import Link from "next/link";

const Hero = () => {
  const scrollToAboutSection = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="">
      <div className="relative w-full h- overflow-hidden object-cover container ">
        <div className="relative  w-full h-screen ">
          <Image
            src="/heroplane.png"
            width={120}
            height={70}
            className="object-contain absolute bottom-0 right-0"
            alt="header"
          />
        </div>
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 px-2 space-y-2 w-full">
          <h1 className="text-2xl md:text-5xl font-black font-primary text-center italic">
            E-ROCKET: The sustainable aviation fuel revolution.
          </h1>
          <p className="font-normal text-center md:text-lg mobile:hidden italic">
            Fasten your seatbelts and climb aboard. It&apos;s time to elevate
            your business by embracing sustainable aviation fuel solutions.
          </p>
          <div className="flex items-center justify-center space-x-5 pt-5">
            <div
              onClick={scrollToAboutSection}
              className="bg-[#FFD55A] text-primary px-[28px] py-2 font-primary font-semibold text-[17px] w-fit rounded-md hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
            >
              About Us
            </div>
            <Link href="/signup">
              <div className="flex items-center space-x-1 hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer">
                <p className="font-primary font-semibold text-[17px]">
                  Get Started
                </p>
                <div className="w-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
