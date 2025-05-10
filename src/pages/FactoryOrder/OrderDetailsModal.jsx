import React from "react";
import { useNavigate } from "react-router-dom";
import PriceTable from "../../components/common/tables/PriceTable";

const OrderDetailsModal = ({ order, onClose, onForward,getStatusStyles }) => {
  const navigate = useNavigate();
  
  const orderData = {
    id: order?._id || "01",
    storeId: order?.storeId || "XD123RT567",
    storeName: order?.storeName || "All Cool Bar",
    date: order?.date || "12/03/25 12:44 PM",
    status: order?.status || "Pending",
    items: order?.items || [
      { id: 'st-vanilla-lp', product: 'ST 75ML FRUCHOCOLATE-LP', units: 10, costPerUnit: 180 },
      { id: 'vanilla-bean', product: 'Vanilla Bean Ice Cream', units: 2, costPerUnit: 150 },
      { id: 'cherry-jubilee', product: 'Cherry Jubilee Ice Cream', units: 4, costPerUnit: 150 },
      { id: 'hazelnut', product: 'Hazelnut Praline Ice Cream', units: 2, costPerUnit: 160 },
      { id: 'butter-pecan', product: 'Butter Pecan Ice Cream', units: 6, costPerUnit: 150 },
    ]
  };

  // Calculate totals
  const { totalUnits, totalPrice } = orderData.items.reduce((acc, item) => ({
    totalUnits: acc.totalUnits + item.units,
    totalPrice: acc.totalPrice + (item.units * item.costPerUnit)
  }), { totalUnits: 0, totalPrice: 0 });

  // Status configuration
  const statusConfig = {
    approved: {
      color: "bg-green-500",
      text: "Approved",
      actionButton: {
        text: "Track Order",
        className: "bg-blue-600 hover:bg-blue-700",
        onClick: () => {} 
      }
    },
    pending: {
      color: "bg-yellow-500",
      text: "Pending",
      actionButton: null
    },
    rejected: {
      color: "bg-red-500",
      text: "Rejected",
      actionButton: {
        text: "Modify & Forward",
        className: "bg-blue-600 hover:bg-blue-700",
        onClick: () => {
          navigate('/store-view'); 
          onClose();
        }
      }
    },
    forwarded: {
      color: "bg-blue-500",
      text: "Forwarded",
      actionButton: null
    }
  };

  // Get current status config
  const currentStatus = statusConfig[orderData.status.toLowerCase()] || statusConfig.pending;

  // console.log("currentStatus : ", currentStatus)

  if (orderData.status.toLowerCase() === "forwarded") {
    return null;
  }
  const { dot, bg, text } = getStatusStyles(currentStatus.text);

  // Reusable header component
  const Header = () => (
    <div className="px-8 pt-6 pb-2">
      <h1 className="text-xl font-bold mb-6">Order #{orderData.id} Details</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Store ID</p>
          <p className="font-medium">{orderData.storeId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Store Name</p>
          <p className="font-medium">{orderData.storeName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">{orderData.date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <div className="flex ">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium ${bg} ${text}`}>
              <span className={`w-2 h-2 rounded-md ${dot}`}></span>
              {currentStatus.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Reusable products table component
  const ProductsTable = () => (
    <div className="px-8 mb-6">
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <PriceTable
          items={orderData.items}
          currency="₹"
          showArrows={orderData.status.toLowerCase() === "rejected"}
          editable={false}
        />
      </div>
    </div>
  );

  // Reusable footer with action buttons
  const Footer = () => (
    <div className="p-8 pb-6 pt-4 flex justify-end space-x-4">
      <button
        onClick={onClose}
        className="px-5 py-2.5 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
      >
        Close
      </button>
      {currentStatus.actionButton && (
        <button 
          onClick={currentStatus.actionButton.onClick}
          className={`px-5 py-2.5 rounded text-sm font-medium text-white ${currentStatus.actionButton.className}`}
        >
          {currentStatus.actionButton.text}
        </button>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <Header />
        <ProductsTable />
        <Footer />
      </div>
    </div>
  );
};

export default OrderDetailsModal;