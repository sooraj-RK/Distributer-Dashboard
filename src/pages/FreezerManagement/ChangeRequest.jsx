import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import Header from "../../components/common/Header";
import FilterHeader from "../../components/common/Filter/FilterHeader";
import StatusDropdown from "../../components/common/Filter/StatusDropdown";
import CalendarDropdown from "../../components/common/Filter/CalendarDropdown";
import ReusableTable from "../../components/common/tables/ReusableTable";
import { format } from "date-fns";

const dummyData = [
  {
    _id: "1",
    requestId: "CR001",
    store: "City Mart Downtown",
    freezerId: "FZ100",
    date: "2025-04-28 12:44 PM",
    status: "Approved"
  },
  {
    _id: "2",
    requestId: "CR002",
    store: "Grocery Express",
    freezerId: "FZ221",
    date: "2025-04-28 12:44 PM",
    status: "Approved"
  },
  
  ...Array(12).fill(null).map((_, i) => ({
    _id: `${i + 3}`,
    requestId: "Regular text column",
    store: "Regular text column",
    freezerId: "Regular text column",
    date: "Bold text column",
    status: ["Approved", "Pending", "Rejected", "Forwarded"][i % 4]
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

const ChangeRequest = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filters, setFilters] = useState({ status: "All" });

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
      component: CalendarDropdown,
      value: filters.dateRange,
      valueFormatter: (val) => {
        if (!Array.isArray(val)) return "Select date range";
        return `${format(val[0], "d MMM yyyy")} - ${format(val[1], "d MMM yyyy")}`;
      },
      showLabel: false
    }
  ];

  const handleApply = (applied) => {
    setFilters(applied);
    setIsFilterActive(
      Object.values(applied).some(v =>
        Array.isArray(v) ? v.length > 0 : v !== "All" && v !== undefined
      )
    );
  };

  const handleClear = () => {
    setFilters({ status: "All", dateRange: [new Date(), new Date()] });
    setIsFilterActive(false);
  };

  const filteredData = dummyData.filter(item => {
    const statusOk = filters.status === "All" || item.status === filters.status;
    const searchOk = item.requestId.toLowerCase().includes(search.toLowerCase());
    let dateOk = true;
    if (Array.isArray(filters.dateRange) && filters.dateRange.length === 2) {
      const [start, end] = filters.dateRange;
      const d = new Date(item.date);
      dateOk = d >= start && d <= end;
    }
    return statusOk && searchOk && dateOk;
  });

  const handleRowClick = row => {
    console.log("Go to detail:", row);
    // navigate(`/change-request/${row._id}`);
  };

  const columns = [
    {
      header: "No",
      accessor: "",
      width: "70px",
      render: (_, __, idx) => String(idx + 1).padStart(2, "0")
    },
    { header: "Request ID", accessor: "requestId", width: "150px" },
    { header: "Store", accessor: "store", width: "180px" },
    { header: "Freezer ID", accessor: "freezerId", width: "150px" },
    {
      header: "Date Requested",
      accessor: "date",
      width: "200px",
      render: val => <span>{val}</span>
    },
    {
      header: "Status",
      accessor: "status",
      render: val => {
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
      width: "170px",
      render: () => (
        <button className="border px-2 py-1 rounded text-sm hover:bg-gray-100">
          View Details
        </button>
      )
    }
  ];

  return (
    <div className="p-1 w-full overflow-x-auto">
      <Header
        title="Freezer Change Requests"
        searchValue={search}
        onSearchChange={e => setSearch(e.target.value)}
        showAdd
        addButtonText="New Request"
        addIcon={PlusIcon}
        showExports
        addPath="/change-requests/new-request"
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
          onRowClick={handleRowClick}
          rowAccessor="_id"
        />
      </div>
    </div>
  );
};

export default ChangeRequest;
