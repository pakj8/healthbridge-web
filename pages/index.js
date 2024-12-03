import { useEffect, useState } from "react";
import { useGetPatientDetailsByPatientId } from "../graphql/patients/datasource";
import Logo from "../public/assets/logo.jpeg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const [patientId, setPatientId] = useState("");
  const [showPage, setShowPage] = useState("Main");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const router = useRouter();

  const { refetch } = useGetPatientDetailsByPatientId(patientId?.toUpperCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!patientId || patientId.trim() === "") {
      setError("Reservation ID is required.");
      triggerShake();
      return;
    }

    try {
      const result = await refetch();

      if (result?.data?.getPatientByPatientId) {
        setShowPage("Confirm");
        setPatientDetails(result?.data?.getPatientByPatientId);
      } else {
        setError("Reservation ID not found. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full lg:w-[400px] bg-white shadow-lg rounded-lg p-6">
        {showPage === "Main" ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full justify-center items-center"
          >
            <div className="flex justify-center mb-6">
              <Image
                src={Logo}
                alt="HealthBridge Logo"
                width={1000}
                height={1000}
                className="w-16 h-16 object-contain"
              />
            </div>

            <h4 className="font-semibold text-3xl text-center text-gray-800">
              Welcome to <br />
              <span className="font-bold text-blue-600">HealthBridge</span>
            </h4>

            <div className="w-full">
              <input
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                type="text"
                required
                className={`mt-4 p-4 rounded-md font-semibold uppercase text-gray-700 border outline-none shadow-sm w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  error
                    ? "border-red-500 animate-shake"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Enter Patient ID"
              />
              {error && (
                <p className="text-red-500 font-semibold text-sm mt-2 animate-shake">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="font-poppins text-2xl text-gray-800">
              Are you <br />
              <span className="font-bold text-blue-600">
                {patientDetails?.firstName} {patientDetails?.lastName}
              </span>
              ?
            </p>
            <div className="space-y-6 mt-8">
              <button
                onClick={() =>
                  router.push(`/healthbridge/${patientDetails?.patientId}`)
                }
                className="w-72 mx-auto flex justify-center items-center text-base font-medium border border-blue-600 h-14 rounded-md hover:bg-blue-600 text-[#000000] transition-all duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => setShowPage("Main")}
                className="w-72 mx-auto flex justify-center items-center font-poppins text-base font-medium border border-blue-600 h-14 rounded-md hover:bg-blue-600 text-[#000000] transition-all duration-300"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
