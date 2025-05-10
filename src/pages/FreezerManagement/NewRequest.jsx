import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewRequest = () => {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [currentCapacity, setCurrentCapacity] = useState("");
  const [requestedCapacity, setRequestedCapacity] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="p-8 mx-auto w-full max-w-[1403px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 border border-gray-300 px-1 pb-1 hover:text-gray-700 text-2xl leading-none"
          >
            ←
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">
            Freezer Change Request
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {/* submit logic */}}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
        {/* Store Name */}
        <div className="w-full lg:w-[427px]">
          <label className="block mb-2 font-medium text-gray-700">
            Store Name
          </label>
          <select
            className="
              w-full
              h-[44px]
              border border-gray-300
              bg-white
              rounded-md
              px-3
              text-gray-700
              placeholder-gray-400
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          >
            <option value="" disabled>
              Select Store Name
            </option>
            <option>City Mart Downtown</option>
            <option>Swiri Nation</option>
            <option>GroCart India</option>
            <option>Local Loop Store</option>
          </select>
        </div>

        {/* Current Freezer Capacity */}
        <div className="w-full lg:w-[427px]">
          <label className="block mb-2 font-medium text-gray-700">
            Current Freezer Capacity
          </label>
          <select
            className="
              w-full
              h-[44px]
              border border-gray-300
              bg-white
              rounded-md
              px-3
              text-gray-700
              placeholder-gray-400
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
            value={currentCapacity}
            onChange={(e) => setCurrentCapacity(e.target.value)}
          >
            <option value="" disabled>
              Enter freezer capacity
            </option>
            <option>150 L</option>
            <option>250 L</option>
            <option>300 L</option>
          </select>
        </div>

        {/* Store ID */}
        <div className="w-full lg:w-[427px]">
          <label className="block mb-2 font-medium text-gray-700">
            Store ID
          </label>
          <input
            type="text"
            value="XD123RT567"
            disabled
            className="
              w-full
              h-[44px]
              border border-gray-200
              bg-gray-100
              rounded-md
              px-3
              text-gray-500
              cursor-not-allowed
              focus:outline-none
            "
          />
        </div>

        {/* Requested Freezer Capacity */}
        <div className="w-full lg:w-[427px]">
          <label className="block mb-2 font-medium text-gray-700">
            Requested Freezer Capacity
          </label>
          <select
            className="
              w-full
              h-[44px]
              border border-gray-300
              bg-white
              rounded-md
              px-3
              text-gray-700
              placeholder-gray-400
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
            value={requestedCapacity}
            onChange={(e) => setRequestedCapacity(e.target.value)}
          >
            <option value="" disabled>
              Enter freezer capacity
            </option>
            <option>300 L</option>
            <option>400 L</option>
          </select>
        </div>
      </div>

      {/* Change Reason */}
      <div className="mt-8 w-full lg:w-[427px]">
        <label className="block mb-2 font-medium text-gray-700">
          Change Reason
        </label>
        <textarea
          className="
            w-full
            h-[87px]
            border border-gray-300
            rounded-md
            p-3
            text-gray-700
            placeholder-gray-400
            focus:outline-none focus:ring-1 focus:ring-blue-500
          "
          placeholder="Increased frozen goods sales requiring more capacity"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NewRequest;
