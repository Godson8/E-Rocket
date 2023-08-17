import React from "react";

const FirstSection = () => {
  return (
    <div className=" -top-4 bg-[#f3f5f5]">
      <div className="container py-16 space-y-6 relative">
        <h1 className="font-secondary text-3xl text-right z-30">
          Fueling the Future
        </h1>
        <div className="w-36 absolute top-0 left-0 z-0">
          <svg viewBox="0 0 200 200">
            <path
              d="M 73.587 79.826 C 73.587 76.773 73.354 74.814 75.814 72.709 C 78.225 70.647 81.446 70.93 84.38 70.93 C 86.255 70.93 87.83 70.713 88.637 72.808 C 89.514 75.084 90.519 76.832 90.519 79.382 C 90.519 80.739 90.295 80.466 90.964 79.48 C 92.583 77.099 95.322 75.109 97.648 73.5 C 101.822 70.611 107.176 68.261 112.352 68.261 C 113.824 68.261 118.766 68.332 119.036 70.485 C 119.271 72.366 120.388 75.268 118.59 76.935 C 117.627 77.827 117.044 79.096 116.114 80.024 C 115.953 80.185 115.251 80.243 115.322 80.172 C 115.845 79.651 116.864 79.403 117.525 79.134 C 123.355 76.764 129.498 75.827 135.794 76.292 C 138.05 76.459 139.471 77.614 141.314 78.739 C 142.411 79.408 142.57 80.562 143.319 81.161 C 145.194 82.658 141.693 86.237 141.116 87.389 C 140.883 87.854 139.912 88.999 140.918 89.143 C 142.804 89.412 144.615 89.673 146.439 90.28 C 149.473 91.289 152.931 92.837 154.434 95.84 C 156.594 100.153 153.454 103.969 150.226 106.688 C 146.558 109.778 142.852 110.652 138.196 110.519 C 137.174 110.49 136.609 109.858 135.868 109.283 C 135.666 109.126 135.065 112.579 134.977 112.842 C 132.814 119.321 126.892 128.328 119.828 130.091 C 112.559 131.905 93.196 133.345 98.094 120.404 C 98.48 119.382 99.009 117.859 99.777 117.092 C 100.485 116.385 99.146 117.813 98.539 117.982 C 92.815 119.569 86.261 120.877 80.369 119.316 C 74.545 117.774 69.985 113.862 66.11 109.53 C 63.227 106.306 65.998 102.3 68.017 99.819 C 68.578 99.129 69.748 97.853 70.69 97.644 C 71.732 97.413 72.06 97.955 70.864 98.286 C 67.963 99.091 64.799 99.398 61.804 99.398 C 58.668 99.398 55.094 99.905 52.199 98.459 C 44.911 94.822 40.23 83.721 48.634 78.764 C 52.281 76.613 57.254 74.489 61.556 74.489 C 64.066 74.489 67.451 73.891 69.799 74.933 C 71.663 75.76 74.868 77.492 75.814 79.381"
              strokeWidth="5"
              stroke="rgb(227, 227, 255)"
              strokeLinecap="round"
              fill="none"
              strokeMiterlimit="10"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col md:flex-row space-y-9 md:space-y-0 md:space-x-16">
          <p className="leading-9 text-justify">
            Welcome to E-Rocket, the revolutionary digital platform for buying
            and selling sustainable aviation fuel. Say goodbye to traditional
            fossil fuels and hello to a cleaner, environmentally-friendly way of
            flying.
          </p>
          <p className="leading-9 text-justify">
            E-Rocket bridges the gap between corporate buyers and sellers,
            making it easier than ever to adopt sustainable aviation fuel. Don’t
            miss your chance to be part of the green revolution in the sky.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
