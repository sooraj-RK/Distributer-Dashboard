import React from "react";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const RejectionDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#000000B2] backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#FFFFFF] rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">

          {/* Title Section */}
          <div className="mb-8">
          <div className="flex items-center">
          <ReportProblemIcon className="text-red-400 mr-1" fontSize="medium" />
          <h1 className="text-[22px] font-bold text-[#111827]">
            Order Rejection Details
          </h1>
          </div>
          
          {/* Order Rejection Notice */}
          <p className="text-[15px] font-small text-[#556987] mb-6">
            Order #{order.id} was rejected by the factory
          </p>
          </div>
          
          
          <div className="space-y-2 mb-6 w-full">
            <div className="flex gap-10">
              <span className="w-[200px] text-[14px] font-medium text-[#4B5563]">
                Store Name:
              </span>
              <span className="text-[14px] text-[#111827]">
                Food Bazaar (KLM012)
              </span>
            </div>
            <div className="flex gap-10">
              <span className="w-[200px] text-[14px] font-medium text-[#4B5563]">
                Date:
              </span>
              <span className="text-[14px] text-[#111827]">
                18/03/25 11:00 AM
              </span>
            </div>
            <div className="flex gap-10">
              <span className="w-[200px] text-[14px] font-medium text-[#4B5563]">
                Rejected On:
              </span>
              <span className="text-[14px] text-[#111827]">
                19/03/25 09:30 AM
              </span>
            </div>
            <div className="flex">
              <span className="w-[200px] text-[14px] font-medium text-[#4B5563]">
                Rejection Reason:
              </span>
              <span className="text-[14px] text-[#111827]"></span>
            </div>
          </div>

          {/* Rejection Reason Text */}
          <p className="text-[14px] text-[#374151] mb-6 leading-[22px] bg-[#F3F4F6] rounded-[5px] border border-[#E5E7EB] min-h-[80px] p-3">
            Products quantities exceed the current production capacity. Please reduce the order quantity or split into multiple orders. Factory currently operating at 70% capacity due to maintenance.
          </p>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#D1D5DB] rounded text-[14px] font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-[#2563EB] rounded text-[14px] font-medium text-white hover:bg-[#1D4ED8] transition-colors">
              Contact Factory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionDetailsModal;