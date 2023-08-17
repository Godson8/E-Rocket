import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="py-12">
      <p className="text-primary text-sm font-secondary text-center">
        &copy; {year} E-Rocket All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
