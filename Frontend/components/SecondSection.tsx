import React from "react";
import Button from "./Button";
import Link from "next/link";

const SecondSection = () => {
  return (
    <div className="container py-16 space-y-6 relative flex flex-col items-center justify-center">
      <div className="w-24">
        <svg viewBox="0 0 200 200">
          <path
            d="M 111.499 135.487 C 107.724 135.487 107.069 133.3 104.389 131.449 C 96.149 125.755 89.128 117.881 83.444 110.448 C 75.664 100.276 68.32 89.065 65.02 77.333 C 63.681 72.565 63.719 64.849 64.791 60.058 C 66.357 53.063 71.931 60.755 74.345 62.297 C 83.955 68.433 90.442 82.017 93.688 91.249 C 94.899 94.698 97.739 97.037 97.739 91.623 C 97.739 82.248 100.405 75.537 105.689 67.266 C 108.483 62.893 124.561 38.208 131.834 49.371 C 135.891 55.604 134.891 62.684 134.891 70.063 C 134.891 85.59 126.758 100.178 121.056 114.859 C 117.506 123.994 113.777 133.538 108.746 142.198 C 107.355 144.592 105.494 153.584 103.243 154.5"
            strokeWidth="10"
            stroke="rgb(0, 0, 0)"
            strokeLinecap="round"
            fill="none"
            strokeMiterlimit="10"
          ></path>
        </svg>
      </div>
      <h1 className="font-secondary text-3xl text-center">
        Join the Green Revolution
      </h1>
      <p className="max-w-2xl text-center leading-9">
        Ready to soar into a cleaner future? Take the leap with E-Rocket’s
        innovative B2B marketplace and give your aviation business the
        eco-friendly boost it needs. Join us today and elevate your impact.
      </p>
      <Link href="/signup">
        <div className="bg-[#FFD55A] text-primary px-[28px] py-2 font-primary font-semibold text-[17px] w-fit rounded-md hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer">
          Sign Up Now
        </div>
      </Link>
    </div>
  );
};

export default SecondSection;
