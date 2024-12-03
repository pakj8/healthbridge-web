import React, { useState } from "react";

function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, like sending the data to a backend
    console.log("Complaint Raised", { name, email, subject, complaint });
  };

  return (
    <div className="container mx-auto mt-16 flex flex-col items-center p-4">
      <h2 className="text-3xl font-semibold text-blue-700 mb-8">
        Raise a Complaint
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="flex flex-col gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-blue-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-blue-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-2 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the subject of your complaint"
              required
            />
          </div>

          {/* Complaint Details */}
          <div>
            <label
              htmlFor="complaint"
              className="block text-sm font-medium text-blue-700"
            >
              Complaint Details
            </label>
            <textarea
              id="complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              rows="5"
              className="w-full mt-2 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Describe your complaint in detail"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full max-w-sm bg-blue-500 text-white font-semibold text-lg py-3 rounded-md hover:bg-blue-600 transition ease-in-out duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Index;
