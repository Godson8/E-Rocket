import Image from "next/image";
import React from "react";

const LogoWhite = () => {
  return (
    <Image
      className="object-contain"
      width={170}
      height={70}
      src="/LogoWhite.svg"
      alt="LogoWhite"
    />
  );
};

export default LogoWhite;
