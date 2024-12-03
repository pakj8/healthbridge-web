import Image from "next/image";
import React from "react";
import Profile from "../../public/assets/profile.svg";
import Logo from "../../public/assets/logo.jpeg";

function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 z-10 bg-white shadow-md w-full">
      <div className="container mx-auto py-2 px-4 lg:max-w-[360px] flex items-center">
        <Image
          src={Logo}
          alt="GluStay Logo"
          width={1000}
          height={1000}
          className="w-auto h-10 mr-auto rounded-lg"
        />

        {/* Profile Icon */}
        {/* <Image
          src={Profile}
          alt="Profile Icon"
          width={26}
          height={26}
          className="cursor-pointer ml-auto"
        /> */}
      </div>
    </div>
  );
}

export default Navbar;
