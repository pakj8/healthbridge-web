import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-black text-white w-full  mt-10">
      <div className="text-center">
        <p className="font-poppins text-2xl font-semibold mb-2 text-gray-300">
          HealthBridge
        </p>
        <p className="font-poppins text-lg font-light text-gray-400">
          © {year} All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
