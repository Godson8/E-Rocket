import Image from "next/image";
import React from "react";

const MidSection = () => {
  return (
    <div className="container pt-12" id="about-section">
      <div className="pb-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="w-full bg-slate-300 h-[500px] shadow-nav rounded-3xl p-9 relative flex justify-end overflow-hidden">
          <div className="w-3/4 space-y-2  flex flex-col z-10">
            <h1 className="text-right text-xl md:text-4xl italic font-black font-primary">
              WHAT WE DO
            </h1>
            <div className="text-right">
              Learn about E-Rocket, an Avatar Innovations sponsored start-up
              dedicated to reducing the greenhouse gas emissions impact of
              aviation.{" "}
              <p className="mobile:hidden">
                We provide clients with access to sustainable aviation fuel
                (SAF) and offer emissions reductions certificates to neutralize
                scope 3 travel emissions.
              </p>
            </div>
          </div>
          <Image
            src="/planebuilding.png"
            width={200}
            height={100}
            className="object-contain absolute bottom-0 left-0 rounded-3xl"
            alt="header"
          />
        </div>
        <div className="w-full bg-[#D7F75B] h-[500px] shadow-nav rounded-3xl p-9 relative flex justify-end overflow-hidden">
          <div className="md:w-3/4 space-y-2  flex flex-col z-10">
            <h1 className="text-right text-xl md:text-4xl italic font-black font-primary">
              OUR SUSTAINABLE AVIATION FUEL
            </h1>
            <p className="text-right">
              Discover how our sustainable aviation fuel (SAF) is helping to
              reduce greenhouse gas emissions in the aviation industry. With our
              emissions reductions certificates, you can neutralize your scope 3
              travel emissions and gain reputational benefits.
            </p>
          </div>
          <Image
            src="/rotorr.png"
            width={480}
            height={100}
            className="object-contain absolute -bottom-16 left-0 rounded-3xl"
            alt="header"
          />
        </div>
        <div className="w-full bg-[#7D451B] h-[500px] shadow-nav rounded-3xl p-9 relative flex justify-end overflow-hidden">
          <div className="w-3/4 space-y-2  flex flex-col z-10">
            <h1 className="text-right text-xl md:text-4xl italic font-black font-primary text-slate-200">
              WHY CHOOSE
              <br /> E-ROCKET
            </h1>
            <div className="text-right text-slate-200">
              At E-Rocket, we are committed to making a positive impact on the
              environment by providing access to sustainable aviation fuel.{" "}
              <p className="mobile:hidden">
                Join us in reducing carbon emissions and become recognized as
                one of our certified sustainability partners!
              </p>
            </div>
          </div>
          {/* <Image
            src="/plane.png"
            width={480}
            height={100}
            className="object-contain absolute -bottom-16 left-0 rounded-3xl"
            alt="header"
          /> */}
        </div>
        <div className="w-full bg-slate-300 h-[500px] shadow-nav rounded-3xl p-9 relative flex justify-end overflow-hidden">
          <div className="w-3/4 space-y-2  flex flex-col z-10">
            <h1 className="text-right text-xl md:text-4xl italic font-black font-primary">
              WHAT WE DO
            </h1>
            <div className="text-right">
              Learn about E-Rocket, an Avatar Innovations sponsored start-up
              dedicated to reducing the greenhouse gas emissions impact of
              aviation.{" "}
              <p className="mobile:hidden">
                We provide clients with access to sustainable aviation fuel
                (SAF) and offer emissions reductions certificates to neutralize
                scope 3 travel emissions.
              </p>
            </div>
          </div>
          {/* <Image
            src="/plane.png"
            width={480}
            height={100}
            className="object-contain absolute bottom-0 left-0 rounded-3xl"
            alt="header"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default MidSection;
