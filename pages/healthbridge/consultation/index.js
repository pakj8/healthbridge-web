import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main styles
import "react-date-range/dist/theme/default.css"; // Theme styles

function Index() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="container mx-auto mt-16 flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        Upcoming Consultations
      </h1>

      <div className="flex flex-col items-center mb-8">
        <h2 className="text-lg font-medium mb-4 text-gray-700">
          Select Date Range
        </h2>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4 text-gray-700">
          Scheduled Appointments
        </h2>
        <p className="text-sm text-gray-500 text-center mt-4">
          No appointments scheduled yet.
        </p>
      </div>
    </div>
  );
}

export default Index;
