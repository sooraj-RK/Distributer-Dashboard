import React from "react";

const CancellationDetailsModal = ({ request, onClose }) => {
  const statusConfig = {
    approved: {
      dotColor: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50"
    },
    pending: {
      dotColor: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    rejected: {
      dotColor: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50"
    }
  };

  const status = request?.status?.toLowerCase() || "pending";
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Cancellation Request Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* Request ID, Status, Date */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Request ID</p>
              <p className="font-medium">{request.requestId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor}`}>
                <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
                <span className={`capitalize ${config.textColor} font-medium text-sm`}>
                  {status}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{request.date}</p>
            </div>
          </div>

          {/* Store */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">Store</p>
            <p className="font-medium">{request.store}</p>
          </div>

          {/* Freezer ID */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">Freezer ID</p>
            <p className="font-medium">{request.freezerId}</p>
          </div>

          {/* Cancellation Reason */}
          <div className="mb-6">
            <p className="text-sm text-gray-500">Cancellation Reason:</p>
            <p className="mt-2 p-3 bg-gray-200 rounded-md">
              {request.reason || "No reason provided"}
            </p>
          </div>

          {/* Rejection Reason */}
          {status === "rejected" && (
            <div className="mb-6">
              <p className="text-sm font-medium text-red-600">Rejection Reason:</p>
              <p className="mt-2 p-3 bg-gray-200 rounded-md text-black">
                {request.rejectionReason || "No reason provided"}
              </p>
            </div>
          )}

          {/* Footer - Close Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationDetailsModal;
