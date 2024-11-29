import { useEffect, useState } from "react";
import { useGetPatientDetailsByPatientId } from "../graphql/patients/datasource";
import Logo from "../public/assets/logo.jpeg";
import Image from "next/image";

export default function Home() {
  const [patientId, setPatientId] = useState("");
  const [showPage, setShowPage] = useState("Main");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

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
        // Reservation ID exists, redirect to another page
        // router.push(`/`);
        setShowPage("Confirm");
        setUserData(result?.data?.getPatientByPatientId);
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
    <div className="container mx-auto px-5 flex justify-center items-center h-screen">
      <div className="w-full lg:w-[360px]">
        {showPage === "Main" ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full mt-1 justify-center items-center"
          >
            <Image
              src={Logo}
              alt="logo"
              width={1000}
              height={1000}
              className="w-20 h-20"
            />

            <h4 className="font-bold text-3xl text-center">
              Welcome <br />{" "}
              <span className="font-semibold">to Healthbridge</span>
            </h4>

            <div className="w-full">
              <input
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                type="text"
                required
                className={`mt-4 p-2 rounded-md font-semibold uppercase font-lato w-full  text-[#121212] border outline-none ${
                  error
                    ? "border-red-500 border-2 animate-shake"
                    : "border-blue-400"
                }`}
                placeholder="PATIENT ID"
              />
              {error && (
                <p className="text-red-500 font-semibold text-sm mt-2 animate-shake">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={` w-full rounded-lg bg-blue-400 text-white font-lato font-bold py-2`}
            >
              Submit
            </button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
