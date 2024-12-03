import React from "react";

function HealthBridgeHomeTop({ patientDetails }) {
  return (
    <div className="flex flex-col gap-4 p-5 bg-blue-50 rounded-lg shadow-lg">
      {/* Welcome Section */}
      <div className="text-center">
        <p className="font-poppins text-base font-medium text-blue-900">
          Welcome
          <span className="font-semibold text-blue-600">
            {" "}
            {patientDetails?.firstName} {patientDetails?.lastName}
          </span>
        </p>
        <p className="text-xs font-light text-gray-500">
          We’re here to ensure your health and comfort.
        </p>
      </div>

      {/* Patient ID Section */}
      <div className="flex items-center justify-between bg-blue-100 py-3 px-4 rounded-lg border border-blue-200 shadow-sm">
        <p className="font-poppins text-sm font-medium text-blue-700">
          Patient ID:{" "}
          <span className="font-semibold text-blue-900">
            {patientDetails?.patientId}
          </span>
        </p>
      </div>
    </div>
  );
}

export default HealthBridgeHomeTop;
