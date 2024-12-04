import React from "react";
import Image from "next/image";
import { useRouter } from "next/router"; // Import useRouter for navigation
import ConsultationIcon from "../../public/assets/medical-consultation.png";
import ComplaintIcon from "../../public/assets/bad-review.png";
import DocumentIcon from "../../public/assets/document.png";
import EmergencyIcon from "../../public/assets/emergency-call.png";

function Activity({ patientId }) {
  const router = useRouter();

  const tiles = [
    {
      title: "Upcoming Consultation",
      icon: ConsultationIcon,
      description: "View your scheduled appointments and stay updated.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      onClick: () => router.push(`/healthbridge/consultation/`),
    },
    {
      title: "Raise a Complaint",
      icon: ComplaintIcon,
      description: "Report any issues or concerns directly to our team.",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      onClick: () => router.push(`/healthbridge/raisecomplaint/${patientId}`),
    },
    {
      title: "Patient Documents",
      icon: DocumentIcon,
      description: "Access your medical records and reports anytime.",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      title: "Emergency Services",
      icon: EmergencyIcon,
      description: "Contact emergency services quickly and efficiently.",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ];

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
        Services
      </h1>
      <div className="grid grid-cols-2 gap-6">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`p-6 border ${tile.borderColor} rounded-xl shadow-md ${tile.bgColor} hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer`}
            onClick={tile.onClick}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="rounded-full bg-white p-4 shadow-sm">
                <Image
                  src={tile.icon}
                  alt={tile.title}
                  height={40}
                  width={40}
                />
              </div>
              <h2 className={`text-lg font-semibold ${tile.textColor}`}>
                {tile.title}
              </h2>
              <p className="text-sm text-gray-600">{tile.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activity;
