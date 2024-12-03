import React, { useState } from "react";
import Image from "next/image";
import PrivacyIcon from "../../public/assets/gdpr.png";
import AboutUsIcon from "../../public/assets/about.png";
import FaqIcon from "../../public/assets/conversation.png";
import Modal from "./Modal";

function Details() {
  const [activeModal, setActiveModal] = useState(null);

  const handleModalOpen = (modalType) => {
    setActiveModal(modalType);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <div className=" mt-10">
      <div className="grid grid-cols-3 gap-3">
        {/* Privacy and Law */}
        <section
          className="bg-gradient-to-r from-blue-300 to-blue-500 py-6 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all"
          onClick={() => handleModalOpen("privacy")}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-white p-4 shadow-sm">
              <Image
                src={PrivacyIcon}
                alt="Privacy Icon"
                height={30}
                width={30}
              />
            </div>
            <p className="text-sm font-semibold text-white text-center">
              Privacy and Law
            </p>
          </div>
        </section>

        {/* About Us */}
        <section
          className="bg-gradient-to-r from-blue-300 to-blue-500 py-6 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all"
          onClick={() => handleModalOpen("about")}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-white p-4 shadow-sm">
              <Image
                src={AboutUsIcon}
                alt="About Us Icon"
                height={30}
                width={30}
              />
            </div>
            <p className="text-sm font-semibold text-white">About Us</p>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="bg-gradient-to-r from-blue-300 to-blue-500 py-6  rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all"
          onClick={() => handleModalOpen("faq")}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-white p-4 shadow-sm">
              <Image src={FaqIcon} alt="FAQ Icon" height={30} width={30} />
            </div>
            <p className="text-sm font-semibold text-white">FAQ</p>
          </div>
        </section>
      </div>

      {/* Privacy Modal */}
      {activeModal === "privacy" && (
        <Modal title="Privacy and Law" onClose={handleModalClose}>
          <p className="text-gray-600 text-sm">
            Privacy and legal policies help ensure transparency and protect user
            rights. Follow the guidelines to maintain compliance.
          </p>
        </Modal>
      )}

      {/* About Us Modal */}
      {activeModal === "about" && (
        <Modal title="About Us" onClose={handleModalClose}>
          <p className="text-gray-600 text-sm">
            We are dedicated to providing the best experience for our users by
            creating seamless and innovative solutions.
          </p>
        </Modal>
      )}

      {/* FAQ Modal */}
      {activeModal === "faq" && (
        <Modal title="FAQ" onClose={handleModalClose}>
          <p className="text-gray-600 text-sm">
            Find answers to the most frequently asked questions to help you get
            started and address your concerns.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default Details;
