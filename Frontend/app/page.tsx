import React from "react";
import Logo from "../components/Logo";
import "./globals.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FirstSection from "../components/FirstSection";
import SecondSection from "../components/SecondSection";
import Footer from "../components/Footer";
import MidSection from "../components/MidSection";

const page = () => {
  return (
    <div>
      <Header />
      <Hero />
      <MidSection />
      <FirstSection />
      <SecondSection />
      <Footer />
    </div>
  );
};

export default page;
