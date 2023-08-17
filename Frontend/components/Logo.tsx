import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      className="object-contain"
      width={170}
      height={70}
      src="/logo.svg"
      alt="Logo"
    />
  );
};

export default Logo;
