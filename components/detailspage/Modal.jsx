import React from "react";
import Image from "next/image";
import CloseIcon from "../../public/assets/close.png";

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5 z-50">
      <div className="relative bg-white rounded-lg p-6 w-80 lg:w-[360px] max-h-[75vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 bg-gray-200 p-1 rounded-full"
          onClick={onClose}
        >
          <Image src={CloseIcon} alt="Close" width={15} height={15} />
        </button>
        <h1 className="font-poppins text-lg font-semibold mb-4">{title}</h1>
        <div className="text-sm font-poppins space-y-3">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
