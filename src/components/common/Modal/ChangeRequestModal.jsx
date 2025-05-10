import React from "react";
import { X as CloseIcon } from "lucide-react";
import { format } from "date-fns";

const defaultStatusStyles = {
  Approved: { dot: "bg-green-500", bg: "bg-green-100", text: "text-green-600" },
  Pending:  { dot: "bg-yellow-500", bg: "bg-yellow-100", text: "text-yellow-600" },
  Rejected: { dot: "bg-red-500",   bg: "bg-red-100",   text: "text-red-600" },
};

export default function ChangeRequestModal({
  isOpen,
  onClose,
  data: {
    requestId,
    store,
    freezerId,
    date,
    currentCapacity,
    requestedCapacity,
    changeReason,
    rejectionReason,
  } = {},
  status,
  statusStyles = defaultStatusStyles,
}) {
  if (!isOpen) return null;
  const styles = statusStyles[status] || {};

  // parse & format date safely
  let formattedDate = "—";
  if (date) {
    const d = new Date(date);
    if (!isNaN(d)) formattedDate = format(d, "yyyy-MM-dd");
    else if (typeof date === "string") formattedDate = date;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-medium mb-6">Freezer Change Request Details</h2>

        {/* Top meta: Request ID / Status / Date */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div>
            <div className="font-semibold">Request ID</div>
            <div>{requestId || "—"}</div>
          </div>

          <div>
            <div className="font-semibold">Status</div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${styles.bg} ${styles.text}`}> 
              <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
              {status}
            </div>
          </div>

          <div>
            <div className="font-semibold">Date</div>
            <div>{formattedDate}</div>
          </div>
        </div>

        {/* Store and Freezer full-width sections */}
        <div className="space-y-4 mb-6 text-sm">
          <div>
            <div className="font-semibold">Store</div>
            <div>{store || "—"}</div>
          </div>
          <div>
            <div className="font-semibold">Freezer ID</div>
            <div>{freezerId || "—"}</div>
          </div>
        </div>

        {/* Capacity side by side */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <div className="font-semibold">Current Capacity</div>
            <div>{currentCapacity || "Non"}</div>
          </div>
          <div>
            <div className="font-semibold">Requested Capacity</div>
            <div>{requestedCapacity || "Non"}</div>
          </div>
        </div>

        {/* Reasons */}
        <div className="space-y-6 mb-6 text-sm">
          <div>
            <div className="font-semibold">Change Reason:</div>
            <div className="mt-1 bg-gray-100 p-3 rounded">{changeReason || "—"}</div>
          </div>
          {status === "Rejected" && rejectionReason && (
            <div>
              <div className="font-semibold text-red-600">Rejection Reason:</div>
              <div className="mt-1 bg-gray-100 rounded p-3">
                {rejectionReason}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded border border-gray-300 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
