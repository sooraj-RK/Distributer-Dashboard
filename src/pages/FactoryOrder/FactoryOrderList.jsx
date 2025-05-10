import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import FilterHeader from "../../components/common/Filter/FilterHeader";
import StatusDropdown from "../../components/common/Filter/StatusDropdown";
import CalendarDropdown from "../../components/common/Filter/CalendarDropdown";
import ReusableTable from "../../components/common/tables/ReusableTable";
import { format } from "date-fns";
import OrderDetailsModal from "./OrderDetailsModal";

const dummyData = [
  {
    _id: "1",
    date: "12/03/25 12:44 PM",
    orderId: "XD123R567",
    products: 18,
    value: "₹4,580.00",
    status: "Approved"
  },
  {
    _id: "2",
    date: "Bold text column",
    orderId: "Regular text column",
    products: "Regular text column",
    value: "Regular text column",
    status: "Approved"
  },
  ...Array(12).fill(null).map((_, i) => ({
    _id: `${i + 3}`,
    date: "Bold text column",
    orderId: "Regular text column",
    products: "Regular text column",
    value: "Regular text column",
    status: ["Pending", "Rejected", "Forwarded"][i % 3]
  }))
];

const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return { dot: "bg-green-500", bg: "bg-green-100", text: "text-green-600" };
    case "pending":
      return { dot: "bg-yellow-500", bg: "bg-yellow-100", text: "text-yellow-600" };
    case "rejected":
      return { dot: "bg-red-500", bg: "bg-red-100", text: "text-red-600" };
    case "forwarded":
      return { dot: "bg-green-500", bg: "bg-green-100", text: "text-green-600" };
    default:
      return { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600" };
  }
};

const FactoryOrders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filters, setFilters] = useState({ status: "All" });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const filtersConfig = [
    {
      key: "status",
      label: "Status",
      value: filters.status,
      component: StatusDropdown,
      valueFormatter: (val) => val,
      dropdownProps: {
        options: ["All", "Approved", "Pending", "Rejected", "Forwarded"]
      }
    },
    {
      key: "dateRange",
      value: filters.dateRange,
      component: CalendarDropdown,
      valueFormatter: (value) => {
        if (!Array.isArray(value)) return 'Select date range';
        return `${format(value[0], 'd MMM yyyy')} - ${format(value[1], 'd MMM yyyy')}`;
      },
      showLabel: false
    }
  ];

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedRows(checked ? filteredData.map(item => item._id) : []);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows(prev => {
      const newSelectedRows = prev.includes(rowId)
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId];
      
      // Update selectAll based on whether all rows are selected
      setSelectAll(newSelectedRows.length === filteredData.length);

       return newSelectedRows;
  });
};

  const handleApply = (appliedFilters) => {
    setFilters(appliedFilters);
    setIsFilterActive(
      Object.values(appliedFilters).some(val =>
        Array.isArray(val)
          ? val.length > 0
          : val !== "All" && val !== undefined
      )
    );
  };

  const handleClear = () => {
    setFilters({
      status: "All",
      dateRange: [new Date(), new Date()]
    });
    setIsFilterActive(false);
  };

  const handleRowClick = (row) => {
    console.log("Go to row detail", row);
  };

  const handleClick = (row) => {
    setSelectedOrder(row);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const filteredData = dummyData.filter((item) => {
    const statusMatch = filters.status === "All" || item.status === filters.status;
    const searchMatch = item.orderId?.toLowerCase().includes(search.toLowerCase());
    let dateMatch = true;
    if (Array.isArray(filters.dateRange) && filters.dateRange.length === 2) {
      const [startDate, endDate] = filters.dateRange;
      const itemDate = new Date(item.date);
      dateMatch = itemDate >= startDate && itemDate <= endDate;
    }

    return statusMatch && searchMatch && dateMatch;
  });

  const columns = [
    {
      header: "No",
      accessor: "",
      width: "70px",
      render: (_, __, index) => String(index + 1).padStart(2, "0")
    },
    {
      header: "Date",
      accessor: "date",
      width: "200px"
    },
    {
      header: "Order ID",
      accessor: "orderId",
      width: "180px"
    },
    {
      header: "No of Products",
      accessor: "products",
      width: "160px"
    },
    {
      header: "Purchase Value",
      accessor: "value",
      width: "150px"
    },
    {
      header: "Status",
      accessor: "status",
      render: (val) => {
        const { dot, bg, text } = getStatusStyles(val);
        return (
          <div className="flex justify-center">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
              <span className={`w-2 h-2 rounded-full ${dot}`}></span>
              {val}
            </span>
          </div>
        );
      }
    },
    {
      header: "Remark",
      accessor: "",
      render: (_, row) => (
        <button 
          className="border px-2 py-1 rounded text-sm hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            handleClick(row);
          }}
        >
          View
        </button>
      )
    }
  ];

  return (
    <div className="p-6 w-full overflow-x-hidden">
      <Header
        title="Orders"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        showAdd={false}
        showExports={true}
        isFilterActive={isFilterActive}
        handleFilterToggle={() => setIsFilterActive(!isFilterActive)}
        searchPlaceholder="Search orders"
      />

      {isFilterActive && (
        <div className="mt-4">
          <FilterHeader
            filtersConfig={filtersConfig}
            showApply
            showClear
            onApply={handleApply}
            onClear={handleClear}
            containerClass="bg-white p-4 rounded shadow"
          />
        </div>
      )}

      <div className="mt-5">
        <ReusableTable
          columns={columns}
          data={filteredData}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          isFilterActive={isFilterActive}
          showActions={true}
          onRowClick={handleRowClick}
          rowAccessor="_id"
        />
      </div>

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={handleCloseModal} 
          getStatusStyles= {getStatusStyles}
        />
      )}
    </div>
  );
};

export default FactoryOrders;